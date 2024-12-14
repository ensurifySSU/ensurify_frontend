import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;

instance.interceptors.request.use(
  (config) => {
    const ACCESS_TOKEN = localStorage.getItem('USER_ADDRESS');

    if (!ACCESS_TOKEN) {
      window.location.href = '/login';

      return config;
    }

    config.headers.Authorization = ACCESS_TOKEN;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
