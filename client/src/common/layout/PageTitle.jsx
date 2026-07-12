import React, { useEffect } from 'react';

export const PageTitle = ({ title, subtitle }) => {
  useEffect(() => {
    document.title = `${title} | AssetFlow`;
  }, [title]);

  return (
    <div style={{ marginBottom: 'var(--spacing-xl)' }}>
      <h1 className="gradient-text" style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: 'var(--spacing-xs)' }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageTitle;
