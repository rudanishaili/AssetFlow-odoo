import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import Input from '../../../common/ui/Input.jsx';
import Select from '../../../common/ui/Select.jsx';

export const AuditCampaignPage = () => {
  const navigate = useNavigate();
  const [showAddCampaign, setShowAddCampaign] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [targetCat, setTargetCat] = useState('laptops');

  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Q3 Hardware Verification', category: 'Laptops', startDate: '2026-07-01', completion: 82, status: 'Active', discrepancies: 3 },
    { id: 2, name: 'Annual Software License Review', category: 'Software Packages', startDate: '2026-06-10', completion: 100, status: 'Completed', discrepancies: 0 },
    { id: 3, name: 'Executive Mobile Audits', category: 'Mobile Devices', startDate: '2026-07-10', completion: 15, status: 'Active', discrepancies: 1 }
  ]);

  const handleStartCampaign = (e) => {
    e.preventDefault();
    if (!campaignName) return;

    const newCampaign = {
      id: Date.now(),
      name: campaignName,
      category: targetCat.charAt(0).toUpperCase() + targetCat.slice(1),
      startDate: new Date().toISOString().split('T')[0],
      completion: 0,
      status: 'Active',
      discrepancies: 0
    };

    setCampaigns(prev => [newCampaign, ...prev]);
    setShowAddCampaign(false);
    setCampaignName('');
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return { background: 'var(--success-light)', color: 'var(--success)' };
      default: return { background: 'var(--stone)', color: 'var(--text-secondary)' };
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <PageTitle title="Inventory Audit Campaigns" subtitle="Launch hardware reconciliation sweeps, trigger self-audits, and track audit completion." />
        <div className="flex gap-sm">
          <Button variant="primary" onClick={() => setShowAddCampaign(true)}>New Audit Campaign</Button>
          <Button variant="outline" onClick={() => navigate('/audit/reconciliation')}>Reconciliation Center</Button>
        </div>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-3 gap-lg" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="liora-card-stone">
          <span className="eyebrow" style={{ fontSize: '11px' }}>Global Audits Completion</span>
          <h3 style={{ fontSize: '28px', marginTop: '4px' }}>65.6%</h3>
        </div>
        <div className="liora-card-stone">
          <span className="eyebrow" style={{ fontSize: '11px' }}>Active Campaigns</span>
          <h3 style={{ fontSize: '28px', marginTop: '4px' }}>{campaigns.filter(c => c.status === 'Active').length}</h3>
        </div>
        <div className="liora-card-stone" style={{ borderLeft: '4px solid var(--danger)' }}>
          <span className="eyebrow" style={{ fontSize: '11px', color: 'var(--danger)' }}>Unresolved Discrepancies</span>
          <h3 style={{ fontSize: '28px', marginTop: '4px', color: 'var(--danger)' }}>
            {campaigns.reduce((acc, curr) => acc + curr.discrepancies, 0)}
          </h3>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="liora-card">
        <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Campaign Logs</h3>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Campaign Name</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Category Scope</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Start Date</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Completion Rate</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Discrepancies</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Status</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid var(--linen)' }}>
                <td style={{ padding: '16px 8px', fontWeight: 600 }}>{c.name}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{c.category}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-muted)' }}>{c.startDate}</td>
                <td style={{ padding: '16px 8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '100px', height: '6px', background: 'var(--stone)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                      <div style={{ width: `${c.completion}%`, height: '100%', background: 'var(--sage)' }} />
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>{c.completion}%</span>
                  </div>
                </td>
                <td style={{ padding: '16px 8px', fontWeight: 600, color: c.discrepancies > 0 ? 'var(--danger)' : 'var(--text-secondary)' }}>
                  {c.discrepancies} flagged
                </td>
                <td style={{ padding: '16px 8px' }}>
                  <span className="eyebrow" style={{ fontSize: '10px', padding: '2px 6px', borderRadius: 'var(--radius-sm)', ...getStatusColor(c.status) }}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Creator Modal */}
      {showAddCampaign && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(43,42,37,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <form onSubmit={handleStartCampaign} className="liora-card" style={{ maxWidth: '400px', width: '90%', position: 'relative' }}>
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Launch Audit Campaign</h3>
            
            <Input 
              label="Campaign Name"
              placeholder="e.g. Q3 Laptops Audit Sweep"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              required
            />

            <Select 
              label="Target Scope Category"
              options={[
                { label: 'Laptops', value: 'laptops' },
                { label: 'Mobile Devices', value: 'mobile' },
                { label: 'Software Packages', value: 'software' }
              ]}
              value={targetCat}
              onChange={(e) => setTargetCat(e.target.value)}
            />

            <div className="flex gap-sm" style={{ marginTop: 'var(--spacing-md)' }}>
              <Button type="submit" variant="primary" style={{ flex: 1 }}>Initialize Audit</Button>
              <Button variant="secondary" onClick={() => setShowAddCampaign(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AuditCampaignPage;
