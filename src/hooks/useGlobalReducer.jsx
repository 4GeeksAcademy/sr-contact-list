import { useContext, useReducer, createContext } from 'react';

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_CONTACT':
            return { ...state, contacts: [...state.contacts, action.payload] };
        default:
            return state;
    }
};

const initialState = {
    contacts: [
        {
            name: 'Mike Anamendolla',
            address: '5842 Hillcrest Rd',
            phone: '(870) 288-4140',
            email: 'mike.ana@example.com',
        },
        {
            name: 'Otro Contacto',
            address: 'Otra Dirección',
            phone: '123-456-7890',
            email: 'otro@example.com',
        },
    ],
};

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [store, dispatch] = useReducer(reducer, initialState);
    return (
        <StoreContext.Provider value={{ store, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

const useGlobalReducer = () => {
    const { store, dispatch } = useContext(StoreContext);
    return { store, dispatch };
};

export default useGlobalReducer;