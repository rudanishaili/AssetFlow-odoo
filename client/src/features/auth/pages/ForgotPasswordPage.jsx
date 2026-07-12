import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '../../../common/ui/Typography';
import { Input } from '../../../common/ui/Input';
import { Button } from '../../../common/ui/Button';
import { Card } from '../../../common/ui/Card';
import { Icon } from '../../../common/ui/Icon';

export const ForgotPasswordPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Card bg="cloud">
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--sage-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Icon name="Mail" size={32} color="var(--moss)" />
          </div>
          <Typography variant="h2" style={{ marginBottom: '8px' }}>Check your email</Typography>
          <Typography variant="body" style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            We've sent password reset instructions to your email address.
          </Typography>
          <Link to="/login">
            <Button variant="secondary" fullWidth>Back to Sign In</Button>
          </Link>
        </div>
      ) : (
        <>
          <Typography variant="h2" style={{ marginBottom: '8px' }}>Reset Password</Typography>
          <Typography variant="body" style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Enter your email address and we'll send you instructions to reset your password.
          </Typography>

          <form onSubmit={handleSubmit}>
            <Input label="Work Email" type="email" placeholder="you@company.com" required />

            <Button type="submit" fullWidth style={{ marginTop: '16px', marginBottom: '24px' }}>
              Send Reset Link
            </Button>

            <Typography variant="body" style={{ textAlign: 'center', fontSize: '14px' }}>
              <Link to="/login" className="nav-link" style={{ color: 'var(--sage)' }}>&larr; Back to Sign In</Link>
            </Typography>
          </form>
        </>
      )}
    </Card>
  );
};
