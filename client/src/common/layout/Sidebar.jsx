import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Laptop, 
  UserCheck, 
  Calendar, 
  Wrench, 
  CheckSquare, 
  BarChart3, 
  Bell, 
  Settings, 
  User 
} from 'lucide-react';

export default function Sidebar() {
  const sidebarStyle = {
    width: '260px',
    backgroundColor: 'var(--bg-secondary)',
    borderRight: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    position: 'sticky',
    top: 0,
    fontFamily: 'var(--font-sans)',
  };

  const logoContainerStyle = {
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderBottom: '1px solid var(--border-color)',
  };

  const logoStyle = {
    fontSize: '1.25rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.02em',
  };

  const navContainerStyle = {
    flex: 1,
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    overflowY: 'auto',
  };

  const menuItemStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 16px',
    borderRadius: 'var(--radius-md)',
    color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
    backgroundColor: isActive ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
    fontWeight: isActive ? 600 : 500,
    fontSize: '0.925rem',
    transition: 'var(--transition-all)',
  });

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Assets', path: '/assets', icon: Laptop },
    { label: 'Allocations', path: '/allocations', icon: UserCheck },
    { label: 'Bookings', path: '/bookings', icon: Calendar },
    { label: 'Maintenance', path: '/maintenance', icon: Wrench },
    { label: 'Audits', path: '/audits', icon: CheckSquare },
    { label: 'Reports', path: '/reports', icon: BarChart3 },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside style={sidebarStyle}>
      <div style={logoContainerStyle}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: 'var(--radius-sm)', 
          backgroundColor: 'var(--brand-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 800,
          fontSize: '1.2rem'
        }}>A</div>
        <span style={logoStyle}>AssetFlow</span>
      </div>
      <nav style={navContainerStyle}>
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            style={({ isActive }) => menuItemStyle(isActive)}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
