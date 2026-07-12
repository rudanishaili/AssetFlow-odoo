import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RoleGuard({ allowedRoles = [], children }) {
  const userRole = localStorage.getItem('role') || 'user';

  if (!allowedRoles.includes(userRole.toLowerCase())) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
