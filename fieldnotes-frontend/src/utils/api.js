import axios from 'axios';

// Get API base URL from Vite environment, fallback to standard local address
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically inject JWT token into authorization header if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('fieldnotes_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
