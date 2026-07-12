import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore.js';

export const RoleGuard = ({ allowedRoles, children }) => {
  const { user } = useAuthStore();

  if (!user || !allowedRoles.includes(user.role)) {
    // Redirect to dashboard if the user does not have permission
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleGuard;
