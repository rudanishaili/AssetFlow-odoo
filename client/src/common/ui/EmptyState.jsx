import React from 'react';
import { PackageOpen } from 'lucide-react';
import Button from './Button';

export default function EmptyState({ 
  title = 'No records found', 
  description = 'Try adjusting your filters or create a new entry to get started.', 
  actionLabel, 
  onActionClick, 
  icon: Icon = PackageOpen 
}) {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '48px 24px',
    border: '1px dashed var(--border-color)',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'var(--bg-secondary)',
    maxWidth: '500px',
    margin: '24px auto',
    fontFamily: 'var(--font-sans)',
  };

  const iconStyle = {
    color: 'var(--text-tertiary)',
    marginBottom: '16px',
  };

  const titleStyle = {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '8px',
  };

  const descStyle = {
    fontSize: '0.875rem',
    color: 'var(--text-secondary)',
    marginBottom: '20px',
    lineHeight: 1.4,
  };

  return (
    <div style={containerStyle}>
      <Icon size={48} style={iconStyle} />
      <h3 style={titleStyle}>{title}</h3>
      <p style={descStyle}>{description}</p>
      {actionLabel && onActionClick && (
        <Button variant="primary" onClick={onActionClick}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
