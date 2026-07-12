import React from 'react';

function Avatar({ name = '', src = '', size = 'md' }) {
  const sizes = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-12 h-12' };
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className={`${sizes[size]} rounded-full bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center font-bold overflow-hidden border border-[var(--border)]`}>
      {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : initials}
    </div>
  );
}

export default Avatar;