import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const UserContext = createContext(null);

const DEFAULT_PREFERENCES = {
  targetRole: '',
  careerLevel: '',
  focusAreas: [],
  skillLevels: {
    dsa: 'Beginner',
    devops: 'Beginner',
    english: 'Beginner'
  },
  cityState: '',
  aiLanguage: 'English',
  degree: '',
  collegeName: '',
  collegeCity: '',
  educationStatus: '',
  graduationPeriod: '',
  hasExperience: 'No',
  experienceType: 'Fresher',
  companyName: '',
  experienceRole: '',
  experienceDuration: '',
  companyTechStack: '',
  project1Name: '',
  project1Tagline: '',
  project1Desc: '',
  project1TechStack: '',
  project2Name: '',
  project2Desc: '',
  project2TechStack: '',
  targetCompanyTier: 'Product Startups',
  weakDsaTopics: [],
  weakDevopsTopics: [],
  dailyHours: 2,
  preferredTimeSlot: 'Flexible',
  targetDate: '',
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

  // Initial Backend API Data Fetch & Sync
  useEffect(() => {
    let isMounted = true;
    const syncBackendData = async () => {
      const token = localStorage.getItem('lifeos_auth_token');
      if (!token) return;

      try {
        const [profileRes, prefRes, progRes] = await Promise.all([
          apiService.getProfile(),
          apiService.getPreferences(),
          apiService.getLearningProgress()
        ]);

        if (isMounted) {
          if (profileRes?.success && profileRes.data) {
            const fetchedUser = {
              id: profileRes.data.id,
              name: profileRes.data.name,
              email: profileRes.data.email,
              role: profileRes.data.role,
            };
            setUser(fetchedUser);
            if (profileRes.data.preferences) {
              setPreferences((prev) => ({ ...(prev || {}), ...profileRes.data.preferences }));
              if (profileRes.data.preferences.onboardingCompleted) {
                setOnboardingCompleted(true);
              }
            }
          }

          if (prefRes?.success && prefRes.data) {
            setPreferences((prev) => ({ ...(prev || {}), ...prefRes.data }));
            if (prefRes.data.onboardingCompleted) {
              setOnboardingCompleted(true);
            }
          }

          if (progRes?.success && progRes.data) {
            const completed = Array.isArray(progRes.data.completedLessons)
              ? progRes.data.completedLessons
              : [];
            const solvedDsa = Array.isArray(progRes.data.solvedDsaProblems)
              ? progRes.data.solvedDsaProblems
              : [];

            setUserProgress((prev) => ({
              ...prev,
              completedTopicIds: completed,
              solvedDsaIds: solvedDsa
            }));
          }
        }
      } catch (err) {
        console.warn('Backend initial sync notice:', err.message);
      }
    };

    syncBackendData();
    return () => { isMounted = false; };
  }, []);

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

    apiService.completeLesson(topicId).catch((err) => console.warn('Lesson toggle API sync notice:', err.message));
  };

  const toggleSolvedDsa = (dsaId) => {
    setUserProgress((prev) => {
      const current = prev.solvedDsaIds || [];
      const updated = current.includes(dsaId)
        ? current.filter((id) => id !== dsaId)
        : [...current, dsaId];
      return { ...prev, solvedDsaIds: updated };
    });

    apiService.toggleSolvedDsa(dsaId).catch((err) => console.warn('DSA toggle API sync notice:', err.message));
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

  const loginUser = (userData, preferencesData) => {
    setUser(userData || null);
    const prefs = preferencesData || DEFAULT_PREFERENCES;
    setPreferences(prefs);
    const isCompleted = Boolean(prefs?.onboardingCompleted);
    setOnboardingCompleted(isCompleted);
    if (userData) {
      localStorage.setItem('lifeos_session', JSON.stringify({
        user: userData,
        preferences: prefs,
        onboardingCompleted: isCompleted,
      }));
    }
  };

  const updatePreferences = (newPrefs) => {
    setPreferences((prev) => {
      const updated = { ...(prev || {}), ...newPrefs };
      if (newPrefs && newPrefs.onboardingCompleted !== undefined) {
        setOnboardingCompleted(Boolean(newPrefs.onboardingCompleted));
      }
      return updated;
    });
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
        loginUser,
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
    console.warn('useUser was accessed outside UserProvider, returning safe fallback object.');
    return {
      user: { name: 'Learner', email: 'user@lifeos.dev' },
      preferences: { dailyHours: 2, targetRole: 'Full Stack Engineer' },
      onboardingCompleted: true,
      userMetrics: {},
      workoutLogs: [],
      routineTasks: [],
    };
  }
  return context;
};

