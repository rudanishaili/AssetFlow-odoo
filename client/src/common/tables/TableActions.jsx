import React from 'react';
import SearchBar from '../ui/SearchBar';

export default function TableActions({ 
  searchValue, 
  onSearchChange, 
  searchPlaceholder, 
  children 
}) {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    marginBottom: '20px',
    flexWrap: 'wrap',
    fontFamily: 'var(--font-sans)',
  };

  return (
    <div style={containerStyle}>
      {onSearchChange !== undefined ? (
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
        />
      ) : (
        <div />
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {children}
      </div>
    </div>
  );
}
