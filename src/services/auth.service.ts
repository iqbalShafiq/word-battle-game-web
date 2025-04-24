import api from './axios-interceptor';
import type { ApiResponse, LoginData } from '../types';

export async function login(email: string, password: string) {
  return api.post<ApiResponse<LoginData>>('/v1/auth/login', { email, password });
}

export async function refreshToken() {
  return api.post('/v1/auth/refresh');
}
