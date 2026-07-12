import React from 'react';
import useMockDataStore from '../../../store/mockDataStore.js';
import useAuthStore from '../../../store/authStore.js';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import { Undo2, Check } from 'lucide-react';

export const ReturnApprovalPage = () => {
  const { user } = useAuthStore();
  const { allocations, approveReturn } = useMockDataStore();

  const pendingReturns = allocations.filter(a => a.status === 'PENDING_RETURN');

  const handleApprove = (assetId) => {
    approveReturn(assetId, user?.id || 'manager-id');
  };

  return (
    <div>
      <PageTitle title="Return Approvals" subtitle="Review employee equipment return submissions and update inventory states." />

      <div className="liora-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--spacing-md)' }}>
          <Undo2 size={20} style={{ color: 'var(--moss)' }} />
          <h3 style={{ fontSize: '1.25rem' }}>Pending Return Requests</h3>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Asset Name</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Returned By</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Checkout Date</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Status</th>
              <th style={{ padding: '12px 8px', textAlign: 'right' }} className="eyebrow">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingReturns.map(alloc => (
              <tr key={alloc.id} style={{ borderBottom: '1px solid var(--linen)' }} className="table-row-hover">
                <td style={{ padding: '16px 8px', fontWeight: 600 }}>{alloc.assetName}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-primary)' }}>{alloc.userName}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-muted)' }}>
                  {new Date(alloc.allocatedAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '16px 8px' }}>
                  <span className="eyebrow" style={{ 
                    fontSize: '10px', 
                    padding: '3px 8px', 
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--warning-light)',
                    color: 'var(--warning)'
                  }}>
                    Awaiting Verification
                  </span>
                </td>
                <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                  <Button variant="primary" size="sm" onClick={() => handleApprove(alloc.assetId)}>
                    <Check size={14} style={{ marginRight: '4px' }} /> Approve Return
                  </Button>
                </td>
              </tr>
            ))}
            {pendingReturns.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No pending returns to verify. All returned gear has been processed.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReturnApprovalPage;
