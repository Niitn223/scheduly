-- ═══════════════════════════════════════════════════════════
-- schema.sql  —  Run this file in MySQL Workbench or terminal:
--   mysql -u root -p < schema.sql
-- ═══════════════════════════════════════════════════════════

-- Create the database if it doesn't exist, then use it
CREATE DATABASE IF NOT EXISTS scheduly;
USE scheduly;

-- Drop tables in reverse dependency order (safe re-run)
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS availability;
DROP TABLE IF EXISTS event_types;
DROP TABLE IF EXISTS users;


-- ─────────────────────────────────────────────────────────
-- USERS
-- For MVP: only one row ever exists (our hardcoded admin).
-- user_id = 1 is assumed everywhere in the backend.
-- ─────────────────────────────────────────────────────────
CREATE TABLE users (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  timezone   VARCHAR(50)  NOT NULL DEFAULT 'Asia/Kolkata',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ─────────────────────────────────────────────────────────
-- EVENT_TYPES
-- e.g. "30-min Coffee Chat", "60-min Deep Dive"
-- slug is used in public URLs: /coffee-chat
-- ─────────────────────────────────────────────────────────
CREATE TABLE event_types (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  user_id     INT NOT NULL,
  name        VARCHAR(150) NOT NULL,
  slug        VARCHAR(100) NOT NULL UNIQUE,  -- URL-friendly identifier
  duration    INT NOT NULL,                  -- in minutes
  description TEXT,
  color       VARCHAR(7) DEFAULT '#0069ff',  -- hex color for the card UI
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

  -- Index on slug because EVERY public booking page does: WHERE slug = ?
  INDEX idx_slug (slug),
  INDEX idx_user_id (user_id)
);


-- ─────────────────────────────────────────────────────────
-- AVAILABILITY
-- Stores the admin's weekly schedule template.
-- One row per day of week (0=Sun ... 6=Sat).
-- is_active = FALSE means that day is "off" (not bookable).
-- ─────────────────────────────────────────────────────────
CREATE TABLE availability (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  user_id     INT NOT NULL,
  day_of_week TINYINT NOT NULL,  -- 0=Sunday, 1=Monday, ... 6=Saturday
  start_time  TIME NOT NULL,     -- e.g. '09:00:00'
  end_time    TIME NOT NULL,     -- e.g. '17:00:00'
  is_active   BOOLEAN DEFAULT TRUE,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

  -- Only one row per (user, day) — no duplicate days
  UNIQUE KEY unique_user_day (user_id, day_of_week),
  INDEX idx_user_id (user_id)
);


-- ─────────────────────────────────────────────────────────
-- BOOKINGS
-- A confirmed meeting between a guest and the admin.
-- end_time is always calculated as start_time + duration.
-- status: 'confirmed' | 'cancelled'
-- ─────────────────────────────────────────────────────────
CREATE TABLE bookings (
  id            INT PRIMARY KEY AUTO_INCREMENT,
  event_type_id INT NOT NULL,
  guest_name    VARCHAR(100) NOT NULL,
  guest_email   VARCHAR(150) NOT NULL,
  booking_date  DATE NOT NULL,          -- e.g. '2025-04-14'
  start_time    TIME NOT NULL,          -- e.g. '10:00:00'
  end_time      TIME NOT NULL,          -- e.g. '10:30:00'
  status        ENUM('confirmed','cancelled') DEFAULT 'confirmed',
  notes         TEXT,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (event_type_id) REFERENCES event_types(id) ON DELETE CASCADE,

  -- Used by slot generator: "give me all confirmed bookings on this date"
  INDEX idx_event_date (event_type_id, booking_date),
  INDEX idx_date_status (booking_date, status)
);


-- ═══════════════════════════════════════════════════════════
-- SEED DATA — Sample rows so you can test immediately
-- ═══════════════════════════════════════════════════════════

INSERT INTO users (name, email, timezone)
VALUES ('Alex Johnson', 'alex@scheduly.app', 'Asia/Kolkata');

INSERT INTO event_types (user_id, name, slug, duration, description, color) VALUES
(1, '30-min Coffee Chat', 'coffee-chat', 30, 'A quick intro call to get to know each other!', '#0069ff'),
(1, '60-min Deep Dive',   'deep-dive',   60, 'Let''s dig into the details of your project.',  '#7c3aed'),
(1, '15-min Quick Sync',  'quick-sync',  15, 'Fast check-in or a simple question.',            '#059669');

-- Mon–Fri 9am–5pm, weekends off
INSERT INTO availability (user_id, day_of_week, start_time, end_time, is_active) VALUES
(1, 0, '09:00:00', '17:00:00', FALSE),
(1, 1, '09:00:00', '17:00:00', TRUE),
(1, 2, '09:00:00', '17:00:00', TRUE),
(1, 3, '09:00:00', '17:00:00', TRUE),
(1, 4, '09:00:00', '17:00:00', TRUE),
(1, 5, '09:00:00', '17:00:00', TRUE),
(1, 6, '09:00:00', '13:00:00', FALSE);

-- ⚠️ UPDATE these dates to be upcoming dates when you run this!
INSERT INTO bookings (event_type_id, guest_name, guest_email, booking_date, start_time, end_time, status) VALUES
(1, 'Priya Sharma', 'priya@example.com', '2025-05-12', '10:00:00', '10:30:00', 'confirmed'),
(1, 'Rahul Mehta',  'rahul@example.com', '2025-05-12', '11:00:00', '11:30:00', 'confirmed'),
(2, 'Sara Connor',  'sara@example.com',  '2025-05-13', '14:00:00', '15:00:00', 'confirmed');