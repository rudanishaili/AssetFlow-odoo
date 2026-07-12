import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { MainLayout } from '../layouts/MainLayout';
import { AuthLayout } from '../layouts/AuthLayout';

// Guards
import ProtectedRoute from './ProtectedRoute';

// Pages
import { LoginPage } from '../features/auth/pages/LoginPage';
import { SignupPage } from '../features/auth/pages/SignupPage';
import { ForgotPasswordPage } from '../features/auth/pages/ForgotPasswordPage';
import { DashboardPage } from '../features/dashboard/pages/DashboardPage';
// The other pages might still be default exports, so keep them as is for now if they exist
import AssetListPage from '../features/asset/pages/AssetListPage';
import AllocationPage from '../features/allocation/pages/AllocationPage';
import BookingPage from '../features/booking/pages/BookingPage';
import MaintenancePage from '../features/maintenance/pages/MaintenancePage';
import AuditPage from '../features/audit/pages/AuditPage';
import ReportsPage from '../features/reports/pages/ReportsPage';
import NotificationPage from '../features/notification/pages/NotificationPage';
import ProfilePage from '../features/profile/pages/ProfilePage';
import SettingsPage from '../features/settings/pages/SettingsPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Protected Dashboard Routes */}
      <Route 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/assets" element={<AssetListPage />} />
        <Route path="/allocations" element={<AllocationPage />} />
        <Route path="/bookings" element={<BookingPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/audits" element={<AuditPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Default Redirection */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
