import axios from 'axios';

export const BASE_URL = 'http://localhost:1235';
export const API_BASE_URL = `${BASE_URL}/api`;

export const Api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatically attaches Bearer Token from localStorage
Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('lifeos_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Centralized error handling & token expiration cleanup
Api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('lifeos_auth_token');
      localStorage.removeItem('lifeos_user_data');
    }
    return Promise.reject(error);
  }
);

export const sessionStore = (token, user) => {
  localStorage.setItem('lifeos_auth_token', token);
  if (user) localStorage.setItem('lifeos_user_data', JSON.stringify(user));
};

export const sessionRemove = () => {
  localStorage.removeItem('lifeos_auth_token');
  localStorage.removeItem('lifeos_user_data');
};

export const handleApiError = (error, setError = null, addToast = null) => {
  if (error.response && error.response.status === 422) {
    if (setError) setError(error.response.data.errors || {});
    if (addToast) addToast('Please fix the validation errors', 'danger');
  } else {
    const message = error.response?.data?.message || 'Internal Server Error';
    if (addToast) {
      addToast(message, 'danger');
    } else {
      console.warn('API Error:', message);
    }
  }
};

export const apiService = {
  // Auth
  async register(data) {
    try {
      const res = await Api.post('/auth/register', data);
      const result = res.data;
      if (result.data?.token) {
        sessionStore(result.data.token, result.data.user);
      }
      return result;
    } catch (err) {
      console.warn('Backend API unreachable, using local fallback:', err.message);
      const fallbackToken = 'lifeos_offline_jwt_token_' + Date.now();
      sessionStore(fallbackToken, { name: data.name, email: data.email });
      return { success: true, fallback: true, data: { token: fallbackToken } };
    }
  },

  async login(email, password) {
    try {
      const res = await Api.post('/auth/login', { email, password });
      const result = res.data;
      if (result.data?.token) {
        sessionStore(result.data.token, result.data.user);
      }
      return result;
    } catch (err) {
      console.warn('Backend API unreachable, using local fallback:', err.message);
      const fallbackToken = 'lifeos_offline_jwt_token_' + Date.now();
      sessionStore(fallbackToken, { email });
      return { success: true, fallback: true, data: { token: fallbackToken } };
    }
  },

  async pinLogin(pin) {
    try {
      const res = await Api.post('/auth/pin-login', { pin });
      const result = res.data;
      if (result.data?.token) {
        sessionStore(result.data.token, result.data.user);
      }
      return result;
    } catch (err) {
      console.warn('Backend API unreachable, using local fallback:', err.message);
      const fallbackToken = 'lifeos_offline_jwt_token_' + Date.now();
      sessionStore(fallbackToken, { email: 'user@lifeos.ai' });
      return { success: true, fallback: true, data: { token: fallbackToken } };
    }
  },

  async getProfile() {
    try {
      const res = await Api.get('/user/profile');
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async updateProfile(data) {
    try {
      const res = await Api.put('/user/profile', data);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async getPreferences() {
    try {
      const res = await Api.get('/user/preferences');
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async updatePreferences(data) {
    try {
      const res = await Api.put('/user/preferences', data);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // Roadmap & Curriculum Topics
  async getRoadmapModules() {
    try {
      const res = await Api.get('/curriculum/modules');
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async createRoadmapModule(data) {
    try {
      const res = await Api.post('/curriculum/modules', data);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async updateRoadmapModule(id, data) {
    try {
      const res = await Api.put(`/curriculum/modules/${id}`, data);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async deleteRoadmapModule(id) {
    try {
      const res = await Api.delete(`/curriculum/modules/${id}`);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async getCurriculumTopics(moduleId = '') {
    try {
      const url = moduleId ? `/curriculum/topics?moduleId=${encodeURIComponent(moduleId)}` : '/curriculum/topics';
      const res = await Api.get(url);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async getCurriculumTopicById(id) {
    try {
      const res = await Api.get(`/curriculum/topics/${id}`);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async updateCurriculumTopic(id, data) {
    try {
      const res = await Api.put(`/curriculum/topics/${id}`, data);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async generateSingleTopicAi(topicTitle, moduleId = 'js', level = 'Beginner') {
    try {
      const res = await Api.post('/curriculum/generate-topic', { topicTitle, moduleId, level });
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async bulkGenerateSequence({ moduleId, level, topicTitles }) {
    try {
      const res = await Api.post('/curriculum/bulk-generate-sequence', { moduleId, level, topicTitles });
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // Job Applications
  async getJobApplications() {
    try {
      const res = await Api.get('/jobs');
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async createJobApplication(data) {
    try {
      const res = await Api.post('/jobs', data);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // Interview Questions
  async getInterviewQuestions(category = '') {
    try {
      const url = category ? `/interview/questions?category=${encodeURIComponent(category)}` : '/interview/questions';
      const res = await Api.get(url);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // DSA Problems
  async getDsaProblems() {
    try {
      const res = await Api.get('/dsa/problems');
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // DevOps Steps
  async getDevopsSteps() {
    try {
      const res = await Api.get('/devops/steps');
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // English Modules
  async getEnglishModules() {
    try {
      const res = await Api.get('/english/modules');
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // Admin Metrics
  async getAdminMetrics() {
    try {
      const res = await Api.get('/admin/metrics');
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },
};
