import React from 'react';

function StatCard({ title, value, icon }) {
  return (
    <div className="border border-[var(--border)] bg-[var(--card-bg)] p-6 rounded shadow-sm flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium text-[var(--text-muted)]">{title}</h4>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
      {icon && <div className="text-[var(--primary)]">{icon}</div>}
    </div>
  );
}

export default StatCard;