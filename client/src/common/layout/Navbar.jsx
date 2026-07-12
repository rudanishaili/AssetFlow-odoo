import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    backgroundColor: 'var(--bg-secondary)',
    borderBottom: '1px solid var(--border-color)',
    fontFamily: 'var(--font-sans)',
  };

  const brandStyle = {
    fontWeight: 700,
    fontSize: '1.25rem',
    color: 'var(--text-primary)',
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={brandStyle}>AssetFlow</Link>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/login" style={{ color: 'var(--text-secondary)' }}>Login</Link>
      </div>
    </nav>
  );
}
