import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import Input from '../../../common/ui/Input.jsx';
import Select from '../../../common/ui/Select.jsx';
import useMockDataStore from '../../../store/mockDataStore.js';
import useAuthStore from '../../../store/authStore.js';

export const CheckoutWizardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const { employees, assets, checkoutAsset } = useMockDataStore();
  
  const [recipientId, setRecipientId] = useState('');
  const [scanInput, setScanInput] = useState('');
  const [scannedAssets, setScannedAssets] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  const handleScanSubmit = (e) => {
    e.preventDefault();
    if (!scanInput) return;
    setError('');

    // Look up asset by code or serial
    const foundAsset = assets.find(
      a => a.code.toLowerCase() === scanInput.trim().toLowerCase() || 
           (a.serial && a.serial.toLowerCase() === scanInput.trim().toLowerCase())
    );

    if (!foundAsset) {
      setError(`Asset with reference "${scanInput}" not found in register.`);
      return;
    }

    if (foundAsset.status === 'ALLOCATED') {
      setError(`Asset "${foundAsset.name}" is already allocated to ${foundAsset.holderName}.`);
      return;
    }

    if (foundAsset.status === 'MAINTENANCE') {
      setError(`Asset "${foundAsset.name}" is in maintenance and cannot be checked out.`);
      return;
    }

    if (scannedAssets.some(sa => sa.id === foundAsset.id)) {
      setError(`Asset "${foundAsset.name}" is already scanned.`);
      return;
    }

    setScannedAssets(prev => [...prev, foundAsset]);
    setScanInput('');
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!recipientId) {
      setError('Please specify a recipient employee.');
      return;
    }
    if (scannedAssets.length === 0) {
      setError('Please scan or search at least one asset to assign.');
      return;
    }
    if (!dueDate) {
      setError('Please specify a return deadline.');
      return;
    }
    if (!agreed) {
      setError('You must confirm recipient liability agreement terms.');
      return;
    }

    // Allocate all scanned assets
    scannedAssets.forEach(asset => {
      checkoutAsset(asset.id, recipientId, dueDate);
    });

    navigate('/allocations');
  };

  const removeAsset = (id) => {
    setScannedAssets(prev => prev.filter(a => a.id !== id));
  };

  const employeeOptions = [
    { label: 'Select Employee...', value: '' },
    ...employees.map(emp => ({ label: `${emp.name} (${emp.department})`, value: emp.id }))
  ];

  // Helper quick list of available assets for easy testing
  const availableAssets = assets.filter(a => a.status === 'AVAILABLE');

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      <PageTitle title="Asset Checkout" subtitle="Register a new equipment handover, assign assets, and define return parameters." />

      <div className="liora-card">
        <form onSubmit={handleCheckoutSubmit}>
          <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Assignment Destination</h3>
          
          <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <Select 
              label="Recipient Employee"
              options={employeeOptions}
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
              required
            />
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--surface-border)', margin: 'var(--spacing-lg) 0' }} />

          <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Scan Asset Labels</h3>
          
          <div style={{ display: 'flex', gap: 'var(--spacing-xs)', alignItems: 'flex-end', marginBottom: 'var(--spacing-md)' }}>
            <div style={{ flex: 1 }}>
              <Input 
                label="Enter Asset Tag or Serial Number"
                placeholder="e.g. AST-0002 or DM-32A-0921"
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
                style={{ marginBottom: 0 }}
              />
            </div>
            <Button type="button" variant="outline" onClick={handleScanSubmit}>Scan / Add</Button>
          </div>

          {/* Quick Picker for Demo Ease */}
          {availableAssets.length > 0 && (
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Quick Add Available Assets (Demo Picker):
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {availableAssets.map(asset => (
                  <button
                    key={asset.id}
                    type="button"
                    onClick={() => {
                      if (!scannedAssets.some(sa => sa.id === asset.id)) {
                        setScannedAssets(prev => [...prev, asset]);
                      }
                    }}
                    style={{
                      background: 'var(--stone)',
                      padding: '4px 8px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '12px',
                      border: '1px solid var(--sage-light)',
                      cursor: 'pointer'
                    }}
                  >
                    + {asset.name} ({asset.code})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Scanned List */}
          {scannedAssets.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)', marginBottom: 'var(--spacing-lg)' }}>
              <span className="eyebrow" style={{ fontSize: '11px' }}>Scanned Items ({scannedAssets.length})</span>
              {scannedAssets.map(asset => (
                <div key={asset.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--stone)', borderRadius: 'var(--radius-sm)' }}>
                  <div>
                    <strong>{asset.name}</strong>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '8px' }}>({asset.code})</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => removeAsset(asset.id)}
                    style={{ color: 'var(--danger)', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ background: 'var(--linen)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-md)', textAlign: 'center', color: 'var(--text-muted)', marginBottom: 'var(--spacing-lg)' }}>
              No assets scanned yet. Scan or select an asset from the available list above.
            </div>
          )}

          <hr style={{ border: 'none', borderTop: '1px solid var(--surface-border)', margin: 'var(--spacing-lg) 0' }} />

          <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Terms & Return Date</h3>
          
          <Input 
            type="date"
            label="Scheduled Return Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />

          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', margin: 'var(--spacing-md) 0' }}>
            <input 
              type="checkbox" 
              id="liability" 
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{ marginTop: '4px', cursor: 'pointer' }}
            />
            <label htmlFor="liability" style={{ fontSize: '14px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              I verify that the employee accepts terms and liability policies for corporate equipment usage.
            </label>
          </div>

          {error && (
            <div style={{ 
              color: 'var(--danger)', 
              background: 'var(--danger-light)', 
              padding: '12px 16px', 
              borderRadius: 'var(--radius-sm)', 
              marginBottom: 'var(--spacing-md)', 
              fontSize: '14px' 
            }}>
              {error}
            </div>
          )}

          <div className="flex gap-sm" style={{ marginTop: 'var(--spacing-lg)' }}>
            <Button type="submit" variant="primary" style={{ flex: 1 }}>Complete Checkout</Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/allocations')}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutWizardPage;
