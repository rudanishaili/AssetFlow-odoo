import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Typography } from '../../../common/ui/Typography';
import { Input } from '../../../common/ui/Input';
import { Button } from '../../../common/ui/Button';
import { Card } from '../../../common/ui/Card';

export const SignupPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate signup
    localStorage.setItem('token', 'simulated_token');
    localStorage.setItem('role', 'employee'); // Default for now
    navigate('/dashboard');
  };

  return (
    <Card bg="cloud">
      <Typography variant="h2" style={{ marginBottom: '8px' }}>Join AssetFlow</Typography>
      <Typography variant="body" style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
        Create an account to request and manage your company assets.
      </Typography>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Input label="First Name" type="text" placeholder="Jane" required />
          <Input label="Last Name" type="text" placeholder="Doe" required />
        </div>
        
        <Input label="Work Email" type="email" placeholder="jane@company.com" required />
        <Input label="Password" type="password" placeholder="••••••••" required />

        <Button type="submit" fullWidth style={{ marginTop: '16px', marginBottom: '24px' }}>
          Create Account
        </Button>

        <Typography variant="body" style={{ textAlign: 'center', fontSize: '14px' }}>
          Already have an account?{' '}
          <Link to="/login" className="nav-link" style={{ color: 'var(--sage)' }}>Sign In</Link>
        </Typography>
      </form>
    </Card>
  );
};
