import React from 'react';

function EmptyState({ title = "No data found", description = "Try adjusting your filters or adding a new record" }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-[var(--border)] rounded bg-[var(--card-bg)]">
      <h4 className="text-lg font-medium mb-1">{title}</h4>
      <p className="text-sm text-[var(--text-muted)]">{description}</p>
    </div>
  );
}

export default EmptyState;