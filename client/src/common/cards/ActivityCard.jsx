import React from 'react';
import { Calendar } from 'lucide-react';

export default function ActivityCard({ 
  activity = {
    description: 'Asset assigned to User',
    time: '2 hours ago',
    actor: 'System Admin',
  } 
}) {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    borderBottom: '1px solid var(--border-color)',
    fontFamily: 'var(--font-sans)',
  };

  const circleStyle = {
    width: '40px',
    height: '40px',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'var(--bg-tertiary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-secondary)',
    flexShrink: 0,
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  };

  return (
    <div style={containerStyle}>
      <div style={circleStyle}>
        <Calendar size={18} />
      </div>
      <div style={contentStyle}>
        <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
          {activity.description}
        </p>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
          {activity.time} &bull; by {activity.actor}
        </span>
      </div>
    </div>
  );
}
