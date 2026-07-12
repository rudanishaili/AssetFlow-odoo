import React, { useState } from 'react';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';

export const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'alert', title: 'Critical Maintenance Overdue', message: 'MacBook Pro #MBP-8931 requires scheduling for Q3 battery diagnostics.', time: '10m ago', read: false, actionRequired: true },
    { id: 2, type: 'info', title: 'Checkout Approved', message: 'Your request to book Meeting Room B Projector has been approved.', time: '2h ago', read: false, actionRequired: false },
    { id: 3, type: 'warning', title: 'Audit Verification Required', message: 'Self-audit verification campaign initialized for Dell Desktop #DD-102.', time: '1d ago', read: true, actionRequired: true },
    { id: 4, type: 'info', title: 'Asset Re-allocated', message: 'Asset #DM-112 moved from Engineering to Corporate Office.', time: '3d ago', read: true, actionRequired: false }
  ]);

  const toggleRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'alerts') return n.type === 'alert' || n.type === 'warning';
    if (activeTab === 'action') return n.actionRequired;
    if (activeTab === 'read') return n.read;
    return true; // all
  });

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'alert':
        return { background: 'var(--danger-light)', color: 'var(--danger)' };
      case 'warning':
        return { background: 'var(--warning-light)', color: 'var(--warning)' };
      default:
        return { background: 'var(--sage-light)', color: 'var(--moss)' };
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <PageTitle title="Notifications Center" subtitle="Stay updated with checkout logs, system warnings, and self-audits." />
        <div className="flex gap-sm">
          <Button variant="outline" size="sm" onClick={markAllRead}>Mark all read</Button>
          <Button variant="secondary" size="sm" onClick={clearAll}>Clear logs</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-md" style={{ borderBottom: '1px solid var(--surface-border)', paddingBottom: 'var(--spacing-xs)', marginBottom: 'var(--spacing-xl)' }}>
        {['all', 'alerts', 'action', 'read'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            style={{ 
              fontFamily: 'var(--font-body)',
              fontWeight: activeTab === tab ? 600 : 500,
              fontSize: '15px',
              color: activeTab === tab ? 'var(--moss)' : 'var(--text-secondary)',
              borderBottom: activeTab === tab ? '2px solid var(--moss)' : 'none',
              padding: '8px 16px',
              textTransform: 'capitalize'
            }}
          >
            {tab === 'action' ? 'Action Required' : tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="flex flex-col gap-md">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(n => (
            <div 
              key={n.id} 
              className="liora-card" 
              style={{ 
                padding: 'var(--spacing-lg)', 
                opacity: n.read ? 0.75 : 1,
                borderLeft: n.read ? '1px solid var(--surface-border)' : '4px solid var(--sage)'
              }}
            >
              <div className="flex justify-between items-start flex-responsive gap-sm">
                <div>
                  <div className="flex items-center gap-sm" style={{ marginBottom: 'var(--spacing-xs)' }}>
                    <span className="eyebrow" style={{ fontSize: '11px', ...getBadgeStyle(n.type), padding: '2px 8px', borderRadius: 'var(--radius-sm)' }}>
                      {n.type}
                    </span>
                    <h4 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--moss)' }}>{n.title}</h4>
                  </div>
                  <p style={{ color: 'var(--text-primary)', fontSize: '15px' }}>{n.message}</p>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px', display: 'inline-block' }}>{n.time}</span>
                </div>
                <div className="flex gap-sm">
                  {n.actionRequired && <Button variant="primary" size="sm">Review Action</Button>}
                  <Button variant="outline" size="sm" onClick={() => toggleRead(n.id)}>
                    {n.read ? 'Mark Unread' : 'Mark Read'}
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl) 0', color: 'var(--text-secondary)' }}>
            <p className="text-lg">All caught up! No notifications in this tab.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
