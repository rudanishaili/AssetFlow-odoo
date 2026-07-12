import React from 'react';

/**
 * Liora Button Component
 */
export const Button = ({
  variant = 'primary', // 'primary' | 'secondary' | 'ghost'
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  fullWidth = false,
}) => {
  const baseClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost'
  }[variant] || 'btn-primary';
  
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      className={`${baseClass} ${widthClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
