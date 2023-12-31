import { create } from "zustand";

interface NavbarStore {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export const useNavbar = create<NavbarStore>((set) => ({
  collapsed: false,
  onExpand: () => set({ collapsed: false }),
  onCollapse: () => set({ collapsed: true }),
}));