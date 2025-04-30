import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidEmail(email: string): boolean {
  // Simple email regex pattern
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPassword(password: string): boolean {
  // Minimal 8 karakter, mengandung huruf, angka, dan karakter spesial
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(password);
}

export function getErrorMessage(err: unknown): string {
  if (typeof err === 'object' && err !== null && 'response' in err) {
    const response = (err as { response?: unknown }).response;
    if (response && typeof response === 'object' && 'data' in response) {
      if (typeof (err as { response: { data: unknown } }).response.data === 'string') {
        return String((err as { response: { data: unknown } }).response.data);
      }
      if (typeof (err as { response: { data: { message: unknown } } }).response.data.message === 'string') {
        return String((err as { response: { data: { message: unknown } } }).response.data.message)
      }
    }
  }
  if (err instanceof Error) {
    return err.message;
  }
  return 'Terjadi error yang tidak diketahui';
}
