import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMockDataStore from '../../../store/mockDataStore.js';
import useAuthStore from '../../../store/authStore.js';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import Select from '../../../common/ui/Select.jsx';
import { Undo2 } from 'lucide-react';

export const ReturnAssetPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { assets, requestReturn, allocations } = useMockDataStore();

  const userId = user?.id || '';

  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  // Get assets allocated to the current user that are ACTIVE
  const myAssets = assets.filter(a => a.holderId === userId);
  // Only allow returning items that are not already pending return
  const returnableAssets = myAssets.filter(asset => {
    const alloc = allocations.find(al => al.assetId === asset.id && al.status === 'ACTIVE');
    return !!alloc;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedAssetId) {
      setError('Please select an asset to return.');
      return;
    }

    if (!agreed) {
      setError('You must confirm property handover condition requirements.');
      return;
    }

    requestReturn(selectedAssetId, userId);
    navigate('/my-assets');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <PageTitle title="Return Corporate Asset" subtitle="Initiate return workflow procedures to check in your assigned equipment back to inventory." />

      <div className="liora-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--spacing-md)' }}>
          <Undo2 size={20} style={{ color: 'var(--moss)' }} />
          <h3 style={{ fontSize: '1.25rem' }}>Asset Return Submission</h3>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{ color: 'var(--danger)', background: 'var(--danger-light)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
              {error}
            </div>
          )}

          <Select
            label="Select Asset to Return"
            options={[
              { label: 'Choose asset...', value: '' },
              ...returnableAssets.map(a => ({ label: `${a.name} (${a.code})`, value: a.id }))
            ]}
            value={selectedAssetId}
            onChange={(e) => setSelectedAssetId(e.target.value)}
            required
          />

          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', margin: 'var(--spacing-md) 0' }}>
            <input 
              type="checkbox" 
              id="return-terms" 
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{ marginTop: '4px', cursor: 'pointer' }}
            />
            <label htmlFor="return-terms" style={{ fontSize: '14px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              I confirm that the asset is in clean, working condition, with all chargers, cables, and packaging ready for handover.
            </label>
          </div>

          <div className="flex gap-sm" style={{ marginTop: 'var(--spacing-lg)' }}>
            <Button type="submit" variant="primary" style={{ flex: 1 }}>Submit Return Request</Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/my-assets')}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReturnAssetPage;
