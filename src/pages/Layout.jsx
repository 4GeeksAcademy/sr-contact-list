import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from '../hooks/useGlobalReducer'; // Importa el Provider
import Home from './Home';
import { Demo } from "./Demo";
import { Single } from "./Single";

const Layout = () => {
  return (
    <BrowserRouter>
      <StoreProvider> {/* Envuelve las rutas con el Provider */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/single/:id" element={<Single />} />
          {/* Agrega aquí más rutas si es necesario */}
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  );
};

export default Layout;