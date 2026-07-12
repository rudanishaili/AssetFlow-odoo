import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ 
  value = '', 
  onChange, 
  placeholder = 'Search...', 
  className = '', 
  ...props 
}) {
  const [focused, setFocused] = React.useState(false);

  const containerStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
    fontFamily: 'var(--font-sans)',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 14px 10px 40px',
    borderRadius: 'var(--radius-md)',
    border: `1px solid ${focused ? 'var(--brand-primary)' : 'var(--border-color)'}`,
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    outline: 'none',
    boxShadow: focused ? '0 0 0 3px rgba(99, 102, 241, 0.15)' : 'none',
    transition: 'var(--transition-all)',
  };

  const iconStyle = {
    position: 'absolute',
    left: '14px',
    color: focused ? 'var(--brand-primary)' : 'var(--text-tertiary)',
    transition: 'var(--transition-all)',
    pointerEvents: 'none',
  };

  const clearStyle = {
    position: 'absolute',
    right: '14px',
    color: 'var(--text-tertiary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={containerStyle} className={`search-bar-container ${className}`}>
      <Search size={18} style={iconStyle} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      {value && (
        <button 
          style={clearStyle} 
          onClick={() => onChange('')}
          type="button"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
