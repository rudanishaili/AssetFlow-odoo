import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)]">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-[var(--primary-light)]"
      >
        Previous
      </button>
      <span className="text-sm">Page {currentPage} of {totalPages}</span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-[var(--primary-light)]"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;