import React from 'react';

function Select({ label, options = [], error, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-sm font-medium text-[var(--text-muted)]">{label}</label>}
      <select
        className="px-3 py-2 border border-[var(--border)] rounded bg-[var(--card-bg)] text-[var(--text)] focus:border-[var(--secondary)] focus:outline-none transition-colors"
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <span className="text-xs text-[var(--danger)]">{error}</span>}
    </div>
  );
}

export default Select;