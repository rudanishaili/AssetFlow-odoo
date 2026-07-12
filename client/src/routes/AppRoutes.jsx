import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AuthLayout from '../layouts/AuthLayout.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';

// Guards
import ProtectedRoute from './ProtectedRoute.jsx';
import RoleGuard from './RoleGuard.jsx';

// Constants
import ROLES from '../constants/roles.js';

// Components
import PageTitle from '../common/layout/PageTitle.jsx';

// Authentication Pages
import LoginPage from '../features/auth/pages/LoginPage.jsx';
import AdminLoginPage from '../features/auth/pages/AdminLoginPage.jsx';
import RegisterPage from '../features/auth/pages/RegisterPage.jsx';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage.jsx';

// Core Dashboard
import DashboardPage from '../features/dashboard/pages/DashboardPage.jsx';

// Admin Pages
import DepartmentsPage from '../features/settings/pages/DepartmentsPage.jsx';
import CategoriesPage from '../features/settings/pages/CategoriesPage.jsx';
import EmployeesPage from '../features/settings/pages/EmployeesPage.jsx';
import ActivityLogsPage from '../features/settings/pages/ActivityLogsPage.jsx';

// Asset Manager Pages
import AssetListPage from '../features/asset/pages/AssetListPage.jsx';
import AssetFormPage from '../features/asset/pages/AssetFormPage.jsx';
import AssetDetailPage from '../features/asset/pages/AssetDetailPage.jsx';
import AssetHistoryPage from '../features/asset/pages/AssetHistoryPage.jsx';
import AllocationListPage from '../features/allocation/pages/AllocationListPage.jsx';
import CheckoutWizardPage from '../features/allocation/pages/CheckoutWizardPage.jsx';
import TransferRequestsPage from '../features/allocation/pages/TransferRequestsPage.jsx';
import ReturnApprovalPage from '../features/allocation/pages/ReturnApprovalPage.jsx';
import MaintenanceListPage from '../features/maintenance/pages/MaintenanceListPage.jsx';

// Department Head Pages
import DepartmentAssetsPage from '../features/asset/pages/DepartmentAssetsPage.jsx';
import AllocationRequestsPage from '../features/allocation/pages/AllocationRequestsPage.jsx';
import BookingOverviewPage from '../features/booking/pages/BookingOverviewPage.jsx'; // Served as Booking Calendar

// Employee Pages
import MyAssetsPage from '../features/asset/pages/MyAssetsPage.jsx';
import BookResourcePage from '../features/booking/pages/BookResourcePage.jsx';
import MyBookingsPage from '../features/booking/pages/MyBookingsPage.jsx';
import RaiseMaintenancePage from '../features/maintenance/pages/RaiseMaintenancePage.jsx';
import EmployeeTransferPage from '../features/allocation/pages/EmployeeTransferPage.jsx';
import ReturnAssetPage from '../features/allocation/pages/ReturnAssetPage.jsx';

// Shared Pages
import NotificationsPage from '../features/notification/pages/NotificationsPage.jsx';
import ProfilePage from '../features/profile/pages/ProfilePage.jsx';
import ReportBuilderPage from '../features/reports/pages/ReportBuilderPage.jsx';
import AccessControlPage from '../features/settings/pages/AccessControlPage.jsx';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes (Auth) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Protected Routes */}
      <Route 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Core Dashboard shared URL (renders per-role internally) */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* Shared Routes */}
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* 1. ADMIN ONLY ROUTES */}
        <Route path="/admin/departments" element={
          <RoleGuard allowedRoles={[ROLES.ADMIN]}><DepartmentsPage /></RoleGuard>
        } />
        <Route path="/admin/categories" element={
          <RoleGuard allowedRoles={[ROLES.ADMIN]}><CategoriesPage /></RoleGuard>
        } />
        <Route path="/admin/employees" element={
          <RoleGuard allowedRoles={[ROLES.ADMIN]}><EmployeesPage /></RoleGuard>
        } />
        <Route path="/admin/activity-logs" element={
          <RoleGuard allowedRoles={[ROLES.ADMIN]}><ActivityLogsPage /></RoleGuard>
        } />
        <Route path="/admin/audit" element={
          <RoleGuard allowedRoles={[ROLES.ADMIN]}>
            <div className="liora-card">
              <PageTitle title="Audit Monitor" subtitle="Track current audit status and employee completion rates." />
              <p style={{ color: 'var(--text-secondary)' }}>Audit monitoring system online. No active campaigns are overdue.</p>
            </div>
          </RoleGuard>
        } />
        <Route path="/admin/reports" element={
          <RoleGuard allowedRoles={[ROLES.ADMIN]}><ReportBuilderPage /></RoleGuard>
        } />
        <Route path="/settings" element={
          <RoleGuard allowedRoles={[ROLES.ADMIN]}><AccessControlPage /></RoleGuard>
        } />

        {/* 2. ASSET MANAGER ONLY ROUTES */}
        <Route path="/assets" element={
          <RoleGuard allowedRoles={[ROLES.ASSET_MANAGER]}><AssetListPage /></RoleGuard>
        } />
        <Route path="/assets/new" element={
          <RoleGuard allowedRoles={[ROLES.ASSET_MANAGER]}><AssetFormPage /></RoleGuard>
        } />
        <Route path="/assets/:id" element={
          <RoleGuard allowedRoles={[ROLES.ASSET_MANAGER, ROLES.EMPLOYEE]}><AssetDetailPage /></RoleGuard>
        } />
        <Route path="/assets/:id/history" element={
          <RoleGuard allowedRoles={[ROLES.ASSET_MANAGER]}><AssetHistoryPage /></RoleGuard>
        } />
        <Route path="/allocations" element={
          <RoleGuard allowedRoles={[ROLES.ASSET_MANAGER]}><AllocationListPage /></RoleGuard>
        } />
        <Route path="/allocations/checkout" element={
          <RoleGuard allowedRoles={[ROLES.ASSET_MANAGER]}><CheckoutWizardPage /></RoleGuard>
        } />
        <Route path="/transfers" element={
          <RoleGuard allowedRoles={[ROLES.ASSET_MANAGER]}><TransferRequestsPage /></RoleGuard>
        } />
        <Route path="/returns" element={
          <RoleGuard allowedRoles={[ROLES.ASSET_MANAGER]}><ReturnApprovalPage /></RoleGuard>
        } />
        <Route path="/maintenance" element={
          <RoleGuard allowedRoles={[ROLES.ASSET_MANAGER]}><MaintenanceListPage /></RoleGuard>
        } />
        <Route path="/audit" element={
          <RoleGuard allowedRoles={[ROLES.ASSET_MANAGER]}>
            <div className="liora-card">
              <PageTitle title="Audit Manager" subtitle="Create and monitor asset reconciliation campaigns." />
              <p style={{ color: 'var(--text-secondary)' }}>All assets reconciled as of Q2 audit campaign.</p>
            </div>
          </RoleGuard>
        } />
        <Route path="/reports" element={
          <RoleGuard allowedRoles={[ROLES.ASSET_MANAGER]}><ReportBuilderPage /></RoleGuard>
        } />

        {/* 3. DEPARTMENT HEAD ONLY ROUTES */}
        <Route path="/dept-assets" element={
          <RoleGuard allowedRoles={[ROLES.DEPT_HEAD]}><DepartmentAssetsPage /></RoleGuard>
        } />
        <Route path="/allocation-requests" element={
          <RoleGuard allowedRoles={[ROLES.DEPT_HEAD]}><AllocationRequestsPage /></RoleGuard>
        } />
        <Route path="/transfer-requests" element={
          <RoleGuard allowedRoles={[ROLES.DEPT_HEAD]}><TransferRequestsPage /></RoleGuard>
        } />
        <Route path="/bookings" element={
          <RoleGuard allowedRoles={[ROLES.DEPT_HEAD, ROLES.EMPLOYEE]}><BookingOverviewPage /></RoleGuard>
        } />

        {/* 4. EMPLOYEE ONLY ROUTES */}
        <Route path="/my-assets" element={
          <RoleGuard allowedRoles={[ROLES.EMPLOYEE]}><MyAssetsPage /></RoleGuard>
        } />
        <Route path="/book-resource" element={
          <RoleGuard allowedRoles={[ROLES.EMPLOYEE]}><BookResourcePage /></RoleGuard>
        } />
        <Route path="/my-bookings" element={
          <RoleGuard allowedRoles={[ROLES.EMPLOYEE]}><MyBookingsPage /></RoleGuard>
        } />
        <Route path="/raise-maintenance" element={
          <RoleGuard allowedRoles={[ROLES.EMPLOYEE]}><RaiseMaintenancePage /></RoleGuard>
        } />
        <Route path="/employee-transfer" element={
          <RoleGuard allowedRoles={[ROLES.EMPLOYEE]}><EmployeeTransferPage /></RoleGuard>
        } />
        <Route path="/return-asset" element={
          <RoleGuard allowedRoles={[ROLES.EMPLOYEE]}><ReturnAssetPage /></RoleGuard>
        } />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
