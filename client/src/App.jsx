import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/admin/Dashboard';
import EventTypeForm from './pages/admin/EventTypeForm';
import Availability from './pages/admin/Availability';
import Meetings from './pages/admin/Meetings';
import BookingPage from './pages/public/BookingPage';
import Confirmation from './pages/public/Confirmation';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/event-types/new" element={<EventTypeForm />} />
        <Route path="/admin/event-types/:id" element={<EventTypeForm />} />
        <Route path="/admin/availability" element={<Availability />} />
        <Route path="/admin/meetings" element={<Meetings />} />
        <Route path="/book/:slug" element={<BookingPage />} />
        <Route path="/book/confirmed/:id" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  );
}