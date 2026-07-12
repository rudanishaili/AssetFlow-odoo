import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore.js';
import { useAssetStore } from '../../../store/assetStore.js';

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore(state => state.login);
  const employees = useAssetStore(state => state.employees);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (isSignup) {
      const newUser = { id: 'u' + (employees.length + 1), name, email, role: 'EMPLOYEE', status: 'ACTIVE' };
      useAssetStore.setState(state => ({
        employees: [...state.employees, newUser]
      }));
      login(newUser, 'mock-jwt-token');
      navigate('/dashboard');
    } else {
      const found = employees.find(emp => emp.email === email);
      if (found) {
        login(found, 'mock-jwt-token');
        navigate('/dashboard');
      } else {
        setError('Email not found. Try priya@assetflow.com or raj@assetflow.com');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ background: '#FFEBEE', color: 'var(--danger)', padding: '10px', borderRadius: '4px', fontSize: '13px', marginBottom: '16px' }}>{error}</div>}
      {isSignup && (
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input className="input" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
      )}
      <div className="form-group">
        <label className="form-label">Email Address</label>
        <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="priya@assetflow.com" />
      </div>
      <div className="form-group">
        <label className="form-label">Password</label>
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button className="btn btn-primary" type="submit" style={{ width: '100%', marginTop: '10px' }}>
        {isSignup ? 'Create Account': 'Sign In'}
      </button>
      <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px' }}>
        <span style={{ color: 'var(--text-muted)' }}>{isSignup ? 'Already have an account?' : "Don't have an account?"}</span>{' '}
        <button type="button" style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontWeight: '600', cursor: 'pointer' }} onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Sign In' : 'Register Employee'}
        </button>
      </p>
    </form>
  );
}