import React from 'react';
import PageTitle from '../../../common/layout/PageTitle';

export default function MaintenancePage() {
  return (
    <div>
      <PageTitle title="Maintenance Schedules" subtitle="Track hardware repairs, licensing renewals, and diagnostics." />
      <div style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Pending repairs and renewal logs appear here.</p>
      </div>
    </div>
  );
}
