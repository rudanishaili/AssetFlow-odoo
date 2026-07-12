import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button.jsx';

export const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  return (
    <div className="flex items-center justify-between" style={{ marginTop: 'var(--spacing-lg)', width: '100%' }}>
      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        Page {currentPage} of {totalPages}
      </span>
      <div className="flex gap-sm">
        <Button 
          variant="secondary" 
          size="sm" 
          disabled={currentPage <= 1} 
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft size={16} /> Previous
        </Button>
        <Button 
          variant="secondary" 
          size="sm" 
          disabled={currentPage >= totalPages} 
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
