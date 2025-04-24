import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import api from './axios';

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: AxiosResponse | PromiseLike<AxiosResponse>) => void;
  reject: (reason?: any) => void;
  config: AxiosRequestConfig;
}[] = [];

const processQueue = (error: any) => {
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
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;
      try {
        await api.post('/refresh');
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
