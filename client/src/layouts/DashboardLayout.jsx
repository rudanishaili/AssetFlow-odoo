import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../common/layout/Sidebar.jsx';
import Header from '../common/layout/Header.jsx';
import Navbar from '../common/layout/Navbar.jsx';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div 
      className="gradient-bg flex" 
      style={{ 
        minHeight: '100vh', 
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* 3D Background Decorative Floating Orbs */}
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>

      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} style={{ zIndex: 10, position: 'relative' }} />
      
      <div 
        className="flex flex-col" 
        style={{ 
          flex: 1, 
          height: '100vh', 
          overflowY: 'auto',
          transition: 'margin-left var(--transition-normal)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Header toggleSidebar={toggleSidebar} />
        
        <main 
          style={{ 
            flex: 1, 
            padding: 'var(--spacing-xl)', 
            maxWidth: '1600px', 
            width: '100%', 
            margin: '0 auto',
            position: 'relative',
            zIndex: 2
          }}
        >
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
        
        <Navbar />
      </div>
    </div>
  );
};

export default DashboardLayout;
