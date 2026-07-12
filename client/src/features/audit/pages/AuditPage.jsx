import React, { useState } from 'react';
import { useAssetStore } from '../../../store/assetStore.js';

export default function AuditPage() {
  const { auditCycles, createAuditCycle, closeAuditCycle } = useAssetStore();
  const [name, setName] = useState('');
  const [loc, setLoc] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    createAuditCycle(name, loc, null, start, end);
    setName('');
    setLoc('');
    setStart('');
    setEnd('');
  };

  return (
    <div>
      <h2>Compliance Asset Audits</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px', marginTop: '24px' }}>
        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Schedule Audit Cycle</h3>
          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label className="form-label">Cycle Name</label>
              <input className="input" value={name} onChange={e => setName(e.target.value)} required placeholder="Q3 Inventory Verification" />
            </div>
            <div className="form-group">
              <label className="form-label">Scope Location</label>
              <input className="input" value={loc} onChange={e => setLoc(e.target.value)} required placeholder="Office Room A" />
            </div>
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input className="input" type="date" value={start} onChange={e => setStart(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">End Date</label>
              <input className="input" type="date" value={end} onChange={e => setEnd(e.target.value)} required />
            </div>
            <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>Create Cycle</button>
          </form>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Active Cycles</h3>
          <div className="table-wrapper" style={{ border: 'none' }}>
            <table className="table">
              <thead>
                <tr><th>Name</th><th>Location</th><th>Timeline</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {auditCycles.map(c => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.scopeLocation}</td>
                    <td>{c.startDate} to {c.endDate}</td>
                    <td><span className={`badge ${c.status === 'ACTIVE' ? 'badge-warning' : 'badge-success'}`}>{c.status}</span></td>
                    <td>
                      {c.status === 'ACTIVE' && (
                        <button className="btn btn-danger" style={{ padding: '2px 8px', fontSize: '11px' }} onClick={() => closeAuditCycle(c.id)}>Close Cycle</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}