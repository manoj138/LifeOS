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
      if (result.success && result.data?.token) {
        localStorage.setItem('lifeos_auth_token', result.data.token);
      }
      return result;
    } catch (err) {
      console.warn('Backend API unreachable, using local fallback:', err);
      return { success: false, fallback: true };
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
      if (result.success && result.data?.token) {
        localStorage.setItem('lifeos_auth_token', result.data.token);
      }
      return result;
    } catch (err) {
      console.warn('Backend API unreachable, using local fallback:', err);
      return { success: false, fallback: true };
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
      if (result.success && result.data?.token) {
        localStorage.setItem('lifeos_auth_token', result.data.token);
      }
      return result;
    } catch (err) {
      return { success: false, fallback: true };
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

  // Admin Telemetry
  async getAdminMetrics() {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/metrics`);
      return await res.json();
    } catch (err) {
      return { success: false, fallback: true };
    }
  },
};
