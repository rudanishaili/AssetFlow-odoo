import React, { useState } from 'react';

export const Input = ({ className = '', label, error, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseStyle = {
    padding: '14px 16px',
    borderRadius: 'var(--radius-input)',
    background: 'var(--cloud)',
    color: 'var(--text-primary)',
    border: error ? '1px solid var(--danger)' : '1px solid var(--sage-light)',
    outline: 'none',
    transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
    boxShadow: (isFocused && !error) ? '0 0 0 3px rgba(143, 160, 132, 0.2)' : 'none',
  };

  if (isFocused && !error) {
    baseStyle.borderColor = 'var(--sage)';
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)', width: '100%', marginBottom: 'var(--spacing-md)' }}>
      {label && (
        <label className="eyebrow">
          {label}
        </label>
      )}
      <input 
        style={baseStyle}
        className={`input-field ${className}`} 
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props} 
      />
      {error && <span style={{ fontSize: '13px', color: 'var(--danger)', marginTop: '4px' }}>{error}</span>}
    </div>
  );
};

export default Input;
