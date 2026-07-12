import React from 'react';

export default function Select({ 
  label, 
  options = [], 
  error, 
  className = '', 
  id, 
  placeholder = 'Select an option', 
  ...props 
}) {
  const [focused, setFocused] = React.useState(false);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: '100%',
    fontFamily: 'var(--font-sans)',
  };

  const labelStyle = {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: error ? 'var(--status-error)' : 'var(--text-secondary)',
  };

  const selectStyle = {
    padding: '10px 14px',
    borderRadius: 'var(--radius-md)',
    border: `1px solid ${error ? 'var(--status-error)' : focused ? 'var(--brand-primary)' : 'var(--border-color)'}`,
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    outline: 'none',
    boxShadow: focused && !error ? '0 0 0 3px rgba(99, 102, 241, 0.15)' : 'none',
    transition: 'var(--transition-all)',
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 14px center',
    backgroundSize: '16px',
    paddingRight: '40px',
  };

  const errorStyle = {
    fontSize: '0.75rem',
    color: 'var(--status-error)',
  };

  return (
    <div style={containerStyle} className={`select-container ${className}`}>
      {label && <label htmlFor={id} style={labelStyle}>{label}</label>}
      <select
        id={id}
        style={selectStyle}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
}
