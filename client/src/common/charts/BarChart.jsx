import React from 'react';

export const BarChart = ({ title, data = [] }) => {
  // Pure HTML + CSS styled mockup charts for clean standalone Vite builds
  const maxVal = data.length ? Math.max(...data.map(d => d.value)) : 100;

  return (
    <div className="glass-card" style={{ padding: 'var(--spacing-lg)' }}>
      {title && <h4 style={{ fontSize: '1.125rem', marginBottom: 'var(--spacing-lg)', fontWeight: 600 }}>{title}</h4>}
      <div className="flex items-end justify-between" style={{ height: '200px', padding: '0 var(--spacing-md)' }}>
        {data.map((d, idx) => {
          const heightPct = maxVal > 0 ? (d.value / maxVal) * 100 : 0;
          return (
            <div key={idx} className="flex flex-col items-center gap-sm" style={{ flex: 1, height: '100%', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)' }}>{d.value}</span>
              <div 
                style={{ 
                  width: '70%', 
                  height: `${heightPct}%`, 
                  borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                  background: 'linear-gradient(to top, var(--primary) 0%, var(--accent) 100%)',
                  transition: 'height 1s ease-out'
                }} 
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{d.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarChart;
