import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBed, FaWifi, FaTv, FaCoffee, FaSnowflake } from 'react-icons/fa';
import { getRooms } from '../../services/roomService';
import '../../styles/roomsPage.css';

const RoomsPage = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const data = await getRooms();
      setRooms(data);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImageForRoom = (type) => {
    const imageMap = {
      'Standard Room': '/images/rooms/standard-room.webp',
      'Deluxe Room': '/images/rooms/deluxe-room.webp',
      'Family Room': '/images/rooms/family-room.webp',
      'Executive Suite': '/images/rooms/executive-suite.webp',
      'Honeymoon Suite': '/images/rooms/honeymoon-suite.webp',
      'Presidential Suite': '/images/rooms/presidential-suite.webp'
    };
    return imageMap[type] || '/images/rooms/standard-room.webp';
  };

  const handleBookNow = (room) => {
    navigate('/confirm-booking', { state: { room } });
  };

  return (
    <div className="rooms-page">
      {/* Hero Section */}
      <section className="rooms-hero">
        <div className="rooms-hero-overlay"></div>
        <div className="rooms-hero-content">
          <h1 className="rooms-hero-title">Our Rooms & Suites</h1>
          <p className="rooms-hero-subtitle">Discover comfort and luxury in every corner</p>
        </div>
      </section>

      {/* Rooms Grid Section */}
      <section className="rooms-section">
        <div className="rooms-container">
          {loading ? (
            <div className="text-center py-20">
              <div className="text-xl text-gray-600">Loading rooms...</div>
            </div>
          ) : rooms.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-xl text-gray-600">No rooms available at the moment.</div>
            </div>
          ) : (
            <div className="rooms-grid">
              {rooms.map((room) => (
                <div key={room._id} className="room-card">
                  <div className="room-card-image-wrapper">
                    <img 
                      src={getImageForRoom(room.type)} 
                      alt={room.type} 
                      className="room-card-image"
                    />
                  </div>

                  <div className="room-card-content">
                    <div className="room-card-header">
                      <h3 className="room-card-title">{room.type}</h3>
                      <div className="room-card-price">
                        <span className="price-currency">LKR</span>
                        <span className="price-amount">{room.price.toLocaleString()}</span>
                        <span className="price-period">/night</span>
                      </div>
                    </div>

                    <p className="room-card-description">{room.description || 'Comfortable and well-equipped room for your stay.'}</p>

                    <div className="room-card-details">
                      <div className="room-detail-item">
                        <FaBed className="room-detail-icon" />
                        <span>Room #{room.roomNumber}</span>
                      </div>
                    </div>

                    <button 
                      className="room-card-book-btn"
                      onClick={() => handleBookNow(room)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default RoomsPage;