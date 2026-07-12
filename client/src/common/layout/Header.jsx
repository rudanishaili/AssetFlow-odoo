import React from 'react';
import { Sun, Moon, Bell, LogOut } from 'lucide-react';
import { useTheme } from '../../app/ThemeProvider';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

export default function Header({ 
  user = { name: 'Alex Carter', email: 'alex@assetflow.com' },
  onLogout 
}) {
  const { theme, toggleTheme } = useTheme();

  const headerStyle = {
    height: '70px',
    backgroundColor: 'var(--bg-secondary)',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    fontFamily: 'var(--font-sans)',
  };

  const actionContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  };

  const infoContainerStyle = {
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
  };

  const nameStyle = {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
  };

  const roleStyle = {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
  };

  return (
    <header style={headerStyle}>
      <div>
        {/* Left side spacer or sub navigation if needed */}
      </div>
      <div style={actionContainerStyle}>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={toggleTheme} 
          style={{ borderRadius: 'var(--radius-full)', padding: '8px' }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
        <Button 
          variant="secondary" 
          size="sm" 
          style={{ borderRadius: 'var(--radius-full)', padding: '8px', position: 'relative' }}
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'var(--brand-accent)',
          }} />
        </Button>
        
        <div style={{ height: '24px', width: '1px', backgroundColor: 'var(--border-color)' }} />
        
        <div style={infoContainerStyle}>
          <span style={nameStyle}>{user.name}</span>
          <span style={roleStyle}>{user.email}</span>
        </div>
        <Avatar name={user.name} size="sm" />
      </div>
    </header>
  );
}
