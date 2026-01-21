import axios from '../config/axios';

// Create new room
export const createRoom = async (roomData) => {
  const response = await axios.post('/api/rooms', roomData);
  return response.data;
};

// Get all rooms
export const getRooms = async () => {
  const response = await axios.get('/api/rooms');
  return response.data;
};

// Get room by ID
export const getRoomById = async (roomId) => {
  const response = await axios.get(`/api/rooms/${roomId}`);
  return response.data;
};

// Get rooms by hotel
export const getRoomsByHotel = async (hotelId) => {
  const response = await axios.get(`/api/rooms?hotelId=${hotelId}`);
  return response.data;
};

// Update room
export const updateRoom = async (roomId, roomData) => {
  const response = await axios.put(`/api/rooms/${roomId}`, roomData);
  return response.data;
};

// Delete room
export const deleteRoom = async (roomId) => {
  const response = await axios.delete(`/api/rooms/${roomId}`);
  return response.data;
};
