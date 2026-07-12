import React from 'react';

function DataTable({ columns = [], data = [] }) {
  return (
    <div className="overflow-x-auto border border-[var(--border)] rounded bg-[var(--card-bg)]">
      <table className="min-w-full divide-y divide-[var(--border)]">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-[var(--border)]">
          {data.map((row, rIdx) => (
            <tr key={rIdx}>
              {columns.map((col, cIdx) => (
                <td key={cIdx} className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text)]">
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;