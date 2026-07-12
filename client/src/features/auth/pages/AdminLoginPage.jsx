import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../../common/ui/Input.jsx';
import Button from '../../../common/ui/Button.jsx';
import useAuthStore from '../../../store/authStore.js';
import useMockDataStore from '../../../store/mockDataStore.js';
import { ShieldAlert } from 'lucide-react';

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (username === 'Admin123' && password === 'admin123') {
      const adminUser = {
        id: 'admin-id',
        email: 'admin@company.com',
        name: 'John Admin',
        role: 'ADMIN',
        department: 'Corporate Office'
      };
      
      const mockToken = `mock-token-ADMIN-${Date.now()}`;
      setAuth(adminUser, mockToken);

      // Log activity
      useMockDataStore.getState().addActivityLog('admin-id', 'John Admin', 'ADMIN_LOGIN', 'Admin authenticated via secure gateway.');

      navigate('/dashboard');
    } else {
      setError('Invalid Administrator credentials.');
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'left' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--danger-light)',
            color: 'var(--danger)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto'
          }}>
            <ShieldAlert size={24} />
          </div>
          <h2 style={{ fontSize: '28px', marginBottom: 'var(--spacing-xs)', fontFamily: 'var(--font-display)', color: 'var(--moss)', fontWeight: '700' }}>
            Admin Gateway
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Secure administrative control interface login.
          </p>
        </div>

        {error && (
          <div style={{ 
            color: 'var(--danger)', 
            background: 'var(--danger-light)', 
            padding: '12px 16px', 
            borderRadius: 'var(--radius-sm)', 
            marginBottom: 'var(--spacing-md)', 
            fontSize: '14px',
            borderLeft: '3px solid var(--danger)'
          }}>
            {error}
          </div>
        )}

        <div className={`fade-up ${mounted ? 'in-view' : ''}`} style={{ transitionDelay: '100ms' }}>
          <Input 
            type="text" 
            label="Admin Username" 
            placeholder="e.g. Admin123" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              padding: '14px',
              borderRadius: 'var(--radius-input)',
              border: '1px solid var(--sage-light)'
            }}
          />
        </div>

        <div className={`fade-up ${mounted ? 'in-view' : ''}`} style={{ transitionDelay: '200ms' }}>
          <Input 
            type="password" 
            label="Admin Password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '14px',
              borderRadius: 'var(--radius-input)',
              border: '1px solid var(--sage-light)'
            }}
          />
        </div>

        <div className={`fade-up ${mounted ? 'in-view' : ''}`} style={{ transitionDelay: '300ms', marginTop: 'var(--spacing-lg)' }}>
          <Button type="submit" variant="primary" style={{ width: '100%', padding: '14px', fontSize: '16px', fontWeight: '600' }}>
            Authorize Access
          </Button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-lg)' }}>
          <Link to="/login" style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none' }}>
            Back to Public Portal
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginPage;
