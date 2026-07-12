import React from 'react';

export default function Badge({ 
  children, 
  variant = 'info', 
  className = '', 
  ...props 
}) {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '3px 8px',
    fontSize: '0.75rem',
    fontWeight: 600,
    borderRadius: 'var(--radius-full)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    width: 'fit-content',
  };

  const variants = {
    success: {
      backgroundColor: 'rgba(52, 211, 153, 0.15)',
      color: 'var(--status-success)',
    },
    warning: {
      backgroundColor: 'rgba(251, 191, 36, 0.15)',
      color: 'var(--status-warning)',
    },
    danger: {
      backgroundColor: 'rgba(248, 113, 113, 0.15)',
      color: 'var(--status-error)',
    },
    info: {
      backgroundColor: 'rgba(96, 165, 250, 0.15)',
      color: 'var(--status-info)',
    },
    neutral: {
      backgroundColor: 'var(--bg-tertiary)',
      color: 'var(--text-secondary)',
    }
  };

  const currentStyle = {
    ...baseStyle,
    ...(variants[variant] || variants.info),
  };

  return (
    <span style={currentStyle} className={`badge ${className}`} {...props}>
      {children}
    </span>
  );
}
