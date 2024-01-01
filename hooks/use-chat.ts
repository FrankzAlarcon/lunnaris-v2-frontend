import { create } from "zustand";

interface ChatStore {
  hidden: boolean;
  onShow: () => void;
  onHide: () => void;
}

export const useChat = create<ChatStore>((set) => ({
  hidden: false,
  onShow: () => set({ hidden: false }),
  onHide: () => set({ hidden: true }),
}));