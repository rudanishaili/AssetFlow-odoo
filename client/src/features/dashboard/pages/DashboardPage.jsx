import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssetStore } from '../../../store/assetStore.js';
import { useAuthStore } from '../../../store/authStore.js';

export default function DashboardPage() {
  const assets = useAssetStore(state => state.assets);
  const bookings = useAssetStore(state => state.bookings);
  const assignments = useAssetStore(state => state.assignments);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const stats = {
    available: assets.filter(a => a.status === 'AVAILABLE').length,
    allocated: assets.filter(a => a.status === 'ALLOCATED').length,
    maintenance: assets.filter(a => a.status === 'UNDER_MAINTENANCE').length,
    bookings: bookings.length,
    overdue: assignments.filter(a => a.status === 'ACTIVE' && new Date(a.expectedReturnDate) < new Date()).length
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Operational Overview</h2>
      </div>
      
      <div className="grid-kpi">
        <div className="card">
          <div className="card-title">Assets Available</div>
          <div className="card-value">{stats.available}</div>
        </div>
        <div className="card">
          <div className="card-title">Assets Allocated</div>
          <div className="card-value">{stats.allocated}</div>
        </div>
        <div className="card">
          <div className="card-title">Active Bookings</div>
          <div className="card-value">{stats.bookings}</div>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
          <div className="card-title" style={{ color: 'var(--danger)' }}>Overdue Returns</div>
          <div className="card-value" style={{ color: 'var(--danger)' }}>{stats.overdue}</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '16px' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {['ADMIN', 'MANAGER'].includes(user?.role) && <button className="btn btn-primary" onClick={() => navigate('/assets')}>Register Asset</button>}
          <button className="btn btn-secondary" onClick={() => navigate('/bookings')}>Book Resource</button>
          <button className="btn btn-outline" onClick={() => navigate('/maintenance')}>Raise Maintenance Request</button>
        </div>
      </div>
    </div>
  );
}