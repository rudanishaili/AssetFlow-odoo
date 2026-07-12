import React from 'react';

function AssetCard({ asset }) {
  return (
    <div className="border border-[var(--border)] bg-[var(--card-bg)] p-4 rounded shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-lg">{asset?.name}</h3>
      <p className="text-sm text-[var(--text-muted)]">Code: {asset?.code}</p>
      <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800">{asset?.status}</span>
    </div>
  );
}

export default AssetCard;