import React from 'react';

function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-[var(--border)] rounded bg-[var(--card-bg)] text-[var(--text)] focus:border-[var(--secondary)] focus:outline-none"
      />
    </div>
  );
}

export default SearchBar;