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
    try {
      const session = localStorage.getItem('lifeos_session');
      return session ? JSON.parse(session).user : null;
    } catch (e) {
      return null;
    }
  });

  const [preferences, setPreferences] = useState(() => {
    try {
      const session = localStorage.getItem('lifeos_session');
      return session ? JSON.parse(session).preferences : DEFAULT_PREFERENCES;
    } catch (e) {
      return DEFAULT_PREFERENCES;
    }
  });

  const [onboardingCompleted, setOnboardingCompleted] = useState(() => {
    try {
      const session = localStorage.getItem('lifeos_session');
      return session ? JSON.parse(session).onboardingCompleted : false;
    } catch (e) {
      return false;
    }
  });

  // Sync active login session to localStorage for F5 refresh persistence
  useEffect(() => {
    if (user) {
      localStorage.setItem('lifeos_session', JSON.stringify({ user, preferences, onboardingCompleted }));
    } else {
      localStorage.removeItem('lifeos_session');
    }
  }, [user, preferences, onboardingCompleted]);

  const completeOnboarding = (data) => {
    if (data.user) {
      setUser((prev) => ({ ...prev, ...data.user }));
    }
    if (data.preferences) {
      setPreferences((prev) => ({ ...prev, ...data.preferences }));
    }
    setOnboardingCompleted(true);

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
  };

  const clearAllLocalState = () => {
    localStorage.removeItem('lifeos_session');
    setUser(null);
    setPreferences(null);
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
