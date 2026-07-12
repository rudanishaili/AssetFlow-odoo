import React from 'react';
import Badge from '../ui/Badge.jsx';

export const AssetCard = ({ asset }) => {
  const getBadgeStatus = (status) => {
    switch(status) {
      case 'AVAILABLE': return 'success';
      case 'ALLOCATED': return 'info';
      case 'MAINTENANCE': return 'warning';
      default: return 'default';
    }
  };

  return (
    <div className="glass-card flex flex-col justify-between" style={{ height: '220px' }}>
      <div>
        <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{asset.code}</span>
          <Badge status={getBadgeStatus(asset.status)}>{asset.status}</Badge>
        </div>
        <h4 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-xs)' }}>{asset.name}</h4>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{asset.category}</span>
      </div>

      <div className="flex justify-between items-center" style={{ borderTop: '1px solid var(--surface-border)', paddingTop: 'var(--spacing-sm)', marginTop: 'var(--spacing-md)' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Purchase Value</span>
        <span style={{ fontWeight: 700, color: 'var(--primary)' }}></span>
      </div>
    </div>
  );
};

export default AssetCard;
