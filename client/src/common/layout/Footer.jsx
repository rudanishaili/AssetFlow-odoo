import React from 'react';

export default function Footer() {
  const footerStyle = {
    padding: '20px 24px',
    backgroundColor: 'var(--bg-secondary)',
    borderTop: '1px solid var(--border-color)',
    textAlign: 'center',
    fontSize: '0.825rem',
    color: 'var(--text-tertiary)',
    fontFamily: 'var(--font-sans)',
    marginTop: 'auto',
  };

  return (
    <footer style={footerStyle}>
      &copy; {new Date().getFullYear()} AssetFlow. All rights reserved. Premium Asset Management.
    </footer>
  );
}
