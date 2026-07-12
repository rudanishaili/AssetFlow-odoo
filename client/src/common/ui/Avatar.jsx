import React from 'react';

export default function Avatar({ 
  src, 
  name = 'User', 
  size = 'md', 
  className = '', 
  ...props 
}) {
  const sizes = {
    sm: '32px',
    md: '40px',
    lg: '56px',
  };

  const currentSize = sizes[size] || sizes.md;

  const style = {
    width: currentSize,
    height: currentSize,
    borderRadius: 'var(--radius-full)',
    objectFit: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--brand-primary)',
    color: '#ffffff',
    fontWeight: 600,
    fontSize: size === 'sm' ? '0.8rem' : size === 'md' ? '1rem' : '1.3rem',
    border: '2px solid var(--border-color)',
    textTransform: 'uppercase',
  };

  const getInitials = (str) => {
    return str
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('');
  };

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={style}
        className={`avatar ${className}`}
        {...props}
      />
    );
  }

  return (
    <div style={style} className={`avatar avatar-initials ${className}`} {...props}>
      {getInitials(name)}
    </div>
  );
}
