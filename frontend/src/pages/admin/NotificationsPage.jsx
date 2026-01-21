import React, { useState, useEffect } from 'react';
import { FaPlus, FaTimes, FaSearch, FaTrash, FaCheckCircle } from 'react-icons/fa';
import { getNotifications, createNotification, updateNotification, deleteNotification } from '../../services/notificationService';
import { getUsers } from '../../services/userService';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    user: '',
    message: '',
    type: 'SYSTEM'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [notificationsData, usersData] = await Promise.all([
        getNotifications(),
        getUsers()
      ]);
      setNotifications(notificationsData);
      setUsers(usersData);
      setError('');
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setFormData({
      user: users[0]?._id || '',
      message: '',
      type: 'SYSTEM'
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ user: '', message: '', type: 'SYSTEM' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNotification(formData);
      fetchData();
      handleCloseModal();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create notification');
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await updateNotification(notificationId, { isRead: true });
      fetchData();
    } catch (err) {
      setError('Failed to update notification');
    }
  };

  const handleDelete = async (notificationId) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      try {
        await deleteNotification(notificationId);
        fetchData();
      } catch (err) {
        setError('Failed to delete notification');
      }
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = 
      notification.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || notification.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type) => {
    switch (type) {
      case 'BOOKING':
        return 'bg-blue-100 text-blue-800';
      case 'PAYMENT':
        return 'bg-green-100 text-green-800';
      case 'SYSTEM':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='w-full h-full flex flex-col justify-start items-start p-6 bg-gray-50 overflow-y-auto'>
      {/* Header */}
      <div className='w-full flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-3xl font-bold text-gray-800'>Notifications Management</h1>
          <p className='text-gray-600 mt-1'>Send and manage user notifications</p>
        </div>
        <button
          onClick={handleOpenModal}
          className='flex items-center gap-2 bg-[#7b5cff] text-white px-4 py-2 rounded-lg hover:bg-[#6a4de0] transition'
        >
          <FaPlus /> Send Notification
        </button>
      </div>

      {/* Filters */}
      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <div className='relative'>
          <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            placeholder='Search by user or message...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b5cff]'
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b5cff]'
        >
          <option value='all'>All Types</option>
          <option value='BOOKING'>Booking</option>
          <option value='PAYMENT'>Payment</option>
          <option value='SYSTEM'>System</option>
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div className='w-full p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded-lg'>
          {error}
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className='w-full flex justify-center items-center py-20'>
          <div className='text-xl text-gray-600'>Loading notifications...</div>
        </div>
      ) : (
        <div className='w-full bg-white rounded-lg shadow overflow-hidden'>
          <table className='w-full'>
            <thead className='bg-gray-100 border-b'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>User</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Message</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Type</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredNotifications.length === 0 ? (
                <tr>
                  <td colSpan='6' className='px-6 py-8 text-center text-gray-500'>
                    No notifications found
                  </td>
                </tr>
              ) : (
                filteredNotifications.map((notification) => (
                  <tr key={notification._id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm font-medium text-gray-900'>{notification.user?.name || 'N/A'}</div>
                      <div className='text-sm text-gray-500'>{notification.user?.email || 'N/A'}</div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-sm text-gray-600 max-w-xs truncate'>
                        {notification.message}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(notification.type)}`}>
                        {notification.type}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${notification.isRead ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {notification.isRead ? 'Read' : 'Unread'}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-600'>
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-center'>
                      <div className='flex justify-center gap-2'>
                        {!notification.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(notification._id)}
                            className='p-2 text-green-600 hover:bg-green-100 rounded transition'
                            title='Mark as Read'
                          >
                            <FaCheckCircle />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notification._id)}
                          className='p-2 text-red-600 hover:bg-red-100 rounded transition'
                          title='Delete'
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className='absolute inset-0 flex justify-center items-center z-50' style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
          <div className='bg-white rounded-lg p-6 w-full max-w-md'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-bold'>Send Notification</h2>
              <button onClick={handleCloseModal} className='text-gray-500 hover:text-gray-700'>
                <FaTimes size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>User</label>
                <select
                  name='user'
                  value={formData.user}
                  onChange={handleInputChange}
                  required
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b5cff]'
                >
                  <option value=''>Select User</option>
                  {users.map(user => (
                    <option key={user._id} value={user._id}>{user.name} ({user.email})</option>
                  ))}
                </select>
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Type</label>
                <select
                  name='type'
                  value={formData.type}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b5cff]'
                >
                  <option value='SYSTEM'>System</option>
                  <option value='BOOKING'>Booking</option>
                  <option value='PAYMENT'>Payment</option>
                </select>
              </div>
              <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Message</label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows='4'
                  placeholder='Enter notification message...'
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b5cff]'
                />
              </div>
              <div className='flex gap-3'>
                <button
                  type='button'
                  onClick={handleCloseModal}
                  className='flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='flex-1 px-4 py-2 bg-[#7b5cff] text-white rounded-lg hover:bg-[#6a4de0] transition'
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
