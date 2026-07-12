import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';
import Avatar from '../common/ui/Avatar.jsx';
import { useAssetStore } from '../store/assetStore.js';

function DashboardLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const notifications = useAssetStore(state => state.notifications.filter(n => !n.isRead));

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', roles: ['ADMIN', 'MANAGER', 'EMPLOYEE'] },
    { label: 'Asset Directory', path: '/assets', roles: ['ADMIN', 'MANAGER', 'EMPLOYEE'] },
    { label: 'Allocations & Returns', path: '/allocations', roles: ['ADMIN', 'MANAGER'] },
    { label: 'Resource Bookings', path: '/bookings', roles: ['ADMIN', 'MANAGER', 'EMPLOYEE'] },
    { label: 'Maintenance Requests', path: '/maintenance', roles: ['ADMIN', 'MANAGER', 'EMPLOYEE'] },
    { label: 'Asset Audits', path: '/audits', roles: ['ADMIN', 'MANAGER'] },
    { label: 'Reports & Analytics', path: '/reports', roles: ['ADMIN', 'MANAGER'] },
    { label: 'Organization Setup', path: '/organization', roles: ['ADMIN'] }
  ];

  return (
    <div className="dashboard-layout">
      <nav className="navbar">
        <div className="navbar-logo">AssetFlow</div>
        <div className="navbar-actions">
          <Link to="/notifications" style={{ color: 'white', position: 'relative', textDecoration: 'none' }}>
            🔔 {notifications.length > 0 && <span style={{ background: 'var(--danger)', color: 'white', padding: '2px 6px', borderRadius: '50%', fontSize: '10px', position: 'absolute', top: '-6px', right: '-6px' }}>{notifications.length}</span>}
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar name={user?.name || 'User'} />
            <span style={{ fontSize: '14px', fontWeight: '500' }}>{user?.name} ({user?.role})</span>
          </div>
          <button className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', padding: '4px 10px' }} onClick={() => { logout(); navigate('/login'); }}>Logout</button>
        </div>
      </nav>
      <div className="main-layout">
        <aside className="sidebar">
          {menuItems.filter(item => item.roles.includes(user?.role)).map(item => (
            <Link key={item.path} to={item.path} className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}>
              {item.label}
            </Link>
          ))}
        </aside>
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;