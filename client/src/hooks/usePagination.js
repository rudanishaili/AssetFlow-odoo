import { useState } from 'react';

export const usePagination = (initialPage = 1, initialLimit = 10) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return {
    page,
    limit,
    setPage,
    setLimit,
    onPageChange: handlePageChange
  };
};

export default usePagination;
