import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  UserCheck, 
  CalendarDays, 
  Wrench, 
  ShieldCheck, 
  BarChart3, 
  Settings, 
  Building2,
  Tags,
  Users,
  History,
  Bell,
  UserCircle,
  PlusCircle,
  ArrowLeftRight,
  Undo2
} from 'lucide-react';
import useAuthStore from '../../store/authStore.js';

export const Sidebar = ({ isOpen }) => {
  const { user } = useAuthStore();
  const role = user?.role || 'EMPLOYEE';

  // Generate links based on role
  const getNavItems = () => {
    switch (role) {
      case 'ADMIN':
        return [
          { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/admin/departments', label: 'Departments', icon: Building2 },
          { to: '/admin/categories', label: 'Categories', icon: Tags },
          { to: '/admin/employees', label: 'Employees', icon: Users },
          { to: '/admin/audit', label: 'Audit Monitor', icon: ShieldCheck },
          { to: '/admin/reports', label: 'Reports', icon: BarChart3 },
          { to: '/notifications', label: 'Notifications', icon: Bell },
          { to: '/admin/activity-logs', label: 'Activity Logs', icon: History },
          { to: '/profile', label: 'Profile', icon: UserCircle },
          { to: '/settings', label: 'Settings', icon: Settings },
        ];
      case 'MANAGER': // Asset Manager
        return [
          { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/assets', label: 'Asset Directory', icon: Package },
          { to: '/assets/new', label: 'Register Asset', icon: PlusCircle },
          { to: '/allocations', label: 'Allocate Asset', icon: UserCheck },
          { to: '/transfers', label: 'Transfer Requests', icon: ArrowLeftRight },
          { to: '/returns', label: 'Return Approval', icon: Undo2 },
          { to: '/maintenance', label: 'Maintenance', icon: Wrench },
          { to: '/audit', label: 'Audits', icon: ShieldCheck },
          { to: '/reports', label: 'Reports', icon: BarChart3 },
          { to: '/notifications', label: 'Notifications', icon: Bell },
        ];
      case 'AUDITOR': // Department Head
        return [
          { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/dept-assets', label: 'Department Assets', icon: Package },
          { to: '/allocation-requests', label: 'Allocation Requests', icon: UserCheck },
          { to: '/transfer-requests', label: 'Transfer Requests', icon: ArrowLeftRight },
          { to: '/bookings', label: 'Booking Calendar', icon: CalendarDays },
          { to: '/notifications', label: 'Notifications', icon: Bell },
        ];
      case 'EMPLOYEE':
      default:
        return [
          { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/my-assets', label: 'My Assets', icon: Package },
          { to: '/book-resource', label: 'Book Resource', icon: PlusCircle },
          { to: '/my-bookings', label: 'My Bookings', icon: CalendarDays },
          { to: '/raise-maintenance', label: 'Raise Maintenance', icon: Wrench },
          { to: '/employee-transfer', label: 'Transfer Request', icon: ArrowLeftRight },
          { to: '/return-asset', label: 'Return Asset', icon: Undo2 },
          { to: '/notifications', label: 'Notifications', icon: Bell },
          { to: '/profile', label: 'Profile', icon: UserCircle },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside 
      className="glass-panel"
      style={{ 
        width: isOpen ? '260px' : '0px', 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'width var(--transition-normal), opacity var(--transition-normal)',
        overflowY: 'auto',
        borderRight: '1px solid var(--surface-border)',
        opacity: isOpen ? 1 : 0
      }}
    >
      <div 
        style={{ 
          height: '70px', 
          padding: '0 var(--spacing-lg)', 
          borderBottom: '1px solid var(--surface-border)',
          whiteSpace: 'nowrap',
          flexShrink: 0
        }}
        className="flex items-center"
      >
        <span className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>AssetFlow</span>
      </div>

      <nav style={{ flex: 1, padding: 'var(--spacing-md)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
                padding: '12px var(--spacing-lg)',
                borderRadius: 'var(--radius-md)',
                color: isActive ? 'var(--moss)' : 'var(--text-primary)',
                background: isActive ? 'var(--sage-light)' : 'transparent',
                fontWeight: isActive ? 600 : 500,
                fontSize: '14px',
                transition: 'background var(--transition-fast), color var(--transition-fast)'
              })}
            >
              <Icon size={18} style={{ opacity: 0.85 }} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
