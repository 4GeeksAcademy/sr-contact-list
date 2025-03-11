import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './pages/Layout'; // Importa Layout directamente
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Layout /> {/* Renderiza Layout */}
  </React.StrictMode>
);