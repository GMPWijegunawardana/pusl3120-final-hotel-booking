import axios from '../config/axios';

// Create new booking
export const createBooking = async (bookingData) => {
  const response = await axios.post('/api/bookings', bookingData);
  return response.data;
};

// Get all bookings
export const getBookings = async () => {
  const response = await axios.get('/api/bookings');
  return response.data;
};

// Get booking by ID
export const getBookingById = async (bookingId) => {
  const response = await axios.get(`/api/bookings/${bookingId}`);
  return response.data;
};

// Get bookings by user
export const getBookingsByUser = async (userId) => {
  const response = await axios.get(`/api/bookings?userId=${userId}`);
  return response.data;
};

// Update booking
export const updateBooking = async (bookingId, bookingData) => {
  const response = await axios.put(`/api/bookings/${bookingId}`, bookingData);
  return response.data;
};

// Delete booking
export const deleteBooking = async (bookingId) => {
  const response = await axios.delete(`/api/bookings/${bookingId}`);
  return response.data;
};

// Cancel booking
export const cancelBooking = async (bookingId) => {
  return updateBooking(bookingId, { status: 'cancelled' });
};
