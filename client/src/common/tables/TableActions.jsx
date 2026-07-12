import React from 'react';

export const TableActions = ({ children }) => {
  return (
    <div className="flex items-center gap-sm">
      {children}
    </div>
  );
};

export default TableActions;
