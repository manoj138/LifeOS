import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const UserContext = createContext(null);

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

  // Centralized Dynamic User Progress Tracking
  const [userProgress, setUserProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('lifeos_user_progress');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      completedTopicIds: [],
      solvedDsaIds: [],
      completedTaskIds: [],
      workoutLogs: []
    };
  });

  // Sync active login session to localStorage for F5 refresh persistence
  useEffect(() => {
    if (user) {
      localStorage.setItem('lifeos_session', JSON.stringify({ user, preferences, onboardingCompleted }));
    } else {
      localStorage.removeItem('lifeos_session');
    }
  }, [user, preferences, onboardingCompleted]);

  // Sync progress state
  useEffect(() => {
    localStorage.setItem('lifeos_user_progress', JSON.stringify(userProgress));
  }, [userProgress]);

  const toggleCompletedTopic = (topicId) => {
    setUserProgress((prev) => {
      const current = prev.completedTopicIds || [];
      const updated = current.includes(topicId)
        ? current.filter((id) => id !== topicId)
        : [...current, topicId];
      return { ...prev, completedTopicIds: updated };
    });
  };

  const toggleSolvedDsa = (dsaId) => {
    setUserProgress((prev) => {
      const current = prev.solvedDsaIds || [];
      const updated = current.includes(dsaId)
        ? current.filter((id) => id !== dsaId)
        : [...current, dsaId];
      return { ...prev, solvedDsaIds: updated };
    });
  };

  const toggleCompletedTask = (taskId) => {
    setUserProgress((prev) => {
      const current = prev.completedTaskIds || [];
      const updated = current.includes(taskId)
        ? current.filter((id) => id !== taskId)
        : [...current, taskId];
      return { ...prev, completedTaskIds: updated };
    });
  };

  const logWorkout = (logEntry) => {
    setUserProgress((prev) => ({
      ...prev,
      workoutLogs: [logEntry, ...(prev.workoutLogs || [])]
    }));
  };

  const completeOnboarding = (data) => {
    if (data.user) {
      setUser((prev) => ({ ...(prev || {}), ...data.user }));
    }
    if (data.preferences) {
      setPreferences((prev) => ({ ...(prev || {}), ...data.preferences }));
    }
    setOnboardingCompleted(true);

    // Asynchronously sync with Backend API
    apiService.saveOnboarding({
      name: data.user?.name,
      ...data.preferences,
    }).catch((err) => console.log('Backend sync offline fallback active.'));
  };

  const updatePreferences = (newPrefs) => {
    setPreferences((prev) => ({ ...(prev || {}), ...newPrefs }));
  };

  const updateUserProfile = (newProfile) => {
    setUser((prev) => ({ ...(prev || {}), ...newProfile }));
  };

  const resetOnboarding = () => {
    setOnboardingCompleted(false);
  };

  const clearAllLocalState = () => {
    localStorage.removeItem('lifeos_session');
    localStorage.removeItem('lifeos_user_progress');
    localStorage.removeItem('lifeos_auth_token');
    setUser(null);
    setPreferences(null);
    setOnboardingCompleted(false);
    setUserProgress({
      completedTopicIds: [],
      solvedDsaIds: [],
      completedTaskIds: [],
      workoutLogs: []
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        preferences,
        onboardingCompleted,
        userProgress,
        toggleCompletedTopic,
        toggleSolvedDsa,
        toggleCompletedTask,
        logWorkout,
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

