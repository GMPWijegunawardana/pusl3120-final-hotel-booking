import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaCalendarAlt, FaClock, FaBed, FaHotel, FaMoneyBillWave, FaCheckCircle, FaTimesCircle, FaEdit, FaStar } from 'react-icons/fa';
import { getCurrentUser } from '../../services/authService';
import { getBookings } from '../../services/bookingService';
import { updateUser } from '../../services/userService';
import { createReview, getReviewByBooking } from '../../services/reviewService';
import '../../styles/profilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingReviews, setBookingReviews] = useState({});
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ''
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth/login');
      return;
    }
    
    fetchUserData();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const currentUser = getCurrentUser();
      
      if (!currentUser) {
        navigate('/auth/login');
        return;
      }

      setUser(currentUser);
      setEditFormData({
        name: currentUser.name || '',
        email: currentUser.email || ''
      });

      const allBookings = await getBookings();
      const userBookings = allBookings.filter(b => b.user?._id === currentUser.id || b.user === currentUser.id);
      setBookings(userBookings);

      const reviewsData = {};
      for (const booking of userBookings) {
        try {
          const review = await getReviewByBooking(booking._id);
          if (review) {
            reviewsData[booking._id] = review;
          }
        } catch (err) {

        }
      }
      setBookingReviews(reviewsData);
    } catch (error) {
      console.error('Error fetching user data:', error);
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

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      setEditFormData({
        name: user.name,
        email: user.email
      });
    }
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(user.id, {
        name: editFormData.name,
        email: editFormData.email
      });
      
      setUser({
        ...user,
        name: updatedUser.name,
        email: updatedUser.email
      });
      
      const currentUser = JSON.parse(localStorage.getItem('user'));
      localStorage.setItem('user', JSON.stringify({
        ...currentUser,
        name: updatedUser.name,
        email: updatedUser.email
      }));
      
      window.dispatchEvent(new Event('storage'));
      
      setIsEditMode(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      booked: { text: 'Confirmed', class: 'status-booked', icon: <FaCheckCircle /> },
      completed: { text: 'Completed', class: 'status-completed', icon: <FaCheckCircle /> },
      cancelled: { text: 'Cancelled', class: 'status-cancelled', icon: <FaTimesCircle /> }
    };
    
    const config = statusConfig[status] || statusConfig.booked;
    return (
      <span className={`booking-status ${config.class}`}>
        {config.icon}
        {config.text}
      </span>
    );
  };

  const getPaymentBadge = (paymentStatus) => {
    return (
      <span className={`payment-status ${paymentStatus === 'PAID' ? 'payment-paid' : 'payment-unpaid'}`}>
        {paymentStatus === 'PAID' ? <FaCheckCircle /> : <FaTimesCircle />}
        {paymentStatus}
      </span>
    );
  };

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleOpenReviewModal = (booking) => {
    setSelectedBooking(booking);
    setReviewForm({
      rating: 5,
      comment: ''
    });
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setSelectedBooking(null);
    setReviewForm({
      rating: 5,
      comment: ''
    });
  };

  const handleReviewChange = (e) => {
    setReviewForm({
      ...reviewForm,
      [e.target.name]: e.target.value
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewData = {
        user: user.id,
        booking: selectedBooking._id,
        room: selectedBooking.room._id,
        rating: parseInt(reviewForm.rating),
        comment: reviewForm.comment
      };

      const newReview = await createReview(reviewData);
      
      setBookingReviews({
        ...bookingReviews,
        [selectedBooking._id]: newReview
      });

      handleCloseReviewModal();
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    }
  };

  const renderStars = (rating, interactive = false, onChange = null) => {
    return (
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`star-icon ${star <= rating ? 'star-filled' : 'star-empty'} ${interactive ? 'star-interactive' : ''}`}
            onClick={() => interactive && onChange && onChange(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="profile-page">
      <section className="profile-hero">
        <div className="profile-hero-overlay">
          <h1>My Profile</h1>
          <p>Manage your account and view your booking history</p>
        </div>
      </section>

      {loading ? (
        <div className="profile-content">
          <div className="profile-container">
            <div className="no-bookings">
              <p>Loading your profile...</p>
            </div>
          </div>
        </div>
      ) : !user ? (
        <div className="profile-content">
          <div className="profile-container">
            <div className="no-bookings">
              <p>Unable to load profile. Please login again.</p>
            </div>
          </div>
        </div>
      ) : (
        <section className="profile-content">
        <div className="profile-container">
          
          <div className="user-info-card">
            <div className="card-header">
              <h2>Account Information</h2>
              <button className="edit-btn" onClick={handleEditToggle}>
                <FaEdit />
                {isEditMode ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {!isEditMode ? (
              <div className="user-details">
                <div className="detail-item">
                  <div className="detail-icon">
                    <FaUser />
                  </div>
                  <div className="detail-text">
                    <h3>Full Name</h3>
                    <p>{user?.name || 'N/A'}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon">
                    <FaEnvelope />
                  </div>
                  <div className="detail-text">
                    <h3>Email Address</h3>
                    <p>{user?.email || 'N/A'}</p>
                  </div>
                </div>
              </div>
            ) : (
              <form className="edit-form" onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-btn">Save Changes</button>
                </div>
              </form>
            )}

            <div className="account-actions">
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          <div className="booking-history-section">
            <h2>Booking History</h2>
            
            {loading ? (
              <div className="no-bookings">
                <p>Loading your bookings...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="no-bookings">
                <p>You don't have any bookings yet.</p>
                <button className="browse-rooms-btn" onClick={() => navigate('/rooms')}>
                  Browse Rooms
                </button>
              </div>
            ) : (
              <div className="bookings-list">
                {bookings.map((booking) => (
                  <div key={booking._id} className="booking-card">
                    <div className="booking-image">
                      <img src={getImageForRoom(booking.room?.type)} alt={booking.room?.type || 'Room'} />
                    </div>

                    <div className="booking-details">
                      <div className="booking-header">
                        <div>
                          <h3>{booking.room?.type || 'Room'}</h3>
                          <p className="hotel-name">
                            <FaBed /> Room #{booking.room?.roomNumber || 'N/A'}
                          </p>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>

                      <div className="booking-info-grid">
                        <div className="info-item">
                          <FaCalendarAlt className="info-icon" />
                          <div>
                            <span className="info-label">Check-in</span>
                            <span className="info-value">{formatDate(booking.checkInDate)}</span>
                          </div>
                        </div>

                        <div className="info-item">
                          <FaCalendarAlt className="info-icon" />
                          <div>
                            <span className="info-label">Check-out</span>
                            <span className="info-value">{formatDate(booking.checkOutDate)}</span>
                          </div>
                        </div>

                        <div className="info-item">
                          <FaClock className="info-icon" />
                          <div>
                            <span className="info-label">Duration</span>
                            <span className="info-value">
                              {calculateNights(booking.checkInDate, booking.checkOutDate)} Nights
                            </span>
                          </div>
                        </div>

                        <div className="info-item">
                          <FaBed className="info-icon" />
                          <div>
                            <span className="info-label">Room Type</span>
                            <span className="info-value">{booking.room?.type || 'N/A'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="booking-footer">
                        <div className="payment-info">
                          <div className="payment-amount">
                            <FaMoneyBillWave />
                            <span>LKR {booking.room?.price?.toLocaleString() || '0'}</span>
                          </div>
                          <span className="payment-status">Status: {booking.status}</span>
                        </div>

                        <div className="booking-date">
                          Booked on {formatDate(booking.createdAt)}
                        </div>
                      </div>

                      <div className="review-section">
                        {bookingReviews[booking._id] ? (
                          <div className="existing-review">
                            <h4>Your Review</h4>
                            <div className="review-rating">
                              {renderStars(bookingReviews[booking._id].rating)}
                              <span className="rating-text">{bookingReviews[booking._id].rating}/5</span>
                            </div>
                            {bookingReviews[booking._id].comment && (
                              <p className="review-comment">{bookingReviews[booking._id].comment}</p>
                            )}
                            <span className="review-date">
                              Reviewed on {formatDate(bookingReviews[booking._id].createdAt)}
                            </span>
                          </div>
                        ) : (
                          <button 
                            className="add-review-btn"
                            onClick={() => handleOpenReviewModal(booking)}
                          >
                            <FaStar /> Write a Review
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>
      )}

      {showReviewModal && (
        <div className="modal-overlay" onClick={handleCloseReviewModal}>
          <div className="modal-content review-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Write a Review</h2>
              <button className="modal-close" onClick={handleCloseReviewModal}>×</button>
            </div>
            
            <form onSubmit={handleReviewSubmit} className="review-form">
              <div className="form-section">
                <h3>{selectedBooking?.room?.type || 'Room'}</h3>
                <p className="room-number">Room #{selectedBooking?.room?.roomNumber}</p>
              </div>

              <div className="form-group">
                <label>Rating</label>
                <div className="rating-input">
                  {renderStars(reviewForm.rating, true, (star) => 
                    setReviewForm({ ...reviewForm, rating: star })
                  )}
                  <span className="rating-value">{reviewForm.rating}/5</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="comment">Your Review (Optional)</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={reviewForm.comment}
                  onChange={handleReviewChange}
                  rows="5"
                  placeholder="Share your experience with this room..."
                  className="review-textarea"
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={handleCloseReviewModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
