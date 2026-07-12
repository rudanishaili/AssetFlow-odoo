import React from 'react';

export default function PieChart({ 
  data = [
    { label: 'Available', value: 60, color: 'var(--status-success)' },
    { label: 'Allocated', value: 30, color: 'var(--brand-primary)' },
    { label: 'Maintenance', value: 10, color: 'var(--status-warning)' }
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

  // Basic calculation for circle donut slice offset
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  let accumulatedPct = 0;

  return (
    <div style={containerStyle}>
      <h4 style={titleStyle}>Status Distribution</h4>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: '16px' }}>
        <svg width="120" height="120" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--bg-tertiary)" strokeWidth="3" />
          {data.map((item, idx) => {
            const pct = (item.value / total) * 100;
            const strokeDasharray = `${pct} ${100 - pct}`;
            const strokeDashoffset = 100 - accumulatedPct;
            accumulatedPct += pct;
            return (
              <circle
                key={idx}
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke={item.color}
                strokeWidth="3"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
              />
            );
          })}
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {data.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: item.color }} />
              <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                {item.label} ({item.value}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
