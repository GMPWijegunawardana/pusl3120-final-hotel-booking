import React, { useState, useEffect } from 'react';
import { FaTrash, FaSearch, FaEye } from 'react-icons/fa';
import { getAllContacts, deleteContact, updateContactStatus } from '../../services/contactService';

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await getAllContacts();
      setContacts(Array.isArray(data) ? data : []);
      setError('');
    } catch (err) {
      setError('Failed to fetch contacts');
      setContacts([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  const handleDelete = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact submission?')) {
      try {
        await deleteContact(contactId);
        fetchContacts();
      } catch (err) {
        setError('Failed to delete contact');
      }
    }
  };

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      await updateContactStatus(contactId, newStatus);
      fetchContacts();
      if (selectedContact?._id === contactId) {
        setSelectedContact({ ...selectedContact, status: newStatus });
      }
    } catch (err) {
      setError('Failed to update contact status');
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'read':
        return 'bg-blue-100 text-blue-800';
      case 'replied':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='w-full h-full flex flex-col justify-start items-start p-6 bg-gray-50 overflow-y-auto'>
      {/* Header */}
      <div className='w-full flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-3xl font-bold text-gray-800'>Contact Submissions</h1>
          <p className='text-gray-600 mt-1'>View and manage contact form submissions</p>
        </div>
      </div>

      {/* Filters */}
      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <div className='relative'>
          <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            placeholder='Search by name, email, or subject...'
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
          <option value='pending'>Pending</option>
          <option value='read'>Read</option>
          <option value='replied'>Replied</option>
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
          <div className='text-xl text-gray-600'>Loading contacts...</div>
        </div>
      ) : (
        <div className='w-full bg-white rounded-lg shadow overflow-hidden'>
          <table className='w-full'>
            <thead className='bg-gray-100 border-b'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Subject</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan='6' className='px-6 py-8 text-center text-gray-500'>
                    No contacts found
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr key={contact._id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm font-medium text-gray-900'>{contact.name}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-600'>{contact.email}</div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-sm text-gray-900 max-w-xs truncate'>
                        {contact.subject}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-600'>
                        {new Date(contact.submittedAt || contact.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-center'>
                      <div className='flex justify-center gap-2'>
                        <button
                          onClick={() => handleViewDetails(contact)}
                          className='p-2 text-green-600 hover:bg-green-100 rounded transition'
                          title='View Details'
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDelete(contact._id)}
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
      {showModal && selectedContact && (
        <div className='absolute inset-0 flex justify-center items-center z-50' style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
          <div className='bg-white rounded-lg p-6 w-full max-w-2xl'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-bold'>Contact Details</h2>
              <button onClick={handleCloseModal} className='text-gray-500 hover:text-gray-700'>
                <span className='text-2xl'>&times;</span>
              </button>
            </div>
            <div className='space-y-4'>
              <div>
                <h3 className='text-lg font-semibold mb-2'>Contact Information</h3>
                <p><strong>Name:</strong> {selectedContact.name}</p>
                <p><strong>Email:</strong> {selectedContact.email}</p>
              <div>
                <h3 className='text-lg font-semibold mb-2'>Update Status</h3>
                <div className='flex gap-2'>
                  <button
                    onClick={() => handleStatusChange(selectedContact._id, 'pending')}
                    className={`px-4 py-2 rounded-lg transition ${selectedContact.status === 'pending' ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedContact._id, 'read')}
                    className={`px-4 py-2 rounded-lg transition ${selectedContact.status === 'read' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                  >
                    Read
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedContact._id, 'replied')}
                    className={`px-4 py-2 rounded-lg transition ${selectedContact.status === 'replied' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
                  >
                    Replied
                  </button>
                </div>
              </div>
                {selectedContact.phone && <p><strong>Phone:</strong> {selectedContact.phone}</p>}
                <p><strong>Status:</strong> <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedContact.status)}`}>{selectedContact.status}</span></p>
                <p><strong>Submitted:</strong> {new Date(selectedContact.submittedAt || selectedContact.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <h3 className='text-lg font-semibold mb-2'>Subject</h3>
                <p className='text-gray-700'>{selectedContact.subject}</p>
              </div>
              <div>
                <h3 className='text-lg font-semibold mb-2'>Message</h3>
                <p className='text-gray-700 whitespace-pre-wrap'>{selectedContact.message}</p>
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

export default ContactsPage;
