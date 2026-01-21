import axios from '../config/axios';

// Submit contact form
export const submitContactForm = async (contactData) => {
  const response = await axios.post('/api/contacts', contactData);
  return response.data;
};

// Get all contacts
export const getAllContacts = async () => {
  const response = await axios.get('/api/contacts');
  return response.data.data || response.data;
};

// Get contact by ID
export const getContactById = async (contactId) => {
  const response = await axios.get(`/api/contacts/${contactId}`);
  return response.data.data || response.data;
};

// Delete contact
export const deleteContact = async (contactId) => {
  const response = await axios.delete(`/api/contacts/${contactId}`);
  return response.data;
};

// Update contact status
export const updateContactStatus = async (contactId, status) => {
  const response = await axios.put(`/api/contacts/${contactId}/status`, { status });
  return response.data.data || response.data;
};
