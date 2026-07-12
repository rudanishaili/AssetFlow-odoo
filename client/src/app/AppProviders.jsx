import React from 'react';
import ThemeProvider from './ThemeProvider.jsx';
import QueryProvider from './QueryProvider.jsx';

function AppProviders({ children }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}

export default AppProviders;