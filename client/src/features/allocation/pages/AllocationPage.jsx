import React, { useState } from 'react';
import { useAssetStore } from '../../../store/assetStore.js';

export default function AllocationPage() {
  const { assets, employees, allocateAsset, returnAsset } = useAssetStore();
  const [assetId, setAssetId] = useState('');
  const [empId, setEmpId] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [error, setError] = useState('');

  const handleAllocate = (e) => {
    e.preventDefault();
    setError('');
    try {
      allocateAsset(assetId, empId, null, returnDate);
      setAssetId('');
      setEmpId('');
      setReturnDate('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Asset Allocation & Returns</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>
        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Allocate Asset</h3>
          {error && <div style={{ background: '#FFEBEE', color: 'var(--danger)', padding: '10px', borderRadius: '4px', fontSize: '13px', marginBottom: '16px' }}>{error}</div>}
          <form onSubmit={handleAllocate}>
            <div className="form-group">
              <label className="form-label">Select Asset</label>
              <select className="select" value={assetId} onChange={e => setAssetId(e.target.value)} required>
                <option value="">Select Asset</option>
                {assets.map(a => <option key={a.id} value={a.id}>{a.name} ({a.assetTag} - {a.status})</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Assign To Employee</label>
              <select className="select" value={empId} onChange={e => setEmpId(e.target.value)} required>
                <option value="">Select Employee</option>
                {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Expected Return Date</label>
              <input className="input" type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} required />
            </div>
            <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>Assign Asset</button>
          </form>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Active Allocations</h3>
          <div className="table-wrapper" style={{ border: 'none' }}>
            <table className="table">
              <thead>
                <tr><th>Asset</th><th>Holder</th><th>Expected Return</th><th>Action</th></tr>
              </thead>
              <tbody>
                {assets.filter(a => a.status === 'ALLOCATED').map(a => {
                  const holder = employees[0];
                  return (
                    <tr key={a.id}>
                      <td>{a.name}</td>
                      <td>{holder.name}</td>
                      <td>2026-07-20</td>
                      <td>
                        <button className="btn btn-danger" style={{ padding: '4px 8px', fontSize: '11px' }} onClick={() => returnAsset(a.id, 'Returned in perfect condition')}>Return</button>
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