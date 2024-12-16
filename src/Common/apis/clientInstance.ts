import axios from 'axios';

const clientInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default clientInstance;

clientInstance.interceptors.request.use(
  (config) => {
    const ACCESS_TOKEN = sessionStorage.getItem('clientToken');

    if (!ACCESS_TOKEN) {
      window.location.href = '/connecting';

      return config;
    }

    config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

clientInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      window.location.href = '/connecting';
    }

    return Promise.reject(error);
  },
);
