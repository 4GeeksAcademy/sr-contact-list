import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';

const AddContact = () => {
  const { addContact } = useGlobalReducer();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newContact = {
        full_name: name,
        address,
        phone,
        email,
        agenda_slug: 'Mickey',
      };

      console.log("Sending contact:", newContact);

      const proxyUrl = 'http://localhost:8080/'; // URL del proxy local
      const apiUrl = 'https://playground.4geeks.com/contact/agenda/Mickey/contacts';
      const response = await fetch(proxyUrl + apiUrl, { // URL modificada
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
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Contact</button>
      </form>
    </div>
  );
};

export default AddContact;