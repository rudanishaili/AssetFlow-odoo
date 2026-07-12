import React from 'react';

export const Footer = () => {
  return (
    <footer 
      style={{ 
        padding: 'var(--spacing-lg) 0', 
        textAlign: 'center', 
        borderTop: '1px solid var(--surface-border)',
        marginTop: 'var(--spacing-2xl)',
        fontSize: '0.875rem',
        color: 'var(--text-muted)'
      }}
    >
      <p>&copy; {new Date().getFullYear()} AssetFlow. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
