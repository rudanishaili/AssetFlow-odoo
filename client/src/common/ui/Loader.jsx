import React from 'react';

function Loader() {
  return (
    <div className="flex items-center justify-center p-8 w-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--secondary)]"></div>
    </div>
  );
}

export default Loader;