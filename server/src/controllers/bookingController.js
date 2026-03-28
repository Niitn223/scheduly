// src/controllers/bookingController.js
// ─────────────────────────────────────────────────────────
// Handles: public slot lookup, booking creation, confirmation,
//          admin meetings list, and cancellation.
// ─────────────────────────────────────────────────────────

const pool = require('../config/db');
const { generateSlots, filterBookedSlots, toMinutes, toTimeStr } = require('../utils/slotgenerator');

const ADMIN_USER_ID = 1;

// ── GET /api/public/:slug ─────────────────────────────────
// Fetches event type info for the public booking page header.
const getEventBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const [rows] = await pool.query(
      `SELECT e.*, u.name as host_name, u.timezone
       FROM event_types e
       JOIN users u ON u.id = e.user_id
       WHERE e.slug = ? AND e.is_active = 1`,
      [slug]
    );

    if (!rows.length) {
      return res.status(404).json({ success: false, error: 'Event type not found' });
    }

    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('getEventBySlug error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// ── GET /api/public/:slug/slots?date=YYYY-MM-DD ───────────
// The core scheduling endpoint. Returns available time slots for a date.
// This is the most interview-important function — know it well.
const getAvailableSlots = async (req, res) => {
  try {
    const { slug } = req.params;
    const { date } = req.query; // e.g. "2025-04-14"

    // ── Validate date ──
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ success: false, error: 'date query param required (YYYY-MM-DD)' });
    }

    // Don't allow booking in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const requestedDate = new Date(date + 'T00:00:00');
    if (requestedDate < today) {
      return res.json({ success: true, date, slots: [] });
    }

    // ── Step 1: Get event type ──
    const [eventRows] = await pool.query(
      'SELECT * FROM event_types WHERE slug = ? AND is_active = 1',
      [slug]
    );
    if (!eventRows.length) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }
    const event = eventRows[0];

    // ── Step 2: Get day of week ──
    // new Date('2025-04-14T00:00:00').getDay() → 1 (Monday)
    // We append T00:00:00 to avoid timezone shifting the date by a day.
    const dayOfWeek = new Date(date + 'T00:00:00').getDay();

    // ── Step 3: Check if admin works that day ──
    const [availRows] = await pool.query(
      `SELECT * FROM availability
       WHERE user_id = ? AND day_of_week = ? AND is_active = 1`,
      [event.user_id, dayOfWeek]
    );

    if (!availRows.length) {
      // Day is off — return empty slots
      return res.json({ success: true, date, slots: [] });
    }

    const avail = availRows[0];

    // ── Step 4: Generate all possible slots ──
    // start_time from MySQL comes as "09:00:00" — slice to "09:00"
    const allSlots = generateSlots(
      avail.start_time.slice(0, 5),
      avail.end_time.slice(0, 5),
      event.duration
    );

    // ── Step 5: Get existing confirmed bookings for this date ──
    const [bookings] = await pool.query(
      `SELECT start_time, end_time FROM bookings
       WHERE event_type_id = ? AND booking_date = ? AND status = 'confirmed'`,
      [event.id, date]
    );

    // ── Step 6: Remove booked slots ──
    const available = filterBookedSlots(allSlots, bookings, event.duration);

    res.json({ success: true, date, slots: available });

  } catch (err) {
    console.error('getAvailableSlots error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch slots' });
  }
};

// ── POST /api/bookings ────────────────────────────────────
// Creates a new booking. Validates, checks conflicts, inserts.
// Body: { event_type_id, guest_name, guest_email, booking_date, start_time, notes }
const createBooking = async (req, res) => {
  try {
    const { event_type_id, guest_name, guest_email, booking_date, start_time, notes } = req.body;

    // ── Validate required fields ──
    if (!event_type_id || !guest_name || !guest_email || !booking_date || !start_time) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    // ── Get event type to know duration ──
    const [eventRows] = await pool.query(
      'SELECT * FROM event_types WHERE id = ?',
      [event_type_id]
    );
    if (!eventRows.length) {
      return res.status(404).json({ success: false, error: 'Event type not found' });
    }
    const event = eventRows[0];

    // ── Calculate end time ──
    // Always compute on the server — never trust the client for this.
    const startMins = toMinutes(start_time);
    const end_time  = toTimeStr(startMins + event.duration);

    // ── Conflict check (anti-double-booking) ──
    // Even though the UI only shows open slots, two users could
    // simultaneously view the same slot. We re-check here as the
    // definitive source of truth.
    const [conflicts] = await pool.query(
      `SELECT id FROM bookings
       WHERE event_type_id = ?
         AND booking_date = ?
         AND status = 'confirmed'
         AND start_time < ? AND end_time > ?`,
      [event_type_id, booking_date, end_time, start_time]
    );

    if (conflicts.length > 0) {
      return res.status(409).json({
        success: false,
        error: 'This slot was just booked by someone else. Please choose another time.'
      });
    }

    // ── Insert booking ──
    const [result] = await pool.query(
      `INSERT INTO bookings (event_type_id, guest_name, guest_email, booking_date, start_time, end_time, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [event_type_id, guest_name, guest_email, booking_date, start_time, end_time, notes || null]
    );

    // ── Return the new booking ──
    const [newBooking] = await pool.query(
      `SELECT b.*, e.name as event_name, e.duration, e.color
       FROM bookings b
       JOIN event_types e ON e.id = b.event_type_id
       WHERE b.id = ?`,
      [result.insertId]
    );

    res.status(201).json({ success: true, data: newBooking[0] });

  } catch (err) {
    console.error('createBooking error:', err);
    res.status(500).json({ success: false, error: 'Failed to create booking' });
  }
};

// ── GET /api/bookings/confirm/:id ─────────────────────────
// Fetches a single booking for the confirmation page.
const getConfirmation = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `SELECT b.*, e.name as event_name, e.duration, e.color, e.slug, u.name as host_name
       FROM bookings b
       JOIN event_types e ON e.id = b.event_type_id
       JOIN users u ON u.id = e.user_id
       WHERE b.id = ?`,
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('getConfirmation error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// ── GET /api/bookings?filter=upcoming|past ────────────────
// Returns the admin's meetings list.
const getBookings = async (req, res) => {
  try {
    const { filter } = req.query; // 'upcoming' or 'past'
    const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

    // Build the date condition based on filter
    const dateCondition = filter === 'past'
      ? 'b.booking_date < ?'      // past: before today
      : 'b.booking_date >= ?';    // upcoming (default): today or future

    const [rows] = await pool.query(
      `SELECT b.*, e.name as event_name, e.duration, e.color
       FROM bookings b
       JOIN event_types e ON e.id = b.event_type_id
       WHERE e.user_id = ? AND ${dateCondition}
       ORDER BY b.booking_date ${filter === 'past' ? 'DESC' : 'ASC'}, b.start_time ASC`,
      [ADMIN_USER_ID, today]
    );

    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('getBookings error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch bookings' });
  }
};

// ── PUT /api/bookings/:id/cancel ──────────────────────────
// Soft-deletes a booking by setting status to 'cancelled'.
// We never hard-delete bookings — keep the history.
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      `UPDATE bookings SET status = 'cancelled'
       WHERE id = ? AND status = 'confirmed'`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Booking not found or already cancelled' });
    }

    res.json({ success: true, message: 'Booking cancelled' });
  } catch (err) {
    console.error('cancelBooking error:', err);
    res.status(500).json({ success: false, error: 'Failed to cancel booking' });
  }
};

module.exports = {
  getEventBySlug,
  getAvailableSlots,
  createBooking,
  getConfirmation,
  getBookings,
  cancelBooking,
};