import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';

/**
 * Liora Navigation
 */
export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [role, setRole] = useState('employee');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    
    const savedRole = localStorage.getItem('role');
    if (savedRole) setRole(savedRole);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const getLinks = () => {
    switch (role) {
      case 'admin':
        return [
          { to: '/dashboard', label: 'Dashboard' },
          { to: '/departments', label: 'Departments' },
          { to: '/employees', label: 'Employees' },
          { to: '/audits', label: 'Audits' },
          { to: '/reports', label: 'Reports' },
          { to: '/settings', label: 'Settings' }
        ];
      case 'manager':
        return [
          { to: '/dashboard', label: 'Dashboard' },
          { to: '/assets', label: 'Directory' },
          { to: '/allocations', label: 'Allocations' },
          { to: '/maintenance', label: 'Maintenance' },
          { to: '/reports', label: 'Reports' }
        ];
      case 'head':
        return [
          { to: '/dashboard', label: 'Dashboard' },
          { to: '/department-assets', label: 'My Department' },
          { to: '/bookings', label: 'Bookings' }
        ];
      case 'employee':
      default:
        return [
          { to: '/dashboard', label: 'Dashboard' },
          { to: '/my-assets', label: 'My Assets' },
          { to: '/my-bookings', label: 'Bookings' }
        ];
    }
  };

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: scrolled ? 'var(--linen)' : 'transparent',
        boxShadow: scrolled ? 'var(--shadow-soft)' : 'none',
        transition: 'all 0.3s ease',
        padding: '24px clamp(20px, 5vw, 64px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h3" style={{ fontStyle: 'italic', margin: 0, color: 'var(--sage)' }}>
          Liora.
        </Typography>
      </Link>

      <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        {getLinks().map(link => (
          <Link 
            key={link.to} 
            to={link.to} 
            className={`nav-link ${location.pathname.startsWith(link.to) && link.to !== '/' ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
        <Button variant="ghost" onClick={handleSignOut}>Sign Out</Button>
      </nav>
    </header>
  );
};
