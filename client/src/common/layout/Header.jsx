import React from 'react';

function Header({ children }) {
  return (
    <header className="flex justify-between items-center mb-6">
      {children}
    </header>
  );
}

export default Header;