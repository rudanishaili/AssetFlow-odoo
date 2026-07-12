import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMockDataStore from '../../../store/mockDataStore.js';
import useAuthStore from '../../../store/authStore.js';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import Input from '../../../common/ui/Input.jsx';
import Select from '../../../common/ui/Select.jsx';
import { CalendarDays } from 'lucide-react';

export const BookResourcePage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { assets, addBooking } = useMockDataStore();

  const userId = user?.id || '';

  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [duration, setDuration] = useState('1');
  const [purpose, setPurpose] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedAssetId || !bookingDate || !purpose) {
      setError('Please fill in all booking fields.');
      return;
    }

    addBooking({
      assetId: selectedAssetId,
      userId: userId,
      startDate: `${bookingDate}T09:00:00Z`,
      endDate: `${bookingDate}T${9 + parseInt(duration)}:00:00Z`,
      purpose: purpose,
      status: 'PENDING'
    });

    navigate('/my-bookings');
  };

  const bookableAssets = assets.filter(a => a.status === 'AVAILABLE' || a.status === 'RESERVED');

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <PageTitle title="Book Resource" subtitle="Request booking access for shared company assets, meeting facilities, or vehicles." />

      <div className="liora-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--spacing-md)' }}>
          <CalendarDays size={20} style={{ color: 'var(--moss)' }} />
          <h3 style={{ fontSize: '1.25rem' }}>Resource Booking Form</h3>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{ color: 'var(--danger)', background: 'var(--danger-light)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
              {error}
            </div>
          )}

          <Select
            label="Select Resource / Asset"
            options={[
              { label: 'Choose shared equipment...', value: '' },
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
              label="Duration (Hours)"
              options={[
                { label: '1 hour', value: '1' },
                { label: '2 hours', value: '2' },
                { label: 'Half Day (4h)', value: '4' },
                { label: 'Full Day (8h)', value: '8' }
              ]}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <Input
            label="Purpose of Booking"
            placeholder="e.g. Workshop, client presentation, field survey..."
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          />

          <div className="flex gap-sm" style={{ marginTop: 'var(--spacing-lg)' }}>
            <Button type="submit" variant="primary" style={{ flex: 1 }}>Submit Booking Request</Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/dashboard')}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookResourcePage;
