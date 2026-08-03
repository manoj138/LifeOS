import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export const OnboardingGuard = () => {
  const { onboardingCompleted } = useUser();

  if (!onboardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};
