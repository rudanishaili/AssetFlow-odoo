import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppProviders from './AppProviders';
import '../styles/variables.css';
import '../styles/theme.css';
import '../styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
