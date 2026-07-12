import React, { useState } from 'react';
import useMockDataStore from '../../../store/mockDataStore.js';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import Input from '../../../common/ui/Input.jsx';
import { Building2, Plus, Trash2 } from 'lucide-react';

export const DepartmentsPage = () => {
  const { departments, addDepartment, deleteDepartment } = useMockDataStore();
  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptCode, setNewDeptCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!newDeptName || !newDeptCode) {
      setError('Please fill in both name and code.');
      return;
    }

    if (departments.some(d => d.name.toLowerCase() === newDeptName.toLowerCase() || d.code.toLowerCase() === newDeptCode.toLowerCase())) {
      setError('A department with this name or code already exists.');
      return;
    }

    addDepartment({ name: newDeptName, code: newDeptCode.toUpperCase() });
    setNewDeptName('');
    setNewDeptCode('');
  };

  return (
    <div>
      <PageTitle title="Manage Departments" subtitle="Configure and list organization departments for asset allocation grouping." />

      <div className="grid" style={{ gridTemplateColumns: '1fr 2fr', gap: 'var(--spacing-xl)' }}>
        {/* Create Department Form */}
        <div className="liora-card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>Add Department</h3>
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ color: 'var(--danger)', background: 'var(--danger-light)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '16px', fontSize: '14px' }}>
                {error}
              </div>
            )}
            <Input
              type="text"
              label="Department Name"
              placeholder="e.g. Quality Assurance"
              value={newDeptName}
              onChange={(e) => setNewDeptName(e.target.value)}
              required
            />
            <Input
              type="text"
              label="Code / Acronym"
              placeholder="e.g. QA"
              value={newDeptCode}
              onChange={(e) => setNewDeptCode(e.target.value)}
              required
            />
            <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '8px' }}>
              <Plus size={16} style={{ marginRight: '8px' }} /> Create Department
            </Button>
          </form>
        </div>

        {/* Departments List */}
        <div className="liora-card" style={{ padding: 'var(--spacing-lg)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>Active Departments</h3>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                <th style={{ padding: '12px 8px' }} className="eyebrow">Department Name</th>
                <th style={{ padding: '12px 8px' }} className="eyebrow">Acronym / Code</th>
                <th style={{ padding: '12px 8px', textAlign: 'right' }} className="eyebrow">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--linen)' }} className="table-row-hover">
                  <td style={{ padding: '16px 8px', fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Building2 size={16} style={{ color: 'var(--sage)' }} />
                      <span>{dept.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>
                    <span style={{ background: 'var(--stone)', padding: '4px 8px', borderRadius: 'var(--radius-sm)', fontSize: '12px', fontWeight: 600 }}>
                      {dept.code}
                    </span>
                  </td>
                  <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                    <button 
                      onClick={() => deleteDepartment(dept.name)}
                      style={{ color: 'var(--danger)', background: 'transparent', padding: '4px 8px', border: 'none', cursor: 'pointer' }}
                      title="Delete Department"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {departments.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>No departments registered.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DepartmentsPage;
