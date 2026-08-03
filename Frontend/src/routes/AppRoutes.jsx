import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { OnboardingGuard } from '../components/auth/OnboardingGuard';

import { LandingPage } from '../pages/LandingPage';
import { AuthPage } from '../pages/AuthPage';
import { OnboardingPage } from '../pages/OnboardingPage';
import { Dashboard } from '../pages/Dashboard';
import { DailyPlanner } from '../pages/DailyPlanner';
import { GoalsPage } from '../pages/GoalsPage';
import { LearningHub } from '../pages/LearningHub';
import { InterviewPrep } from '../pages/InterviewPrep';
import { EnglishPage } from '../pages/EnglishPage';
import { DSAPage } from '../pages/DSAPage';
import { DevOpsPage } from '../pages/DevOpsPage';
import { ProjectManager } from '../pages/ProjectManager';
import { FitnessPage } from '../pages/FitnessPage';
import { HabitTracker } from '../pages/HabitTracker';
import { JournalPage } from '../pages/JournalPage';
import { AnalyticsPage } from '../pages/AnalyticsPage';
import { SettingsPage } from '../pages/SettingsPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { LoadingStatePage } from '../pages/LoadingStatePage';

export const AppRoutes = () => {
  return (
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
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
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
      <Route path="/app/jobs" element={<Navigate to="/app/dashboard" replace />} />

      {/* 404 Error Catch-All */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};


