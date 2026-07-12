import React from 'react';
import QueryProvider from './QueryProvider';
import ThemeProvider from './ThemeProvider';

export default function AppProviders({ children }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}
