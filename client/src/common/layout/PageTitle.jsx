import React from 'react';

export default function PageTitle({ 
  title, 
  subtitle, 
  action 
}) {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
    fontFamily: 'var(--font-sans)',
  };

  const titleStyle = {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
  };

  const subtitleStyle = {
    fontSize: '0.875rem',
    color: 'var(--text-secondary)',
    marginTop: '4px',
  };

  return (
    <div style={containerStyle}>
      <div>
        <h1 style={titleStyle}>{title}</h1>
        {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
