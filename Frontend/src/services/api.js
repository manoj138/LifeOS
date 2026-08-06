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
      const message = err.response?.data?.message || 'Failed to connect to authentication server.';
      return { success: false, message };
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
      const message = err.response?.data?.message || 'Invalid email or password.';
      return { success: false, message };
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
      const message = err.response?.data?.message || 'Invalid PIN entered.';
      return { success: false, message };
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

  // Learning Progress Sync
  async getLearningProgress() {
    try {
      const res = await Api.get('/learning/progress');
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async completeLesson(lessonId) {
    try {
      const res = await Api.post('/learning/complete-lesson', { lessonId });
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async toggleSolvedDsa(dsaId) {
    try {
      const res = await Api.post('/learning/toggle-dsa', { dsaId });
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
      const res = await Api.post('/curriculum/topics/generate-ai', { topicTitle, moduleId, level });
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async bulkGenerateSequence({ moduleId, level, topicTitles }) {
    try {
      const res = await Api.post('/curriculum/topics/bulk-generate-sequence', { moduleId, level, topicTitles });
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

  async createInterviewQuestion(data) {
    try {
      const res = await Api.post('/interview/questions', data);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async deleteInterviewQuestion(id) {
    try {
      const res = await Api.delete(`/interview/questions/${id}`);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async bulkGenerateInterviewSequence({ category, titles }) {
    try {
      const res = await Api.post('/interview/questions/bulk-generate-sequence', { category, titles });
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

  async createDsaProblem(data) {
    try {
      const res = await Api.post('/dsa/problems', data);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async deleteDsaProblem(id) {
    try {
      const res = await Api.delete(`/dsa/problems/${id}`);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async bulkGenerateDsaSequence({ titles }) {
    try {
      const res = await Api.post('/dsa/problems/bulk-generate-sequence', { titles });
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async bulkImportRawDsa(data) {
    try {
      const res = await Api.post('/dsa/problems/bulk-raw-import', data);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async deleteDsaLanguage(language) {
    try {
      const res = await Api.delete(`/dsa/problems/language/${encodeURIComponent(language)}`);
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

  async createDevopsStep(data) {
    try {
      const res = await Api.post('/devops/steps', data);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async deleteDevopsStep(id) {
    try {
      const res = await Api.delete(`/devops/steps/${id}`);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async bulkGenerateDevopsSequence({ titles }) {
    try {
      const res = await Api.post('/devops/steps/bulk-generate-sequence', { titles });
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

  async createEnglishModule(data) {
    try {
      const res = await Api.post('/english/modules', data);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async deleteEnglishModule(id) {
    try {
      const res = await Api.delete(`/english/modules/${id}`);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async bulkGenerateEnglishSequence({ titles }) {
    try {
      const res = await Api.post('/english/modules/bulk-generate-sequence', { titles });
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // Admin Metrics & Candidates
  async getAdminMetrics() {
    try {
      const res = await Api.get('/admin/metrics');
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async getCandidates() {
    try {
      const res = await Api.get('/admin/candidates');
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async deleteCandidate(id) {
    try {
      const res = await Api.delete(`/admin/candidates/${id}`);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async deleteCurriculumTopic(id) {
    try {
      const res = await Api.delete(`/curriculum/topics/${id}`);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async generateSingleTopicWithAI(data) {
    const topicTitle = typeof data === 'string' ? data : data.topicTitle;
    const moduleId = data.moduleId || 'js';
    const level = data.level || 'Beginner';
    return this.generateSingleTopicAi(topicTitle, moduleId, level);
  },

  async saveOnboarding(data) {
    return this.updatePreferences(data);
  },

  // Daily Planner Tasks
  async getPlannerTasks() {
    try {
      const res = await Api.get('/planner/tasks');
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async createPlannerTask(data) {
    try {
      const res = await Api.post('/planner/tasks', data);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // Habits
  async getHabits() {
    try {
      const res = await Api.get('/habits');
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async createHabit(data) {
    try {
      const res = await Api.post('/habits', data);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // Goals
  async getGoals() {
    try {
      const res = await Api.get('/goals');
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async createGoal(data) {
    try {
      const res = await Api.post('/goals', data);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // Fitness Logs
  async getFitnessLogs() {
    try {
      const res = await Api.get('/fitness/logs');
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async createFitnessLog(data) {
    try {
      const res = await Api.post('/fitness/logs', data);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // Journal Entries
  async getJournalEntries() {
    try {
      const res = await Api.get('/journal/entries');
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async createJournalEntry(data) {
    try {
      const res = await Api.post('/journal/entries', data);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // Projects
  async getProjects() {
    try {
      const res = await Api.get('/projects');
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  async createProject(data) {
    try {
      const res = await Api.post('/projects', data);
      return res.data;
    } catch (err) {
      return { success: false, fallback: true };
    }
  },
};
