# Scheduly — Calendly Clone

A full-stack scheduling platform built as an SDE Intern take-home
assignment. Replicates Calendly's core UI and functionality.

## Tech Stack

- **Frontend:** React.js (Vite), Tailwind CSS, React Router v6, Axios
- **Backend:** Node.js, Express.js
- **Database:** MySQL

## Features

- Event Types — Create, edit, delete with name, duration, slug, color
- Public Booking Page — 3-panel layout with calendar + time slots
- Availability Settings — Set working days and hours per day
- Meetings Page — View upcoming/past meetings, cancel meetings
- Double Booking Prevention — Server-side conflict check

## Project Structure

scheduly/
├── client/                 # React frontend (Vite)
│   └── src/
│       ├── api/            # Axios API layer
│       ├── components/     # Reusable UI components
│       └── pages/
│           ├── admin/      # Dashboard, EventTypeForm,
│           │               # Availability, Meetings
│           └── public/     # BookingPage, Confirmation
└── server/                 # Express backend
    └── src/
        ├── config/         # MySQL connection pool
        ├── controllers/    # Business logic
        ├── routes/         # API route definitions
        └── utils/          # Slot generation algorithm

## Local Setup

### Prerequisites
- Node.js v18+
- MySQL 8.0+

### 1. Clone the repo
git clone <your-repo-url>
cd scheduly

### 2. Database setup
# Open MySQL and run:
source server/schema.sql

### 3. Backend
cd server
npm install

# Create server/.env:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=scheduly
PORT=5000

npm run dev

### 4. Frontend
cd client
npm install

# Create client/.env:
VITE_API_URL=http://localhost:5000/api

npm run dev

### 5. Open the app
Admin:  http://localhost:5173/admin
Public: http://localhost:5173/book/coffee-chat

## API Endpoints

GET    /api/event-types              List event types
POST   /api/event-types              Create event type
PUT    /api/event-types/:id          Update event type
DELETE /api/event-types/:id          Delete event type
GET    /api/availability             Get weekly schedule
PUT    /api/availability             Save weekly schedule
GET    /api/public/:slug             Get event by slug
GET    /api/public/:slug/slots?date= Get available slots
POST   /api/bookings                 Create booking
GET    /api/bookings?filter=...      List bookings
PUT    /api/bookings/:id/cancel      Cancel booking
GET    /api/bookings/confirm/:id     Get confirmation

## Database Schema

- users       — Admin user (hardcoded id=1 for MVP)
- event_types — Event types with slug, duration, color
- availability — Weekly schedule (one row per day of week)
- bookings    — Confirmed meetings with guest details

## Assumptions

- Single admin user, no authentication required
- All times stored in Asia/Kolkata timezone
- Bookings cannot be made for past dates
- Cancelled bookings are soft-deleted (status = 'cancelled')

## Deployment

Frontend: Netlify
Backend:  Render / Railway
Database: Railway MySQL