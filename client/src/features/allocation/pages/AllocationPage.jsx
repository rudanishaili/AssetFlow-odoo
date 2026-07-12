import React from 'react';
import PageTitle from '../../../common/layout/PageTitle';

export default function AllocationPage() {
  return (
    <div>
      <PageTitle title="Asset Allocations" subtitle="Assign assets to staff members, departments, or project teams." />
      <div style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Allocation lists and check-out logs appear here.</p>
      </div>
    </div>
  );
}
