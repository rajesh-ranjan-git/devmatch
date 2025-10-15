import { create } from "zustand";
import { DevMatchAppState } from "@/types/types";

export const useDevMatchAppStore = create<DevMatchAppState>((set) => ({
  switchTheme: false,
  setSwitchTheme: (value) => set({ switchTheme: value }),
  showProfileDropdown: false,
  setShowProfileDropdown: (value) => set({ showProfileDropdown: value }),
}));
