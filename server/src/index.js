// src/index.js
// ─────────────────────────────────────────────────────────
// This is the entry point of our Express server.
// It wires together middleware, routes, and starts listening.
// ─────────────────────────────────────────────────────────

const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const app = express();

// ── Middleware ────────────────────────────────────────────
// cors()  → Allows our React app (port 5173) to call this API (port 5000).
//           Without this, browsers block cross-origin requests.
// express.json() → Parses incoming request bodies as JSON so we can
//                  read req.body in our controllers.
app.use(cors());
app.use(express.json());

// ── Routes ────────────────────────────────────────────────
// Each route file handles one "resource".
// We attach them under /api/* to namespace them cleanly.
const eventTypeRoutes    = require('./routes/eventTypes');
const availabilityRoutes = require('./routes/availability');
const bookingRoutes      = require('./routes/bookings');
const publicRoutes       = require('./routes/public');

app.use('/api/event-types',  eventTypeRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/bookings',     bookingRoutes);
app.use('/api/public',       publicRoutes);

// ── Health Check ──────────────────────────────────────────
// A simple endpoint to confirm the server is alive.
// Visit http://localhost:5000/health in your browser to test.
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Scheduly API is running' });
});

// ── Start Server ──────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});