import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import useMockDataStore from '../../../store/mockDataStore.js';
import useAuthStore from '../../../store/authStore.js';

export const MaintenanceListPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [activeFilter, setActiveFilter] = useState('active');

  const { maintenance, updateMaintenanceStatus, assets } = useMockDataStore();

  const filteredTickets = maintenance.filter(t => {
    if (activeFilter === 'active') return t.status === 'IN_PROGRESS' || t.status === 'SCHEDULED';
    if (activeFilter === 'completed') return t.status === 'COMPLETED';
    return true; // all
  });

  const getStatusLabel = (status) => {
    switch (status) {
      case 'IN_PROGRESS': return 'In Repair';
      case 'SCHEDULED': return 'Scheduled';
      case 'COMPLETED': return 'Completed';
      case 'CANCELLED': return 'Cancelled';
      default: return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'IN_PROGRESS': return { background: 'var(--warning-light)', color: 'var(--warning)' };
      case 'SCHEDULED': return { background: 'var(--sage-light)', color: 'var(--moss)' };
      case 'COMPLETED': return { background: 'var(--success-light)', color: 'var(--success)' };
      default: return { background: 'var(--stone)', color: 'var(--text-secondary)' };
    }
  };

  const handleResolveTicket = (id) => {
    updateMaintenanceStatus(id, 'COMPLETED', 0.0, new Date().toISOString().split('T')[0]);
  };

  // Get asset serial helper
  const getAssetSerial = (assetId) => {
    const asset = assets.find(a => a.id === assetId);
    return asset ? asset.serial || asset.code : '—';
  };

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <PageTitle title="Equipment Maintenance" subtitle="Track device diagnostics, ongoing physical repairs, and warranty logs." />
        {user?.role === 'MANAGER' && (
          <Button variant="primary" onClick={() => navigate('/raise-maintenance')}>Create Ticket</Button>
        )}
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-3 gap-lg" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="liora-card-stone">
          <span className="eyebrow" style={{ fontSize: '11px' }}>Annual Repair Costs</span>
          <h3 style={{ fontSize: '28px', marginTop: '4px' }}>$4,380.00</h3>
        </div>
        <div className="liora-card-stone">
          <span className="eyebrow" style={{ fontSize: '11px' }}>Active Tickets</span>
          <h3 style={{ fontSize: '28px', marginTop: '4px' }}>{maintenance.filter(t => t.status !== 'COMPLETED').length}</h3>
        </div>
        <div className="liora-card-stone">
          <span className="eyebrow" style={{ fontSize: '11px' }}>Average Turnaround Time</span>
          <h3 style={{ fontSize: '28px', marginTop: '4px' }}>4.2 Days</h3>
        </div>
      </div>

      {/* Filter Options */}
      <div className="liora-card" style={{ padding: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
        <div className="flex gap-md">
          {['active', 'completed', 'all'].map(opt => (
            <button
              key={opt}
              onClick={() => setActiveFilter(opt)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '14px',
                fontWeight: 600,
                background: activeFilter === opt ? 'var(--sage)' : 'transparent',
                color: activeFilter === opt ? 'var(--cloud)' : 'var(--text-secondary)',
                border: activeFilter === opt ? 'none' : '1px solid var(--sage-light)',
                cursor: 'pointer',
                transition: 'background var(--transition-fast)',
                textTransform: 'capitalize'
              }}
            >
              {opt} Tickets
            </button>
          ))}
        </div>
      </div>

      {/* Maintenance Tickets Table */}
      <div className="liora-card">
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Asset</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Serial / Tag</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Issue Details</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Est. Cost</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Date Opened</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Status</th>
              {user?.role === 'MANAGER' && <th style={{ padding: '12px 8px', textAlign: 'right' }} className="eyebrow">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map(t => (
              <tr key={t.id} style={{ borderBottom: '1px solid var(--linen)' }} className="table-row-hover">
                <td style={{ padding: '16px 8px', fontWeight: 600 }}>{t.assetName}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{getAssetSerial(t.assetId)}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-secondary)', maxWidth: '240px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{t.description}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>${t.cost.toFixed(2)}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-muted)' }}>{t.startDate}</td>
                <td style={{ padding: '16px 8px' }}>
                  <span className="eyebrow" style={{ fontSize: '10px', padding: '4px 8px', borderRadius: 'var(--radius-sm)', ...getStatusColor(t.status) }}>
                    {getStatusLabel(t.status)}
                  </span>
                </td>
                {user?.role === 'MANAGER' && (
                  <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                    {t.status !== 'COMPLETED' && (
                      <Button variant="outline" size="sm" onClick={() => handleResolveTicket(t.id)}>Complete</Button>
                    )}
                  </td>
                )}
              </tr>
            ))}
            {filteredTickets.length === 0 && (
              <tr>
                <td colSpan={user?.role === 'MANAGER' ? 7 : 6} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>No tickets found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaintenanceListPage;
