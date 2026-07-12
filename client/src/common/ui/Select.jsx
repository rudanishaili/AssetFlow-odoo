import React, { useState } from 'react';

export const Select = ({ label, options = [], error, className = '', ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseStyle = {
    padding: '14px 16px',
    borderRadius: 'var(--radius-input)',
    background: 'var(--cloud)',
    color: 'var(--text-primary)',
    border: error ? '1px solid var(--danger)' : '1px solid var(--sage-light)',
    outline: 'none',
    cursor: 'pointer',
    transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
    boxShadow: (isFocused && !error) ? '0 0 0 3px rgba(143, 160, 132, 0.2)' : 'none',
    appearance: 'none', // Remove default OS styling
    backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%238FA084%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px top 50%',
    backgroundSize: '12px auto',
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
      <select 
        style={baseStyle}
        className={`select-field ${className}`} 
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ background: 'var(--cloud)', color: 'var(--text-primary)' }}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span style={{ fontSize: '13px', color: 'var(--danger)', marginTop: '4px' }}>{error}</span>}
    </div>
  );
};

export default Select;
