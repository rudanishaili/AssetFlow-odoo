import React from 'react';
import PageTitle from '../../../common/layout/PageTitle';

export default function ProfilePage() {
  return (
    <div>
      <PageTitle title="My Account" subtitle="View details and check out allocations history." />
      <div style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
        <p style={{ color: 'var(--text-secondary)' }}>User account parameters and allocated items display here.</p>
      </div>
    </div>
  );
}
