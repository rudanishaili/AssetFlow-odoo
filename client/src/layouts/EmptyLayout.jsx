import React from 'react';
import { Outlet } from 'react-router-dom';

export default function EmptyLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Outlet />
    </div>
  );
}
