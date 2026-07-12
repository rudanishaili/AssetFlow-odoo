import React from 'react';
import Loader from '../ui/Loader';
import EmptyState from '../ui/EmptyState';

export default function DataTable({ 
  headers = [], 
  data = [], 
  loading = false, 
  renderRow, 
  emptyTitle, 
  emptyDescription 
}) {
  const tableContainerStyle = {
    width: '100%',
    overflowX: 'auto',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'var(--bg-secondary)',
    fontFamily: 'var(--font-sans)',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  };

  const headerCellStyle = {
    padding: '16px 24px',
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-secondary)',
    fontWeight: 600,
    fontSize: '0.825rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '1px solid var(--border-color)',
  };

  const rowStyle = {
    borderBottom: '1px solid var(--border-color)',
    transition: 'var(--transition-all)',
  };

  if (loading) {
    return <Loader message="Fetching table records..." />;
  }

  if (data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div style={tableContainerStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={headerCellStyle}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} style={rowStyle} className="table-row">
              {renderRow(item, index)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
