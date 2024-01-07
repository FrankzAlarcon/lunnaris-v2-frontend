import { Media } from "@/interfaces/media";
import { create } from "zustand";

interface MediaStore {
  media: Media[];
  setMedia: (media: Media[]) => void;
}

export const useMedia = create<MediaStore>((set) => ({
  media: [],
  setMedia: (media: Media[]) => set({ media }),
}));