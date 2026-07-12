import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '../../../common/ui/Typography';
import { Input } from '../../../common/ui/Input';
import { Button } from '../../../common/ui/Button';
import { Card } from '../../../common/ui/Card';

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    localStorage.setItem('token', 'simulated_token');
    navigate('/dashboard');
  };

  return (
    <Card bg="cloud">
      <Typography variant="h2" style={{ marginBottom: '8px' }}>Welcome back</Typography>
      <Typography variant="body" style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
        Sign in to manage your company's assets.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Input 
          label="Work Email" 
          type="email" 
          placeholder="you@company.com" 
          required 
        />
        
        <Input 
          label="Password" 
          type="password" 
          placeholder="••••••••" 
          required 
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="checkbox" style={{ accentColor: 'var(--sage)' }} />
            <span className="text-body" style={{ fontSize: '14px' }}>Remember me</span>
          </label>
          <a href="#" className="nav-link" style={{ fontSize: '14px', color: 'var(--sage)' }}>Forgot password?</a>
        </div>

        <Button type="submit" fullWidth>
          Sign In
        </Button>
      </form>
    </Card>
  );
};
