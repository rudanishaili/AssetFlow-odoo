import React from 'react';

export const Spinner = ({ size = 24, color = 'var(--primary)' }) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ animation: 'spin 1s linear infinite' }}
      >
        <circle cx="12" cy="12" r="10" stroke="var(--surface-border)" strokeWidth="3" />
        <path d="M12 2C6.47715 2 2 6.47715 2 12C2 13.5 2.3 14.9 3 16.2L5 15.2C4.3 14.2 4 13.1 4 12C4 7.6 7.6 4 12 4V2Z" fill={color} />
      </svg>
      <style>{
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      }</style>
    </div>
  );
};

export default Spinner;
