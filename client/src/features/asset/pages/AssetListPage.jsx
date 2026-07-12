import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import Input from '../../../common/ui/Input.jsx';
import Select from '../../../common/ui/Select.jsx';
import useMockDataStore from '../../../store/mockDataStore.js';

export const AssetListPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const { assets } = useMockDataStore();

  const stats = [
    { title: 'Total Assets', count: assets.length },
    { title: 'Allocated', count: assets.filter(a => a.status === 'ALLOCATED').length },
    { title: 'Available', count: assets.filter(a => a.status === 'AVAILABLE').length },
    { title: 'Maintenance', count: assets.filter(a => a.status === 'MAINTENANCE').length }
  ];

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(search.toLowerCase()) || 
                          (asset.serial && asset.serial.toLowerCase().includes(search.toLowerCase())) || 
                          (asset.holderName && asset.holderName.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || asset.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'allocated': return { background: 'var(--success-light)', color: 'var(--success)' };
      case 'available': return { background: 'var(--sage-light)', color: 'var(--moss)' };
      case 'reserved': return { background: 'var(--warning-light)', color: 'var(--warning)' };
      case 'maintenance': return { background: 'var(--danger-light)', color: 'var(--danger)' };
      default: return { background: 'var(--stone)', color: 'var(--text-secondary)' };
    }
  };

  const handleQRClick = (asset, e) => {
    e.stopPropagation();
    setSelectedAsset(asset);
    setShowQRModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <PageTitle title="Asset Directory" subtitle="Search and manage physical devices, server licenses, and office accessories." />
        <Button variant="primary" onClick={() => navigate('/assets/new')}>Register Asset</Button>
      </div>

      {/* Stats Ribbon */}
      <div className="grid grid-cols-4 gap-lg" style={{ marginBottom: 'var(--spacing-xl)' }}>
        {stats.map((s, idx) => (
          <div key={idx} className="liora-card-stone" style={{ padding: 'var(--spacing-md) var(--spacing-lg)' }}>
            <span className="eyebrow" style={{ fontSize: '11px' }}>{s.title}</span>
            <h3 style={{ fontSize: '28px', marginTop: '4px' }}>{s.count}</h3>
          </div>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="liora-card" style={{ padding: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
        <div className="flex gap-md items-center flex-responsive">
          <div style={{ flex: 2 }}>
            <Input 
              type="text" 
              placeholder="Search by name, serial number, or employee..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ marginBottom: 0 }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Select 
              options={[
                { label: 'All Statuses', value: 'all' },
                { label: 'Allocated', value: 'allocated' },
                { label: 'Available', value: 'available' },
                { label: 'Reserved', value: 'reserved' },
                { label: 'Maintenance', value: 'maintenance' }
              ]}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ marginBottom: 0 }}
            />
          </div>
        </div>
      </div>

      {/* Assets Table */}
      <div className="liora-card" style={{ padding: 'var(--spacing-md)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Name</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Asset Code</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Category</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Location</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Status</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Current Holder</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map(asset => (
              <tr 
                key={asset.id} 
                onClick={() => navigate(`/assets/${asset.id}`)}
                style={{ borderBottom: '1px solid var(--linen)', cursor: 'pointer' }}
                className="table-row-hover"
              >
                <td style={{ padding: '16px 8px', fontWeight: 600 }}>{asset.name}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{asset.code}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{asset.category}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-muted)' }}>{asset.location}</td>
                <td style={{ padding: '16px 8px' }}>
                  <span className="eyebrow" style={{ 
                    fontSize: '11px', 
                    padding: '4px 8px', 
                    borderRadius: 'var(--radius-sm)',
                    ...getStatusColor(asset.status)
                  }}>
                    {asset.status}
                  </span>
                </td>
                <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{asset.holderName || 'None'}</td>
                <td style={{ padding: '16px 8px' }} onClick={(e) => e.stopPropagation()}>
                  <Button variant="outline" size="sm" onClick={(e) => handleQRClick(asset, e)}>Print QR</Button>
                </td>
              </tr>
            ))}
            {filteredAssets.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>No assets match search filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* QR Label Modal */}
      {showQRModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(43,42,37,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="liora-card" style={{ maxWidth: '360px', width: '90%', textAlign: 'center', position: 'relative' }}>
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Asset QR Label</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xl)', fontSize: '14px' }}>
              Attach this tag to the hardware casing for swift audits.
            </p>

            <div style={{ padding: 'var(--spacing-md)', border: '1px solid var(--sage-light)', borderRadius: 'var(--radius-md)', background: 'var(--linen)', marginBottom: 'var(--spacing-lg)' }}>
              <div style={{ width: '120px', height: '120px', background: '#000', margin: '0 auto var(--spacing-sm) auto' }} />
              <h4 style={{ fontSize: '16px', fontWeight: 600 }}>{selectedAsset?.name}</h4>
              <span className="eyebrow" style={{ fontSize: '10px' }}>Ref Code: {selectedAsset?.code}</span>
            </div>

            <div className="flex gap-sm">
              <Button variant="primary" style={{ flex: 1 }} onClick={() => window.print()}>Print Tag</Button>
              <Button variant="secondary" onClick={() => setShowQRModal(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetListPage;
