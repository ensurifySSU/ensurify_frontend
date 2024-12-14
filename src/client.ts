import axios from 'axios';

// const URL = window.location.href;
const withCredentials = true;
const baseURL = import.meta.env.VITE_BASE_URL;

const client = axios.create({
  baseURL: baseURL,
  withCredentials: withCredentials,
});

export default client;
