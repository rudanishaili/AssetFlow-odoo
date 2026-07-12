import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import useMockDataStore from '../../../store/mockDataStore.js';
import useAuthStore from '../../../store/authStore.js';

export const AllocationListPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [filter, setFilter] = useState('all');

  const { allocations, returnAsset } = useMockDataStore();
  
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [selectedAlloc, setSelectedAlloc] = useState(null);

  const filteredAllocations = allocations.filter(a => {
    if (filter === 'active') return a.status === 'ACTIVE';
    if (filter === 'returned') return a.status === 'RETURNED';
    return true; // all
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return { background: 'var(--success-light)', color: 'var(--success)' };
      case 'RETURNED': return { background: 'var(--stone)', color: 'var(--text-secondary)' };
      default: return { background: 'var(--warning-light)', color: 'var(--warning)' };
    }
  };

  const handleCheckInClick = (alloc) => {
    setSelectedAlloc(alloc);
    setShowCheckInModal(true);
  };

  const confirmCheckIn = () => {
    if (selectedAlloc) {
      returnAsset(selectedAlloc.assetId, user?.id || 'manager-id');
    }
    setShowCheckInModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <PageTitle title="Asset Checkout Assignments" subtitle="Monitor current equipment assignments, checkouts, and historical return logs." />
        <Button variant="primary" onClick={() => navigate('/allocations/checkout')}>New Allocation</Button>
      </div>

      {/* Filters */}
      <div className="liora-card" style={{ padding: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
        <div className="flex gap-md items-center">
          <span className="eyebrow" style={{ minWidth: '80px' }}>Filter:</span>
          {['all', 'active', 'returned'].map(opt => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '14px',
                fontWeight: 600,
                background: filter === opt ? 'var(--sage)' : 'transparent',
                color: filter === opt ? 'var(--cloud)' : 'var(--text-secondary)',
                border: filter === opt ? 'none' : '1px solid var(--sage-light)',
                cursor: 'pointer',
                transition: 'background var(--transition-fast)',
                textTransform: 'capitalize'
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Allocation Records */}
      <div className="liora-card">
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Asset Name</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Assignee</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Allocated By</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Checkout Date</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Return Date</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Status</th>
              <th style={{ padding: '12px 8px', textAlign: 'right' }} className="eyebrow">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAllocations.map(alloc => (
              <tr key={alloc.id} style={{ borderBottom: '1px solid var(--linen)' }} className="table-row-hover">
                <td style={{ padding: '16px 8px', fontWeight: 600 }}>{alloc.assetName}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-primary)' }}>{alloc.userName}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{alloc.allocatedBy}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-muted)' }}>
                  {new Date(alloc.allocatedAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '16px 8px', color: 'var(--text-muted)' }}>
                  {alloc.returnedAt ? new Date(alloc.returnedAt).toLocaleDateString() : '—'}
                </td>
                <td style={{ padding: '16px 8px' }}>
                  <span className="eyebrow" style={{ 
                    fontSize: '11px', 
                    padding: '4px 8px', 
                    borderRadius: 'var(--radius-sm)',
                    ...getStatusColor(alloc.status)
                  }}>
                    {alloc.status}
                  </span>
                </td>
                <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                  {alloc.status === 'ACTIVE' && (
                    <Button variant="outline" size="sm" onClick={() => handleCheckInClick(alloc)}>Check In</Button>
                  )}
                </td>
              </tr>
            ))}
            {filteredAllocations.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>No allocations recorded.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Check In Confirmation Modal */}
      {showCheckInModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(43,42,37,0.5)', display: 'flex', alignItems: 'center', justifycontent: 'center', zIndex: 1000 }}>
          <div className="liora-card" style={{ maxWidth: '400px', width: '90%', textAlign: 'center', position: 'relative', margin: 'auto' }}>
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Confirm Check In</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
              Are you sure you want to log <strong>{selectedAlloc?.assetName}</strong> as returned by <strong>{selectedAlloc?.userName}</strong>?
            </p>

            <div className="flex gap-sm">
              <Button variant="primary" style={{ flex: 1 }} onClick={confirmCheckIn}>Confirm Return</Button>
              <Button variant="secondary" onClick={() => setShowCheckInModal(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllocationListPage;
