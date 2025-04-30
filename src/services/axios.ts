import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { refreshToken } from './auth.service';

const api = axios.create({
  baseURL: 'http://localhost:5098/api',
  timeout: 10000,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: AxiosResponse | PromiseLike<AxiosResponse>) => void;
  reject: (reason?: unknown) => void;
  config: AxiosRequestConfig;
}[] = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach(({ reject }) => {
    if (error) {
      reject(error);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use((config) => config);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (window.location.pathname === '/login') {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;
      try {
        await refreshToken();
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      } finally {
        console.log('Token refresh process completed');
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
