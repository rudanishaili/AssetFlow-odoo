import React from 'react';
import Spinner from './Spinner.jsx';

export const Loader = ({ message = 'Loading details...' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', gap: '1rem', width: '100%' }}>
      <Spinner size={36} />
      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{message}</span>
    </div>
  );
};

export default Loader;
