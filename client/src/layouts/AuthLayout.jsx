import React from 'react';
import { Outlet } from 'react-router-dom';
import { Typography } from '../common/ui/Typography';

/**
 * Liora Auth Layout
 * A serene, split-screen layout for authentication pages.
 */
export const AuthLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--linen)' }}>
      {/* Left side: Form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(20px, 5vw, 64px)' }}>
        <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto' }} className="fade-up in-view">
          <Typography variant="h3" style={{ marginBottom: '40px', fontStyle: 'italic', color: 'var(--sage)' }}>Liora.</Typography>
          <Outlet />
        </div>
      </div>
      
      {/* Right side: Image / Brand (hidden on mobile) */}
      <div 
        className="reveal-image in-view auth-right-panel"
        style={{ 
          flex: 1, 
          backgroundColor: 'var(--stone)', 
          backgroundImage: 'url("https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80")', // Example interior image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'none' // Hidden by default, shown via CSS on tablet+
        }}
      >
      </div>
    </div>
  );
};
