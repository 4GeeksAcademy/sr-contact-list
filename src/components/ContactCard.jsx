import React, { useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';

const ContactCard = ({ contact, onDelete }) => {
  const { updateContact } = useGlobalReducer();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContact, setUpdatedContact] = useState({ ...contact });

  const handleUpdate = async () => {
    await updateContact(contact.id, updatedContact);
    setIsEditing(false);
  };

  return (
    <div className="contact-card">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedContact.full_name}
            onChange={(e) =>
              setUpdatedContact({ ...updatedContact, full_name: e.target.value })
            }
          />
          <input
            type="text"
            value={updatedContact.address}
            onChange={(e) =>
              setUpdatedContact({ ...updatedContact, address: e.target.value })
            }
          />
          <input
            type="text"
            value={updatedContact.phone}
            onChange={(e) =>
              setUpdatedContact({ ...updatedContact, phone: e.target.value })
            }
          />
          <input
            type="text"
            value={updatedContact.email}
            onChange={(e) =>
              setUpdatedContact({ ...updatedContact, email: e.target.value })
            }
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{contact.full_name}</h3>
          <p>{contact.address}</p>
          <p>{contact.phone}</p>
          <p>{contact.email}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ContactCard;