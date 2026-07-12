import React, { forwardRef } from 'react';

/**
 * Liora Input Component
 */
export const Input = forwardRef(({ 
  label, 
  error, 
  id, 
  className = '', 
  ...props 
}, ref) => {
  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label htmlFor={id} className="text-eyebrow block mb-2">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        className={`input-field ${error ? 'input-error' : ''}`}
        {...props}
      />
      {error && <span className="input-error-msg">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
