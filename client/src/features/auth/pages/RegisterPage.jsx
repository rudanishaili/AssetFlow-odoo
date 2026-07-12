import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../../common/ui/Input.jsx';
import Select from '../../../common/ui/Select.jsx';
import Button from '../../../common/ui/Button.jsx';
import useAuthStore from '../../../store/authStore.js';
import useMockDataStore from '../../../store/mockDataStore.js';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  // Get departments from mock store
  const departments = useMockDataStore((state) => state.departments);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('EMPLOYEE');
  const [department, setDepartment] = useState('Creative Design');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !role || !department) {
      setError('Please fill in all fields.');
      return;
    }

    // Add user to mock database store
    const newId = `user-${Date.now()}`;
    const newMockUser = {
      id: newId,
      email: email,
      name: name,
      role: role,
      department: department
    };

    // Push into the store's employees array
    useMockDataStore.setState((state) => ({
      employees: [...state.employees, newMockUser]
    }));

    // Log user in
    const mockToken = `mock-token-${role}-${Date.now()}`;
    setAuth(newMockUser, mockToken);
    
    // Log system activity
    useMockDataStore.getState().addActivityLog(newId, name, 'REGISTER', `Registered new account as ${role}`);

    navigate('/dashboard');
  };

  const roleOptions = [
    { label: 'Employee', value: 'EMPLOYEE' },
    { label: 'Asset Manager', value: 'MANAGER' },
    { label: 'Department Head', value: 'AUDITOR' }
  ];

  const departmentOptions = departments.map(d => ({ label: d.name, value: d.name }));

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'left' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <h2 style={{ fontSize: '32px', marginBottom: 'var(--spacing-xs)', fontFamily: 'var(--font-display)', color: 'var(--moss)', fontWeight: '700' }}>
          Create an <em>account</em>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          Join AssetFlow and configure your enterprise role dashboard.
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
          label="Full Name"
          placeholder="Jane Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: '14px',
            borderRadius: 'var(--radius-input)',
            border: '1px solid var(--sage-light)'
          }}
        />
      </div>

      <div className={`fade-up ${mounted ? 'in-view' : ''}`} style={{ transitionDelay: '150ms' }}>
        <Input
          type="email"
          label="Email Address"
          placeholder="jane@company.com"
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

      <div className={`fade-up ${mounted ? 'in-view' : ''}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', transitionDelay: '250ms' }}>
        <Select
          label="Assign Role"
          options={roleOptions}
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            padding: '14px',
            borderRadius: 'var(--radius-input)',
            border: '1px solid var(--sage-light)'
          }}
        />
        <Select
          label="Department"
          options={departmentOptions}
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={{
            padding: '14px',
            borderRadius: 'var(--radius-input)',
            border: '1px solid var(--sage-light)'
          }}
        />
      </div>

      <div className={`fade-up ${mounted ? 'in-view' : ''}`} style={{ transitionDelay: '300ms' }}>
        <Button type="submit" variant="primary" style={{ width: '100%', padding: '14px', fontSize: '16px', fontWeight: '600', marginTop: 'var(--spacing-md)' }}>
          Register Account
        </Button>
      </div>

      <p
        className={`fade-up ${mounted ? 'in-view' : ''}`}
        style={{
          marginTop: 'var(--spacing-lg)',
          textAlign: 'center',
          fontSize: '14px',
          color: 'var(--text-secondary)',
          transitionDelay: '350ms'
        }}
      >
        Already have an account? <Link to="/login" style={{ color: 'var(--moss)', fontWeight: 600, textDecoration: 'none' }}>Sign in here</Link>
      </p>
    </form>
  );
};

export default RegisterPage;
