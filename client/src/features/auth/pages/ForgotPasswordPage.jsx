import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../common/ui/Input.jsx';
import Button from '../../../common/ui/Button.jsx';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: Verification Code, 3: Success
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide your email address.');
      return;
    }
    setError('');
    // Mock API call to send code
    setStep(2);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (!code || !newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    // Mock API call to reset
    setStep(3);
  };

  return (
    <div style={{ width: '100%', textAlign: 'left' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <h2 style={{ fontSize: '30px', marginBottom: 'var(--spacing-xs)' }}>
          Reset your <em>password</em>
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          {step === 1 && "Enter your email to receive a secure verification code."}
          {step === 2 && "Enter the verification code and set your new password."}
          {step === 3 && "Your password has been successfully reset."}
        </p>
      </div>

      {error && (
        <div style={{ 
          color: 'var(--danger)', 
          background: 'var(--danger-light)', 
          padding: '12px 16px', 
          borderRadius: 'var(--radius-sm)', 
          marginBottom: 'var(--spacing-md)', 
          fontSize: '14px' 
        }}>
          {error}
        </div>
      )}

      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <Input 
            type="email" 
            label="Email Address" 
            placeholder="jane@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" style={{ width: '100%', marginTop: 'var(--spacing-sm)' }}>
            Send verification code
          </Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleResetSubmit}>
          <Input 
            type="text" 
            label="Verification Code" 
            placeholder="123456" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <Input 
            type="password" 
            label="New Password" 
            placeholder="••••••••" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Input 
            type="password" 
            label="Confirm New Password" 
            placeholder="••••••••" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" style={{ width: '100%', marginTop: 'var(--spacing-sm)' }}>
            Reset password
          </Button>
        </form>
      )}

      {step === 3 && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            background: 'var(--success-light)', 
            color: 'var(--success)', 
            borderRadius: 'var(--radius-full)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto var(--spacing-lg) auto',
            fontSize: '28px' 
          }}>
            ✓
          </div>
          <p style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--text-primary)' }}>
            You can now sign back into your account.
          </p>
          <Link to="/login" style={{ display: 'block', width: '100%' }}>
            <Button variant="primary" style={{ width: '100%' }}>
              Back to Sign In
            </Button>
          </Link>
        </div>
      )}

      {step < 3 && (
        <p style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center', fontSize: '15px' }}>
          <Link to="/login" style={{ color: 'var(--moss)', fontWeight: 500, textDecoration: 'underline' }}>
            Back to Sign In
          </Link>
        </p>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
