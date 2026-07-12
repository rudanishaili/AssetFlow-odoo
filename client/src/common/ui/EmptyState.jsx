import React from 'react';
import { Archive } from 'lucide-react';

export const EmptyState = ({ title = 'No records found', message = 'Create a new item to get started.' }) => {
  return (
    <div 
      className="glass-card" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-2xl)',
        textAlign: 'center',
        gap: 'var(--spacing-md)'
      }}
    >
      <div 
        style={{ 
          width: '60px', 
          height: '60px', 
          borderRadius: 'var(--radius-full)', 
          background: 'var(--surface-hover)', 
          color: 'var(--text-muted)'
        }}
        className="flex items-center justify-center"
      >
        <Archive size={28} />
      </div>
      <div>
        <h4 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-xs)' }}>{title}</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{message}</p>
      </div>
    </div>
  );
};

export default EmptyState;
