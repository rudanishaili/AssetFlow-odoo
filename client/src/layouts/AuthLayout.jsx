import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

export const AuthLayout = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: 'var(--linen)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: 'var(--spacing-md)'
      }}
    >
      {/* 3D Background Decorative Floating Orbs */}
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>

      {/* Split Screen Container */}
      <div 
        className={`fade-up ${mounted ? 'in-view' : ''}`}
        style={{ 
          maxWidth: '1080px', 
          width: '100%', 
          minHeight: '620px',
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-soft)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          overflow: 'hidden',
          zIndex: 1,
          position: 'relative'
        }}
      >
        {/* Form Column */}
        <div 
          style={{ 
            padding: 'var(--spacing-xl) var(--spacing-lg)',
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div style={{ maxWidth: '420px', width: '100%' }}>
            <Link to="/" style={{ display: 'inline-block', marginBottom: 'var(--spacing-md)', textDecoration: 'none' }}>
              <h1 style={{ fontSize: '32px', color: 'var(--moss)', fontWeight: '800', fontFamily: 'var(--font-display)' }}>
                Asset<em>Flow</em>
              </h1>
            </Link>
            
            <div style={{ width: '100%' }}>
              <Outlet />
            </div>
          </div>
        </div>

        {/* 3D Showcase Art Column */}
        <div 
          style={{ 
            position: 'relative',
            background: 'var(--stone)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 'var(--spacing-xl)',
            borderLeft: '1px solid var(--surface-border)'
          }}
        >
          {/* AI Generated 3D Composition Background */}
          <img 
            src="/abstract_3d_bg.png" 
            alt="3D Composition"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
              opacity: 0.95
            }}
          />
          {/* Dark Overlay for Text Readability */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to top, rgba(43,42,37,0.7) 10%, rgba(43,42,37,0.1) 80%)',
              zIndex: 1
            }}
          ></div>

          {/* Editorial Overlay Text */}
          <div style={{ position: 'relative', zIndex: 2, color: 'var(--linen)' }}>
            <h2 style={{ color: '#FFFFFF', fontSize: '34px', fontFamily: 'var(--font-display)', marginBottom: 'var(--spacing-xs)', lineHeight: '1.2' }}>
              Smart Enterprise <em>Equipment</em> Registry
            </h2>
            <p style={{ color: 'rgba(248,245,239,0.85)', fontSize: '15px', lineHeight: '1.5' }}>
              Seamlessly monitor physical inventories, handle allocation checkout workflows, request transfers, and plan bookings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
