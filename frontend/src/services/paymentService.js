import axios from '../config/axios';

// Create new payment
export const createPayment = async (paymentData) => {
  const response = await axios.post('/api/payments', paymentData);
  return response.data;
};

// Get all payments
export const getPayments = async () => {
  const response = await axios.get('/api/payments');
  return response.data;
};

// Get payment by ID
export const getPaymentById = async (paymentId) => {
  const response = await axios.get(`/api/payments/${paymentId}`);
  return response.data;
};

// Get payments by user
export const getPaymentsByUser = async (userId) => {
  const response = await axios.get(`/api/payments?userId=${userId}`);
  return response.data;
};

// Get payment by booking
export const getPaymentByBooking = async (bookingId) => {
  const response = await axios.get(`/api/payments?bookingId=${bookingId}`);
  return response.data;
};

// Update payment
export const updatePayment = async (paymentId, paymentData) => {
  const response = await axios.put(`/api/payments/${paymentId}`, paymentData);
  return response.data;
};

// Delete payment
export const deletePayment = async (paymentId) => {
  const response = await axios.delete(`/api/payments/${paymentId}`);
  return response.data;
};

// Mark payment as paid
export const markPaymentAsPaid = async (paymentId) => {
  return updatePayment(paymentId, { paymentStatus: 'PAID' });
};
