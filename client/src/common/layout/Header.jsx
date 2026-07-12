import React from 'react';
import { Menu, Sun, Moon, LogOut, User as UserIcon } from 'lucide-react';
import { useTheme } from '../../app/ThemeProvider.jsx';
import useAuthStore from '../../store/authStore.js';

export const Header = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuthStore();

  return (
    <header 
      className="glass-panel" 
      style={{ 
        height: '70px', 
        padding: '0 var(--spacing-lg)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--surface-border)',
        zIndex: 50
      }}
    >
      <div className="flex items-center gap-md">
        <button 
          onClick={toggleSidebar}
          style={{ 
            color: 'var(--text-primary)', 
            padding: 'var(--spacing-sm)', 
            borderRadius: 'var(--radius-md)'
          }}
          className="flex items-center justify-center"
        >
          <Menu size={20} />
        </button>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>

      <div className="flex items-center gap-lg">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          style={{ 
            color: 'var(--text-primary)', 
            padding: 'var(--spacing-sm)', 
            borderRadius: 'var(--radius-md)' 
          }}
          className="flex items-center justify-center"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={20} style={{ color: 'var(--warning)' }} /> : <Moon size={20} />}
        </button>

        {/* User Info */}
        {user && (
          <div className="flex items-center gap-sm">
            <div 
              style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: 'var(--radius-full)', 
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.875rem'
              }}
              className="flex items-center justify-center"
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-responsive" style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{user.name}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.role}</span>
            </div>
          </div>
        )}

        {/* Logout */}
        <button 
          onClick={logout}
          style={{ 
            color: 'var(--danger)', 
            padding: 'var(--spacing-sm)', 
            borderRadius: 'var(--radius-md)' 
          }}
          className="flex items-center justify-center"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
