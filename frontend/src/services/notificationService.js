import axios from '../config/axios';

// Create new notification
export const createNotification = async (notificationData) => {
  const response = await axios.post('/api/notifications', notificationData);
  return response.data;
};

// Get all notifications
export const getNotifications = async () => {
  const response = await axios.get('/api/notifications');
  return response.data;
};

// Get notifications by user
export const getNotificationsByUser = async (userId) => {
  const response = await axios.get(`/api/notifications/user/${userId}`);
  return response.data;
};

// Get notification by ID
export const getNotificationById = async (notificationId) => {
  const response = await axios.get(`/api/notifications/${notificationId}`);
  return response.data;
};

// Update notification
export const updateNotification = async (notificationId, notificationData) => {
  const response = await axios.put(`/api/notifications/${notificationId}`, notificationData);
  return response.data;
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId) => {
  return updateNotification(notificationId, { isRead: true });
};

// Delete notification
export const deleteNotification = async (notificationId) => {
  const response = await axios.delete(`/api/notifications/${notificationId}`);
  return response.data;
};
