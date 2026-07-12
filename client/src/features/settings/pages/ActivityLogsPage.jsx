import React from 'react';
import useMockDataStore from '../../../store/mockDataStore.js';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import { Clock, ShieldAlert } from 'lucide-react';

export const ActivityLogsPage = () => {
  const { activityLogs } = useMockDataStore();

  const getActionColor = (action) => {
    switch (action) {
      case 'CREATE':
      case 'REGISTER':
      case 'CREATE_DEPT':
      case 'CREATE_CAT':
        return { background: 'var(--success-light)', color: 'var(--success)' };
      case 'DELETE':
      case 'DELETE_DEPT':
      case 'DELETE_CAT':
        return { background: 'var(--danger-light)', color: 'var(--danger)' };
      case 'ALLOCATE':
      case 'TRANSFER_APPROVE':
        return { background: 'var(--primary-light)', color: 'var(--moss)' };
      default:
        return { background: 'var(--stone)', color: 'var(--text-secondary)' };
    }
  };

  return (
    <div>
      <PageTitle title="System Activity Logs" subtitle="Audit trails and real-time records of actions performed across AssetFlow." />

      <div className="liora-card" style={{ padding: 'var(--spacing-lg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--spacing-md)' }}>
          <ShieldAlert size={20} style={{ color: 'var(--moss)' }} />
          <h3 style={{ fontSize: '1.25rem' }}>Security & Audit Trail</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
          {activityLogs.map((log) => (
            <div 
              key={log.id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '16px', 
                borderBottom: '1px solid var(--linen)',
                flexWrap: 'wrap',
                gap: '12px'
              }}
              className="table-row-hover"
            >
              <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'flex-start' }}>
                <Clock size={18} style={{ color: 'var(--text-muted)', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <span style={{ fontWeight: 600, fontSize: '15px', display: 'block', color: 'var(--text-primary)' }}>
                    {log.details}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Performed by <strong style={{ color: 'var(--text-primary)' }}>{log.userName}</strong> (ID: {log.userId})
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                <span className="eyebrow" style={{ 
                  fontSize: '10px', 
                  padding: '3px 8px', 
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 600,
                  ...getActionColor(log.action)
                }}>
                  {log.action}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          ))}

          {activityLogs.length === 0 && (
            <div style={{ padding: 'var(--spacing-xl)', textAlign: 'center', color: 'var(--text-muted)' }}>
              No system activity logs found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityLogsPage;
