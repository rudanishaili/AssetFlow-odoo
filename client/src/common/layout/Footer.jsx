import React from 'react';

function Footer() {
  return (
    <footer className="py-4 text-center text-xs text-[var(--text-muted)] border-t border-[var(--border)] mt-8">
      &copy; {new Date().getFullYear()} AssetFlow. All rights reserved.
    </footer>
  );
}

export default Footer;