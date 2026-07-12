import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMockDataStore from '../../../store/mockDataStore.js';
import useAuthStore from '../../../store/authStore.js';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import Select from '../../../common/ui/Select.jsx';
import Input from '../../../common/ui/Input.jsx';
import { Wrench } from 'lucide-react';

export const RaiseMaintenancePage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { assets, addMaintenance } = useMockDataStore();

  const userId = user?.id || '';

  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // Get assets allocated to the current user
  const myAssets = assets.filter(a => a.holderId === userId);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedAssetId || !description) {
      setError('Please select an asset and describe the issue.');
      return;
    }

    addMaintenance({
      assetId: selectedAssetId,
      userId: userId,
      description: description,
      status: 'SCHEDULED'
    });

    navigate('/maintenance');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <PageTitle title="Raise Maintenance Request" subtitle="Report issues, damage, or request routine diagnostic servicing on your assigned hardware." />

      <div className="liora-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--spacing-md)' }}>
          <Wrench size={20} style={{ color: 'var(--moss)' }} />
          <h3 style={{ fontSize: '1.25rem' }}>Repair Request Form</h3>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{ color: 'var(--danger)', background: 'var(--danger-light)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
              {error}
            </div>
          )}

          <Select
            label="Select Assigned Equipment"
            options={[
              { label: 'Choose asset...', value: '' },
              ...myAssets.map(a => ({ label: `${a.name} (${a.code})`, value: a.id }))
            ]}
            value={selectedAssetId}
            onChange={(e) => setSelectedAssetId(e.target.value)}
            required
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            <label className="eyebrow">Issue Details & Diagnostic Notes</label>
            <textarea
              style={{
                padding: '12px',
                borderRadius: 'var(--radius-input)',
                border: '1px solid var(--sage-light)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                outline: 'none',
                minHeight: '100px'
              }}
              placeholder="What seems to be the problem? (e.g. keyboard keys sticking, screen flicker...)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-sm" style={{ marginTop: 'var(--spacing-lg)' }}>
            <Button type="submit" variant="primary" style={{ flex: 1 }}>Submit Repair Request</Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/my-assets')}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RaiseMaintenancePage;
