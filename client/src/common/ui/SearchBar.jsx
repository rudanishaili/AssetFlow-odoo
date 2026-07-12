import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ value, onChange, placeholder = 'Search assets...' }) => {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
      <Search 
        size={18} 
        style={{ 
          position: 'absolute', 
          left: '14px', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          color: 'var(--text-muted)' 
        }} 
      />
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.75rem 1rem 0.75rem 2.5rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--surface)',
          color: 'var(--text-primary)',
          border: '1px solid var(--surface-border)',
          outline: 'none',
          transition: 'all var(--transition-fast)'
        }}
      />
    </div>
  );
};

export default SearchBar;
