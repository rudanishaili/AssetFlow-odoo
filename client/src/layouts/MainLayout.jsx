import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../common/components/Navigation';

/**
 * Liora Main Layout
 * The core layout for authenticated pages with the 1240px constraint and Navigation.
 */
export const MainLayout = () => {
  return (
    <div style={{ backgroundColor: 'var(--linen)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation />
      
      <main 
        className="fade-up in-view"
        style={{
          flex: 1,
          width: '100%',
          maxWidth: '1240px',
          margin: '0 auto',
          padding: 'var(--space-section-mobile) clamp(20px, 5vw, 64px)'
        }}
      >
        <Outlet />
      </main>
      
      <footer style={{ padding: '64px clamp(20px, 5vw, 64px)', backgroundColor: 'var(--moss)', color: 'var(--stone)', textAlign: 'center', marginTop: 'auto' }}>
        <p className="text-body" style={{ color: 'var(--stone)' }}>&copy; {new Date().getFullYear()} AssetFlow. All rights reserved.</p>
      </footer>
    </div>
  );
};
