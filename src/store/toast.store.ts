import { create } from 'zustand';

type ToastStore = {
  toastMessage: string | null;
  setToast: (msg: string) => void;
  clearToast: () => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toastMessage: null,
  setToast: (msg) => set({ toastMessage: msg }),
  clearToast: () => set({ toastMessage: null }),
}));