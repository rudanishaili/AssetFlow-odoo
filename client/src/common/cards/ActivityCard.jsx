import React from 'react';
import { Clock } from 'lucide-react';

export const ActivityCard = ({ title, description, time }) => {
  return (
    <div className="flex items-start gap-md" style={{ padding: 'var(--spacing-md) 0', borderBottom: '1px solid var(--surface-border)' }}>
      <div 
        style={{ 
          width: '36px', 
          height: '36px', 
          borderRadius: 'var(--radius-full)', 
          background: 'var(--surface-hover)', 
          color: 'var(--primary)',
          flexShrink: 0
        }}
        className="flex items-center justify-center"
      >
        <Clock size={16} />
      </div>
      <div style={{ flex: 1 }}>
        <h5 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>{title}</h5>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{description}</p>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>{time}</span>
      </div>
    </div>
  );
};

export default ActivityCard;
