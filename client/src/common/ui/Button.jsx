import React from 'react';

function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const baseStyle = "inline-flex items-center justify-center font-medium rounded transition-colors focus:outline-none";
  const variants = {
    primary: "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]",
    secondary: "bg-[var(--secondary)] text-white hover:bg-[var(--secondary-hover)]",
    outline: "border border-[var(--border)] text-[var(--text)] hover:bg-[var(--primary-light)]",
    danger: "bg-[var(--danger)] text-white hover:bg-red-700"
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-md",
    lg: "px-6 py-3 text-lg"
  };
  return (
    <button className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;