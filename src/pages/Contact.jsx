import React from 'react';
import { Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import ContactCard from '../components/ContactCard';

const Contact = () => {
  const { store, deleteContact } = useGlobalReducer();

  return (
    <div className="container">
      <Link to="/add">
        <button className="btn btn-success mb-3">Add new contact</button>
      </Link>
      <div className="contact-list">
        {store.contacts &&
          Array.isArray(store.contacts) &&
          store.contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onDelete={() => deleteContact(contact.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default Contact;