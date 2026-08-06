import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { OnboardingGuard } from '../components/auth/OnboardingGuard';
import { AdminGuard } from '../components/auth/AdminGuard';
import { LoadingStatePage } from '../pages/LoadingStatePage';

const LandingPage = lazy(() => import('../pages/LandingPage').then(m => ({ default: m.LandingPage })));
const AuthPage = lazy(() => import('../pages/AuthPage').then(m => ({ default: m.AuthPage })));
const OnboardingPage = lazy(() => import('../pages/OnboardingPage').then(m => ({ default: m.OnboardingPage })));
const Dashboard = lazy(() => import('../pages/Dashboard').then(m => ({ default: m.Dashboard })));
const DailyPlanner = lazy(() => import('../pages/DailyPlanner').then(m => ({ default: m.DailyPlanner })));
const GoalsPage = lazy(() => import('../pages/GoalsPage').then(m => ({ default: m.GoalsPage })));
const LearningHub = lazy(() => import('../pages/LearningHub').then(m => ({ default: m.LearningHub })));
const InterviewPrep = lazy(() => import('../pages/InterviewPrep').then(m => ({ default: m.InterviewPrep })));
const EnglishPage = lazy(() => import('../pages/EnglishPage').then(m => ({ default: m.EnglishPage })));
const DSAPage = lazy(() => import('../pages/DSAPage').then(m => ({ default: m.DSAPage })));
const DevOpsPage = lazy(() => import('../pages/DevOpsPage').then(m => ({ default: m.DevOpsPage })));
const ProjectManager = lazy(() => import('../pages/ProjectManager').then(m => ({ default: m.ProjectManager })));
const FitnessPage = lazy(() => import('../pages/FitnessPage').then(m => ({ default: m.FitnessPage })));
const HabitTracker = lazy(() => import('../pages/HabitTracker').then(m => ({ default: m.HabitTracker })));
const JournalPage = lazy(() => import('../pages/JournalPage').then(m => ({ default: m.JournalPage })));
const AnalyticsPage = lazy(() => import('../pages/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const SettingsPage = lazy(() => import('../pages/SettingsPage').then(m => ({ default: m.SettingsPage })));
const AdminPage = lazy(() => import('../pages/AdminPage').then(m => ({ default: m.AdminPage })));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

import { useUser } from '../context/UserContext';

const AppIndexRedirect = () => {
  const { user } = useUser();
  const isAdmin = user?.role === 'admin';
  return <Navigate to={isAdmin ? "/app/admin" : "/app/dashboard"} replace />;
};

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingStatePage />}>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<AuthPage />} />
        </Route>

        {/* Onboarding Wizard Route */}
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* Authenticated Application Shell (Guarded by Onboarding) */}
        <Route element={<OnboardingGuard />}>
          <Route path="/app" element={<MainLayout />}>
            <Route index element={<AppIndexRedirect />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route element={<AdminGuard />}>
              <Route path="admin" element={<AdminPage />} />
            </Route>


            <Route path="planner" element={<DailyPlanner />} />
            <Route path="goals" element={<GoalsPage />} />
            <Route path="learning" element={<LearningHub />} />
            <Route path="interview" element={<InterviewPrep />} />
            <Route path="english" element={<EnglishPage />} />
            <Route path="dsa" element={<DSAPage />} />
            <Route path="devops" element={<DevOpsPage />} />
            <Route path="projects" element={<ProjectManager />} />
            <Route path="fitness" element={<FitnessPage />} />
            <Route path="habits" element={<HabitTracker />} />
            <Route path="journal" element={<JournalPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="loading-preview" element={<LoadingStatePage />} />
          </Route>

        </Route>

        {/* Legacy route redirects */}
        <Route path="/customers/*" element={<Navigate to="/app/dashboard" replace />} />
        <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
        <Route path="/learning-hub" element={<Navigate to="/app/learning" replace />} />
        <Route path="/dsa-master" element={<Navigate to="/app/dsa" replace />} />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
