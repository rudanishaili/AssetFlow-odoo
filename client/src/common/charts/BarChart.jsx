import React from 'react';

export default function BarChart({ 
  data = [
    { label: 'Hardware', value: 120 },
    { label: 'Software', value: 80 },
    { label: 'Licenses', value: 45 },
    { label: 'Furniture', value: 60 }
  ] 
}) {
  const containerStyle = {
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    boxShadow: 'var(--shadow-sm)',
    fontFamily: 'var(--font-sans)',
  };

  const titleStyle = {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
  };

  const maxVal = Math.max(...data.map(d => d.value), 1);

  return (
    <div style={containerStyle}>
      <h4 style={titleStyle}>Asset Categories</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {data.map((item, index) => {
          const widthPct = `${(item.value / maxVal) * 100}%`;
          return (
            <div key={index} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 40px', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{item.label}</span>
              <div style={{ height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: widthPct,
                  background: 'linear-gradient(90deg, var(--brand-primary), var(--brand-secondary))',
                  borderRadius: 'var(--radius-full)',
                  transition: 'width 1s ease-out'
                }} />
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', textAlign: 'right' }}>{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
