import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import Input from '../../../common/ui/Input.jsx';
import Select from '../../../common/ui/Select.jsx';
import useMockDataStore from '../../../store/mockDataStore.js';

export const AssetFormPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    serial: '',
    model: '',
    brand: '',
    category: 'laptops',
    vendor: 'apple',
    purchaseDate: '',
    cost: '',
    notes: ''
  });

  const handleChange = (key, val) => {
    setFormData(prev => ({ ...prev, [key]: val }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const addAsset = useMockDataStore.getState().addAsset;
    
    // Capitalize category first letter
    const catName = formData.category.charAt(0).toUpperCase() + formData.category.slice(1);

    addAsset({
      name: formData.name,
      serial: formData.serial,
      category: catName,
      value: parseFloat(formData.cost) || 0.0,
      location: 'San Francisco HQ',
      purchaseDate: formData.purchaseDate || new Date().toISOString().split('T')[0],
      status: 'AVAILABLE'
    });
    
    navigate('/assets');
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      <PageTitle title="Register Asset" subtitle="Add new device hardware, licenses, or equipment to the inventory registry." />

      {/* Step Indicators */}
      <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-xl)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--sage-light)', zIndex: 0 }} />
        {[
          { num: 1, label: 'General Info' },
          { num: 2, label: 'Procurement' },
          { num: 3, label: 'Review & Upload' }
        ].map((s, idx) => (
          <div key={idx} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'var(--linen)', padding: '0 12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-full)',
              background: step >= s.num ? 'var(--sage)' : 'var(--stone)',
              color: step >= s.num ? 'var(--cloud)' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: '14px',
              marginBottom: '6px'
            }}>
              {s.num}
            </div>
            <span className="eyebrow" style={{ fontSize: '10px', color: step >= s.num ? 'var(--moss)' : 'var(--text-muted)' }}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="liora-card">
        {step === 1 && (
          <form onSubmit={handleNext}>
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Asset General Details</h3>
            <Input 
              label="Asset Name"
              placeholder="e.g. MacBook Pro M3 Max"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-md">
              <Input 
                label="Serial Number (S/N)"
                placeholder="e.g. SN-MBP-89210"
                value={formData.serial}
                onChange={(e) => handleChange('serial', e.target.value)}
                required
              />
              <Select 
                label="Category"
                options={[
                  { label: 'Laptops', value: 'laptops' },
                  { label: 'Monitors', value: 'monitors' },
                  { label: 'Mobile Devices', value: 'mobile' },
                  { label: 'Peripherals', value: 'peripherals' }
                ]}
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-md">
              <Input 
                label="Brand"
                placeholder="e.g. Apple"
                value={formData.brand}
                onChange={(e) => handleChange('brand', e.target.value)}
                required
              />
              <Input 
                label="Model Reference"
                placeholder="e.g. A2991"
                value={formData.model}
                onChange={(e) => handleChange('model', e.target.value)}
                required
              />
            </div>
            <div style={{ marginTop: 'var(--spacing-lg)', display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit" variant="primary">Continue to Procurement</Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleNext}>
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Procurement & Financial Info</h3>
            <div className="grid grid-cols-2 gap-md">
              <Select 
                label="Acquisition Vendor"
                options={[
                  { label: 'Apple Inc.', value: 'apple' },
                  { label: 'Dell Technology', value: 'dell' },
                  { label: 'Amazon', value: 'amazon' }
                ]}
                value={formData.vendor}
                onChange={(e) => handleChange('vendor', e.target.value)}
              />
              <Input 
                type="date"
                label="Purchase Date"
                value={formData.purchaseDate}
                onChange={(e) => handleChange('purchaseDate', e.target.value)}
                required
              />
            </div>
            <Input 
              type="number"
              label="Purchase Value ($ Cost)"
              placeholder="e.g. 2499.00"
              value={formData.cost}
              onChange={(e) => handleChange('cost', e.target.value)}
              required
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)', marginBottom: 'var(--spacing-md)' }}>
              <label className="eyebrow">Procurement Memo / Notes</label>
              <textarea 
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-input)',
                  border: '1px solid var(--sage-light)',
                  outline: 'none',
                  minHeight: '80px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px'
                }}
                placeholder="Details of warranty packages, purchase orders, or support logs..."
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
              />
            </div>
            <div style={{ marginTop: 'var(--spacing-lg)', display: 'flex', justifyContent: 'space-between' }}>
              <Button type="button" variant="secondary" onClick={handleBack}>Back</Button>
              <Button type="submit" variant="primary">Continue</Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Review & File Uploads</h3>
            
            {/* Image Upload box */}
            <div style={{
              border: '2px dashed var(--sage-light)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--spacing-xl)',
              textAlign: 'center',
              background: 'var(--linen)',
              marginBottom: 'var(--spacing-lg)',
              cursor: 'pointer'
            }}>
              <span className="eyebrow" style={{ fontSize: '11px', display: 'block', marginBottom: '8px' }}>Asset Media</span>
              <p style={{ color: 'var(--text-secondary)' }}>Drag and drop equipment images or invoice PDFs here</p>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Supports JPG, PNG, PDF up to 10MB</span>
            </div>

            {/* Form summary */}
            <div style={{ background: 'var(--stone)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-lg)', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '15px' }}>
              <div><strong>Name:</strong> {formData.name}</div>
              <div><strong>Serial Number:</strong> {formData.serial}</div>
              <div><strong>Cost:</strong> ${formData.cost}</div>
              <div><strong>Category:</strong> {formData.category}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type="button" variant="secondary" onClick={handleBack}>Back</Button>
              <Button type="submit" variant="primary">Confirm & Register</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AssetFormPage;
