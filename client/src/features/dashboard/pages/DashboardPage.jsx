import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  UserCheck, 
  CalendarDays, 
  Wrench, 
  Building2, 
  Tags, 
  Users, 
  ShieldCheck, 
  ArrowLeftRight, 
  PlusCircle,
  Undo2,
  Clock,
  BarChart3
} from 'lucide-react';
import useAuthStore from '../../../store/authStore.js';
import useMockDataStore from '../../../store/mockDataStore.js';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import StatCard from '../../../common/cards/StatCard.jsx';
import ActivityCard from '../../../common/cards/ActivityCard.jsx';
import BarChart from '../../../common/charts/BarChart.jsx';
import PieChart from '../../../common/charts/PieChart.jsx';
import LineChart from '../../../common/charts/LineChart.jsx';
import Button from '../../../common/ui/Button.jsx';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const role = user?.role || 'EMPLOYEE';
  
  // Read database state
  const { 
    departments, 
    categories, 
    employees, 
    assets, 
    allocations, 
    bookings, 
    maintenance, 
    transferRequests, 
    activityLogs,
    notifications
  } = useMockDataStore();

  const userDept = user?.department || '';
  const userId = user?.id || '';

  // 1. ADMIN DASHBOARD
  const renderAdminDashboard = () => {
    const stats = [
      { title: 'Departments', value: String(departments.length), change: '+1 this month', icon: Building2, color: 'var(--primary)' },
      { title: 'Asset Categories', value: String(categories.length), change: 'Active in system', icon: Tags, color: 'var(--secondary)' },
      { title: 'Registered Employees', value: String(employees.length), change: '+2 this week', icon: Users, color: 'var(--success)' },
      { title: 'Total Registered Assets', value: String(assets.length), change: 'Hardware & software', icon: Package, color: 'var(--accent)' }
    ];

    const categoryData = categories.map(cat => {
      const count = assets.filter(a => a.category.toLowerCase() === cat.name.toLowerCase()).length;
      return { label: cat.name, value: count };
    });

    const recentLogs = activityLogs.slice(0, 5);

    return (
      <div>
        <PageTitle title="Admin Dashboard" subtitle="Overview of enterprise configurations, departments, and system activity logs." />
        
        <div className="grid grid-cols-4 gap-lg" style={{ marginBottom: 'var(--spacing-xl)' }}>
          {stats.map((s, idx) => (
            <StatCard key={idx} {...s} />
          ))}
        </div>

        <div className="grid" style={{ gridTemplateColumns: '2fr 1.2fr', gap: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)' }}>
          <div className="flex flex-col gap-lg">
            <div className="liora-card" style={{ padding: 'var(--spacing-lg)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>Enterprise Configurations</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                Configure and manage core system metadata settings.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--spacing-md)' }}>
                <div style={{ padding: '16px', background: 'var(--stone)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <Building2 size={32} style={{ color: 'var(--moss)', margin: '0 auto 8px auto' }} />
                  <h4 style={{ fontSize: '15px', fontWeight: 600 }}>Departments</h4>
                  <Button variant="outline" size="sm" style={{ marginTop: '8px' }} onClick={() => navigate('/admin/departments')}>Manage</Button>
                </div>
                <div style={{ padding: '16px', background: 'var(--stone)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <Tags size={32} style={{ color: 'var(--moss)', margin: '0 auto 8px auto' }} />
                  <h4 style={{ fontSize: '15px', fontWeight: 600 }}>Categories</h4>
                  <Button variant="outline" size="sm" style={{ marginTop: '8px' }} onClick={() => navigate('/admin/categories')}>Manage</Button>
                </div>
                <div style={{ padding: '16px', background: 'var(--stone)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <Users size={32} style={{ color: 'var(--moss)', margin: '0 auto 8px auto' }} />
                  <h4 style={{ fontSize: '15px', fontWeight: 600 }}>Employees</h4>
                  <Button variant="outline" size="sm" style={{ marginTop: '8px' }} onClick={() => navigate('/admin/employees')}>Manage</Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-lg">
              <PieChart title="Assets by Category" data={categoryData} />
              <BarChart title="System Allocations Overview" data={[
                { label: 'IT', value: assets.filter(a => a.holderId).length },
                { label: 'Inventory', value: assets.filter(a => !a.holderId).length }
              ]} />
            </div>
          </div>

          <div className="glass-card flex flex-col" style={{ padding: 'var(--spacing-lg)' }}>
            <h4 style={{ fontSize: '1.15rem', marginBottom: 'var(--spacing-lg)', borderBottom: '1px solid var(--surface-border)', paddingBottom: 'var(--spacing-sm)' }}>
              System Activity Audit Trail
            </h4>
            <div className="flex flex-col gap-sm" style={{ overflowY: 'auto', maxHeight: '500px' }}>
              {recentLogs.map((log) => (
                <div key={log.id} style={{ display: 'flex', gap: 'var(--spacing-sm)', padding: '12px', borderBottom: '1px solid var(--linen)' }}>
                  <Clock size={16} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 600, display: 'block' }}>{log.details}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{log.userName} • {new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
              {recentLogs.length === 0 && <span style={{ color: 'var(--text-muted)', padding: 'var(--spacing-md)' }}>No actions logged.</span>}
            </div>
            <Button variant="secondary" style={{ marginTop: 'var(--spacing-lg)' }} onClick={() => navigate('/admin/activity-logs')}>View All Logs</Button>
          </div>
        </div>
      </div>
    );
  };

  // 2. ASSET MANAGER DASHBOARD
  const renderAssetManagerDashboard = () => {
    const stats = [
      { title: 'Total Asset Records', value: String(assets.length), change: 'Active catalog', icon: Package, color: 'var(--primary)' },
      { title: 'Assigned Assets', value: String(allocations.filter(a => a.status === 'ACTIVE').length), change: 'In active use', icon: UserCheck, color: 'var(--success)' },
      { title: 'Under Maintenance', value: String(maintenance.filter(m => m.status === 'IN_PROGRESS').length), change: 'In repair shop', icon: Wrench, color: 'var(--danger)' },
      { title: 'Pending Transfers', value: String(transferRequests.filter(tr => tr.status === 'PENDING').length), change: 'Awaiting review', icon: ArrowLeftRight, color: 'var(--warning)' }
    ];

    const categoryData = categories.map(cat => ({
      label: cat.name,
      value: assets.filter(a => a.category.toLowerCase() === cat.name.toLowerCase()).length
    }));

    return (
      <div>
        <PageTitle title="Asset Manager Workspace" subtitle="Central control panel to register, allocate, transfer, and repair assets." />
        
        <div className="grid grid-cols-4 gap-lg" style={{ marginBottom: 'var(--spacing-xl)' }}>
          {stats.map((s, idx) => (
            <StatCard key={idx} {...s} />
          ))}
        </div>

        <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)' }}>
          <div className="flex flex-col gap-lg">
            <div className="liora-card" style={{ padding: 'var(--spacing-lg)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-sm)' }}>Quick Operations</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>Manage inventory tasks smoothly with these shortcuts.</p>
              <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                <Button variant="primary" onClick={() => navigate('/assets/new')}>
                  <PlusCircle size={16} style={{ marginRight: '8px' }} /> Register Asset
                </Button>
                <Button variant="outline" onClick={() => navigate('/allocations')}>
                  <UserCheck size={16} style={{ marginRight: '8px' }} /> Allocate Asset
                </Button>
                <Button variant="secondary" onClick={() => navigate('/transfers')}>
                  <ArrowLeftRight size={16} style={{ marginRight: '8px' }} /> Review Transfers
                </Button>
                <Button variant="secondary" onClick={() => navigate('/maintenance')}>
                  <Wrench size={16} style={{ marginRight: '8px' }} /> Repair Log
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-lg">
              <PieChart title="Asset Inventory Status" data={categoryData} />
              <BarChart title="Asset Status Distribution" data={[
                { label: 'Available', value: assets.filter(a => a.status === 'AVAILABLE').length },
                { label: 'Allocated', value: assets.filter(a => a.status === 'ALLOCATED').length },
                { label: 'Maintenance', value: assets.filter(a => a.status === 'MAINTENANCE').length }
              ]} />
            </div>
          </div>

          <div className="glass-card flex flex-col" style={{ padding: 'var(--spacing-lg)' }}>
            <h4 style={{ fontSize: '1.15rem', marginBottom: 'var(--spacing-lg)', borderBottom: '1px solid var(--surface-border)', paddingBottom: 'var(--spacing-sm)' }}>
              Operational Alerts
            </h4>
            <div className="flex flex-col gap-sm">
              {transferRequests.filter(tr => tr.status === 'PENDING').map(tr => (
                <div key={tr.id} style={{ padding: '12px', background: 'var(--warning-light)', borderLeft: '4px solid var(--warning)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Transfer Approval Needed</span>
                  <p style={{ fontSize: '11px', margin: '4px 0 8px 0', color: 'var(--text-secondary)' }}>
                    Transfer {tr.assetName} to {tr.toUserName}
                  </p>
                  <Button size="sm" variant="outline" onClick={() => navigate('/transfers')}>Review</Button>
                </div>
              ))}
              {maintenance.filter(m => m.status === 'IN_PROGRESS').slice(0, 2).map(m => (
                <div key={m.id} style={{ padding: '12px', background: 'var(--danger-light)', borderLeft: '4px solid var(--danger)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Asset in Service</span>
                  <p style={{ fontSize: '11px', margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>
                    {m.assetName} is undergoing repair.
                  </p>
                </div>
              ))}
              {transferRequests.filter(tr => tr.status === 'PENDING').length === 0 && maintenance.filter(m => m.status === 'IN_PROGRESS').length === 0 && (
                <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>All systems operational. No active warnings.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 3. DEPARTMENT HEAD DASHBOARD
  const renderDeptHeadDashboard = () => {
    // Filter assets owned by employees belonging to this department
    const deptEmployees = employees.filter(e => e.department === userDept);
    const deptEmployeeIds = deptEmployees.map(e => e.id);
    const deptAssets = assets.filter(a => a.holderId && deptEmployeeIds.includes(a.holderId));
    
    // Value sum
    const totalDeptAssetValue = deptAssets.reduce((sum, a) => sum + a.value, 0);
    const activeDeptBookings = bookings.filter(b => b.status === 'PENDING' && deptEmployeeIds.includes(b.userId));
    const activeDeptTransfers = transferRequests.filter(tr => tr.status === 'PENDING' && tr.fromDepartment === userDept);

    const stats = [
      { title: 'Department Assets', value: String(deptAssets.length), change: 'In active use', icon: Package, color: 'var(--primary)' },
      { title: 'Assets Net Value', value: `$${totalDeptAssetValue.toLocaleString()}`, change: 'Department cap', icon: BarChart3, color: 'var(--secondary)' },
      { title: 'Booking Approvals', value: String(activeDeptBookings.length), change: 'Room/Asset bookings', icon: CalendarDays, color: 'var(--warning)' },
      { title: 'Transfer Approvals', value: String(activeDeptTransfers.length), change: 'Department outboards', icon: ArrowLeftRight, color: 'var(--danger)' }
    ];

    return (
      <div>
        <PageTitle title={`Department Workspace — ${userDept}`} subtitle="Manage department specific inventories, employee bookings, and transfer actions." />
        
        <div className="grid grid-cols-4 gap-lg" style={{ marginBottom: 'var(--spacing-xl)' }}>
          {stats.map((s, idx) => (
            <StatCard key={idx} {...s} />
          ))}
        </div>

        <div className="grid" style={{ gridTemplateColumns: '2fr 1.2fr', gap: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)' }}>
          <div className="flex flex-col gap-lg">
            <div className="liora-card" style={{ padding: 'var(--spacing-lg)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>Pending Employee Allocations & Transfers</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                Approve or reject allocation requests raised by employees in your department.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                {activeDeptTransfers.map(tr => (
                  <div key={tr.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)' }}>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: '15px' }}>{tr.assetName} Transfer Request</span>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                        Requested by {tr.fromUserName} to transfer to {tr.toUserName} ({tr.toDepartment})
                      </p>
                    </div>
                    <Button variant="primary" size="sm" onClick={() => navigate('/transfer-requests')}>Review Requests</Button>
                  </div>
                ))}
                {activeDeptTransfers.length === 0 && (
                  <div style={{ padding: 'var(--spacing-md)', background: 'var(--stone)', borderRadius: 'var(--radius-md)', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No pending transfer approvals for your department.
                  </div>
                )}
              </div>
            </div>

            <div className="liora-card" style={{ padding: 'var(--spacing-lg)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>Department Assets Overview</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                    <th style={{ padding: '8px' }} className="eyebrow">Asset Name</th>
                    <th style={{ padding: '8px' }} className="eyebrow">Serial</th>
                    <th style={{ padding: '8px' }} className="eyebrow">Assigned Employee</th>
                    <th style={{ padding: '8px' }} className="eyebrow">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {deptAssets.slice(0, 3).map(asset => (
                    <tr key={asset.id} style={{ borderBottom: '1px solid var(--linen)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: 600 }}>{asset.name}</td>
                      <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>{asset.serial}</td>
                      <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>{asset.holderName}</td>
                      <td style={{ padding: '12px 8px' }}>
                        <span style={{ fontSize: '11px', padding: '3px 6px', borderRadius: 'var(--radius-sm)', background: 'var(--success-light)', color: 'var(--success)', fontWeight: 600 }}>
                          {asset.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {deptAssets.length === 0 && (
                    <tr>
                      <td colSpan={4} style={{ padding: '24px 8px', textAlign: 'center', color: 'var(--text-secondary)' }}>No assets assigned to department employees yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {deptAssets.length > 3 && (
                <Button variant="outline" size="sm" style={{ marginTop: '16px' }} onClick={() => navigate('/dept-assets')}>View All Department Assets</Button>
              )}
            </div>
          </div>

          <div className="glass-card flex flex-col" style={{ padding: 'var(--spacing-lg)' }}>
            <h4 style={{ fontSize: '1.15rem', marginBottom: 'var(--spacing-lg)', borderBottom: '1px solid var(--surface-border)', paddingBottom: 'var(--spacing-sm)' }}>
              Resource Bookings Queue
            </h4>
            <div className="flex flex-col gap-sm">
              {activeDeptBookings.map(b => (
                <div key={b.id} style={{ padding: '12px', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-sm)', background: 'var(--cloud)' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>{b.assetName} Booking</span>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '4px 0 8px 0' }}>
                    Requested by {b.userName} on {new Date(b.startDate).toLocaleDateString()}
                  </p>
                  <Button size="sm" variant="outline" onClick={() => navigate('/bookings')}>Manage Calendar</Button>
                </div>
              ))}
              {activeDeptBookings.length === 0 && (
                <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>No pending resource bookings.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 4. EMPLOYEE DASHBOARD
  const renderEmployeeDashboard = () => {
    // Filter assets assigned to this user
    const myCheckedOut = assets.filter(a => a.holderId === userId);
    const myBookingsList = bookings.filter(b => b.userId === userId);
    const myMaintenanceList = maintenance.filter(m => m.userId === userId || myCheckedOut.some(a => a.id === m.assetId));

    const stats = [
      { title: 'My Allocated Assets', value: String(myCheckedOut.length), change: 'Checked out to you', icon: Package, color: 'var(--primary)' },
      { title: 'My Resource Bookings', value: String(myBookingsList.length), change: 'Scheduled reservations', icon: CalendarDays, color: 'var(--secondary)' },
      { title: 'Support Requests Raised', value: String(myMaintenanceList.length), change: 'Repair tickets', icon: Wrench, color: 'var(--danger)' }
    ];

    return (
      <div>
        <PageTitle title={`Employee Dashboard — ${user?.name}`} subtitle="Quick actions, booking resources, and maintaining your checked-out office gear." />
        
        <div className="grid grid-cols-3 gap-lg" style={{ marginBottom: 'var(--spacing-xl)' }}>
          {stats.map((s, idx) => (
            <StatCard key={idx} {...s} />
          ))}
        </div>

        <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)' }}>
          <div className="flex flex-col gap-lg">
            {/* Quick Actions Panel */}
            <div className="liora-card" style={{ padding: 'var(--spacing-lg)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-sm)' }}>Quick Operations</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)', fontSize: '14px' }}>
                Need to book a conference room, report a broken key, or request a return? Use these quick shortcuts.
              </p>
              <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                <Button variant="primary" onClick={() => navigate('/book-resource')}>
                  <CalendarDays size={16} style={{ marginRight: '8px' }} /> Book Resource
                </Button>
                <Button variant="outline" onClick={() => navigate('/raise-maintenance')}>
                  <Wrench size={16} style={{ marginRight: '8px' }} /> Raise Maintenance Request
                </Button>
                <Button variant="secondary" onClick={() => navigate('/employee-transfer')}>
                  <ArrowLeftRight size={16} style={{ marginRight: '8px' }} /> Transfer Asset
                </Button>
                <Button variant="secondary" onClick={() => navigate('/return-asset')}>
                  <Undo2 size={16} style={{ marginRight: '8px' }} /> Return Asset
                </Button>
              </div>
            </div>

            {/* My Assets list */}
            <div className="liora-card" style={{ padding: 'var(--spacing-lg)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>My Allocated Assets</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                    <th style={{ padding: '8px' }} className="eyebrow">Asset Name</th>
                    <th style={{ padding: '8px' }} className="eyebrow">Serial</th>
                    <th style={{ padding: '8px' }} className="eyebrow">Location</th>
                    <th style={{ padding: '8px' }} className="eyebrow">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {myCheckedOut.map(asset => (
                    <tr key={asset.id} style={{ borderBottom: '1px solid var(--linen)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: 600 }}>{asset.name}</td>
                      <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>{asset.serial}</td>
                      <td style={{ padding: '12px 8px', color: 'var(--text-muted)' }}>{asset.location}</td>
                      <td style={{ padding: '12px 8px' }}>
                        <Button size="sm" variant="outline" onClick={() => navigate(`/my-assets`)}>View Info</Button>
                      </td>
                    </tr>
                  ))}
                  {myCheckedOut.length === 0 && (
                    <tr>
                      <td colSpan={4} style={{ padding: '24px 8px', textAlign: 'center', color: 'var(--text-secondary)' }}>You have no assets allocated at the moment.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right sidebar: Booking history */}
          <div className="glass-card flex flex-col" style={{ padding: 'var(--spacing-lg)' }}>
            <h4 style={{ fontSize: '1.15rem', marginBottom: 'var(--spacing-lg)', borderBottom: '1px solid var(--surface-border)', paddingBottom: 'var(--spacing-sm)' }}>
              My Bookings Status
            </h4>
            <div className="flex flex-col gap-sm" style={{ overflowY: 'auto', maxHeight: '400px' }}>
              {myBookingsList.map(b => (
                <div key={b.id} style={{ padding: '12px', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-sm)', background: 'var(--cloud)' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>{b.assetName}</span>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '4px 0 8px 0' }}>
                    {new Date(b.startDate).toLocaleDateString()} • {b.purpose || 'General Booking'}
                  </p>
                  <span style={{ 
                    fontSize: '11px', 
                    padding: '2px 6px', 
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 600,
                    background: b.status === 'APPROVED' ? 'var(--success-light)' : b.status === 'PENDING' ? 'var(--warning-light)' : 'var(--danger-light)',
                    color: b.status === 'APPROVED' ? 'var(--success)' : b.status === 'PENDING' ? 'var(--warning)' : 'var(--danger)'
                  }}>
                    {b.status}
                  </span>
                </div>
              ))}
              {myBookingsList.length === 0 && (
                <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>You have no scheduled bookings.</span>
              )}
            </div>
            <Button variant="secondary" style={{ marginTop: 'var(--spacing-lg)' }} onClick={() => navigate('/my-bookings')}>View Booking Details</Button>
          </div>
        </div>
      </div>
    );
  };

  // Main selector based on user role
  switch (role) {
    case 'ADMIN':
      return renderAdminDashboard();
    case 'MANAGER':
      return renderAssetManagerDashboard();
    case 'AUDITOR':
      return renderDeptHeadDashboard();
    case 'EMPLOYEE':
    default:
      return renderEmployeeDashboard();
  }
};

export default DashboardPage;
