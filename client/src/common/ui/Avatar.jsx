import React from 'react';

export const Avatar = ({ name = '', size = 'md' }) => {
  const sizePx = size === 'sm' ? '28px' : size === 'lg' ? '48px' : '36px';
  const initial = name ? name.charAt(0).toUpperCase() : '?';

  return (
    <div 
      style={{
        width: sizePx,
        height: sizePx,
        borderRadius: 'var(--radius-full)',
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
        color: '#ffffff',
        fontWeight: 600,
        fontSize: size === 'sm' ? '0.75rem' : size === 'lg' ? '1.25rem' : '0.875rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {initial}
    </div>
  );
};

export default Avatar;
