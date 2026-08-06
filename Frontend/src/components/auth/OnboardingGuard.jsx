import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export const OnboardingGuard = () => {
  const { user, onboardingCompleted } = useUser();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const isAdmin = user?.role === 'admin';

  if (!isAdmin && !onboardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};

