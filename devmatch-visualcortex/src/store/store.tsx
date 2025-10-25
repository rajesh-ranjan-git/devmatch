import { create } from "zustand";
import { DevMatchAppState } from "@/types/types";

export const useDevMatchAppStore = create<DevMatchAppState>((set) => ({
  switchTheme: "dark",
  setSwitchTheme: (value) => set({ switchTheme: value }),
  showNotifications: false,
  setShowNotifications: (value) => set({ showNotifications: value }),
  showProfileDropdown: false,
  setShowProfileDropdown: (value) => set({ showProfileDropdown: value }),
  activeConnectionSheet: null,
  setActiveConnectionSheet: (name) => set({ activeConnectionSheet: name }),
}));
