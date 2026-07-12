import React, { useState } from 'react';
import useMockDataStore from '../../../store/mockDataStore.js';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import Select from '../../../common/ui/Select.jsx';
import { Users, Edit2, Check, X } from 'lucide-react';

export const EmployeesPage = () => {
  const { employees, departments, updateEmployee } = useMockDataStore();
  const [editingId, setEditingId] = useState(null);
  const [editRole, setEditRole] = useState('');
  const [editDept, setEditDept] = useState('');

  const handleEditClick = (emp) => {
    setEditingId(emp.id);
    setEditRole(emp.role);
    setEditDept(emp.department);
  };

  const handleSaveClick = (id) => {
    updateEmployee(id, { role: editRole, department: editDept });
    setEditingId(null);
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'ADMIN': return 'Admin';
      case 'MANAGER': return 'Asset Manager';
      case 'AUDITOR': return 'Dept Head';
      case 'EMPLOYEE': return 'Employee';
      default: return role;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN': return { background: 'var(--danger-light)', color: 'var(--danger)' };
      case 'MANAGER': return { background: 'var(--success-light)', color: 'var(--success)' };
      case 'AUDITOR': return { background: 'var(--warning-light)', color: 'var(--warning)' };
      default: return { background: 'var(--stone)', color: 'var(--text-secondary)' };
    }
  };

  const roleOptions = [
    { label: 'Admin', value: 'ADMIN' },
    { label: 'Asset Manager', value: 'MANAGER' },
    { label: 'Dept Head', value: 'AUDITOR' },
    { label: 'Employee', value: 'EMPLOYEE' }
  ];

  const deptOptions = departments.map(d => ({ label: d.name, value: d.name }));

  return (
    <div>
      <PageTitle title="Employee Registry" subtitle="Manage user account permission states, department groupings, and system access levels." />

      <div className="liora-card" style={{ padding: 'var(--spacing-lg)' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>Staff Directory</h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Name</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Email</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Department</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Role</th>
              <th style={{ padding: '12px 8px', textAlign: 'right' }} className="eyebrow">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} style={{ borderBottom: '1px solid var(--linen)' }} className="table-row-hover">
                <td style={{ padding: '16px 8px', fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={16} style={{ color: 'var(--sage)' }} />
                    <span>{emp.name}</span>
                  </div>
                </td>
                <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{emp.email}</td>
                
                {/* Department Field */}
                <td style={{ padding: '16px 8px' }}>
                  {editingId === emp.id ? (
                    <Select
                      options={deptOptions}
                      value={editDept}
                      onChange={(e) => setEditDept(e.target.value)}
                      style={{ marginBottom: 0, minWidth: '160px' }}
                    />
                  ) : (
                    <span style={{ color: 'var(--text-primary)' }}>{emp.department}</span>
                  )}
                </td>

                {/* Role Field */}
                <td style={{ padding: '16px 8px' }}>
                  {editingId === emp.id ? (
                    <Select
                      options={roleOptions}
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                      style={{ marginBottom: 0, minWidth: '140px' }}
                    />
                  ) : (
                    <span className="eyebrow" style={{ 
                      fontSize: '11px', 
                      padding: '4px 8px', 
                      borderRadius: 'var(--radius-sm)',
                      ...getRoleColor(emp.role)
                    }}>
                      {getRoleLabel(emp.role)}
                    </span>
                  )}
                </td>

                {/* Actions Field */}
                <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                  {editingId === emp.id ? (
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => handleSaveClick(emp.id)}
                        style={{ color: 'var(--success)', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
                        title="Save Changes"
                      >
                        <Check size={18} />
                      </button>
                      <button 
                        onClick={() => setEditingId(null)}
                        style={{ color: 'var(--danger)', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
                        title="Cancel"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleEditClick(emp)}
                      style={{ color: 'var(--moss)', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
                      title="Edit Permissions"
                    >
                      <Edit2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesPage;
