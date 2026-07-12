import React from 'react';
import * as LucideIcons from 'lucide-react';

/**
 * Liora Icon Component wrapper for lucide-react
 */
export const Icon = ({ name, size = 24, className = '', color = 'var(--moss)', strokeWidth = 1.5 }) => {
  const LucideIcon = LucideIcons[name];

  if (!LucideIcon) {
    console.warn(`Icon '${name}' not found in lucide-react`);
    return null;
  }

  return (
    <LucideIcon 
      size={size} 
      color={color} 
      strokeWidth={strokeWidth} 
      className={`icon-base ${className}`} 
    />
  );
};
