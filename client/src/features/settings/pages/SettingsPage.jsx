import React from 'react';
import PageTitle from '../../../common/layout/PageTitle';

export default function SettingsPage() {
  return (
    <div>
      <PageTitle title="System Settings" subtitle="Configure defaults, categories, and maintenance parameters." />
      <div style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
        <p style={{ color: 'var(--text-secondary)' }}>System options and configurations appear here.</p>
      </div>
    </div>
  );
}
