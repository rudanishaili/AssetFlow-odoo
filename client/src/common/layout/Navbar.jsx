import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, UserCheck, CalendarDays } from 'lucide-react';

export const Navbar = () => {
  const items = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/assets', icon: Package, label: 'Assets' },
    { to: '/allocations', icon: UserCheck, label: 'Allocations' },
    { to: '/bookings', icon: CalendarDays, label: 'Bookings' },
  ];

  return (
    <nav 
      className="glass-panel"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60px',
        borderTop: '1px solid var(--surface-border)',
        display: 'none',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '0 var(--spacing-md)',
        zIndex: 100
      }}
      id="mobile-bottom-nav"
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
              fontSize: '0.75rem',
              gap: '2px',
              textDecoration: 'none'
            })}
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
      
      {/* Inline styling to show navigation only on mobile viewports */}
      <style>{`
        @media (max-width: 640px) {
          #mobile-bottom-nav {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
