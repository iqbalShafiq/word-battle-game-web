import api from './axios';
import type { ApiResponse, LoginData, RegisterData } from '../types';

export async function login(email: string, password: string) {
  return api.post<ApiResponse<LoginData>>('/v1/auth/login', { email, password });
}

export async function register(name: string, email: string, password: string) {
  return api.post<ApiResponse<RegisterData>>('/v1/auth/register', { name, email, password });
}

export async function refreshToken() {
  return api.post('/v1/auth/refresh');
}

export async function logout() {
  return api.post('/v1/auth/logout');
}

export async function confirmEmail(email: string, token: string) {
  return api.get(`/v1/auth/confirm-email?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`);
}
