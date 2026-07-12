import React from 'react';
import Spinner from './Spinner';

export default function Loader({ 
  fullscreen = false, 
  message = 'Loading assets...' 
}) {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '24px',
    ...(fullscreen && {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'var(--bg-primary)',
      zIndex: 2000,
    }),
  };

  const textStyle = {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    fontWeight: 500,
    fontFamily: 'var(--font-sans)',
  };

  return (
    <div style={containerStyle}>
      <Spinner size={fullscreen ? 'lg' : 'md'} />
      {message && <span style={textStyle}>{message}</span>}
    </div>
  );
}
