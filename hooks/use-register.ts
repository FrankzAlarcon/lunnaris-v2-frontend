import { create } from "zustand";

type FormType = "login" | "register" | "reset-password";

interface RegisterStore {
  formType: FormType;
  onGoRegister: () => void;
  onGoResetPassword: () => void
  onGoLogin: () => void;
}

export const useRegister = create<RegisterStore>((set) => ({
  formType: 'login',
  onGoLogin: () => set({ formType: 'login' }),
  onGoRegister: () => set({ formType: 'register' }),
  onGoResetPassword: () => set({ formType: 'reset-password' })
}));