import React from 'react';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--background)' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '32px', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '8px', boxShadow: 'var(--shadow)' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '28px', letterSpacing: '0.5px' }}>AssetFlow</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>Enterprise Asset & Resource Management</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;