import axios from 'axios';

// const URL = window.location.href;
const withCredentials = true;
const baseURL = 'https://ensurify.store';

const client = axios.create({
  baseURL: baseURL,
  withCredentials: withCredentials,
});

// 요청 인터셉터를 추가하여 모든 요청에 대해 헤더를 설정합니다.
client.interceptors.request.use(
  (config) => {
    // 세션 스토리지에서 'token' 값을 가져옵니다.
    const token = sessionStorage.getItem('token');
    // 헤더에 'token' 값을 설정합니다.
    if (token) {
      config.headers['Authorization'] = 'Bearer' + ' ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default client;
