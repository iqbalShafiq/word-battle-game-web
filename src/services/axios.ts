import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5098/api',
  timeout: 10000,
  withCredentials: true,
});

export default api;
