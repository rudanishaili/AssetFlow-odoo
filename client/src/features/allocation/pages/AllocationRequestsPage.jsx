import React from 'react';
import useMockDataStore from '../../../store/mockDataStore.js';
import useAuthStore from '../../../store/authStore.js';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import { UserCheck, Check, X } from 'lucide-react';

export const AllocationRequestsPage = () => {
  const { user } = useAuthStore();
  const { 
    allocationRequests, 
    approveAllocationRequest, 
    rejectAllocationRequest 
  } = useMockDataStore();

  const userDept = user?.department || '';

  // Filter requests raised by employees in this department
  const pendingRequests = allocationRequests.filter(req => 
    req.department === userDept
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return { background: 'var(--warning-light)', color: 'var(--warning)' };
      case 'APPROVED': return { background: 'var(--success-light)', color: 'var(--success)' };
      default: return { background: 'var(--danger-light)', color: 'var(--danger)' };
    }
  };

  return (
    <div>
      <PageTitle title="Allocation Requests" subtitle="Approve or reject equipment allocation requests raised by department employees." />

      <div className="liora-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--spacing-md)' }}>
          <UserCheck size={20} style={{ color: 'var(--moss)' }} />
          <h3 style={{ fontSize: '1.25rem' }}>Pending Allocation Requests</h3>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Employee</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Requested Equipment</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Reason / Notes</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Requested Date</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Status</th>
              <th style={{ padding: '12px 8px', textAlign: 'right' }} className="eyebrow">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map(req => (
              <tr key={req.id} style={{ borderBottom: '1px solid var(--linen)' }} className="table-row-hover">
                <td style={{ padding: '16px 8px', fontWeight: 600 }}>{req.userName}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-primary)' }}>{req.assetType}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-secondary)', maxWidth: '240px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{req.notes || '—'}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-muted)' }}>
                  {new Date(req.requestedAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '16px 8px' }}>
                  <span className="eyebrow" style={{ 
                    fontSize: '10px', 
                    padding: '3px 8px', 
                    borderRadius: 'var(--radius-sm)',
                    ...getStatusColor(req.status)
                  }}>
                    {req.status}
                  </span>
                </td>
                <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                  {req.status === 'PENDING' && (
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => approveAllocationRequest(req.id)}
                        style={{ color: 'var(--success)', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
                        title="Approve Request"
                      >
                        <Check size={18} />
                      </button>
                      <button 
                        onClick={() => rejectAllocationRequest(req.id)}
                        style={{ color: 'var(--danger)', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
                        title="Reject Request"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {pendingRequests.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No pending allocation requests for your department.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllocationRequestsPage;
