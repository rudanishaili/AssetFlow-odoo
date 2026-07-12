import React from 'react';
import PageTitle from '../../../common/layout/PageTitle';

export default function BookingPage() {
  return (
    <div>
      <PageTitle title="Asset Bookings" subtitle="Manage bookings for shared resources like projectors and conference rooms." />
      <div style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Resource booking calendars and schedules appear here.</p>
      </div>
    </div>
  );
}
