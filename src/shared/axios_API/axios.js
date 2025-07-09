import axios from 'axios';

// ------------------------ ENVIRONMENT VARIABLES ------------------------
const LOCAL_API = import.meta.env.VITE_APP_LOCAL_API_URL || 'http://localhost:3001';
const PRODUCTION_API = import.meta.env.VITE_APP_PRODUCTION_API_URL || 'https://your-production-api.com';
const MODE = import.meta.env.VITE_APP_MODE || 'development';

// ------------------------ DETERMINE APP URL ------------------------
const APP_URL = MODE === 'production' ? PRODUCTION_API : LOCAL_API;

// ------------------------ BASE URL ------------------------
const BASE_URL = `${APP_URL}/api/v1`;

// ------------------------ CREATE CUSTOM AXIOS INSTANCE ------------------------
export const createAxiosInstance = (token) => {
  return axios.create({ 
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};

// ------------------------ DEFAULT AXIOS INSTANCE ------------------------
const token = localStorage.getItem('userToken');

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

export default axiosInstance;
