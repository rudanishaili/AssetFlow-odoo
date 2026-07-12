import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import useMockDataStore from '../../../store/mockDataStore.js';
import useAuthStore from '../../../store/authStore.js';
import { History, Wrench, UserCheck, ArrowLeft } from 'lucide-react';

export const AssetDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('lifecycle');
  const { user } = useAuthStore();
  const isManager = user?.role === 'MANAGER';
  const isEmployee = user?.role === 'EMPLOYEE';

  const { assets, allocations, maintenance } = useMockDataStore();
  const asset = assets.find(a => a.id === id);

  if (!asset) {
    return (
      <div style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
        <h3>Asset Not Found</h3>
        <Button variant="secondary" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </div>
    );
  }

  // Filter logs for this asset
  const assetAllocations = allocations.filter(al => al.assetId === id);
  const assetMaintenance = maintenance.filter(m => m.assetId === id);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'allocated': return { background: 'var(--success-light)', color: 'var(--success)' };
      case 'available': return { background: 'var(--sage-light)', color: 'var(--moss)' };
      case 'reserved': return { background: 'var(--warning-light)', color: 'var(--warning)' };
      case 'maintenance': return { background: 'var(--danger-light)', color: 'var(--danger)' };
      default: return { background: 'var(--stone)', color: 'var(--text-secondary)' };
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <PageTitle title="Asset Details" subtitle={`Detailed technical specifications and current assignment state for ${asset.name}`} />
        <div className="flex gap-sm">
          {isManager && (
            <>
              <Button variant="primary" onClick={() => navigate('/allocations')}>
                <UserCheck size={16} style={{ marginRight: '8px' }} /> Assign Asset
              </Button>
              <Button variant="secondary" onClick={() => navigate('/maintenance')}>
                <Wrench size={16} style={{ marginRight: '8px' }} /> Initiate Repair
              </Button>
              <Button variant="outline" onClick={() => navigate(`/assets/${id}/history`)}>
                <History size={16} style={{ marginRight: '8px' }} /> View History
              </Button>
            </>
          )}
          <Button variant="outline" onClick={() => navigate(isEmployee ? '/my-assets' : '/assets')}>
            <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Back
          </Button>
        </div>
      </div>

      {/* Main Info Blocks */}
      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)' }}>
        {/* Specifications */}
        <div className="liora-card">
          <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-display)', color: 'var(--moss)' }}>{asset.name}</h3>
            <span className="eyebrow" style={{ padding: '4px 8px', borderRadius: 'var(--radius-sm)', ...getStatusColor(asset.status) }}>
              {asset.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-lg" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <div>
              <span className="eyebrow" style={{ fontSize: '11px' }}>Asset Tag Code</span>
              <p style={{ fontWeight: 600, fontSize: '17px' }}>{asset.code}</p>
            </div>
            <div>
              <span className="eyebrow" style={{ fontSize: '11px' }}>Serial Number</span>
              <p style={{ fontWeight: 600, fontSize: '17px' }}>{asset.serial || '—'}</p>
            </div>
            <div>
              <span className="eyebrow" style={{ fontSize: '11px' }}>Category</span>
              <p style={{ fontWeight: 600, fontSize: '17px' }}>{asset.category}</p>
            </div>
            <div>
              <span className="eyebrow" style={{ fontSize: '11px' }}>Current Holder</span>
              <p style={{ fontWeight: 600, fontSize: '17px' }}>{asset.holderName || 'None'}</p>
            </div>
            <div>
              <span className="eyebrow" style={{ fontSize: '11px' }}>Acquisition Cost</span>
              <p style={{ fontWeight: 600, fontSize: '17px' }}>${asset.value.toLocaleString()}</p>
            </div>
            <div>
              <span className="eyebrow" style={{ fontSize: '11px' }}>Location / Office</span>
              <p style={{ fontWeight: 600, fontSize: '17px' }}>{asset.location || 'Not Specified'}</p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--surface-border)', paddingTop: 'var(--spacing-md)' }}>
            <span className="eyebrow" style={{ fontSize: '11px' }}>Technical Description</span>
            <p style={{ marginTop: '4px', color: 'var(--text-secondary)' }}>
              Acquired on {asset.purchaseDate || 'Not registered'}. Standard high-quality equipment assigned for core business operations.
            </p>
          </div>
        </div>

        {/* QR Identification Label */}
        <div className="liora-card-stone" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h4 className="eyebrow" style={{ marginBottom: 'var(--spacing-md)' }}>QR Asset Tag</h4>
          <div style={{ padding: '8px', background: '#fff', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--spacing-md)' }}>
            <div style={{ width: '130px', height: '130px', background: '#000', margin: '0 auto', opacity: 0.9 }} />
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600 }}>{asset.code}</span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: 'var(--spacing-md)' }}>S/N: {asset.serial || '—'}</span>
          <Button variant="outline" size="sm" onClick={() => window.print()} style={{ width: '100%' }}>Print Label</Button>
        </div>
      </div>

      {/* Tabs list of Log Histories */}
      <div className="liora-card">
        <div className="flex gap-md" style={{ borderBottom: '1px solid var(--surface-border)', paddingBottom: 'var(--spacing-xs)', marginBottom: 'var(--spacing-lg)' }}>
          {[
            { id: 'allocations', label: 'Allocations History' },
            { id: 'maintenance', label: 'Maintenance Log' }
          ].map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              style={{ 
                fontFamily: 'var(--font-body)',
                fontWeight: activeTab === tab.id ? 600 : 500,
                fontSize: '15px',
                color: activeTab === tab.id ? 'var(--moss)' : 'var(--text-secondary)',
                borderBottom: activeTab === tab.id ? '2px solid var(--moss)' : 'none',
                padding: '8px 16px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic logs display */}
        {activeTab === 'allocations' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                <th style={{ padding: '12px 8px' }} className="eyebrow">Holder</th>
                <th style={{ padding: '12px 8px' }} className="eyebrow">Allocated By</th>
                <th style={{ padding: '12px 8px' }} className="eyebrow">Date Assigned</th>
                <th style={{ padding: '12px 8px' }} className="eyebrow">Status</th>
              </tr>
            </thead>
            <tbody>
              {assetAllocations.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--linen)' }}>
                  <td style={{ padding: '16px 8px', fontWeight: 600 }}>{item.userName}</td>
                  <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{item.allocatedBy}</td>
                  <td style={{ padding: '16px 8px', color: 'var(--text-muted)' }}>{new Date(item.allocatedAt).toLocaleDateString()}</td>
                  <td style={{ padding: '16px 8px' }}>
                    <span className="eyebrow" style={{ 
                      fontSize: '10px', 
                      background: item.status === 'ACTIVE' ? 'var(--success-light)' : 'var(--stone)', 
                      color: item.status === 'ACTIVE' ? 'var(--success)' : 'var(--text-secondary)', 
                      padding: '2px 6px', 
                      borderRadius: 'var(--radius-sm)' 
                    }}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
              {assetAllocations.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: '24px 8px', textAlign: 'center', color: 'var(--text-secondary)' }}>No allocations recorded.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {activeTab === 'maintenance' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                <th style={{ padding: '12px 8px' }} className="eyebrow">Diagnostic Issue</th>
                <th style={{ padding: '12px 8px' }} className="eyebrow">Date Raised</th>
                <th style={{ padding: '12px 8px' }} className="eyebrow">Cost</th>
                <th style={{ padding: '12px 8px' }} className="eyebrow">Status</th>
              </tr>
            </thead>
            <tbody>
              {assetMaintenance.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--linen)' }}>
                  <td style={{ padding: '16px 8px', fontWeight: 600 }}>{item.description}</td>
                  <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{item.startDate}</td>
                  <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>${item.cost.toFixed(2)}</td>
                  <td style={{ padding: '16px 8px' }}>
                    <span className="eyebrow" style={{ 
                      fontSize: '10px', 
                      background: item.status === 'COMPLETED' ? 'var(--success-light)' : 'var(--danger-light)', 
                      color: item.status === 'COMPLETED' ? 'var(--success)' : 'var(--danger)', 
                      padding: '2px 6px', 
                      borderRadius: 'var(--radius-sm)' 
                    }}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
              {assetMaintenance.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: '24px 8px', textAlign: 'center', color: 'var(--text-secondary)' }}>No maintenance logs recorded.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AssetDetailPage;
