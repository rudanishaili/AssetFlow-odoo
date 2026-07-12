import React from 'react';
import Loader from '../ui/Loader.jsx';
import EmptyState from '../ui/EmptyState.jsx';

export const DataTable = ({ columns = [], data = [], isLoading, emptyMessage }) => {
  if (isLoading) return <Loader />;
  if (!data.length) return <EmptyState message={emptyMessage} />;

  return (
    <div style={{ width: '100%', overflowX: 'auto', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-lg)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: 'var(--glass-bg)', backdropFilter: 'blur(10px)' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--surface-border)', background: 'var(--surface-hover)' }}>
            {columns.map((col, idx) => (
              <th key={idx} style={{ padding: '1rem var(--spacing-lg)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} style={{ borderBottom: '1px solid var(--surface-border)', transition: 'background var(--transition-fast)' }} className="table-row">
              {columns.map((col, colIdx) => (
                <td key={colIdx} style={{ padding: '1rem var(--spacing-lg)', fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                  {col.cell ? col.cell(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <style>{
        .table-row:hover {
          background-color: var(--surface-hover);
        }
      }</style>
    </div>
  );
};

export default DataTable;
