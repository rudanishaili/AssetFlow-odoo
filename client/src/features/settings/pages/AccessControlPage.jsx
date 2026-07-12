import React, { useState } from 'react';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import Select from '../../../common/ui/Select.jsx';

export const AccessControlPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin User', email: 'admin@assetflow.com', role: 'Admin', department: 'Operations' },
    { id: 2, name: 'Sarah Jenkins', email: 'sarah.j@assetflow.com', role: 'Asset Manager', department: 'Product Design' },
    { id: 3, name: 'Frank Miller', email: 'frank.m@assetflow.com', role: 'Department Head', department: 'Executive HQ' },
    { id: 4, name: 'Alice Smith', email: 'alice.s@assetflow.com', role: 'Employee', department: 'Engineering' }
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [newRole, setNewRole] = useState('Employee');

  const handleRoleChangeClick = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setShowRoleModal(true);
  };

  const handleSaveRole = () => {
    setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, role: newRole } : u));
    setShowRoleModal(false);
  };

  return (
    <div>
      <PageTitle title="Access Control & Permissions" subtitle="Manage corporate user registry accounts, assign permissions, and adjust system credentials." />

      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)', alignItems: 'start' }}>
        
        {/* User Registry List */}
        <div className="liora-card">
          <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>System Users Directory</h3>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                <th style={{ padding: '8px' }} className="eyebrow">Name</th>
                <th style={{ padding: '8px' }} className="eyebrow">Email</th>
                <th style={{ padding: '8px' }} className="eyebrow">Role</th>
                <th style={{ padding: '8px' }} className="eyebrow">Department</th>
                <th style={{ padding: '8px' }} className="eyebrow">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid var(--linen)' }}>
                  <td style={{ padding: '16px 8px', fontWeight: 600 }}>{u.name}</td>
                  <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{u.email}</td>
                  <td style={{ padding: '16px 8px' }}>
                    <span className="eyebrow" style={{ 
                      fontSize: '11px', 
                      background: u.role === 'Admin' ? 'var(--danger-light)' : u.role === 'Asset Manager' ? 'var(--sage-light)' : 'var(--stone)',
                      color: u.role === 'Admin' ? 'var(--danger)' : u.role === 'Asset Manager' ? 'var(--moss)' : 'var(--text-secondary)',
                      padding: '4px 8px',
                      borderRadius: 'var(--radius-sm)'
                    }}>{u.role}</span>
                  </td>
                  <td style={{ padding: '16px 8px', color: 'var(--text-muted)' }}>{u.department}</td>
                  <td style={{ padding: '16px 8px' }}>
                    <Button variant="outline" size="sm" onClick={() => handleRoleChangeClick(u)}>Edit Role</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Global Security Settings Configurations */}
        <div className="liora-card-stone">
          <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Global Settings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <div>
              <label style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
                <input type="checkbox" defaultChecked style={{ cursor: 'pointer' }} />
                <span>Enforce Multi-Factor Auth (MFA)</span>
              </label>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', marginLeft: '20px' }}>Requires employees to bind authentication applications.</p>
            </div>
            <div>
              <label style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
                <input type="checkbox" defaultChecked style={{ cursor: 'pointer' }} />
                <span>Single Sign-On (SSO) login</span>
              </label>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', marginLeft: '20px' }}>Enable Microsoft Azure Active Directory integrations.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Role Modal */}
      {showRoleModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(43,42,37,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="liora-card" style={{ maxWidth: '400px', width: '90%', position: 'relative' }}>
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Modify User Authorization</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)', fontSize: '14px' }}>
              Assign role settings for <strong>{selectedUser?.name}</strong>.
            </p>

            <Select 
              label="Select System Permission Group"
              options={[
                { label: 'Administrator', value: 'Admin' },
                { label: 'Asset Manager', value: 'Asset Manager' },
                { label: 'Department Head', value: 'Department Head' },
                { label: 'Employee Registry Access', value: 'Employee' }
              ]}
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            />

            <div className="flex gap-sm" style={{ marginTop: 'var(--spacing-md)' }}>
              <Button variant="primary" style={{ flex: 1 }} onClick={handleSaveRole}>Save Permission</Button>
              <Button variant="secondary" onClick={() => setShowRoleModal(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessControlPage;
