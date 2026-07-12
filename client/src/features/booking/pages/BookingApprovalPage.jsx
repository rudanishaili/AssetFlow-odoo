import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';

export const BookingApprovalPage = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([
    { id: 1, assetName: 'Team Tesla Model Y', reservedBy: 'Frank Miller', date: '2026-07-13', timeSlot: '09:00 AM - 05:00 PM', conflict: false },
    { id: 2, assetName: 'Conference Projector A', reservedBy: 'Sarah Jenkins', date: '2026-07-12', timeSlot: '10:00 AM - 12:00 PM', conflict: true, conflictDetails: 'Overlap with Board meeting in Room B.' }
  ]);

  const handleApprove = (id) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  const handleReject = (id) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <PageTitle title="Booking Approvals" subtitle="Review shared resources reservations, check schedules, and manage approvals." />
        <Button variant="outline" onClick={() => navigate('/bookings')}>Back to Scheduler</Button>
      </div>

      <div className="liora-card">
        <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Pending Requests</h3>

        {requests.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            {requests.map(req => (
              <div 
                key={req.id} 
                className="liora-card-stone" 
                style={{ 
                  padding: 'var(--spacing-md) var(--spacing-lg)',
                  borderLeft: req.conflict ? '4px solid var(--danger)' : '1px solid var(--sage-light)'
                }}
              >
                <div className="flex justify-between items-center flex-responsive gap-sm">
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 600 }}>{req.assetName}</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Reserved by: {req.reservedBy}</p>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Date: {req.date} • {req.timeSlot}</p>

                    {req.conflict && (
                      <div style={{ 
                        marginTop: '12px', 
                        padding: '8px 12px', 
                        background: 'var(--danger-light)', 
                        color: 'var(--danger)', 
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '13px',
                        fontWeight: 500
                      }}>
                        ⚠️ schedule Conflict: {req.conflictDetails}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-sm">
                    <Button variant="primary" size="sm" onClick={() => handleApprove(req.id)}>Approve</Button>
                    <Button variant="danger" size="sm" onClick={() => handleReject(req.id)}>Reject</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl) 0', color: 'var(--text-secondary)' }}>
            All booking requests have been resolved. Nice work!
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingApprovalPage;
