import React, { useState } from 'react';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import Input from '../../../common/ui/Input.jsx';

export const MasterDataPage = () => {
  const [activeConfig, setActiveConfig] = useState('categories');
  const [items, setItems] = useState({
    categories: [
      { id: 1, name: 'Laptops', code: 'LAP', count: 480 },
      { id: 2, name: 'Monitors', code: 'MON', count: 320 },
      { id: 3, name: 'Mobile Devices', code: 'MOB', count: 210 }
    ],
    departments: [
      { id: 1, name: 'Engineering', lead: 'Marcus Vance', count: 120 },
      { id: 2, name: 'Product Design', lead: 'Sarah Jenkins', count: 40 },
      { id: 3, name: 'Sales & Marketing', lead: 'Tom Brady', count: 85 }
    ],
    locations: [
      { id: 1, name: 'San Francisco HQ', address: '100 Pine St, SF', count: 680 },
      { id: 2, name: 'New York Hub', address: '200 Park Ave, NYC', count: 310 },
      { id: 3, name: 'London Office', address: '50 Broadgate, LDN', count: 120 }
    ],
    vendors: [
      { id: 1, name: 'Apple Inc.', contact: 'enterprise@apple.com', count: 610 },
      { id: 2, name: 'Dell Technology', contact: 'sales@dell.com', count: 420 },
      { id: 3, name: 'Amazon Web Services', contact: 'aws-support@amazon.com', count: 180 }
    ]
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newExtra, setNewExtra] = useState(''); // code, lead, address, or contact depending on config type

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newName || !newExtra) return;

    const newItem = {
      id: Date.now(),
      name: newName,
      count: 0
    };

    if (activeConfig === 'categories') newItem.code = newExtra.toUpperCase();
    if (activeConfig === 'departments') newItem.lead = newExtra;
    if (activeConfig === 'locations') newItem.address = newExtra;
    if (activeConfig === 'vendors') newItem.contact = newExtra;

    setItems(prev => ({
      ...prev,
      [activeConfig]: [...prev[activeConfig], newItem]
    }));

    setNewName('');
    setNewExtra('');
    setShowAddModal(false);
  };

  const getExtraFieldLabel = () => {
    switch (activeConfig) {
      case 'categories': return 'Category Code (e.g. LAP)';
      case 'departments': return 'Department Lead';
      case 'locations': return 'Street Address';
      case 'vendors': return 'Contact Email';
      default: return 'Metadata';
    }
  };

  return (
    <div>
      <PageTitle title="Master Data Configuration" subtitle="Define core organizational categories, sites, departments, and vendors." />

      <div className="grid" style={{ gridTemplateColumns: '240px 1fr', gap: 'var(--spacing-xl)', alignItems: 'start' }}>
        {/* Navigation Sidebar */}
        <div className="liora-card-stone" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)', padding: 'var(--spacing-md)' }}>
          {[
            { id: 'categories', label: 'Categories' },
            { id: 'departments', label: 'Departments' },
            { id: 'locations', label: 'Locations' },
            { id: 'vendors', label: 'Vendors' }
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setActiveConfig(opt.id)}
              style={{
                textAlign: 'left',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                fontWeight: activeConfig === opt.id ? 600 : 500,
                background: activeConfig === opt.id ? 'var(--sage-light)' : 'transparent',
                color: activeConfig === opt.id ? 'var(--moss)' : 'var(--text-secondary)',
                transition: 'background var(--transition-fast)'
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Configurations Table */}
        <div className="liora-card">
          <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 style={{ textTransform: 'capitalize' }}>{activeConfig} List</h3>
            <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>Add {activeConfig.slice(0, -1)}</Button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                <th style={{ padding: '12px 8px' }} className="eyebrow">Name</th>
                {activeConfig === 'categories' && <th style={{ padding: '12px 8px' }} className="eyebrow">Code</th>}
                {activeConfig === 'departments' && <th style={{ padding: '12px 8px' }} className="eyebrow">Lead</th>}
                {activeConfig === 'locations' && <th style={{ padding: '12px 8px' }} className="eyebrow">Address</th>}
                {activeConfig === 'vendors' && <th style={{ padding: '12px 8px' }} className="eyebrow">Contact</th>}
                <th style={{ padding: '12px 8px' }} className="eyebrow">Assets Count</th>
              </tr>
            </thead>
            <tbody>
              {items[activeConfig].map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--linen)' }}>
                  <td style={{ padding: '16px 8px', fontWeight: 600 }}>{item.name}</td>
                  {activeConfig === 'categories' && <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{item.code}</td>}
                  {activeConfig === 'departments' && <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{item.lead}</td>}
                  {activeConfig === 'locations' && <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{item.address}</td>}
                  {activeConfig === 'vendors' && <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{item.contact}</td>}
                  <td style={{ padding: '16px 8px', color: 'var(--text-muted)' }}>{item.count} items</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(43,42,37,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <form onSubmit={handleAddItem} className="liora-card" style={{ maxWidth: '400px', width: '90%', position: 'relative' }}>
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Add New {activeConfig.slice(0, -1)}</h3>
            
            <Input 
              type="text"
              label="Name"
              placeholder={`e.g. ${activeConfig === 'categories' ? 'Software Licenses' : 'Finance'}`}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />

            <Input 
              type="text"
              label={getExtraFieldLabel()}
              placeholder="e.g. Detail description..."
              value={newExtra}
              onChange={(e) => setNewExtra(e.target.value)}
              required
            />

            <div className="flex gap-sm" style={{ marginTop: 'var(--spacing-md)' }}>
              <Button type="submit" variant="primary" style={{ flex: 1 }}>Save</Button>
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MasterDataPage;
