import React from 'react';

export const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const styles = {
    padding: size === 'sm' ? '12px 24px' : size === 'lg' ? '20px 40px' : '16px 32px',
    borderRadius: 'var(--radius-btn)',
    fontSize: size === 'sm' ? '14px' : '15px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'transform 0.35s var(--ease-soft), background 0.3s ease, color 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-sm)',
    boxShadow: 'none',
  };

  const variants = {
    primary: {
      background: 'var(--sage)',
      color: 'var(--cloud)',
      border: 'none',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--moss)',
      border: '1px solid var(--moss)',
      // adjust padding to account for 1px border so visual size matches primary exactly
      padding: size === 'sm' ? '11px 23px' : size === 'lg' ? '19px 39px' : '15px 31px',
    },
    outline: {
      background: 'transparent',
      color: 'var(--sage)',
      border: '1px solid var(--sage)',
      padding: size === 'sm' ? '11px 23px' : size === 'lg' ? '19px 39px' : '15px 31px',
    },
    danger: {
      background: 'var(--danger)',
      color: 'var(--cloud)',
      border: 'none',
    }
  };

  const mergedStyle = { ...styles, ...variants[variant] };

  // Note: Hover states are ideally handled via CSS classes for cleaner pseudo-class management.
  // We'll apply the base class and any extra custom classes passed in.
  
  return (
    <button style={mergedStyle} className={`btn-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
