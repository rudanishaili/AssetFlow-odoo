import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import Input from '../../../common/ui/Input.jsx';
import Select from '../../../common/ui/Select.jsx';
import useMockDataStore from '../../../store/mockDataStore.js';
import useAuthStore from '../../../store/authStore.js';
import { CalendarDays, Check, X, PlusCircle } from 'lucide-react';

export const BookingOverviewPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { 
    bookings, 
    assets, 
    employees, 
    addBooking, 
    updateBookingStatus 
  } = useMockDataStore();

  const role = user?.role || 'EMPLOYEE';
  const userId = user?.id || '';
  const userDept = user?.department || '';

  const [activeCategory, setActiveCategory] = useState('all');
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Form states for employee reservation
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [duration, setDuration] = useState('1'); // hours
  const [purpose, setPurpose] = useState('');
  const [error, setError] = useState('');

  // Filter bookings based on active category
  const filteredBookings = bookings.filter(b => {
    const asset = assets.find(a => a.id === b.assetId);
    if (!asset) return true;
    if (activeCategory === 'all') return true;
    return asset.category.toLowerCase() === activeCategory.toLowerCase();
  });

  // Filter pending approvals for Department Head (bookings from their department employees)
  const pendingApprovals = bookings.filter(b => {
    if (b.status !== 'PENDING') return false;
    const employee = employees.find(e => e.id === b.userId);
    return employee && employee.department === userDept;
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedAssetId || !bookingDate || !purpose) {
      setError('Please fill in all booking fields.');
      return;
    }

    // Call store action
    addBooking({
      assetId: selectedAssetId,
      userId: userId,
      startDate: `${bookingDate}T09:00:00Z`,
      endDate: `${bookingDate}T${9 + parseInt(duration)}:00:00Z`,
      purpose: purpose,
      status: 'PENDING'
    });

    setShowBookingModal(false);
    setSelectedAssetId('');
    setBookingDate('');
    setPurpose('');
  };

  // Find bookable shared assets (e.g. status AVAILABLE or RESERVED)
  const bookableAssets = assets.filter(a => a.status === 'AVAILABLE' || a.status === 'RESERVED');

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
        <PageTitle title="Booking Calendar" subtitle="Reserve team conference rooms, laboratory hardware, or schedule upcoming checkout times." />
        {role === 'EMPLOYEE' && (
          <Button variant="primary" onClick={() => setShowBookingModal(true)}>
            <PlusCircle size={16} style={{ marginRight: '8px' }} /> Reserve Resource
          </Button>
        )}
      </div>

      {/* Approvals Panel visible to Department Head */}
      {role === 'AUDITOR' && pendingApprovals.length > 0 && (
        <div className="liora-card" style={{ marginBottom: 'var(--spacing-xl)', borderLeft: '4px solid var(--warning)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>
            ⚠️ Booking Approvals Required ({pendingApprovals.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
            {pendingApprovals.map(req => (
              <div 
                key={req.id} 
                className="liora-card-stone" 
                style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}
              >
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 600 }}>{req.assetName}</h4>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    Requested by <strong style={{ color: 'var(--text-primary)' }}>{req.userName}</strong> for: "{req.purpose}"
                  </span>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Scheduled: {new Date(req.startDate).toLocaleDateString()} at 9:00 AM
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button variant="primary" size="sm" onClick={() => updateBookingStatus(req.id, 'APPROVED')}>
                    <Check size={14} style={{ marginRight: '4px' }} /> Approve
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => updateBookingStatus(req.id, 'REJECTED')}>
                    <X size={14} style={{ marginRight: '4px' }} /> Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories Tabs */}
      <div className="flex gap-md" style={{ borderBottom: '1px solid var(--surface-border)', paddingBottom: 'var(--spacing-xs)', marginBottom: 'var(--spacing-xl)' }}>
        {[
          { id: 'all', label: 'All Shared Assets' },
          { id: 'laptops', label: 'Laptops' },
          { id: 'monitors', label: 'Monitors & AV' },
          { id: 'mobile devices', label: 'Mobile Devices' }
        ].map(tab => (
          <button 
            key={tab.id} 
            onClick={() => setActiveCategory(tab.id)}
            style={{ 
              fontFamily: 'var(--font-body)',
              fontWeight: activeCategory === tab.id ? 600 : 500,
              fontSize: '15px',
              color: activeCategory === tab.id ? 'var(--moss)' : 'var(--text-secondary)',
              borderBottom: activeCategory === tab.id ? '2px solid var(--moss)' : 'none',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 16px',
              textTransform: 'capitalize'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Booking visual schedule and details */}
      <div className="grid" style={{ gridTemplateColumns: '2fr 1.2fr', gap: 'var(--spacing-xl)', alignItems: 'start' }}>
        
        {/* Weekly visual calendar grid */}
        <div className="liora-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--spacing-md)' }}>
            <CalendarDays size={20} style={{ color: 'var(--moss)' }} />
            <h3 style={{ fontSize: '1.25rem' }}>Weekly Reservation Grid</h3>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--spacing-xs)', textAlign: 'center' }}>
            {['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16'].map((day, idx) => {
              const dayNum = 12 + idx;
              const dayBookings = bookings.filter(b => {
                const date = new Date(b.startDate);
                return date.getDate() === dayNum && b.status === 'APPROVED';
              });

              return (
                <div key={idx} style={{ background: 'var(--stone)', borderRadius: 'var(--radius-md)', padding: '16px 8px', minHeight: '180px' }}>
                  <span className="eyebrow" style={{ fontSize: '11px', display: 'block', marginBottom: '12px' }}>{day}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {dayBookings.map(b => (
                      <div 
                        key={b.id} 
                        style={{ 
                          background: 'var(--cloud)', 
                          border: '1px solid var(--sage-light)', 
                          borderRadius: 'var(--radius-sm)', 
                          padding: '8px', 
                          fontSize: '11px', 
                          textAlign: 'left',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        <strong style={{ display: 'block', color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          {b.assetName}
                        </strong>
                        <span style={{ color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>{b.userName}</span>
                      </div>
                    ))}
                    {dayBookings.length === 0 && (
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', display: 'block', marginTop: '24px' }}>Free</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed active reservations */}
        <div className="liora-card-stone" style={{ padding: 'var(--spacing-lg)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>Active Reservations</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            {filteredBookings.map(b => (
              <div key={b.id} style={{ background: 'var(--cloud)', borderRadius: 'var(--radius-md)', padding: '16px', boxShadow: 'var(--shadow-sm)' }}>
                <div className="flex justify-between items-start" style={{ marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 600 }}>{b.assetName}</h4>
                  <span className="eyebrow" style={{ 
                    fontSize: '9px',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-sm)',
                    ...getStatusColor(b.status)
                  }}>{b.status}</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Reserved by: {b.userName}</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Date: {new Date(b.startDate).toLocaleDateString()}
                </p>
                {b.purpose && (
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '2px' }}>
                    Purpose: "{b.purpose}"
                  </p>
                )}
              </div>
            ))}
            {filteredBookings.length === 0 && (
              <div style={{ textAlign: 'center', padding: '16px', color: 'var(--text-muted)' }}>
                No active bookings in this classification.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(43,42,37,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <form onSubmit={handleBookingSubmit} className="liora-card" style={{ maxWidth: '440px', width: '90%', position: 'relative', margin: 'auto' }}>
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Reserve Shared Asset</h3>
            
            {error && (
              <div style={{ color: 'var(--danger)', background: 'var(--danger-light)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', marginBottom: '12px', fontSize: '13px' }}>
                {error}
              </div>
            )}

            <Select 
              label="Select Equipment"
              options={[
                { label: 'Choose resource...', value: '' },
                ...bookableAssets.map(a => ({ label: `${a.name} (${a.code})`, value: a.id }))
              ]}
              value={selectedAssetId}
              onChange={(e) => setSelectedAssetId(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-md">
              <Input 
                type="date"
                label="Reservation Date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                required
              />
              <Select 
                label="Duration"
                options={[
                  { label: '1 hour', value: '1' },
                  { label: '2 hours', value: '2' },
                  { label: 'Full Day (8h)', value: '8' }
                ]}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <Input 
              label="Reason for Booking"
              placeholder="e.g. Client presentation demo..."
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
            />

            <div className="flex gap-sm" style={{ marginTop: 'var(--spacing-md)' }}>
              <Button type="submit" variant="primary" style={{ flex: 1 }}>Submit Reservation</Button>
              <Button type="button" variant="secondary" onClick={() => setShowBookingModal(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingOverviewPage;
