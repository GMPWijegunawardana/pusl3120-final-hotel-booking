import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye, FaSearch } from 'react-icons/fa';
import { getBookings, updateBooking, deleteBooking } from '../../services/bookingService';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getBookings();
      setBookings(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch bookings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateBooking(bookingId, { status: newStatus });
      fetchBookings();
    } catch (err) {
      setError('Failed to update booking status');
    }
  };

  const handleDelete = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteBooking(bookingId);
        fetchBookings();
      } catch (err) {
        setError('Failed to delete booking');
      }
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.hotel?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'booked':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='w-full h-full flex flex-col justify-start items-start p-6 bg-gray-50 overflow-y-auto'>
      {/* Header */}
      <div className='w-full flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-3xl font-bold text-gray-800'>Bookings Management</h1>
          <p className='text-gray-600 mt-1'>Manage all hotel bookings</p>
        </div>
      </div>

      {/* Filters */}
      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <div className='relative'>
          <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            placeholder='Search by user, email, or hotel...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b5cff]'
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b5cff]'
        >
          <option value='all'>All Status</option>
          <option value='booked'>Booked</option>
          <option value='cancelled'>Cancelled</option>
          <option value='completed'>Completed</option>
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
          <div className='text-xl text-gray-600'>Loading bookings...</div>
        </div>
      ) : (
        <div className='w-full bg-white rounded-lg shadow overflow-hidden'>
          <table className='w-full'>
            <thead className='bg-gray-100 border-b'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>User</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Hotel</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Room</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Check In</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Check Out</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan='7' className='px-6 py-8 text-center text-gray-500'>
                    No bookings found
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking._id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm font-medium text-gray-900'>{booking.user?.name || 'N/A'}</div>
                      <div className='text-sm text-gray-500'>{booking.user?.email || 'N/A'}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>{booking.hotel?.name || 'N/A'}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>{booking.room?.type || 'N/A'}</div>
                      <div className='text-sm text-gray-500'>#{booking.room?.roomNumber || 'N/A'}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-600'>
                        {booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : 'N/A'}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-600'>
                        {booking.checkOutDate ? new Date(booking.checkOutDate).toLocaleDateString() : 'N/A'}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}
                      >
                        <option value='booked'>Booked</option>
                        <option value='cancelled'>Cancelled</option>
                        <option value='completed'>Completed</option>
                      </select>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-center'>
                      <div className='flex justify-center gap-2'>
                        <button
                          onClick={() => handleViewDetails(booking)}
                          className='p-2 text-green-600 hover:bg-green-100 rounded transition'
                          title='View Details'
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDelete(booking._id)}
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

      {/* Details Modal */}
      {showModal && selectedBooking && (
        <div className='absolute inset-0 flex justify-center items-center z-50' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className='bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-bold'>Booking Details</h2>
              <button onClick={handleCloseModal} className='text-gray-500 hover:text-gray-700'>
                <span className='text-2xl'>&times;</span>
              </button>
            </div>
            <div className='space-y-4'>
              <div>
                <h3 className='text-lg font-semibold mb-2'>User Information</h3>
                <p><strong>Name:</strong> {selectedBooking.user?.name || 'N/A'}</p>
                <p><strong>Email:</strong> {selectedBooking.user?.email || 'N/A'}</p>
              </div>
              <div>
                <h3 className='text-lg font-semibold mb-2'>Hotel Information</h3>
                <p><strong>Hotel:</strong> {selectedBooking.hotel?.name || 'N/A'}</p>
                <p><strong>Location:</strong> {selectedBooking.hotel?.location || 'N/A'}</p>
              </div>
              <div>
                <h3 className='text-lg font-semibold mb-2'>Room Information</h3>
                <p><strong>Room Type:</strong> {selectedBooking.room?.type || 'N/A'}</p>
                <p><strong>Room Number:</strong> {selectedBooking.room?.roomNumber || 'N/A'}</p>
                <p><strong>Price:</strong> LKR {selectedBooking.room?.price?.toLocaleString() || 'N/A'}</p>
              </div>
              <div>
                <h3 className='text-lg font-semibold mb-2'>Booking Details</h3>
                <p><strong>Check In:</strong> {selectedBooking.checkInDate ? new Date(selectedBooking.checkInDate).toLocaleDateString() : 'N/A'}</p>
                <p><strong>Check Out:</strong> {selectedBooking.checkOutDate ? new Date(selectedBooking.checkOutDate).toLocaleDateString() : 'N/A'}</p>
                <p><strong>Status:</strong> <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedBooking.status)}`}>{selectedBooking.status}</span></p>
                <p><strong>Created:</strong> {new Date(selectedBooking.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <div className='mt-6'>
              <button
                onClick={handleCloseModal}
                className='w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
