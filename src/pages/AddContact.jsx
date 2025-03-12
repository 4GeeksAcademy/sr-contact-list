import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';

const AddContact = () => {
  const { addContact } = useGlobalReducer();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: '',
    address: '',
    phone: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newContact = {
        ...formData,
        agenda_slug: 'Mickey',
      };

      console.log("Sending contact:", newContact);

      const apiUrl = 'https://playground.4geeks.com/contact/agenda/Mickey/contacts';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContact),
      });

      if (response.ok) {
        const createdContact = await response.json();
        console.log('New contact from API:', createdContact);
        await addContact(createdContact);
        navigate('/');
      } else {
        const errorText = await response.text();
        console.error('Error adding contact:', response.status, errorText);
        alert("There was an error adding the contact. Please try again.");
      }
    } catch (error) {
      console.error("Error adding contact:", error);
      alert("There was an error adding the contact. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Add Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="full_name">Name</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="form-control" 
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control" 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control" 
          />
        </div>
        <button type="submit" className="btn btn-primary">save</button>
      </form>
    </div>
  );
};

export default AddContact;