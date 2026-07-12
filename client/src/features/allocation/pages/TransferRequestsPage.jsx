import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import Input from '../../../common/ui/Input.jsx';
import Select from '../../../common/ui/Select.jsx';
import useMockDataStore from '../../../store/mockDataStore.js';
import useAuthStore from '../../../store/authStore.js';
import { ArrowLeftRight, Check, X, PlusCircle } from 'lucide-react';

export const TransferRequestsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { 
    transferRequests, 
    assets, 
    employees, 
    approveTransfer, 
    rejectTransfer, 
    addTransferRequest 
  } = useMockDataStore();

  const role = user?.role || 'EMPLOYEE';
  const userId = user?.id || '';
  const userDept = user?.department || '';

  // Form State for Employee raising request
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [targetEmployeeId, setTargetEmployeeId] = useState('');
  const [notes, setNotes] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [error, setError] = useState('');

  // Filter transfers
  const getFilteredRequests = () => {
    if (role === 'ADMIN' || role === 'MANAGER') {
      return transferRequests; // View all
    }
    if (role === 'AUDITOR') { // Dept Head
      // Show requests initiated from their department OR transferring into their department
      return transferRequests.filter(tr => 
        tr.fromDepartment === userDept || tr.toDepartment === userDept
      );
    }
    // Employee
    return transferRequests.filter(tr => 
      tr.fromUserId === userId || tr.toUserId === userId
    );
  };

  const requests = getFilteredRequests();

  const handleCreateRequest = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedAssetId || !targetEmployeeId) {
      setError('Please specify the asset and recipient employee.');
      return;
    }

    const asset = assets.find(a => a.id === selectedAssetId);
    const targetEmp = employees.find(emp => emp.id === targetEmployeeId);

    if (!asset || !targetEmp) {
      setError('Invalid selection.');
      return;
    }

    addTransferRequest({
      assetId: selectedAssetId,
      fromUserId: userId,
      toUserId: targetEmployeeId,
      fromDepartment: userDept,
      toDepartment: targetEmp.department,
      notes: notes
    });

    // Reset Form
    setSelectedAssetId('');
    setTargetEmployeeId('');
    setNotes('');
    setShowCreateForm(false);
  };

  // Helper selectors for raising requests
  const myAssets = assets.filter(a => a.holderId === userId);
  const otherEmployees = employees.filter(emp => emp.id !== userId);

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return { background: 'var(--warning-light)', color: 'var(--warning)' };
      case 'APPROVED': return { background: 'var(--success-light)', color: 'var(--success)' };
      default: return { background: 'var(--danger-light)', color: 'var(--danger)' };
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <PageTitle title="Transfer Requests" subtitle="Manage and approve the handovers and migrations of corporate assets between employees." />
        {role === 'EMPLOYEE' && !showCreateForm && (
          <Button variant="primary" onClick={() => setShowCreateForm(true)}>
            <PlusCircle size={16} style={{ marginRight: '8px' }} /> Request Transfer
          </Button>
        )}
      </div>

      {showCreateForm && (
        <div className="liora-card" style={{ marginBottom: 'var(--spacing-xl)', maxWidth: '600px' }}>
          <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Initiate Asset Transfer</h3>
          <form onSubmit={handleCreateRequest}>
            {error && (
              <div style={{ color: 'var(--danger)', background: 'var(--danger-light)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
                {error}
              </div>
            )}
            
            <Select
              label="Select Asset to Transfer"
              options={[
                { label: 'Choose asset...', value: '' },
                ...myAssets.map(a => ({ label: `${a.name} (${a.code})`, value: a.id }))
              ]}
              value={selectedAssetId}
              onChange={(e) => setSelectedAssetId(e.target.value)}
              required
            />

            <Select
              label="Select Recipient Employee"
              options={[
                { label: 'Choose employee...', value: '' },
                ...otherEmployees.map(emp => ({ label: `${emp.name} (${emp.department})`, value: emp.id }))
              ]}
              value={targetEmployeeId}
              onChange={(e) => setTargetEmployeeId(e.target.value)}
              required
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <label className="eyebrow">Transfer Reason / Notes</label>
              <textarea 
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-input)',
                  border: '1px solid var(--sage-light)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  outline: 'none',
                  minHeight: '80px'
                }}
                placeholder="Why is this gear being handed over? (e.g. project migration)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="flex gap-sm">
              <Button type="submit" variant="primary">Submit Transfer Request</Button>
              <Button type="button" variant="secondary" onClick={() => setShowCreateForm(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      {/* Requests table */}
      <div className="liora-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--spacing-md)' }}>
          <ArrowLeftRight size={20} style={{ color: 'var(--moss)' }} />
          <h3 style={{ fontSize: '1.25rem' }}>
            {role === 'MANAGER' ? 'Master Transfer Logs' : 'Departmental & Personal Transfers'}
          </h3>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Asset</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">From Employee</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">To Employee</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">From Dept</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">To Dept</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Status</th>
              {role === 'AUDITOR' && <th style={{ padding: '12px 8px', textAlign: 'right' }} className="eyebrow">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req.id} style={{ borderBottom: '1px solid var(--linen)' }} className="table-row-hover">
                <td style={{ padding: '16px 8px', fontWeight: 600 }}>{req.assetName}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-primary)' }}>{req.fromUserName}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-primary)' }}>{req.toUserName}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{req.fromDepartment}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{req.toDepartment}</td>
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
                {role === 'AUDITOR' && (
                  <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                    {req.status === 'PENDING' && (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => approveTransfer(req.id)}
                          style={{ color: 'var(--success)', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
                          title="Approve Handover"
                        >
                          <Check size={18} />
                        </button>
                        <button 
                          onClick={() => rejectTransfer(req.id)}
                          style={{ color: 'var(--danger)', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
                          title="Reject Handover"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={role === 'AUDITOR' ? 7 : 6} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No transfer requests recorded.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransferRequestsPage;
