import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCalendarAlt, FaBed, FaHotel, FaUser, FaCheckCircle } from 'react-icons/fa';
import { createBooking } from '../../services/bookingService';
import { getCurrentUser, isAuthenticated } from '../../services/authService';
import '../../styles/confirmBookingPage.css';

const ConfirmBookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRoom = location.state?.room;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    checkInDate: '',
    checkOutDate: '',
    specialRequests: ''
  });

  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!selectedRoom) {
      navigate('/rooms');
    }
    if (!isAuthenticated()) {
      navigate('/auth/login', { state: { from: '/confirm-booking', room: selectedRoom } });
    }
  }, [selectedRoom, navigate]);

  useEffect(() => {
    if (formData.checkInDate && formData.checkOutDate) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0 && checkOut > checkIn) {
        setNumberOfNights(diffDays);
        setTotalPrice(diffDays * (selectedRoom?.price || 0));
      } else {
        setNumberOfNights(0);
        setTotalPrice(0);
      }
    }
  }, [formData.checkInDate, formData.checkOutDate, selectedRoom]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    // Basic validation
    if (!formData.checkInDate || !formData.checkOutDate) {
      setFormStatus('error');
      setIsSubmitting(false);
      return;
    }

    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);

    if (checkOut <= checkIn) {
      setFormStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const currentUser = getCurrentUser();
      
      if (!currentUser || !currentUser.id) {
        navigate('/auth/login', { state: { from: '/confirm-booking', room: selectedRoom } });
        return;
      }

      // Prepare booking data matching backend schema
      const bookingData = {
        user: currentUser.id,
        hotel: selectedRoom.hotel?._id || selectedRoom.hotel,
        room: selectedRoom._id,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        status: 'booked'
      };

      await createBooking(bookingData);
      
      setFormStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        checkInDate: '',
        checkOutDate: '',
        specialRequests: ''
      });
      setIsSubmitting(false);

      // Redirect to profile/bookings page after 2 seconds
      setTimeout(() => {
        navigate('/profile');
      }, 2000);

    } catch (error) {
      console.error('Error submitting booking:', error);
      setFormStatus('error');
      setIsSubmitting(false);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (!selectedRoom) {
    return null;
  }

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

  return (
    <div className="confirm-booking-page">
      <section className="booking-hero">
        <div className="booking-hero-overlay">
          <h1>Confirm Your Booking</h1>
          <p>Complete your reservation and get ready for an amazing stay</p>
        </div>
      </section>

      <section className="booking-content">
        <div className="booking-container">
          
          {/* Room Summary Section */}
          <div className="room-summary-section">
            <h2>Your Selection</h2>
            
            <div className="room-summary-card">
              <div className="summary-image">
                <img src={getImageForRoom(selectedRoom.type)} alt={selectedRoom.type} />
              </div>
              
              <div className="summary-details">
                <h3>{selectedRoom.type}</h3>
                <p className="summary-description">{selectedRoom.description || 'Comfortable and well-equipped room for your stay.'}</p>
                
                <div className="summary-info">
                  <div className="summary-info-item">
                    <FaBed />
                    <span>Room #{selectedRoom.roomNumber}</span>
                  </div>
                  {selectedRoom.hotel && (
                    <div className="summary-info-item">
                      <FaHotel />
                      <span>{selectedRoom.hotel.name || 'Hotel'}</span>
                    </div>
                  )}
                </div>

                <div className="price-summary">
                  <div className="price-per-night">
                    <span className="price-label">Price per night:</span>
                    <span className="price-value">LKR {selectedRoom.price.toLocaleString()}</span>
                  </div>
                  
                  {numberOfNights > 0 && (
                    <>
                      <div className="nights-count">
                        <span className="price-label">Number of nights:</span>
                        <span className="price-value">{numberOfNights}</span>
                      </div>
                      <div className="total-price">
                        <span className="price-label">Total Price:</span>
                        <span className="price-value">LKR {totalPrice.toLocaleString()}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="booking-note">
              <FaCheckCircle />
              <p>Your booking is protected by our secure reservation system</p>
            </div>
          </div>

          {/* Booking Form Section */}
          <div className="booking-form-section">
            <h2>Guest Information</h2>

            {formStatus === 'success' && (
              <div className="form-message success">
                Booking confirmed successfully! Redirecting...
              </div>
            )}

            {formStatus === 'error' && (
              <div className="form-message error">
                Please check your dates and try again.
              </div>
            )}

            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="+94 77 123 4567"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="checkInDate">Check-in Date *</label>
                  <input
                    type="date"
                    id="checkInDate"
                    name="checkInDate"
                    value={formData.checkInDate}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    min={getTodayDate()}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="checkOutDate">Check-out Date *</label>
                  <input
                    type="date"
                    id="checkOutDate"
                    name="checkOutDate"
                    value={formData.checkOutDate}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    min={formData.checkInDate || getTodayDate()}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="specialRequests">Special Requests (Optional)</label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="Any special requests or requirements..."
                  rows="4"
                ></textarea>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => navigate('/rooms')}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ConfirmBookingPage;
