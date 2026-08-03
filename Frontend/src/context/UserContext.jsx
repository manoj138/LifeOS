import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const UserContext = createContext(null);


const DEFAULT_PROFILE = {
  name: 'Manoj Kumar',
  email: 'manoj@lifeos.ai',
};

const DEFAULT_PREFERENCES = {
  targetRole: 'Full-Stack Web Developer',
  careerLevel: 'Intermediate (1-3 yrs experience)',
  focusAreas: ['Coding & DSA', 'DevOps & Cloud', 'English Fluency', 'Fitness & Energy'],
  skillLevels: {
    dsa: 'Intermediate',
    devops: 'Beginner',
    english: 'Intermediate'
  },
  dailyHours: 4,
  targetDate: '2026-12-31',
  fitnessGoal: 'Build Muscle & Increase Energy',
  workoutType: 'Gym Weightlifting & Cardio',
  aiPersona: 'Motivational Tech Mentor',
  voiceCoachName: 'Antigravity AI',
  voiceCoachSpeed: '1.0x',
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('lifeos_user_profile');
    return savedUser ? JSON.parse(savedUser) : DEFAULT_PROFILE;
  });

  const [preferences, setPreferences] = useState(() => {
    const savedPrefs = localStorage.getItem('lifeos_user_preferences');
    return savedPrefs ? JSON.parse(savedPrefs) : DEFAULT_PREFERENCES;
  });

  const [onboardingCompleted, setOnboardingCompleted] = useState(() => {
    return localStorage.getItem('lifeos_onboarding_completed') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('lifeos_user_profile', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('lifeos_user_preferences', JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem('lifeos_onboarding_completed', onboardingCompleted ? 'true' : 'false');
  }, [onboardingCompleted]);

  const completeOnboarding = (data) => {
    if (data.user) {
      setUser((prev) => ({ ...prev, ...data.user }));
    }
    if (data.preferences) {
      setPreferences((prev) => ({ ...prev, ...data.preferences }));
    }
    setOnboardingCompleted(true);
    localStorage.setItem('lifeos_onboarding_completed', 'true');

    // Asynchronously sync with Backend API
    apiService.saveOnboarding({
      name: data.user?.name,
      ...data.preferences,
    }).catch((err) => console.log('Backend sync offline fallback active.'));
  };


  const updatePreferences = (newPrefs) => {
    setPreferences((prev) => ({ ...prev, ...newPrefs }));
  };

  const updateUserProfile = (newProfile) => {
    setUser((prev) => ({ ...prev, ...newProfile }));
  };

  const resetOnboarding = () => {
    setOnboardingCompleted(false);
    localStorage.setItem('lifeos_onboarding_completed', 'false');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        preferences,
        onboardingCompleted,
        completeOnboarding,
        updatePreferences,
        updateUserProfile,
        resetOnboarding,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
