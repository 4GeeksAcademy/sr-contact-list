import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './hooks/useGlobalReducer';
import Contact from './pages/Contact';
import AddContact from './pages/AddContact';

const RoutesConfig = () => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Routes>
          <Route path="/" element={<Contact />} />
          <Route path="/add" element={<AddContact />} />
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  );
};

export default RoutesConfig;