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
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [preferences, setPreferences] = useState(() => {
    const savedPrefs = localStorage.getItem('lifeos_user_preferences');
    return savedPrefs ? JSON.parse(savedPrefs) : null;
  });

  const [onboardingCompleted, setOnboardingCompleted] = useState(() => {
    return localStorage.getItem('lifeos_onboarding_completed') === 'true';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('lifeos_user_profile', JSON.stringify(user));
    } else {
      localStorage.removeItem('lifeos_user_profile');
    }
  }, [user]);

  useEffect(() => {
    if (preferences) {
      localStorage.setItem('lifeos_user_preferences', JSON.stringify(preferences));
    } else {
      localStorage.removeItem('lifeos_user_preferences');
    }
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

  const clearAllLocalState = () => {
    localStorage.removeItem('lifeos_user_profile');
    localStorage.removeItem('lifeos_user_preferences');
    localStorage.removeItem('lifeos_onboarding_completed');
    localStorage.removeItem('lifeos_auth_token');
    localStorage.removeItem('lifeos_goals');
    localStorage.removeItem('lifeos_planner_tasks');
    setUser(DEFAULT_PROFILE);
    setPreferences(DEFAULT_PREFERENCES);
    setOnboardingCompleted(false);
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
        clearAllLocalState,
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
