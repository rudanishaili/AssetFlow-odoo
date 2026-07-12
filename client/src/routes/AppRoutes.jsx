import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import DashboardPage from '../features/dashboard/pages/DashboardPage.jsx';
import MasterDataPage from '../features/master-data/pages/MasterDataPage.jsx';
import AssetPage from '../features/asset/pages/AssetPage.jsx';
import AllocationPage from '../features/allocation/pages/AllocationPage.jsx';
import BookingPage from '../features/booking/pages/BookingPage.jsx';
import MaintenancePage from '../features/maintenance/pages/MaintenancePage.jsx';
import AuditPage from '../features/audit/pages/AuditPage.jsx';
import ReportsPage from '../features/reports/pages/ReportsPage.jsx';
import NotificationPage from '../features/notification/pages/NotificationPage.jsx';
import LoginPage from '../features/auth/pages/LoginPage.jsx';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/organization" element={<MasterDataPage />} />
          <Route path="/assets" element={<AssetPage />} />
          <Route path="/allocations" element={<AllocationPage />} />
          <Route path="/bookings" element={<BookingPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/audits" element={<AuditPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/notifications" element={<NotificationPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;