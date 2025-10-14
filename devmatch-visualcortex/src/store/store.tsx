import { create } from "zustand";
import { DevMatchAppState } from "@/types/types";

export const useDevMatchAppStore = create<DevMatchAppState>((set) => ({
  showProfileDropdown: false,
  setShowProfileDropdown: (value) => set({ showProfileDropdown: value }),
}));
