import React from 'react';
import { Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import ContactCard from '../components/ContactCard';

const Home = () => {
    const { store } = useGlobalReducer();

    return (
        <div className="container">
            <Link to="/add">
                <button className="btn btn-success mb-3">Add new contact</button>
            </Link>
            <div className="contact-list">
                {store.contacts && store.contacts.map((contact, index) => (
                    <ContactCard key={index} contact={contact} />
                ))}
            </div>
        </div>
    );
};

export default Home;