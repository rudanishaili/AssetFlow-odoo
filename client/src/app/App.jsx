import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppProviders from './AppProviders.jsx';
import AppRoutes from '../routes/AppRoutes.jsx';
import '../styles/globals.css';

export const App = () => {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </BrowserRouter>
  );
};

export default App;
