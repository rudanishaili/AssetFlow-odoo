import React from 'react';

export const LineChart = ({ title, data = [] }) => {
  return (
    <div className="glass-card" style={{ padding: 'var(--spacing-lg)' }}>
      {title && <h4 style={{ fontSize: '1.125rem', marginBottom: 'var(--spacing-lg)', fontWeight: 600 }}>{title}</h4>}
      {/* Mockup Line Graph with visual waves */}
      <div 
        style={{ 
          height: '200px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <svg viewBox="0 0 400 150" style={{ width: '100%', height: '100%' }}>
          <path 
            d="M0,80 Q50,40 100,90 T200,60 T300,100 T400,30" 
            fill="none" 
            stroke="var(--primary)" 
            strokeWidth="3" 
          />
          <path 
            d="M0,80 Q50,40 100,90 T200,60 T300,100 T400,30 L400,150 L0,150 Z" 
            fill="url(#grad)" 
            opacity="0.15" 
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="flex justify-between" style={{ marginTop: 'var(--spacing-sm)', padding: '0 var(--spacing-sm)' }}>
        {data.map((d, idx) => (
          <span key={idx} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{d.label}</span>
        ))}
      </div>
    </div>
  );
};

export default LineChart;
