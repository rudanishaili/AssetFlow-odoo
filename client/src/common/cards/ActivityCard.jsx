import React from 'react';

function ActivityCard({ title, time, description }) {
  return (
    <div className="border border-[var(--border)] bg-[var(--card-bg)] p-4 rounded shadow-sm">
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-semibold">{title}</h4>
        <span className="text-xs text-[var(--text-muted)]">{time}</span>
      </div>
      <p className="text-sm text-[var(--text-muted)]">{description}</p>
    </div>
  );
}

export default ActivityCard;