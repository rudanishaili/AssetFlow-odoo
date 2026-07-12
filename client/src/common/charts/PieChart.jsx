import React from 'react';

export const PieChart = ({ title, data = [] }) => {
  return (
    <div className="glass-card" style={{ padding: 'var(--spacing-lg)' }}>
      {title && <h4 style={{ fontSize: '1.125rem', marginBottom: 'var(--spacing-lg)', fontWeight: 600 }}>{title}</h4>}
      <div className="flex items-center justify-around flex-responsive" style={{ height: '200px' }}>
        {/* Render a dynamic gradient pie simulation */}
        <div 
          style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: 'var(--radius-full)', 
            background: 'conic-gradient(var(--primary) 0% 40%, var(--secondary) 40% 70%, var(--success) 70% 100%)',
            boxShadow: 'var(--shadow-md)'
          }} 
        />
        <div className="flex flex-col gap-sm" style={{ alignSelf: 'center' }}>
          {data.map((d, idx) => {
            const colors = ['var(--primary)', 'var(--secondary)', 'var(--success)', 'var(--warning)'];
            return (
              <div key={idx} className="flex items-center gap-sm">
                <div style={{ width: '12px', height: '12px', borderRadius: 'var(--radius-sm)', background: colors[idx % colors.length] }} />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{d.label}: <strong>{d.value}%</strong></span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
