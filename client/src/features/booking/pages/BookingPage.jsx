import React, { useState } from 'react';
import { useAssetStore } from '../../../store/assetStore.js';
import { useAuthStore } from '../../../store/authStore.js';

export default function BookingPage() {
  const { assets, bookings, bookResource } = useAssetStore();
  const { user } = useAuthStore();
  const sharedAssets = assets.filter(a => a.isSharedBookable);
  
  const [assetId, setAssetId] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [error, setError] = useState('');

  const handleBooking = (e) => {
    e.preventDefault();
    setError('');
    try {
      bookResource(assetId, user.id, start, end);
      setAssetId('');
      setStart('');
      setEnd('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Shared Resource Booking</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>
        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Reserve Resource</h3>
          {error && <div style={{ background: '#FFEBEE', color: 'var(--danger)', padding: '10px', borderRadius: '4px', fontSize: '13px', marginBottom: '16px' }}>{error}</div>}
          <form onSubmit={handleBooking}>
            <div className="form-group">
              <label className="form-label">Resource</label>
              <select className="select" value={assetId} onChange={e => setAssetId(e.target.value)} required>
                <option value="">Select Resource</option>
                {sharedAssets.map(a => <option key={a.id} value={a.id}>{a.name} ({a.location})</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Start Time</label>
              <input className="input" type="datetime-local" value={start} onChange={e => setStart(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">End Time</label>
              <input className="input" type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} required />
            </div>
            <button className="btn btn-secondary" type="submit" style={{ width: '100%' }}>Book Slot</button>
          </form>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Existing Reservations</h3>
          <div className="table-wrapper" style={{ border: 'none' }}>
            <table className="table">
              <thead>
                <tr><th>Resource</th><th>Booker</th><th>Start</th><th>End</th></tr>
              </thead>
              <tbody>
                {bookings.map(b => {
                  const res = assets.find(a => a.id === b.assetId);
                  return (
                    <tr key={b.id}>
                      <td>{res?.name}</td>
                      <td>Employee</td>
                      <td>{new Date(b.startTime).toLocaleString()}</td>
                      <td>{new Date(b.endTime).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}