import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../../common/ui/Input.jsx';
import Button from '../../../common/ui/Button.jsx';
import useAuthStore from '../../../store/authStore.js';
import api from '../../../services/axios.js';
import { Briefcase, Award, User } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (loginEmail, loginPassword) => {
    setError('');

    if (!loginEmail) {
      setError('Please enter your email.');
      return;
    }

    // Prevent direct logging into admin from the public login page
    if (loginEmail.toLowerCase() === 'admin@company.com') {
      setError('Admin logins must be performed through the secure administration gateway.');
      return;
    }

    try {
      const response = await api.post('/auth/login', {
        email: loginEmail,
        password: loginPassword || 'Password123'
      });

      if (response.success) {
        setAuth(response.data.user, response.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please verify credentials.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  const demoAccounts = [
    { name: 'Jane Doe', role: 'Asset Manager', email: 'manager@company.com', icon: Briefcase, bg: '#F5F4F0', color: '#60725A' },
    { name: 'Frank Miller', role: 'Department Head', email: 'head@company.com', icon: Award, bg: '#F5F4F0', color: '#D9984A' },
    { name: 'Sarah Jenkins', role: 'Employee', email: 'employee@company.com', icon: User, bg: '#F5F4F0', color: '#4A8890' },
  ];

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'left' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
          <h2 style={{ fontSize: '32px', marginBottom: 'var(--spacing-xs)', fontFamily: 'var(--font-display)', color: 'var(--moss)', fontWeight: '700' }}>
            Welcome <em>back</em>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            Sign in to access your role-based dashboard.
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
            type="email" 
            label="Email Address" 
            placeholder="name@company.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            label="Password" 
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

        <div className={`fade-up ${mounted ? 'in-view' : ''}`} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--spacing-md)', transitionDelay: '250ms' }}>
          <Link to="/forgot-password" style={{ fontSize: '13px', color: 'var(--moss)', textDecoration: 'none', fontWeight: '500' }}>
            Forgot password?
          </Link>
        </div>

        <div className={`fade-up ${mounted ? 'in-view' : ''}`} style={{ transitionDelay: '300ms' }}>
          <Button type="submit" variant="primary" style={{ width: '100%', padding: '14px', fontSize: '16px', fontWeight: '600' }}>
            Sign In
          </Button>
        </div>

        <p 
          className={`fade-up ${mounted ? 'in-view' : ''}`} 
          style={{ 
            marginTop: 'var(--spacing-lg)', 
            textAlign: 'center', 
            fontSize: '14px', 
            color: 'var(--text-secondary)', 
            transitionDelay: '400ms' 
          }}
        >
          Don't have an account? <Link to="/register" style={{ color: 'var(--moss)', fontWeight: 600, textDecoration: 'none' }}>Create account</Link>
        </p>
      </form>

      {/* Demo Account Quick Logins */}
      <div 
        className={`fade-up ${mounted ? 'in-view' : ''}`} 
        style={{ 
          marginTop: 'var(--spacing-xl)', 
          borderTop: '1px solid var(--surface-border)', 
          paddingTop: 'var(--spacing-lg)',
          transitionDelay: '450ms'
        }}
      >
        <span className="eyebrow" style={{ display: 'block', textAlign: 'center', marginBottom: 'var(--spacing-md)', color: 'var(--text-muted)', fontSize: '11px', letterSpacing: '0.05em' }}>
          Quick Demo Logins
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--spacing-sm)' }}>
          {demoAccounts.map((account) => {
            const IconComponent = account.icon;
            return (
              <div 
                key={account.email}
                onClick={() => handleLogin(account.email, 'password')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-md)',
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--stone)',
                  border: '1px solid var(--surface-border)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out'
                }}
                className="table-row-hover"
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-full)',
                  background: account.bg,
                  color: account.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
                }}>
                  <IconComponent size={18} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>
                    {account.name}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {account.role}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
