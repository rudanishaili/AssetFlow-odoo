import React, { useState } from 'react';
import useMockDataStore from '../../../store/mockDataStore.js';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import Input from '../../../common/ui/Input.jsx';
import { Tags, Plus, Trash2 } from 'lucide-react';

export const CategoriesPage = () => {
  const { categories, addCategory, deleteCategory } = useMockDataStore();
  const [newCatName, setNewCatName] = useState('');
  const [newCatCode, setNewCatCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!newCatName || !newCatCode) {
      setError('Please fill in both name and code.');
      return;
    }

    if (categories.some(c => c.name.toLowerCase() === newCatName.toLowerCase() || c.code.toLowerCase() === newCatCode.toLowerCase())) {
      setError('A category with this name or code already exists.');
      return;
    }

    addCategory({ name: newCatName, code: newCatCode.toUpperCase() });
    setNewCatName('');
    setNewCatCode('');
  };

  return (
    <div>
      <PageTitle title="Asset Categories" subtitle="Manage categories for classifying enterprise inventory and tracking statistics." />

      <div className="grid" style={{ gridTemplateColumns: '1fr 2fr', gap: 'var(--spacing-xl)' }}>
        {/* Add Category Form */}
        <div className="liora-card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>Add Category</h3>
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ color: 'var(--danger)', background: 'var(--danger-light)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '16px', fontSize: '14px' }}>
                {error}
              </div>
            )}
            <Input
              type="text"
              label="Category Name"
              placeholder="e.g. Tablets"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              required
            />
            <Input
              type="text"
              label="Code Prefix"
              placeholder="e.g. TAB"
              value={newCatCode}
              onChange={(e) => setNewCatCode(e.target.value)}
              required
            />
            <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '8px' }}>
              <Plus size={16} style={{ marginRight: '8px' }} /> Create Category
            </Button>
          </form>
        </div>

        {/* Categories List */}
        <div className="liora-card" style={{ padding: 'var(--spacing-lg)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>Active Classifications</h3>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                <th style={{ padding: '12px 8px' }} className="eyebrow">Category Name</th>
                <th style={{ padding: '12px 8px' }} className="eyebrow">Code Prefix</th>
                <th style={{ padding: '12px 8px', textAlign: 'right' }} className="eyebrow">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--linen)' }} className="table-row-hover">
                  <td style={{ padding: '16px 8px', fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Tags size={16} style={{ color: 'var(--sage)' }} />
                      <span>{cat.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>
                    <span style={{ background: 'var(--stone)', padding: '4px 8px', borderRadius: 'var(--radius-sm)', fontSize: '12px', fontWeight: 600 }}>
                      {cat.code}
                    </span>
                  </td>
                  <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                    <button 
                      onClick={() => deleteCategory(cat.name)}
                      style={{ color: 'var(--danger)', background: 'transparent', padding: '4px 8px', border: 'none', cursor: 'pointer' }}
                      title="Delete Category"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>No categories registered.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
