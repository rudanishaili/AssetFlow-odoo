import React from 'react';

function TableActions({ onEdit, onDelete }) {
  return (
    <div className="flex gap-2">
      {onEdit && <button onClick={onEdit} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>}
      {onDelete && <button onClick={onDelete} className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>}
    </div>
  );
}

export default TableActions;