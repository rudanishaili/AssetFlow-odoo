import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import Input from '../../../common/ui/Input.jsx';
import Select from '../../../common/ui/Select.jsx';

export const RepairTicketFormPage = () => {
  const navigate = useNavigate();
  const [assetId, setAssetId] = useState('1');
  const [severity, setSeverity] = useState('medium');
  const [description, setDescription] = useState('');
  const [estCost, setEstCost] = useState('');
  const [technician, setTechnician] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;

    // Simulate saving maintenance ticket
    navigate('/maintenance');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <PageTitle title="Create Repair Ticket" subtitle="File a diagnostic ticket to initiate repairs, replacements, or checkups." />

      <div className="liora-card">
        <form onSubmit={handleSubmit}>
          <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Ticket Details</h3>
          
          <Select 
            label="Select Damaged Asset"
            options={[
              { label: 'MacBook Pro 16" (S/N: MBP-2026-001)', value: '1' },
              { label: 'Dell 32" Monitor (S/N: MON-DELL-32A)', value: '2' },
              { label: 'iPhone 15 Pro (S/N: IPH-9921)', value: '3' }
            ]}
            value={assetId}
            onChange={(e) => setAssetId(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-md" style={{ marginBottom: 'var(--spacing-md)' }}>
            <Select 
              label="Diagnostic Severity"
              options={[
                { label: 'Low (General Wear)', value: 'low' },
                { label: 'Medium (Functional Issue)', value: 'medium' },
                { label: 'High (Completely Broken)', value: 'high' }
              ]}
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            />
            <Input 
              type="text"
              label="Assigned Technician / Vendor"
              placeholder="e.g. Apple Support"
              value={technician}
              onChange={(e) => setTechnician(e.target.value)}
              required
            />
          </div>

          <Input 
            type="number"
            label="Estimated Repair Cost ($)"
            placeholder="e.g. 150.00"
            value={estCost}
            onChange={(e) => setEstCost(e.target.value)}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)', marginBottom: 'var(--spacing-md)' }}>
            <label className="eyebrow">Issue Diagnostic Report</label>
            <textarea 
              style={{
                padding: '14px 16px',
                borderRadius: 'var(--radius-input)',
                border: '1px solid var(--sage-light)',
                outline: 'none',
                minHeight: '120px',
                fontFamily: 'var(--font-body)',
                fontSize: '15px'
              }}
              placeholder="Describe screen flickers, battery swelling, structural cracks, or physical port issues in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-sm" style={{ marginTop: 'var(--spacing-lg)' }}>
            <Button type="submit" variant="primary" style={{ flex: 1 }}>Submit Ticket</Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/maintenance')}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RepairTicketFormPage;
