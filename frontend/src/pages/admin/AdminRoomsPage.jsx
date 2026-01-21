import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaSearch } from 'react-icons/fa';
import { getRooms, createRoom, updateRoom, deleteRoom } from '../../services/roomService';

const AdminRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [formData, setFormData] = useState({
    roomNumber: '',
    type: '',
    description: '',
    price: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const roomsData = await getRooms();
      setRooms(roomsData);
      setError('');
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setIsEditMode(false);
    setEditingRoomId(null);
    setFormData({
      roomNumber: '',
      type: '',
      description: '',
      price: ''
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (room) => {
    setIsEditMode(true);
    setEditingRoomId(room._id);
    setFormData({
      roomNumber: room.roomNumber,
      type: room.type,
      description: room.description || '',
      price: room.price
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditMode(false);
    setEditingRoomId(null);
    setFormData({
      roomNumber: '',
      description: '',
      type: '',
      price: ''
    });
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
      if (isEditMode) {
        await updateRoom(editingRoomId, formData);
      } else {
        await createRoom(formData);
      }
      fetchData();
      handleCloseModal();
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} room`);
    }
  };

  const handleDelete = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await deleteRoom(roomId);
        fetchData();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete room');
      }
    }
  };

  const filteredRooms = rooms.filter(room =>
    room.roomNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='w-full h-full flex flex-col justify-start items-start p-6 bg-gray-50 overflow-y-auto'>
      {/* Header */}
      <div className='w-full flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-3xl font-bold text-gray-800'>Rooms Management</h1>
          <p className='text-gray-600 mt-1'>Manage all rooms</p>
        </div>
        <button
          onClick={handleOpenModal}
          className='flex items-center gap-2 bg-[#7b5cff] text-white px-4 py-2 rounded-lg hover:bg-[#6a4de0] transition'
        >
          <FaPlus /> Add Room
        </button>
      </div>

      {/* Search Bar */}
      <div className='w-full mb-4'>
        <div className='relative'>
          <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            placeholder='Search by room number or type...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b5cff]'
          />
        </div>
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
          <div className='text-xl text-gray-600'>Loading rooms...</div>
        </div>
      ) : (
        <div className='w-full bg-white rounded-lg shadow overflow-hidden'>
          <table className='w-full'>
            <thead className='bg-gray-100 border-b'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Room Number</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Type</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Description</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Price</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Created At</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredRooms.length === 0 ? (
                <tr>
                  <td colSpan='6' className='px-6 py-8 text-center text-gray-500'>
                    No rooms found
                  </td>
                </tr>
              ) : (
                filteredRooms.map((room) => (
                  <tr key={room._id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm font-medium text-gray-900'>#{room.roomNumber}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>{room.type}</div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-sm text-gray-600 max-w-xs truncate'>{room.description || 'N/A'}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm font-semibold text-gray-900'>
                        LKR {room.price?.toLocaleString()}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-600'>
                        {new Date(room.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex gap-2'>
                        <button
                          onClick={() => handleOpenEditModal(room)}
                          className='text-blue-600 hover:text-blue-800 transition'
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(room._id)}
                          className='text-red-600 hover:text-red-800 transition'
                        >
                          <FaTrash size={18} />
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
        <div className='absolute inset-0 flex justify-center items-center z-50' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className='bg-white rounded-lg p-6 w-full max-w-md'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-bold'>{isEditMode ? 'Edit Room' : 'Add New Room'}</h2>
              <button onClick={handleCloseModal} className='text-gray-500 hover:text-gray-700'>
                <FaTimes size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Room Number</label>
                <input
                  type='text'
                  name='roomNumber'
                  value={formData.roomNumber}
                  onChange={handleInputChange}
                  required
                  placeholder='e.g., 101'
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b5cff]'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Room Type</label>
                <input
                  type='text'
                  name='type'
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  placeholder='e.g., Deluxe Suite'
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b5cff]'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Description</label>
                <textarea
                  name='description'
                  value={formData.description}
                  onChange={handleInputChange}
                  rows='3'
                  placeholder='Brief description of the room...'
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b5cff] resize-none'
                />
              </div>
              <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Price (LKR)</label>
                <input
                  type='number'
                  name='price'
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min='0'
                  placeholder='e.g., 15000'
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
                  {isEditMode ? 'Update Room' : 'Create Room'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRoomsPage;
