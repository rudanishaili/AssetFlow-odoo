import React, { useState } from 'react';
import { useAssetStore } from '../../../store/assetStore.js';
import { useAuthStore } from '../../../store/authStore.js';

export default function AssetPage() {
  const { assets, categories, addAsset } = useAssetStore();
  const { user } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [serial, setSerial] = useState('');
  const [catId, setCatId] = useState('');
  const [cost, setCost] = useState('');
  const [loc, setLoc] = useState('');
  const [shared, setShared] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    addAsset({
      name,
      serialNumber: serial,
      categoryId: catId,
      acquisitionCost: cost,
      acquisitionDate: new Date().toISOString().split('T')[0],
      location: loc,
      isSharedBookable: shared,
      condition: 'NEW'
    });
    setShowModal(false);
    setName('');
    setSerial('');
    setCost('');
    setLoc('');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Asset Directory</h2>
        {['ADMIN', 'MANAGER'].includes(user?.role) && <button className="btn btn-primary" onClick={() => setShowModal(true)}>Register Asset</button>}
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr><th>Asset Tag</th><th>Name</th><th>Serial</th><th>Location</th><th>Condition</th><th>Bookable</th><th>Status</th></tr>
          </thead>
          <tbody>
            {assets.map(a => (
              <tr key={a.id}>
                <td>{a.assetTag}</td>
                <td>{a.name}</td>
                <td>{a.serialNumber}</td>
                <td>{a.location}</td>
                <td>{a.condition}</td>
                <td>{a.isSharedBookable ? 'Yes' : 'No'}</td>
                <td><span className={`badge ${a.status === 'AVAILABLE' ? 'badge-success' : 'badge-warning'}`}>{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <form onSubmit={handleSave}>
              <div className="modal-header">
                <h3>Register New Asset</h3>
                <button type="button" style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '18px' }} onClick={() => setShowModal(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Asset Name</label>
                  <input className="input" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Serial Number</label>
                  <input className="input" value={serial} onChange={e => setSerial(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="select" value={catId} onChange={e => setCatId(e.target.value)} required>
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Cost ($)</label>
                  <input className="input" type="number" value={cost} onChange={e => setCost(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input className="input" value={loc} onChange={e => setLoc(e.target.value)} required />
                </div>
                <div className="form-group" style={{ flexDirection: 'row', gap: '8px' }}>
                  <input type="checkbox" checked={shared} onChange={e => setShared(e.target.checked)} />
                  <label className="form-label">Mark as Shared / Bookable</label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Asset</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}