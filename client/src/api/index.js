import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

export default {
  // Event Types
  getEventTypes: () => api.get('/event-types').then(r => r.data.data),
  createEventType: (data) => api.post('/event-types', data).then(r => r.data.data),
  updateEventType: (id, data) => api.put(`/event-types/${id}`, data).then(r => r.data.data),
  deleteEventType: (id) => api.delete(`/event-types/${id}`),

  // Availability
  getAvailability: () => api.get('/availability').then(r => r.data.data),
  saveAvailability: (data) => api.put('/availability', data).then(r => r.data.data),

  // Public
  getEventBySlug: (slug) => api.get(`/public/${slug}`).then(r => r.data.data),
  getSlots: (slug, date) => api.get(`/public/${slug}/slots`, { params: { date } }).then(r => r.data.slots),

  // Bookings
  createBooking: (data) => api.post('/bookings', data).then(r => r.data.data),
  getConfirmation: (id) => api.get(`/bookings/confirm/${id}`).then(r => r.data.data),
  getBookings: (filter) => api.get('/bookings', { params: { filter } }).then(r => r.data.data),
  cancelBooking: (id) => api.put(`/bookings/${id}/cancel`),
};