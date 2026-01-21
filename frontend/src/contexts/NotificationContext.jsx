import React, { createContext, useContext, useState, useEffect } from 'react';
import socketService from '../services/socketService';
import { getCurrentUser, isAuthenticated } from '../services/authService';
import { getNotificationsByUser } from '../services/notificationService';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      const user = getCurrentUser();
      
      if (user && user.id) {
        // Connect to Socket.IO
        socketService.connect(user.id);
        setIsConnected(true);

        // Load existing notifications
        loadNotifications(user.id);

        // Listen for new notifications
        socketService.on('newNotification', handleNewNotification);

        return () => {
          socketService.off('newNotification', handleNewNotification);
        };
      }
    } else {
      // Disconnect if not authenticated
      if (isConnected) {
        socketService.disconnect();
        setIsConnected(false);
        setNotifications([]);
        setUnreadCount(0);
      }
    }
  }, []);

  const loadNotifications = async (userId) => {
    try {
      const data = await getNotificationsByUser(userId);
      setNotifications(data);
      updateUnreadCount(data);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const handleNewNotification = (notification) => {
    setNotifications((prev) => [notification, ...prev]);
    setUnreadCount((prev) => prev + 1);
    
    // Show browser notification if permission granted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('New Booking Notification', {
        body: notification.message,
        icon: '/images/logo.png',
        badge: '/images/logo.png'
      });
    }
  };

  const updateUnreadCount = (notificationsList) => {
    const unread = notificationsList.filter(n => !n.isRead).length;
    setUnreadCount(unread);
  };

  const markAsRead = async (notificationId) => {
    try {
      const { markNotificationAsRead } = await import('../services/notificationService');
      await markNotificationAsRead(notificationId);
      
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === notificationId ? { ...n, isRead: true } : n
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const { markNotificationAsRead } = await import('../services/notificationService');
      const unreadNotifications = notifications.filter(n => !n.isRead);
      
      await Promise.all(
        unreadNotifications.map(n => markNotificationAsRead(n._id))
      );
      
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const clearNotification = (notificationId) => {
    setNotifications((prev) => prev.filter(n => n._id !== notificationId));
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotification,
    requestNotificationPermission,
    isConnected
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
