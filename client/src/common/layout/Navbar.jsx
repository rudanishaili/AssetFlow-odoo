import React from 'react';
import Avatar from '../ui/Avatar.jsx';

function Navbar() {
  return (
    <nav className="h-16 border-b border-[var(--border)] bg-[var(--card-bg)] flex justify-between items-center px-6">
      <div className="font-bold text-xl text-[var(--primary)]">AssetFlow</div>
      <div className="flex items-center gap-4">
        <Avatar name="Administrator" />
      </div>
    </nav>
  );
}

export default Navbar;