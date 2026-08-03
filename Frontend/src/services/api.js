const API_BASE_URL = 'http://localhost:1235/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('lifeos_auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const apiService = {
  // Auth
  async register(data) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.data?.token) {
        localStorage.setItem('lifeos_auth_token', result.data.token);
      }
      return result;
    } catch (err) {
      console.warn('Backend API unreachable, using local fallback:', err);
      const fallbackToken = 'lifeos_offline_jwt_token_' + Date.now();
      localStorage.setItem('lifeos_auth_token', fallbackToken);
      return { success: true, fallback: true, data: { token: fallbackToken } };
    }
  },

  async login(email, password) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await res.json();
      if (result.data?.token) {
        localStorage.setItem('lifeos_auth_token', result.data.token);
      }
      return result;
    } catch (err) {
      console.warn('Backend API unreachable, using local fallback:', err);
      const fallbackToken = 'lifeos_offline_jwt_token_' + Date.now();
      localStorage.setItem('lifeos_auth_token', fallbackToken);
      return { success: true, fallback: true, data: { token: fallbackToken } };
    }
  },

  async pinLogin(pin) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/pin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      const result = await res.json();
      if (result.data?.token) {
        localStorage.setItem('lifeos_auth_token', result.data.token);
      }
      return result;
    } catch (err) {
      const fallbackToken = 'lifeos_offline_jwt_token_' + Date.now();
      localStorage.setItem('lifeos_auth_token', fallbackToken);
      return { success: true, fallback: true, data: { token: fallbackToken } };
    }
  },

  // Onboarding & Preferences
  async saveOnboarding(data) {
    try {
      const res = await fetch(`${API_BASE_URL}/user/onboarding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async getPreferences() {
    try {
      const res = await fetch(`${API_BASE_URL}/user/preferences`, {
        headers: getAuthHeader(),
      });
      return await res.json();
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // Admin Telemetry & Candidate Management
  async getAdminMetrics() {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/metrics`);
      return await res.json();
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async getCandidates() {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/candidates`, {
        headers: getAuthHeader(),
      });
      return await res.json();
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async deleteCandidate(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/candidates/${id}`, {
        method: 'DELETE',
        headers: getAuthHeader(),
      });
      return await res.json();
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // Daily Planner Tasks
  async getPlannerTasks() {
    try {
      const res = await fetch(`${API_BASE_URL}/planner/tasks`, { headers: getAuthHeader() });
      return await res.json();
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async createPlannerTask(data) {
    try {
      const res = await fetch(`${API_BASE_URL}/planner/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // Goals
  async getGoals() {
    try {
      const res = await fetch(`${API_BASE_URL}/goals`, { headers: getAuthHeader() });
      return await res.json();
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // Fitness
  async getFitnessLogs() {
    try {
      const res = await fetch(`${API_BASE_URL}/fitness/logs`, { headers: getAuthHeader() });
      return await res.json();
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // Habits
  async getHabits() {
    try {
      const res = await fetch(`${API_BASE_URL}/habits`, { headers: getAuthHeader() });
      return await res.json();
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // Curriculum Management
  async getCurriculumTopics(moduleId) {
    try {
      const url = moduleId ? `${API_BASE_URL}/curriculum/topics?moduleId=${moduleId}` : `${API_BASE_URL}/curriculum/topics`;
      const res = await fetch(url);
      return await res.json();
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async updateCurriculumTopic(id, data) {
    try {
      const res = await fetch(`${API_BASE_URL}/curriculum/topics/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async seedCurriculum() {
    try {
      const res = await fetch(`${API_BASE_URL}/curriculum/seed`, { method: 'POST' });
      return await res.json();
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // Job Applications
  async getJobApplications() {
    try {
      const res = await fetch(`${API_BASE_URL}/jobs`, { headers: getAuthHeader() });
      return await res.json();
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async createJobApplication(data) {
    try {
      const res = await fetch(`${API_BASE_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err) {
      return { success: false, fallback: true };
    }
  },
};




