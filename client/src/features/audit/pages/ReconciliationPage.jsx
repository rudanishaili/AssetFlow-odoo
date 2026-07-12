import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';

export const ReconciliationPage = () => {
  const navigate = useNavigate();

  const [discrepancies, setDiscrepancies] = useState([
    {
      id: 1,
      assetName: 'MacBook Pro 16" (S/N: MBP-2026-001)',
      holder: 'Sarah Jenkins',
      expectedState: { status: 'In-Use', location: 'San Francisco HQ' },
      reportedState: { status: 'Damaged (Screen Flicker)', location: 'Remote / Home' },
      notes: 'Sarah reported screen flickering and confirmed she is working remotely for the month.'
    },
    {
      id: 2,
      assetName: 'iPhone 15 Pro (S/N: IPH-9921)',
      holder: 'Frank Miller',
      expectedState: { status: 'In-Use', location: 'Executive HQ' },
      reportedState: { status: 'Missing', location: 'Unknown' },
      notes: 'No self-audit scan received from user. Attempted automated ping failed.'
    }
  ]);

  const handleResolve = (id, resolution) => {
    // Simulate updating inventory record
    setDiscrepancies(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <PageTitle title="Reconciliation Board" subtitle="Resolve differences between expected system data and employee audit declarations." />
        <Button variant="outline" onClick={() => navigate('/audit')}>Back to Campaigns</Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
        {discrepancies.length > 0 ? (
          discrepancies.map(item => (
            <div key={item.id} className="liora-card">
              <h3 style={{ marginBottom: 'var(--spacing-md)' }}>{item.assetName}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: 'var(--spacing-md)' }}>
                Allocated Holder: <strong>{item.holder}</strong>
              </p>

              {/* Expected vs Reported Side-by-side comparison */}
              <div className="grid grid-cols-2 gap-lg" style={{ marginBottom: 'var(--spacing-lg)' }}>
                {/* Expected */}
                <div style={{ padding: '16px', background: 'var(--linen)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--sage)' }}>
                  <span className="eyebrow" style={{ fontSize: '11px', color: 'var(--moss)' }}>Expected Registry Status</span>
                  <div style={{ marginTop: '8px' }}>
                    <div><strong>Status:</strong> {item.expectedState.status}</div>
                    <div><strong>Location:</strong> {item.expectedState.location}</div>
                  </div>
                </div>

                {/* Reported */}
                <div style={{ padding: '16px', background: 'var(--stone)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--danger)' }}>
                  <span className="eyebrow" style={{ fontSize: '11px', color: 'var(--danger)' }}>Reported Self-Audit Status</span>
                  <div style={{ marginTop: '8px' }}>
                    <div><strong>Status:</strong> {item.reportedState.status}</div>
                    <div><strong>Location:</strong> {item.reportedState.location}</div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <span className="eyebrow" style={{ fontSize: '11px' }}>Audit Audit Notes</span>
                <p style={{ marginTop: '4px', fontSize: '15px', color: 'var(--text-secondary)' }}>{item.notes}</p>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 'var(--spacing-xs)', borderTop: '1px solid var(--surface-border)', paddingTop: 'var(--spacing-md)' }}>
                <Button variant="primary" size="sm" onClick={() => handleResolve(item.id, 'update')}>Update Registry</Button>
                <Button variant="secondary" size="sm" onClick={() => handleResolve(item.id, 'writeoff')}>Write Off Asset</Button>
                <Button variant="outline" size="sm" onClick={() => handleResolve(item.id, 're-audit')}>Request Re-Audit</Button>
              </div>
            </div>
          ))
        ) : (
          <div className="liora-card" style={{ textAlign: 'center', padding: 'var(--spacing-3xl) 0', color: 'var(--text-secondary)' }}>
            <p className="text-lg">All audit declarations are reconciled with expected registry states.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReconciliationPage;
