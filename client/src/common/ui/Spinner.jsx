import React from 'react';

export default function Spinner({ 
  size = 'md', 
  color = 'var(--brand-primary)', 
  className = '' 
}) {
  const sizes = {
    sm: '16px',
    md: '28px',
    lg: '48px',
  };

  const currentSize = sizes[size] || sizes.md;

  const style = {
    width: currentSize,
    height: currentSize,
    border: '2px solid rgba(255, 255, 255, 0.1)',
    borderTop: `2px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div style={style} className={`spinner ${className}`} />
    </>
  );
}
