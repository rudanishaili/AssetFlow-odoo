import React from 'react';
import { Navigate } from 'react-router-dom';

function RoleGuard({ allowedRoles = [], currentRole, children }) {
  if (!allowedRoles.includes(currentRole)) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export default RoleGuard;