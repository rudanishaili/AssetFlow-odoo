import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useMockDataStore from '../../../store/mockDataStore.js';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import { Clock, UserCheck, Wrench, ArrowLeft } from 'lucide-react';

export const AssetHistoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { assets, allocations, maintenance } = useMockDataStore();
  const asset = assets.find(a => a.id === id);

  if (!asset) {
    return (
      <div style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
        <h3>Asset not found</h3>
        <Button variant="secondary" onClick={() => navigate('/assets')}>Back to Assets</Button>
      </div>
    );
  }

  // Filter allocations and maintenance for this asset
  const assetAllocations = allocations.filter(al => al.assetId === id);
  const assetMaintenance = maintenance.filter(m => m.assetId === id);

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <PageTitle title="Asset History" subtitle={`Audit movement records, lifecycle changes, and repair histories for ${asset.name}`} />
        <Button variant="secondary" onClick={() => navigate(`/assets/${id}`)}>
          <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Back to Details
        </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
        {/* Allocations History */}
        <div className="liora-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--spacing-md)' }}>
            <UserCheck size={20} style={{ color: 'var(--moss)' }} />
            <h3 style={{ fontSize: '1.25rem' }}>Allocation & Handover History</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                <th style={{ padding: '12px 8px' }} className="eyebrow">Employee</th>
                <th style={{ padding: '12px 8px' }} className="eyebrow">Assigned By</th>
                <th style={{ padding: '12px 8px' }} className="eyebrow">Allocated Date</th>
                <th style={{ padding: '12px 8px' }} className="eyebrow">Returned Date</th>
                <th style={{ padding: '12px 8px' }} className="eyebrow">Status</th>
              </tr>
            </thead>
            <tbody>
              {assetAllocations.map((al) => (
                <tr key={al.id} style={{ borderBottom: '1px solid var(--linen)' }}>
                  <td style={{ padding: '16px 8px', fontWeight: 600 }}>{al.userName}</td>
                  <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{al.allocatedBy}</td>
                  <td style={{ padding: '16px 8px', color: 'var(--text-muted)' }}>
                    {new Date(al.allocatedAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '16px 8px', color: 'var(--text-muted)' }}>
                    {al.returnedAt ? new Date(al.returnedAt).toLocaleDateString() : '—'}
                  </td>
                  <td style={{ padding: '16px 8px' }}>
                    <span className="eyebrow" style={{ 
                      fontSize: '11px', 
                      padding: '3px 8px', 
                      borderRadius: 'var(--radius-sm)',
                      background: al.status === 'ACTIVE' ? 'var(--success-light)' : 'var(--stone)',
                      color: al.status === 'ACTIVE' ? 'var(--success)' : 'var(--text-secondary)'
                    }}>
                      {al.status}
                    </span>
                  </td>
                </tr>
              ))}
              {assetAllocations.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '24px 8px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No allocations logged for this asset.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Maintenance Log */}
        <div className="liora-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--spacing-md)' }}>
            <Wrench size={20} style={{ color: 'var(--moss)' }} />
            <h3 style={{ fontSize: '1.25rem' }}>Service & Maintenance Tickets</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                <th style={{ padding: '12px 8px' }} className="eyebrow">Description of Issue</th>
                <th style={{ padding: '12px 8px' }} className="eyebrow">Registered Date</th>
                <th style={{ padding: '12px 8px' }} className="eyebrow">Cost</th>
                <th style={{ padding: '12px 8px' }} className="eyebrow">Resolved Date</th>
                <th style={{ padding: '12px 8px' }} className="eyebrow">Status</th>
              </tr>
            </thead>
            <tbody>
              {assetMaintenance.map((m) => (
                <tr key={m.id} style={{ borderBottom: '1px solid var(--linen)' }}>
                  <td style={{ padding: '16px 8px', fontWeight: 600 }}>{m.description}</td>
                  <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{m.startDate}</td>
                  <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>${m.cost.toFixed(2)}</td>
                  <td style={{ padding: '16px 8px', color: 'var(--text-muted)' }}>
                    {m.endDate || '—'}
                  </td>
                  <td style={{ padding: '16px 8px' }}>
                    <span className="eyebrow" style={{ 
                      fontSize: '11px', 
                      padding: '3px 8px', 
                      borderRadius: 'var(--radius-sm)',
                      background: m.status === 'COMPLETED' ? 'var(--success-light)' : m.status === 'IN_PROGRESS' ? 'var(--danger-light)' : 'var(--stone)',
                      color: m.status === 'COMPLETED' ? 'var(--success)' : m.status === 'IN_PROGRESS' ? 'var(--danger)' : 'var(--text-secondary)'
                    }}>
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
              {assetMaintenance.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '24px 8px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No maintenance tickets registered for this asset.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssetHistoryPage;
