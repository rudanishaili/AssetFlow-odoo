import React from 'react';

export default function LineChart({ 
  data = [10, 15, 8, 22, 18, 30, 25] 
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

  // Convert array to SVG path string
  const width = 200;
  const height = 60;
  const maxVal = Math.max(...data, 1);
  const minVal = Math.min(...data, 0);
  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - ((val - minVal) / (maxVal - minVal)) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div style={containerStyle}>
      <h4 style={titleStyle}>Activity Trend</h4>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '80px' }}>
          <polyline
            fill="none"
            stroke="var(--brand-secondary)"
            strokeWidth="3"
            points={points}
          />
        </svg>
      </div>
    </div>
  );
}
