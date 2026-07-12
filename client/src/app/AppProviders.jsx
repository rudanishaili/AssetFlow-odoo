import React from 'react';
import QueryProvider from './QueryProvider.jsx';
import ThemeProvider from './ThemeProvider.jsx';

export const AppProviders = ({ children }) => {
  return (
    <QueryProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
};

export default AppProviders;
