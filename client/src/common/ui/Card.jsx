import React from 'react';

/**
 * Liora Card Component
 */
export const Card = ({ children, className = '', hoverEffect = false, bg = 'cloud' }) => {
  const hoverClass = hoverEffect ? 'hover-lift' : '';
  const bgClass = bg === 'stone' ? 'bg-stone' : 'bg-cloud';
  
  return (
    <div className={`card ${bgClass} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
