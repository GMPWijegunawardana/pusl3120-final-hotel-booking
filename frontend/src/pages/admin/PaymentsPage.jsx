import React, { useState, useEffect } from 'react';
import { FaEye, FaSearch, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { getPayments } from '../../services/paymentService';

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const data = await getPayments();
      setPayments(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch payments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPayment(null);
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || payment.paymentStatus === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    return status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getMethodColor = (method) => {
    switch (method) {
      case 'CARD':
        return 'bg-blue-100 text-blue-800';
      case 'CASH':
        return 'bg-yellow-100 text-yellow-800';
      case 'ONLINE':
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
          <h1 className='text-3xl font-bold text-gray-800'>Payments Management</h1>
          <p className='text-gray-600 mt-1'>View all payment transactions</p>
        </div>
      </div>

      {/* Filters */}
      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <div className='relative'>
          <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            placeholder='Search by user name or email...'
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
          <option value='PAID'>Paid</option>
          <option value='NOT PAID'>Not Paid</option>
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
          <div className='text-xl text-gray-600'>Loading payments...</div>
        </div>
      ) : (
        <div className='w-full bg-white rounded-lg shadow overflow-hidden'>
          <table className='w-full'>
            <thead className='bg-gray-100 border-b'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>User</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Amount</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Method</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan='6' className='px-6 py-8 text-center text-gray-500'>
                    No payments found
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment._id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm font-medium text-gray-900'>{payment.user?.name || 'N/A'}</div>
                      <div className='text-sm text-gray-500'>{payment.user?.email || 'N/A'}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm font-semibold text-gray-900'>
                        LKR {payment.amount?.toLocaleString()}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getMethodColor(payment.paymentMethod)}`}>
                        {payment.paymentMethod}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.paymentStatus)}`}>
                        {payment.paymentStatus}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-600'>
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-center'>
                      <button
                        onClick={() => handleViewDetails(payment)}
                        className='p-2 text-green-600 hover:bg-green-100 rounded transition'
                        title='View Details'
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Details Modal */}
      {showModal && selectedPayment && (
        <div className='absolute inset-0 flex justify-center items-center z-50' style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
          <div className='bg-white rounded-lg p-6 w-full max-w-2xl'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-bold'>Payment Details</h2>
              <button onClick={handleCloseModal} className='text-gray-500 hover:text-gray-700'>
                <span className='text-2xl'>&times;</span>
              </button>
            </div>
            <div className='space-y-4'>
              <div>
                <h3 className='text-lg font-semibold mb-2'>User Information</h3>
                <p><strong>Name:</strong> {selectedPayment.user?.name || 'N/A'}</p>
                <p><strong>Email:</strong> {selectedPayment.user?.email || 'N/A'}</p>
              </div>
              <div>
                <h3 className='text-lg font-semibold mb-2'>Payment Information</h3>
                <p><strong>Amount:</strong> LKR {selectedPayment.amount?.toLocaleString()}</p>
                <p><strong>Payment Method:</strong> {selectedPayment.paymentMethod}</p>
                <p><strong>Status:</strong> <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedPayment.paymentStatus)}`}>{selectedPayment.paymentStatus}</span></p>
                <p><strong>Payment Date:</strong> {new Date(selectedPayment.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <h3 className='text-lg font-semibold mb-2'>Booking Reference</h3>
                <p><strong>Booking ID:</strong> {selectedPayment.booking?._id || selectedPayment.booking || 'N/A'}</p>
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

export default PaymentsPage;
