import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

export default function Pagination({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange 
}) {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    borderTop: '1px solid var(--border-color)',
    fontFamily: 'var(--font-sans)',
  };

  const infoStyle = {
    fontSize: '0.875rem',
    color: 'var(--text-secondary)',
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  return (
    <div style={containerStyle}>
      <div style={infoStyle}>
        Page <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{currentPage}</span> of{' '}
        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{totalPages}</span>
      </div>
      <div style={navStyle}>
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
