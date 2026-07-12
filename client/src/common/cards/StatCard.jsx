import React from 'react';

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType = 'increase' 
}) {
  const cardStyle = {
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: 'var(--shadow-sm)',
    fontFamily: 'var(--font-sans)',
  };

  const titleStyle = {
    fontSize: '0.875rem',
    color: 'var(--text-secondary)',
    fontWeight: 500,
    marginBottom: '8px',
  };

  const valueStyle = {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    letterSpacing: '-0.02em',
  };

  const iconContainerStyle = {
    width: '48px',
    height: '48px',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--brand-primary)',
  };

  const changeStyle = {
    fontSize: '0.75rem',
    fontWeight: 600,
    marginTop: '6px',
    color: changeType === 'increase' ? 'var(--status-success)' : 'var(--status-error)',
  };

  return (
    <div style={cardStyle} className="stat-card">
      <div>
        <h4 style={titleStyle}>{title}</h4>
        <span style={valueStyle}>{value}</span>
        {change && (
          <div style={changeStyle}>
            {changeType === 'increase' ? '+' : ''}{change} from last month
          </div>
        )}
      </div>
      {Icon && (
        <div style={iconContainerStyle}>
          <Icon size={24} />
        </div>
      )}
    </div>
  );
}
