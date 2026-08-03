import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export const AdminGuard = () => {
  const { user } = useUser();

  const isAdmin = user?.role === 'admin' || user?.email?.toLowerCase().includes('admin');

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <Outlet />;
};
