import React from 'react';
import ReactDOM from 'react-dom/client';
import RoutesConfig from './routes'; // Importa RoutesConfig
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RoutesConfig /> {/* Renderiza RoutesConfig */}
    </React.StrictMode>
);