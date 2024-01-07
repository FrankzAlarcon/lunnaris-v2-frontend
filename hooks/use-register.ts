import { create } from "zustand";

interface RegisterStore {
  isRegister: boolean;
  onGoRegister: () => void;
  onGoLogin: () => void;
}

export const useRegister = create<RegisterStore>((set) => ({
  isRegister: false,
  onGoLogin: () => set({ isRegister: false }),
  onGoRegister: () => set({ isRegister: true }),
}));