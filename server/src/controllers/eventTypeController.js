// src/controllers/eventTypeController.js
// ─────────────────────────────────────────────────────────
// Handles all event type operations.
// ADMIN_USER_ID = 1 is our hardcoded logged-in user.
// In production this would come from a JWT token.
// ─────────────────────────────────────────────────────────

const pool = require('../config/db');

const ADMIN_USER_ID = 1; // Our hardcoded admin for the MVP

// ── GET /api/event-types ──────────────────────────────────
// Returns all event types for the admin user.
const getAll = async (req, res) => {
  try {
    // pool.query returns [rows, fields] — we only need rows
    const [rows] = await pool.query(
      'SELECT * FROM event_types WHERE user_id = ? ORDER BY created_at DESC',
      [ADMIN_USER_ID]
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('getAll event types error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch event types' });
  }
};

// ── POST /api/event-types ─────────────────────────────────
// Creates a new event type.
// Body: { name, slug, duration, description, color }
const create = async (req, res) => {
  try {
    const { name, slug, duration, description, color } = req.body;

    // Basic validation — check required fields exist
    if (!name || !slug || !duration) {
      return res.status(400).json({ success: false, error: 'name, slug, and duration are required' });
    }

    // Slugs must be URL-safe: lowercase letters, numbers, hyphens only
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(slug)) {
      return res.status(400).json({ success: false, error: 'Slug can only contain lowercase letters, numbers, and hyphens' });
    }

    const [result] = await pool.query(
      `INSERT INTO event_types (user_id, name, slug, duration, description, color)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [ADMIN_USER_ID, name, slug, duration, description || null, color || '#0069ff']
    );

    // result.insertId gives us the auto-generated ID of the new row
    const [newRow] = await pool.query('SELECT * FROM event_types WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, data: newRow[0] });

  } catch (err) {
    // MySQL error 1062 = duplicate entry (slug already exists)
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, error: 'This slug is already taken. Choose a different one.' });
    }
    console.error('create event type error:', err);
    res.status(500).json({ success: false, error: 'Failed to create event type' });
  }
};

// ── PUT /api/event-types/:id ──────────────────────────────
// Updates an existing event type.
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, duration, description, color } = req.body;

    if (!name || !slug || !duration) {
      return res.status(400).json({ success: false, error: 'name, slug, and duration are required' });
    }

    const [result] = await pool.query(
      `UPDATE event_types
       SET name = ?, slug = ?, duration = ?, description = ?, color = ?
       WHERE id = ? AND user_id = ?`,
      [name, slug, duration, description || null, color || '#0069ff', id, ADMIN_USER_ID]
    );

    // affectedRows = 0 means the ID didn't exist (or didn't belong to this user)
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Event type not found' });
    }

    const [updated] = await pool.query('SELECT * FROM event_types WHERE id = ?', [id]);
    res.json({ success: true, data: updated[0] });

  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, error: 'This slug is already taken.' });
    }
    console.error('update event type error:', err);
    res.status(500).json({ success: false, error: 'Failed to update event type' });
  }
};

// ── DELETE /api/event-types/:id ───────────────────────────
// Deletes an event type (and cascades to its bookings via FK).
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      'DELETE FROM event_types WHERE id = ? AND user_id = ?',
      [id, ADMIN_USER_ID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Event type not found' });
    }

    res.json({ success: true, message: 'Event type deleted' });

  } catch (err) {
    console.error('delete event type error:', err);
    res.status(500).json({ success: false, error: 'Failed to delete event type' });
  }
};

module.exports = { getAll, create, update, remove };