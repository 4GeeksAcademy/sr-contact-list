import React from 'react';
import PropTypes from 'prop-types';

const ContactCard = ({ contact }) => {
    return (
        <div className="contact-card">
            <h3>{contact.name}</h3>
            <p>{contact.address}</p>
            <p>{contact.phone}</p>
            <p>{contact.email}</p>
        </div>
    );
};

ContactCard.propTypes = {
    contact: PropTypes.shape({
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
};

export default ContactCard;