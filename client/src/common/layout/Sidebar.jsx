import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const links = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Assets', path: '/assets' },
    { label: 'Maintenance', path: '/maintenance' },
    { label: 'Bookings', path: '/bookings' },
  ];
  return (
    <aside className="w-64 border-r border-[var(--border)] bg-[var(--card-bg)] min-h-screen p-4 flex flex-col gap-2">
      {links.map(link => (
        <Link key={link.path} to={link.path} className="px-4 py-2 rounded text-[var(--text)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-colors">
          {link.label}
        </Link>
      ))}
    </aside>
  );
}

export default Sidebar;