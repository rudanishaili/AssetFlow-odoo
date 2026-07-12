import React from 'react';
import { useAssetStore } from '../../../store/assetStore.js';

export default function NotificationPage() {
  const { notifications, logs, markNotificationRead } = useAssetStore();

  return (
    <div>
      <h2>System Logs & Alerts</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>
        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>In-App Notifications</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {notifications.map(n => (
              <div key={n.id} style={{ padding: '12px 16px', background: n.isRead ? 'transparent' : 'var(--primary-light)', border: '1px solid var(--border)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '700' }}>{n.title}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{n.message}</p>
                </div>
                {!n.isRead && (
                  <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '11px' }} onClick={() => markNotificationRead(n.id)}>Dismiss</button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Activity Logs</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '400px', overflowY: 'auto' }}>
            {logs.map(log => (
              <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontWeight: '600' }}>{log.action}</span>
                <span style={{ color: 'var(--text-muted)' }}>{new Date(log.createdAt).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}