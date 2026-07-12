import React, { useState } from 'react';
import { useAssetStore } from '../../../store/assetStore.js';

export default function MasterDataPage() {
  const [activeTab, setActiveTab] = useState('A');
  const { departments, categories, employees, addDepartment, addCategory, promoteUser } = useAssetStore();
  
  const [deptName, setDeptName] = useState('');
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');

  return (
    <div>
      <h2>Organization Master Data</h2>
      <div className="tab-container" style={{ marginTop: '16px' }}>
        <button className={`tab-button ${activeTab === 'A' ? 'active' : ''}`} onClick={() => setActiveTab('A')}>Tab A: Departments</button>
        <button className={`tab-button ${activeTab === 'B' ? 'active' : ''}`} onClick={() => setActiveTab('B')}>Tab B: Categories</button>
        <button className={`tab-button ${activeTab === 'C' ? 'active' : ''}`} onClick={() => setActiveTab('C')}>Tab C: Employee Directory</button>
      </div>

      {activeTab === 'A' && (
        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Create Department</h3>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <input className="input" placeholder="Department Name" value={deptName} onChange={e => setDeptName(e.target.value)} style={{ maxWidth: '300px' }} />
            <button className="btn btn-primary" onClick={() => { if(deptName){ addDepartment({ name: deptName, status: 'ACTIVE' }); setDeptName(''); } }}>Create</button>
          </div>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr><th>Name</th><th>Status</th></tr>
              </thead>
              <tbody>
                {departments.map(d => (
                  <tr key={d.id}><td>{d.name}</td><td><span className="badge badge-success">{d.status}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'B' && (
        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Create Category</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', maxWidth: '400px' }}>
            <input className="input" placeholder="Category Name" value={catName} onChange={e => setCatName(e.target.value)} />
            <input className="input" placeholder="Description" value={catDesc} onChange={e => setCatDesc(e.target.value)} />
            <button className="btn btn-primary" onClick={() => { if(catName){ addCategory({ name: catName, description: catDesc }); setCatName(''); setCatDesc(''); } }}>Add Category</button>
          </div>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr><th>Name</th><th>Description</th></tr>
              </thead>
              <tbody>
                {categories.map(c => (
                  <tr key={c.id}><td>{c.name}</td><td>{c.description}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'C' && (
        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Promote Roles & Manage Directory</h3>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr><th>Name</th><th>Email</th><th>Role</th><th>Promote Action</th></tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td><span className="badge badge-info">{emp.role}</span></td>
                    <td>
                      <select className="select" style={{ maxWidth: '150px' }} value={emp.role} onChange={(e) => promoteUser(emp.id, e.target.value)}>
                        <option value="EMPLOYEE">Employee</option>
                        <option value="MANAGER">Asset Manager</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}