import React, { useState, useEffect } from 'react';
import { Typography } from '../../../common/ui/Typography';
import { Card } from '../../../common/ui/Card';
import { Button } from '../../../common/ui/Button';
import { Icon } from '../../../common/ui/Icon';

// --- Sub-components for Role Dashboards ---

const AdminDashboard = () => (
  <>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
      <Typography variant="h1" className="fade-up in-view" style={{ maxWidth: '600px' }}>
        Good morning, <em>Admin</em>
      </Typography>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '64px' }}>
      <MetricCard icon="Laptop" title="Total Assets" value="2,451" subtitle="Across 4 locations" />
      <MetricCard icon="Users" title="Active Employees" value="1,042" subtitle="8 new this week" color="#93C5FD" iconColor="#1E3A8A" />
      <MetricCard icon="AlertTriangle" title="Audit Discrepancies" value="12" subtitle="Requires review" color="#FECACA" iconColor="#B91C1C" />
    </div>
  </>
);

const ManagerDashboard = () => (
  <>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
      <Typography variant="h1" className="fade-up in-view" style={{ maxWidth: '600px' }}>
        Good morning, <em>Manager</em>
      </Typography>
      <div className="fade-up in-view">
        <Button variant="primary"><Icon name="Plus" size={20} color="var(--cloud)" /> Register Asset</Button>
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '64px' }}>
      <MetricCard icon="Inbox" title="Pending Allocations" value="45" subtitle="12 overdue" />
      <MetricCard icon="Wrench" title="In Maintenance" value="8" subtitle="3 critical" color="#FDE68A" iconColor="#B45309" />
      <MetricCard icon="RefreshCw" title="Transfer Requests" value="14" subtitle="Needs approval" />
    </div>
  </>
);

const HeadDashboard = () => (
  <>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
      <Typography variant="h1" className="fade-up in-view" style={{ maxWidth: '600px' }}>
        Department <em>Overview</em>
      </Typography>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '64px' }}>
      <MetricCard icon="Monitor" title="Dept Assets" value="342" subtitle="Engineering" />
      <MetricCard icon="Calendar" title="Active Bookings" value="5" subtitle="Resources in use" color="#C7D2BC" iconColor="#3F4A3C" />
      <MetricCard icon="UserCheck" title="Employee Requests" value="3" subtitle="Pending your approval" />
    </div>
  </>
);

const EmployeeDashboard = () => (
  <>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
      <Typography variant="h1" className="fade-up in-view" style={{ maxWidth: '600px' }}>
        Welcome, <em>Jane</em>
      </Typography>
      <div className="fade-up in-view">
        <Button variant="primary"><Icon name="Calendar" size={20} color="var(--cloud)" /> Book Resource</Button>
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '64px' }}>
      <MetricCard icon="Laptop" title="My Assets" value="3" subtitle="All in good condition" />
      <MetricCard icon="CalendarCheck" title="My Bookings" value="1" subtitle="Meeting Room A (2pm)" color="#93C5FD" iconColor="#1E3A8A" />
      <MetricCard icon="Tool" title="Active Tickets" value="0" subtitle="No ongoing maintenance" />
    </div>
  </>
);

// --- Reusable Metric Card ---
const MetricCard = ({ icon, title, value, subtitle, color = 'var(--sage-light)', iconColor = 'var(--moss)' }) => (
  <Card hoverEffect className="fade-up in-view">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} color={iconColor} />
      </div>
      <Typography variant="h2" style={{ color: 'var(--ink)' }}>{value}</Typography>
    </div>
    <Typography variant="h3">{title}</Typography>
    <Typography variant="body" style={{ color: 'var(--moss)', opacity: 0.8, marginTop: '8px' }}>
      {subtitle}
    </Typography>
  </Card>
);


// --- Main Component ---
export const DashboardPage = () => {
  const [role, setRole] = useState('employee');

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (savedRole) setRole(savedRole);
  }, []);

  return (
    <div>
      <span className="text-eyebrow fade-up in-view" style={{ animationDelay: '0.1s', display: 'block', marginBottom: '16px' }}>
        Overview
      </span>

      {role === 'admin' && <AdminDashboard />}
      {role === 'manager' && <ManagerDashboard />}
      {role === 'head' && <HeadDashboard />}
      {role === 'employee' && <EmployeeDashboard />}
      
      {/* Shared Recent Activity Section */}
      <div className="fade-up in-view" style={{ animationDelay: '0.4s' }}>
        <Typography variant="h2" style={{ marginBottom: '24px' }}>Recent Activity</Typography>
        <Card bg="stone">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i !== 3 ? '1px solid var(--sage-light)' : 'none', paddingBottom: i !== 3 ? '24px' : '0' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--cloud)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="Activity" size={20} />
                  </div>
                  <div>
                    <Typography variant="body" style={{ fontWeight: 500 }}>System Update</Typography>
                    <Typography variant="body" style={{ fontSize: '14px', color: 'var(--moss)', opacity: 0.8 }}>Action logged successfully</Typography>
                  </div>
                </div>
                <Typography variant="body" style={{ fontSize: '14px', color: 'var(--moss)' }}>Just now</Typography>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <Button variant="secondary">View All Activity</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

