import React from 'react';
import PageTitle from '../../../common/layout/PageTitle';

export default function NotificationPage() {
  return (
    <div>
      <PageTitle title="System Notifications" subtitle="View logs and recent alerts for maintenance or booking updates." />
      <div style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
        <p style={{ color: 'var(--text-secondary)' }}>System alert logs and warning triggers appear here.</p>
      </div>
    </div>
  );
}
