import React from 'react';

export const StatCard = ({ title, value, change, icon: Icon, color = 'var(--primary)' }) => {
  return (
    <div className="glass-card flex items-center justify-between" style={{ padding: 'var(--spacing-lg)' }}>
      <div>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{title}</span>
        <h3 style={{ fontSize: '2rem', marginTop: 'var(--spacing-xs)', fontWeight: 700 }}>{value}</h3>
        {change && (
          <span style={{ fontSize: '0.75rem', color: change.startsWith('+') ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>
            {change} from last month
          </span>
        )}
      </div>
      <div 
        style={{ 
          width: '48px', 
          height: '48px', 
          borderRadius: 'var(--radius-md)', 
          background: `${color}1A`, 
          color: color 
        }}
        className="flex items-center justify-center"
      >
        <Icon size={24} />
      </div>
    </div>
  );
};

export default StatCard;
