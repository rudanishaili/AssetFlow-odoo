import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../common/layout/Sidebar';
import Header from '../common/layout/Header';

export default function DashboardLayout() {
  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: 'var(--bg-primary)',
  };

  const mainStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  const contentStyle = {
    flex: 1,
    padding: '32px',
    overflowY: 'auto',
  };

  return (
    <div style={containerStyle}>
      <Sidebar />
      <div style={mainStyle}>
        <Header />
        <main style={contentStyle}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
