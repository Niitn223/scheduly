// src/controllers/availabilityController.js
// ─────────────────────────────────────────────────────────
// Manages the admin's weekly availability template.
// We always work with all 7 days at once — simpler to reason about.
// ─────────────────────────────────────────────────────────

const pool = require('../config/db');
const ADMIN_USER_ID = 1;

// ── GET /api/availability ─────────────────────────────────
// Returns the 7-day schedule for the admin.
const getAll = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM availability WHERE user_id = ? ORDER BY day_of_week',
      [ADMIN_USER_ID]
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('getAll availability error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch availability' });
  }
};

// ── PUT /api/availability ─────────────────────────────────
// Saves the full weekly schedule.
// Strategy: DELETE all existing rows for this user, then INSERT fresh.
// This is simpler than trying to UPSERT 7 individual rows.
//
// Body: { availability: [ { day_of_week, start_time, end_time, is_active }, ... ] }
const saveAll = async (req, res) => {
  const { availability } = req.body;

  if (!Array.isArray(availability) || availability.length === 0) {
    return res.status(400).json({ success: false, error: 'availability array is required' });
  }

  // Use a connection (not pool.query) so we can run a transaction.
  // A transaction means: if any INSERT fails, we roll back ALL of them.
  // This prevents partial saves (e.g. only 3 of 7 days saved).
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Step 1: Remove all existing availability for this user
    await connection.query(
      'DELETE FROM availability WHERE user_id = ?',
      [ADMIN_USER_ID]
    );

    // Step 2: Insert all new rows
    for (const day of availability) {
      await connection.query(
        `INSERT INTO availability (user_id, day_of_week, start_time, end_time, is_active)
         VALUES (?, ?, ?, ?, ?)`,
        [ADMIN_USER_ID, day.day_of_week, day.start_time, day.end_time, day.is_active ? 1 : 0]
      );
    }

    // Step 3: Commit — makes all changes permanent
    await connection.commit();

    const [saved] = await connection.query(
      'SELECT * FROM availability WHERE user_id = ? ORDER BY day_of_week',
      [ADMIN_USER_ID]
    );

    res.json({ success: true, data: saved });

  } catch (err) {
    // If anything failed, undo all changes
    await connection.rollback();
    console.error('saveAll availability error:', err);
    res.status(500).json({ success: false, error: 'Failed to save availability' });
  } finally {
    // Always release the connection back to the pool
    connection.release();
  }
};

module.exports = { getAll, saveAll };