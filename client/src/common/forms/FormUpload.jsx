import React from 'react';

function FormUpload({ label, error, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-[var(--text-muted)]">{label}</label>}
      <input
        type="file"
        onChange={onChange}
        className="px-3 py-2 border border-[var(--border)] rounded bg-[var(--card-bg)]"
      />
      {error && <span className="text-xs text-[var(--danger)]">{error}</span>}
    </div>
  );
}

export default FormUpload;