import React from 'react';

export const Badge = ({ children, status = 'default' }) => {
  const styles = {
    padding: '0.25rem 0.75rem',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.75rem',
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase'
  };

  const themes = {
    default: { background: 'var(--surface-hover)', color: 'var(--text-primary)' },
    success: { background: 'var(--success-light)', color: 'var(--success)' },
    warning: { background: 'var(--warning-light)', color: 'var(--warning)' },
    danger: { background: 'var(--danger-light)', color: 'var(--danger)' },
    info: { background: 'var(--primary-light)', color: 'var(--primary)' }
  };

  return (
    <span style={{ ...styles, ...themes[status] }}>
      {children}
    </span>
  );
};

export default Badge;
