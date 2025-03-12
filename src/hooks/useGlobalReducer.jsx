import { useContext, useReducer, createContext, useEffect } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONTACTS':
      return { ...state, contacts: action.payload };
    case 'ADD_CONTACT':
      return { ...state, contacts: [...state.contacts, action.payload] };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== action.payload),
      };
    default:
      return state;
  }
};

const initialState = {
  contacts: [],
};

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);
  const API_URL = 'https://playground.4geeks.com/contact/agendas/Mickey/';

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      console.log('Fetching contacts from:', API_URL);
      const response = await fetch(API_URL);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API request failed:', response.status, errorText);
        return;
      }
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Response is not JSON:', text);
        return;
      }
      const data = await response.json();
      console.log('Data from API:', data);

      
      const contacts = data.contacts;

      dispatch({ type: 'SET_CONTACTS', payload: contacts });
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const addContact = async (contact) => {
    try {
      console.log('Adding contact to:', API_URL);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
      });
      if (response.ok) {
        fetchContacts();
      }
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const updateContact = async (id, updatedContact) => {
    try {
      console.log('Updating contact at:', `${API_URL}${id}`);
      const response = await fetch(`${API_URL}${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContact),
      });
      if (response.ok) {
        fetchContacts();
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const deleteContact = async (id) => {
    try {
      console.log('Deleting contact at:', `${API_URL}${id}`);
      const response = await fetch(`${API_URL}${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchContacts();
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const value = {
    store,
    dispatch,
    addContact,
    updateContact,
    deleteContact,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

const useGlobalReducer = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useGlobalReducer must be used within a StoreProvider');
  }
  return context;
};

export default useGlobalReducer;