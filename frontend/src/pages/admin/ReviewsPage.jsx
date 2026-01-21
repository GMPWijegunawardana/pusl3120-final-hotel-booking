import React, { useState, useEffect } from 'react';
import { FaTrash, FaSearch, FaStar } from 'react-icons/fa';
import { getReviews, deleteReview } from '../../services/reviewService';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getReviews();
      setReviews(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch reviews');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(reviewId);
        fetchReviews();
      } catch (err) {
        setError('Failed to delete review');
      }
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.room?.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.room?.roomNumber?.toString().includes(searchTerm) ||
      review.comment?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRating = filterRating === 'all' || review.rating === parseInt(filterRating);
    
    return matchesSearch && matchesRating;
  });

  const renderStars = (rating) => {
    return (
      <div className='flex items-center gap-1'>
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i} 
            className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className='w-full h-full flex flex-col justify-start items-start p-6 bg-gray-50 overflow-y-auto'>
      {/* Header */}
      <div className='w-full flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-3xl font-bold text-gray-800'>Reviews Management</h1>
          <p className='text-gray-600 mt-1'>Manage customer reviews and ratings</p>
        </div>
      </div>

      {/* Filters */}
      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <div className='relative'>
          <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            placeholder='Search by user, room type, room number, or comment...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b5cff]'
          />
        </div>
        <select
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
          className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b5cff]'
        >
          <option value='all'>All Ratings</option>
          <option value='5'>5 Stars</option>
          <option value='4'>4 Stars</option>
          <option value='3'>3 Stars</option>
          <option value='2'>2 Stars</option>
          <option value='1'>1 Star</option>
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
          <div className='text-xl text-gray-600'>Loading reviews...</div>
        </div>
      ) : (
        <div className='w-full bg-white rounded-lg shadow overflow-hidden'>
          <table className='w-full'>
            <thead className='bg-gray-100 border-b'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>User</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Room</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Rating</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Comment</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan='6' className='px-6 py-8 text-center text-gray-500'>
                    No reviews found
                  </td>
                </tr>
              ) : (
                filteredReviews.map((review) => (
                  <tr key={review._id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm font-medium text-gray-900'>{review.user?.name || 'N/A'}</div>
                      <div className='text-sm text-gray-500'>{review.user?.email || 'N/A'}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm font-medium text-gray-900'>{review.room?.type || 'N/A'}</div>
                      <div className='text-sm text-gray-500'>Room #{review.room?.roomNumber || 'N/A'}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {renderStars(review.rating)}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-sm text-gray-600 max-w-xs truncate'>
                        {review.comment || 'No comment'}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-600'>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-center'>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className='p-2 text-red-600 hover:bg-red-100 rounded transition'
                        title='Delete'
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
