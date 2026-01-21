import axios from '../config/axios';

// Create new review
export const createReview = async (reviewData) => {
  const response = await axios.post('/api/reviews', reviewData);
  return response.data;
};

// Get all reviews
export const getReviews = async () => {
  const response = await axios.get('/api/reviews');
  return response.data;
};

// Get review by booking
export const getReviewByBooking = async (bookingId) => {
  const response = await axios.get(`/api/reviews/booking/${bookingId}`);
  return response.data;
};

// Get reviews by user
export const getReviewsByUser = async (userId) => {
  const response = await axios.get(`/api/reviews/user/${userId}`);
  return response.data;
};

// Delete review
export const deleteReview = async (reviewId) => {
  const response = await axios.delete(`/api/reviews/${reviewId}`);
  return response.data;
};
