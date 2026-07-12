import React, { useState } from 'react';
import { useAssetStore } from '../../../store/assetStore.js';
import { useAuthStore } from '../../../store/authStore.js';

export default function MaintenancePage() {
  const { assets, maintenance, raiseMaintenance, updateMaintenance } = useAssetStore();
  const { user } = useAuthStore();
  const [assetId, setAssetId] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('MEDIUM');

  const handleRaise = (e) => {
    e.preventDefault();
    raiseMaintenance(assetId, desc, priority);
    setAssetId('');
    setDesc('');
  };

  return (
    <div>
      <h2>Maintenance Requests</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px', marginTop: '24px' }}>
        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Raise Request</h3>
          <form onSubmit={handleRaise}>
            <div className="form-group">
              <label className="form-label">Asset</label>
              <select className="select" value={assetId} onChange={e => setAssetId(e.target.value)} required>
                <option value="">Select Asset</option>
                {assets.map(a => <option key={a.id} value={a.id}>{a.name} ({a.assetTag})</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Issue Details</label>
              <textarea className="textarea" value={desc} onChange={e => setDesc(e.target.value)} required rows="4"></textarea>
            </div>
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select className="select" value={priority} onChange={e => setPriority(e.target.value)}>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
            <button className="btn btn-outline" type="submit" style={{ width: '100%' }}>Submit Request</button>
          </form>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Repair Pipeline</h3>
          <div className="table-wrapper" style={{ border: 'none' }}>
            <table className="table">
              <thead>
                <tr><th>Asset</th><th>Priority</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {maintenance.map(m => {
                  const asset = assets.find(a => a.id === m.assetId);
                  return (
                    <tr key={m.id}>
                      <td>{asset?.name}</td>
                      <td><span className="badge badge-info">{m.priority}</span></td>
                      <td><span className={`badge ${m.status === 'PENDING' ? 'badge-warning' : 'badge-success'}`}>{m.status}</span></td>
                      <td>
                        {m.status === 'PENDING' && ['ADMIN', 'MANAGER'].includes(user?.role) && (
                          <button className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '11px' }} onClick={() => updateMaintenance(m.id, 'APPROVED')}>Approve</button>
                        )}
                        {m.status === 'APPROVED' && ['ADMIN', 'MANAGER'].includes(user?.role) && (
                          <button className="btn btn-primary" style={{ padding: '2px 8px', fontSize: '11px' }} onClick={() => updateMaintenance(m.id, 'RESOLVED', 'Issue fixed', 'Technician John', 120)}>Resolve</button>
                        )}
                      </td>
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