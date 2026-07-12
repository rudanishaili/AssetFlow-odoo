import React from 'react';

/**
 * Liora Typography Component
 */
export const Typography = ({ 
  variant = 'body', 
  element,
  children, 
  className = '', 
  style = {} 
}) => {
  const baseClass = {
    h1: 'text-h1',
    h2: 'text-h2',
    h3: 'text-h3',
    bodyLarge: 'text-body-large',
    body: 'text-body',
    eyebrow: 'text-eyebrow'
  }[variant] || 'text-body';

  const Element = element || {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    bodyLarge: 'p',
    body: 'p',
    eyebrow: 'span'
  }[variant] || 'p';

  return (
    <Element 
      className={`${baseClass} ${className}`}
      style={style}
    >
      {children}
    </Element>
  );
};
