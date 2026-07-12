import React, { useState } from 'react';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import { generateQRCodeUrl } from '../../../utils/generateQR.js';

export const ProfilePage = () => {
  const [user] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@assetflow.com',
    role: 'Employee',
    department: 'Product Design',
    office: 'San Francisco Headquarters'
  });

  const [activeAllocations] = useState([
    { id: 1, serial: 'MBP-14902', name: 'MacBook Pro 14"', category: 'Hardware', checkoutDate: '2026-01-10', status: 'Verified' },
    { id: 2, serial: 'IPH-9921', name: 'iPhone 15 Pro Max', category: 'Hardware', checkoutDate: '2026-03-15', status: 'Pending Verification' }
  ]);

  const [requestHistory] = useState([
    { id: 101, assetName: 'iPad Pro 11"', requestType: 'Booking', date: '2026-05-12', status: 'Approved' },
    { id: 102, assetName: 'Wacom Cintiq Pro', requestType: 'Allocation', date: '2026-06-20', status: 'Pending Review' }
  ]);

  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const handleVerifyClick = (asset) => {
    setSelectedAsset(asset);
    setShowQRModal(true);
  };

  return (
    <div>
      <PageTitle title="My Profile" subtitle="Manage your personal details, verify allocated gear, and view history." />

      <div className="grid" style={{ gridTemplateColumns: '1fr 2fr', gap: 'var(--spacing-xl)', alignItems: 'start' }}>
        {/* User Card */}
        <div className="liora-card-stone" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ 
            width: '96px', 
            height: '96px', 
            borderRadius: 'var(--radius-full)', 
            background: 'var(--sage-light)', 
            color: 'var(--moss)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: '32px', 
            fontWeight: 600,
            marginBottom: 'var(--spacing-md)'
          }}>
            JD
          </div>
          <h3 style={{ marginBottom: 'var(--spacing-xs)' }}>{user.name}</h3>
          <span className="eyebrow" style={{ marginBottom: 'var(--spacing-md)' }}>{user.role}</span>
          
          <div style={{ width: '100%', borderTop: '1px solid var(--sage-light)', paddingTop: 'var(--spacing-md)', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
            <div><strong>Email:</strong> <span style={{ color: 'var(--text-secondary)' }}>{user.email}</span></div>
            <div><strong>Department:</strong> <span style={{ color: 'var(--text-secondary)' }}>{user.department}</span></div>
            <div><strong>Location:</strong> <span style={{ color: 'var(--text-secondary)' }}>{user.office}</span></div>
          </div>
        </div>

        {/* Allocations & History */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
          {/* Active Allocations Grid */}
          <div className="liora-card">
            <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Assigned Equipment</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              {activeAllocations.map(asset => (
                <div key={asset.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--linen)', borderRadius: 'var(--radius-md)' }}>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 600 }}>{asset.name}</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>S/N: {asset.serial} • Checked out on {asset.checkoutDate}</p>
                  </div>
                  <div className="flex items-center gap-sm">
                    <span className="eyebrow" style={{ 
                      fontSize: '11px', 
                      background: asset.status.includes('Pending') ? 'var(--warning-light)' : 'var(--success-light)',
                      color: asset.status.includes('Pending') ? 'var(--warning)' : 'var(--success)',
                      padding: '4px 8px',
                      borderRadius: 'var(--radius-sm)'
                    }}>
                      {asset.status}
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleVerifyClick(asset)}>Verify Asset</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Log */}
          <div className="liora-card">
            <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Recent Activity History</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                  <th style={{ padding: '12px 8px' }} className="eyebrow">Asset</th>
                  <th style={{ padding: '12px 8px' }} className="eyebrow">Request Type</th>
                  <th style={{ padding: '12px 8px' }} className="eyebrow">Date Filed</th>
                  <th style={{ padding: '12px 8px' }} className="eyebrow">Status</th>
                </tr>
              </thead>
              <tbody>
                {requestHistory.map(req => (
                  <tr key={req.id} style={{ borderBottom: '1px solid var(--linen)' }}>
                    <td style={{ padding: '16px 8px', fontWeight: 600 }}>{req.assetName}</td>
                    <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{req.requestType}</td>
                    <td style={{ padding: '16px 8px', color: 'var(--text-muted)' }}>{req.date}</td>
                    <td style={{ padding: '16px 8px' }}>
                      <span className="eyebrow" style={{ 
                        fontSize: '11px', 
                        background: req.status === 'Approved' ? 'var(--success-light)' : 'var(--warning-light)',
                        color: req.status === 'Approved' ? 'var(--success)' : 'var(--warning)',
                        padding: '4px 8px',
                        borderRadius: 'var(--radius-sm)'
                      }}>{req.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* QR Verify Modal */}
      {showQRModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(43,42,37,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="liora-card" style={{ maxWidth: '400px', width: '90%', textAlign: 'center', position: 'relative' }}>
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Self-Audit Verification</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
              Scan this QR label or enter verification details to confirm you have <strong>{selectedAsset?.name}</strong>.
            </p>
            
            {/* Real QR graphic */}
            <div style={{ width: '160px', height: '200px', background: 'var(--stone)', border: '1px solid var(--sage-light)', borderRadius: 'var(--radius-md)', margin: '0 auto var(--spacing-xl) auto', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '12px' }}>
              <img 
                src={generateQRCodeUrl(selectedAsset?.serial || selectedAsset?.code)} 
                alt="QR Code" 
                style={{ width: '130px', height: '130px', display: 'block', marginBottom: '8px' }} 
              />
              <span className="eyebrow" style={{ fontSize: '10px' }}>S/N: {selectedAsset?.serial || '—'}</span>
            </div>

            <div className="flex gap-sm">
              <Button variant="primary" style={{ flex: 1 }} onClick={() => setShowQRModal(false)}>Confirm Receipt</Button>
              <Button variant="secondary" onClick={() => setShowQRModal(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
