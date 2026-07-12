import React from 'react';
import useMockDataStore from '../../../store/mockDataStore.js';
import useAuthStore from '../../../store/authStore.js';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import { Package } from 'lucide-react';

export const DepartmentAssetsPage = () => {
  const { user } = useAuthStore();
  const { assets, employees } = useMockDataStore();

  const userDept = user?.department || '';

  // Get department employee IDs
  const deptEmployees = employees.filter(e => e.department === userDept);
  const deptEmployeeIds = deptEmployees.map(e => e.id);

  // Filter assets currently held by department employees
  const deptAssets = assets.filter(a => a.holderId && deptEmployeeIds.includes(a.holderId));

  const totalValue = deptAssets.reduce((sum, a) => sum + a.value, 0);

  return (
    <div>
      <PageTitle title="Department Assets" subtitle={`Track physical inventory checked out to staff members of the ${userDept} department.`} />

      {/* KPI Ribbon */}
      <div className="grid grid-cols-2 gap-lg" style={{ marginBottom: 'var(--spacing-xl)', maxWidth: '600px' }}>
        <div className="liora-card-stone">
          <span className="eyebrow" style={{ fontSize: '11px' }}>Department Assets Count</span>
          <h3 style={{ fontSize: '28px', marginTop: '4px' }}>{deptAssets.length}</h3>
        </div>
        <div className="liora-card-stone">
          <span className="eyebrow" style={{ fontSize: '11px' }}>Total Assets Capital Value</span>
          <h3 style={{ fontSize: '28px', marginTop: '4px' }}>${totalValue.toLocaleString()}</h3>
        </div>
      </div>

      <div className="liora-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--spacing-md)' }}>
          <Package size={20} style={{ color: 'var(--moss)' }} />
          <h3 style={{ fontSize: '1.25rem' }}>Allocated Assets Directory</h3>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Asset Name</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Asset Tag</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Category</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Employee</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Location</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Capital Value</th>
            </tr>
          </thead>
          <tbody>
            {deptAssets.map((asset) => (
              <tr key={asset.id} style={{ borderBottom: '1px solid var(--linen)' }} className="table-row-hover">
                <td style={{ padding: '16px 8px', fontWeight: 600 }}>{asset.name}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{asset.code}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{asset.category}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-primary)', fontWeight: 500 }}>{asset.holderName}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-muted)' }}>{asset.location}</td>
                <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>${asset.value.toLocaleString()}</td>
              </tr>
            ))}
            {deptAssets.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No assets are allocated to staff in your department yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentAssetsPage;
