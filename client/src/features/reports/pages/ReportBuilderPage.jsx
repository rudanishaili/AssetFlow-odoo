import React, { useState } from 'react';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import Select from '../../../common/ui/Select.jsx';
import Input from '../../../common/ui/Input.jsx';
import BarChart from '../../../common/charts/BarChart.jsx';

export const ReportBuilderPage = () => {
  const [template, setTemplate] = useState('depreciation');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [exportFormat, setExportFormat] = useState('csv');

  const reportPreviewData = {
    depreciation: [
      { name: 'MacBook Pro 16" (2026)', initialValue: '$3,490', currentVal: '$2,800', ageMonths: '6', state: 'Active' },
      { name: 'Dell 32" Display', initialValue: '$890', currentVal: '$640', ageMonths: '12', state: 'Active' },
      { name: 'iPhone 15 Pro Max', initialValue: '$1,290', currentVal: '$950', ageMonths: '8', state: 'Active' }
    ],
    allocations: [
      { holder: 'Sarah Jenkins', department: 'Product Design', activeItems: '2', dateJoined: '2025-01-10' },
      { holder: 'Frank Miller', department: 'Executive HQ', activeItems: '1', dateJoined: '2026-02-15' }
    ],
    compliance: [
      { policyName: 'Q3 Self-Audit Review', targetScope: 'All laptops', passedCount: '82%', failedCount: '18%' }
    ]
  };

  const chartData = [
    { label: 'MacBook Pro', value: 2800 },
    { label: 'Dell Display', value: 640 },
    { label: 'iPhone 15', value: 950 }
  ];

  const handleExport = (e) => {
    e.preventDefault();
    alert(`Exporting ${template} report in ${exportFormat.toUpperCase()} format...`);
  };

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <PageTitle title="Analytical Report Builder" subtitle="Assemble customized inventory data reviews, project costs, and depreciation sheets." />
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr 2fr', gap: 'var(--spacing-xl)', alignItems: 'start' }}>
        
        {/* Report Builder Parameters Form */}
        <div className="liora-card">
          <form onSubmit={handleExport}>
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Report Configuration</h3>
            
            <Select 
              label="Select Template"
              options={[
                { label: 'Asset Cost & Depreciation', value: 'depreciation' },
                { label: 'Employee Allocation Logs', value: 'allocations' },
                { label: 'Campaign Policy Compliance', value: 'compliance' }
              ]}
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-md" style={{ marginBottom: 'var(--spacing-md)' }}>
              <Input 
                type="date"
                label="Timeline From"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
              <Input 
                type="date"
                label="Timeline To"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>

            <Select 
              label="Export Format"
              options={[
                { label: 'Comma-Separated Values (CSV)', value: 'csv' },
                { label: 'Adobe PDF document', value: 'pdf' }
              ]}
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
            />

            <Button type="submit" variant="primary" style={{ width: '100%', marginTop: 'var(--spacing-md)' }}>
              Generate & Download
            </Button>
          </form>
        </div>

        {/* Live Preview Display */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
          {template === 'depreciation' && (
            <BarChart title="Valuation Trends ($ USD)" data={chartData} />
          )}

          <div className="liora-card">
            <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Report Preview Matrix</h3>

            {template === 'depreciation' && (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                    <th style={{ padding: '8px' }} className="eyebrow">Asset</th>
                    <th style={{ padding: '8px' }} className="eyebrow">Purchase Cost</th>
                    <th style={{ padding: '8px' }} className="eyebrow">Current Value</th>
                    <th style={{ padding: '8px' }} className="eyebrow">Age (Months)</th>
                  </tr>
                </thead>
                <tbody>
                  {reportPreviewData.depreciation.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--linen)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: 600 }}>{row.name}</td>
                      <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>{row.initialValue}</td>
                      <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>{row.currentVal}</td>
                      <td style={{ padding: '12px 8px', color: 'var(--text-muted)' }}>{row.ageMonths} mo</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {template === 'allocations' && (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                    <th style={{ padding: '8px' }} className="eyebrow">Employee</th>
                    <th style={{ padding: '8px' }} className="eyebrow">Department</th>
                    <th style={{ padding: '8px' }} className="eyebrow">Allocated Assets</th>
                  </tr>
                </thead>
                <tbody>
                  {reportPreviewData.allocations.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--linen)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: 600 }}>{row.holder}</td>
                      <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>{row.department}</td>
                      <td style={{ padding: '12px 8px', color: 'var(--text-muted)' }}>{row.activeItems} items</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {template === 'compliance' && (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                    <th style={{ padding: '8px' }} className="eyebrow">Audit Campaign Name</th>
                    <th style={{ padding: '8px' }} className="eyebrow">Passed rate</th>
                    <th style={{ padding: '8px' }} className="eyebrow">Discrepancy Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {reportPreviewData.compliance.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--linen)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: 600 }}>{row.policyName}</td>
                      <td style={{ padding: '12px 8px', color: 'var(--success)' }}>{row.passedCount}</td>
                      <td style={{ padding: '12px 8px', color: 'var(--danger)' }}>{row.failedCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilderPage;
