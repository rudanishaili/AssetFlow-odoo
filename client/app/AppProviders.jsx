import React from 'react';
import ThemeProvider from './ThemeProvider.jsx';
import QueryProvider from './QueryProvider.jsx';

export default function AppProviders({ children }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}
