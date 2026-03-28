// src/utils/slotGenerator.js
// ─────────────────────────────────────────────────────────
// This is the heart of the scheduling logic.
// Pure functions — no DB calls, no side effects.
// Easy to test and easy to explain in interviews.
// ─────────────────────────────────────────────────────────

/**
 * Converts a "HH:MM" time string into total minutes from midnight.
 * Example: "09:30" → 570
 * Why? So we can do arithmetic on times (add/subtract/compare).
 */
const toMinutes = (timeStr) => {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
};

/**
 * Converts total minutes from midnight back to "HH:MM" string.
 * Example: 570 → "09:30"
 * padStart(2, '0') ensures "9" becomes "09".
 */
const toTimeStr = (totalMinutes) => {
  const h = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
  const m = (totalMinutes % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
};

/**
 * Generates all possible start times within a working window.
 *
 * @param {string} startTime - "09:00"
 * @param {string} endTime   - "17:00"
 * @param {number} duration  - slot length in minutes (e.g. 30)
 * @returns {string[]}       - ["09:00", "09:30", "10:00", ...]
 *
 * Logic: walk from startTime to (endTime - duration) in steps of `duration`.
 * We stop when the slot WOULD run past endTime.
 * Example: 9am–5pm, 30min → last slot is 4:30pm (ends at 5:00pm ✓)
 *                            4:31pm would end at 5:01pm (past 5pm ✗)
 */
const generateSlots = (startTime, endTime, duration) => {
  const slots = [];
  let current = toMinutes(startTime);   // e.g. 540 (9am)
  const end   = toMinutes(endTime);     // e.g. 1020 (5pm)

  while (current + duration <= end) {
    slots.push(toTimeStr(current));
    current += duration;
  }

  return slots;
};

/**
 * Removes slots that overlap with existing bookings.
 *
 * @param {string[]} allSlots  - output of generateSlots()
 * @param {Object[]} bookings  - [{ start_time: "10:00:00", end_time: "10:30:00" }]
 * @param {number}   duration  - slot length in minutes
 * @returns {string[]}         - only the slots with no conflicts
 *
 * Overlap detection — two time ranges [A, B) and [C, D) overlap when:
 *   A < D  AND  B > C
 *
 * Visual example with 30-min slots and a booking at 10:00–10:30:
 *
 *   Slot 09:30 (ends 10:00): 09:30 < 10:30 ✓  AND  10:00 > 10:00 ✗  → NO conflict
 *   Slot 10:00 (ends 10:30): 10:00 < 10:30 ✓  AND  10:30 > 10:00 ✓  → CONFLICT
 *   Slot 10:30 (ends 11:00): 10:30 < 10:30 ✗                         → NO conflict
 */
const filterBookedSlots = (allSlots, bookings, duration) => {
  return allSlots.filter((slot) => {
    const slotStart = toMinutes(slot);
    const slotEnd   = slotStart + duration;

    // Check if this slot overlaps ANY confirmed booking
    const hasConflict = bookings.some((booking) => {
      // MySQL TIME columns come back as "10:00:00" — trim to "10:00"
      const bookedStart = toMinutes(booking.start_time.slice(0, 5));
      const bookedEnd   = toMinutes(booking.end_time.slice(0, 5));

      return slotStart < bookedEnd && slotEnd > bookedStart;
    });

    return !hasConflict; // Keep the slot only if there's no conflict
  });
};

module.exports = { generateSlots, filterBookedSlots, toMinutes, toTimeStr };