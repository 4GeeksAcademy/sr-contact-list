import React, { useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { useNavigate } from 'react-router-dom';

const AddContact = () => {
  const { addContact } = useGlobalReducer();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando contacto:", { ...formData, agenda_slug: 'saray_agenda_123' });
    await addContact({ ...formData, agenda_slug: 'saray_agenda_123' });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a new contact</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={formData.full_name}
        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default AddContact;
