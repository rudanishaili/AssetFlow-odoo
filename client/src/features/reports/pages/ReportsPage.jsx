import React from 'react';
import PageTitle from '../../../common/layout/PageTitle';

export default function ReportsPage() {
  return (
    <div>
      <PageTitle title="Analytical Reports" subtitle="Generate system exports and asset lifecycle spreadsheets." />
      <div style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
        <p style={{ color: 'var(--text-secondary)' }}>PDF export generators and usage reports appear here.</p>
      </div>
    </div>
  );
}
