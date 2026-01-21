import axios from '../config/axios';

// Get all users
export const getUsers = async () => {
  const response = await axios.get('/api/users');
  return response.data;
};

// Get user by ID
export const getUserById = async (userId) => {
  const response = await axios.get(`/api/users/${userId}`);
  return response.data;
};

// Create new user
export const createUser = async (userData) => {
  const response = await axios.post('/api/users', userData);
  return response.data;
};

// Update user
export const updateUser = async (userId, userData) => {
  const response = await axios.put(`/api/users/${userId}`, userData);
  
  // Update localStorage if current user is updated
  const currentUser = JSON.parse(localStorage.getItem('user'));
  if (currentUser && currentUser.id === userId) {
    localStorage.setItem('user', JSON.stringify({ ...currentUser, ...userData }));
  }
  
  return response.data;
};

// Delete user
export const deleteUser = async (userId) => {
  const response = await axios.delete(`/api/users/${userId}`);
  return response.data;
};
