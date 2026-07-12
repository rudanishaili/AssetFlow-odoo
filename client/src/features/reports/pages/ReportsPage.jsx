import React from 'react';
import { useAssetStore } from '../../../store/assetStore.js';

export default function ReportsPage() {
  const assets = useAssetStore(state => state.assets);
  const bookings = useAssetStore(state => state.bookings);
  const maintenance = useAssetStore(state => state.maintenance);

  return (
    <div>
      <h2>Reports & Operational Analytics</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>
        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Asset Utilization Split</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>Distribution of assets across states</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600' }}><span>Available</span><span>{assets.filter(a => a.status === 'AVAILABLE').length}</span></div>
              <div style={{ height: '8px', background: '#ECEFF1', borderRadius: '4px', marginTop: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(assets.filter(a => a.status === 'AVAILABLE').length / assets.length) * 100}%`, height: '100%', background: 'var(--success)' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600' }}><span>Allocated</span><span>{assets.filter(a => a.status === 'ALLOCATED').length}</span></div>
              <div style={{ height: '8px', background: '#ECEFF1', borderRadius: '4px', marginTop: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(assets.filter(a => a.status === 'ALLOCATED').length / assets.length) * 100}%`, height: '100%', background: 'var(--secondary)' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Resource Bookings Heatmap</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Peak activity slots calendar representation</p>
          <div className="heatmap-grid">
            <div className="heatmap-cell level-high">Mon</div>
            <div className="heatmap-cell level-med">Tue</div>
            <div className="heatmap-cell level-high">Wed</div>
            <div className="heatmap-cell level-low">Thu</div>
            <div className="heatmap-cell level-med">Fri</div>
            <div className="heatmap-cell level-low">Sat</div>
            <div className="heatmap-cell level-low">Sun</div>
          </div>
        </div>
      </div>
    </div>
  );
}