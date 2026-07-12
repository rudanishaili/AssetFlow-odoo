import React from 'react';
import { useNavigate } from 'react-router-dom';
import useMockDataStore from '../../../store/mockDataStore.js';
import useAuthStore from '../../../store/authStore.js';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import { Package, ArrowLeftRight, Undo2, Wrench } from 'lucide-react';

export const MyAssetsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { assets, requestReturn } = useMockDataStore();

  const userId = user?.id || '';

  // Get assets allocated to the current user
  const myCheckedOut = assets.filter(a => a.holderId === userId);

  const handleReturnRequest = (assetId) => {
    requestReturn(assetId, userId);
  };

  return (
    <div>
      <PageTitle title="My Allocated Assets" subtitle="Manage and review the corporate devices and software licenses assigned to you." />

      <div className="grid grid-cols-2 gap-lg" style={{ marginBottom: 'var(--spacing-xl)' }}>
        {myCheckedOut.map(asset => (
          <div key={asset.id} className="liora-card">
            <div className="flex justify-between items-start" style={{ marginBottom: 'var(--spacing-md)' }}>
              <div>
                <span className="eyebrow" style={{ fontSize: '10px' }}>{asset.category}</span>
                <h3 style={{ fontSize: '20px', marginTop: '4px', fontFamily: 'var(--font-display)', color: 'var(--moss)' }}>{asset.name}</h3>
              </div>
              <span className="eyebrow" style={{ 
                fontSize: '10px', 
                background: 'var(--success-light)', 
                color: 'var(--success)', 
                padding: '3px 8px', 
                borderRadius: 'var(--radius-sm)' 
              }}>
                {asset.status}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
              <div><strong>Asset Tag:</strong> {asset.code}</div>
              <div><strong>Serial Number:</strong> {asset.serial || '—'}</div>
              <div><strong>Location:</strong> {asset.location || 'San Francisco HQ'}</div>
              <div><strong>Acquisition Value:</strong> ${asset.value.toLocaleString()}</div>
            </div>

            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--linen)', paddingTop: 'var(--spacing-md)' }}>
              <Button variant="outline" size="sm" style={{ flex: 1 }} onClick={() => navigate(`/assets/${asset.id}`)}>
                Details
              </Button>
              <Button variant="secondary" size="sm" onClick={() => navigate('/raise-maintenance')}>
                <Wrench size={12} style={{ marginRight: '4px' }} /> Repair
              </Button>
              <Button variant="secondary" size="sm" onClick={() => navigate('/employee-transfer')}>
                <ArrowLeftRight size={12} style={{ marginRight: '4px' }} /> Transfer
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleReturnRequest(asset.id)}>
                <Undo2 size={12} style={{ marginRight: '4px' }} /> Return
              </Button>
            </div>
          </div>
        ))}

        {myCheckedOut.length === 0 && (
          <div className="liora-card" style={{ gridColumn: 'span 2', textAlign: 'center', padding: 'var(--spacing-2xl) 0' }}>
            <Package size={48} style={{ color: 'var(--text-muted)', margin: '0 auto var(--spacing-md) auto' }} />
            <h4 style={{ fontSize: '18px', fontWeight: 600 }}>No assets assigned to you</h4>
            <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
              If you require hardware allocations or software licenses, please contact your department manager.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAssetsPage;
