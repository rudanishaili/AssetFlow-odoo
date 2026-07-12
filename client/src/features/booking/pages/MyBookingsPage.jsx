import React from 'react';
import { useNavigate } from 'react-router-dom';
import useMockDataStore from '../../../store/mockDataStore.js';
import useAuthStore from '../../../store/authStore.js';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import { CalendarDays } from 'lucide-react';

export const MyBookingsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { bookings } = useMockDataStore();

  const userId = user?.id || '';

  // Get current user's bookings
  const myBookingsList = bookings.filter(b => b.userId === userId);

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return { background: 'var(--warning-light)', color: 'var(--warning)' };
      case 'APPROVED': return { background: 'var(--success-light)', color: 'var(--success)' };
      default: return { background: 'var(--danger-light)', color: 'var(--danger)' };
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <PageTitle title="My Bookings" subtitle="Review the status and schedules of your shared asset reservation requests." />
        <Button variant="primary" onClick={() => navigate('/book-resource')}>
          <CalendarDays size={16} style={{ marginRight: '8px' }} /> Reserve Resource
        </Button>
      </div>

      <div className="liora-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--spacing-md)' }}>
          <CalendarDays size={20} style={{ color: 'var(--moss)' }} />
          <h3 style={{ fontSize: '1.25rem' }}>Reservation Logs</h3>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Equipment</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Purpose</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Scheduled Date</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Duration</th>
              <th style={{ padding: '12px 8px' }} className="eyebrow">Status</th>
            </tr>
          </thead>
          <tbody>
            {myBookingsList.map(b => {
              const start = new Date(b.startDate);
              const end = new Date(b.endDate);
              const durationHours = Math.round((end - start) / 3600000);

              return (
                <tr key={b.id} style={{ borderBottom: '1px solid var(--linen)' }} className="table-row-hover">
                  <td style={{ padding: '16px 8px', fontWeight: 600 }}>{b.assetName}</td>
                  <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{b.purpose || '—'}</td>
                  <td style={{ padding: '16px 8px', color: 'var(--text-muted)' }}>
                    {start.toLocaleDateString()}
                  </td>
                  <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>
                    {durationHours} {durationHours === 1 ? 'hour' : 'hours'}
                  </td>
                  <td style={{ padding: '16px 8px' }}>
                    <span className="eyebrow" style={{ 
                      fontSize: '10px', 
                      padding: '3px 8px', 
                      borderRadius: 'var(--radius-sm)',
                      ...getStatusColor(b.status)
                    }}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              );
            })}
            {myBookingsList.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  You have no resource bookings scheduled yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookingsPage;
