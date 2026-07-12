import React from 'react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Laptop } from 'lucide-react';

export default function AssetCard({ 
  asset = {
    name: 'MacBook Pro 16"',
    serialNumber: 'SN-9872349',
    category: 'Hardware',
    status: 'allocated',
  },
  onViewDetails 
}) {
  const cardStyle = {
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-lg)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    boxShadow: 'var(--shadow-sm)',
    transition: 'var(--transition-all)',
    fontFamily: 'var(--font-sans)',
  };

  const imagePlaceholderStyle = {
    height: '140px',
    backgroundColor: 'var(--bg-tertiary)',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-tertiary)',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  };

  const titleStyle = {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
  };

  const detailStyle = {
    fontSize: '0.825rem',
    color: 'var(--text-secondary)',
  };

  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'available': return 'success';
      case 'allocated': return 'info';
      case 'maintenance': return 'warning';
      case 'retired': return 'danger';
      default: return 'neutral';
    }
  };

  return (
    <div style={cardStyle} className="asset-card">
      <div style={imagePlaceholderStyle}>
        <Laptop size={40} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={headerStyle}>
          <h4 style={titleStyle}>{asset.name}</h4>
          <Badge variant={getStatusVariant(asset.status)}>{asset.status}</Badge>
        </div>
        <p style={detailStyle}>Serial: {asset.serialNumber}</p>
        <p style={{ ...detailStyle, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Category: {asset.category}
        </p>
      </div>
      {onViewDetails && (
        <Button variant="outline" size="sm" onClick={() => onViewDetails(asset)}>
          View Details
        </Button>
      )}
    </div>
  );
}
