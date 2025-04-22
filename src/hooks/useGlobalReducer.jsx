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

  const BASE_URL = 'https://playground.4geeks.com/contact';
  const AGENDA_SLUG = 'saray_agenda_123';


  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API request failed:', response.status, errorText);
        return;
      }
      const data = await response.json();
      dispatch({ type: 'SET_CONTACTS', payload: data.contacts });
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const addContact = async (contact) => {
    try {
      const contactWithAgenda = { ...contact, agenda_slug: AGENDA_SLUG };
  
      const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactWithAgenda),
      });
      const data = await response.json();
      if (response.ok) {
        fetchContacts();
      } else {
        console.error('Error adding contact:', data);
      }
    } catch (error) {
      console.error('Fetch failed:', error);
    }
  };
  

  const updateContact = async (id, updatedContact) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContact),
      });
      if (response.ok) {
        fetchContacts();
      } else {
        const errorText = await response.text();
        console.error('Error updating contact:', response.status, errorText);
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchContacts();
      } else {
        const errorText = await response.text();
        console.error('Error deleting contact:', response.status, errorText);
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
