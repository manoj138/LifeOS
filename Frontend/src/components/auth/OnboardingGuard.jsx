import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export const OnboardingGuard = () => {
  const { user, preferences, onboardingCompleted } = useUser();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const isAdmin = user?.role === 'admin';
  const isDoneOnboarding = onboardingCompleted || Boolean(preferences?.onboardingCompleted) || Boolean(preferences?.targetRole);

  if (!isAdmin && !isDoneOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};

