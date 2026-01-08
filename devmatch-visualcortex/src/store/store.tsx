import { create } from "zustand";
import { THEMES, EXPLORE_VISIBLE_USER_CARDS } from "@/config/constants";
import {
  ContextMenuTypes,
  SheetItemType,
  SheetTypes,
  ThemeTypes,
  UserType,
} from "@/types/types";

type DevMatchAppState = {
  switchTheme: ThemeTypes;
  setSwitchTheme: (value: ThemeTypes) => void;
  loggedInUser: UserType;
  setLoggedInUser: (value: UserType) => void;
  activeSheet: SheetTypes;
  setActiveSheet: (name: SheetTypes) => void;
  activeContextMenu: ContextMenuTypes;
  setActiveContextMenu: (name: ContextMenuTypes) => void;
  userCards: UserType[];
  setUserCards: (
    value: UserType[] | ((prev: UserType[]) => UserType[])
  ) => void;
  userCardsNextIndex: number;
  setUserCardsNextIndex: (value: number | ((prev: number) => number)) => void;
  connections: SheetItemType[];
  setConnections: (connections: SheetItemType[]) => void;
  requests: SheetItemType[];
  setRequests: (requests: SheetItemType[]) => void;
};

export const useDevMatchAppStore = create<DevMatchAppState>((set) => ({
  switchTheme: THEMES.dark,
  setSwitchTheme: (value) => set({ switchTheme: value }),
  loggedInUser: null,
  setLoggedInUser: (value) => set({ loggedInUser: value }),
  activeSheet: null,
  setActiveSheet: (value) => set({ activeSheet: value }),
  activeContextMenu: null,
  setActiveContextMenu: (value) => set({ activeContextMenu: value }),
  userCards: [],
  setUserCards: (value) =>
    set((state) => ({
      userCards: typeof value === "function" ? value(state.userCards) : value,
    })),
  userCardsNextIndex: EXPLORE_VISIBLE_USER_CARDS,
  setUserCardsNextIndex: (value) =>
    set((state) => ({
      userCardsNextIndex:
        typeof value === "function" ? value(state.userCardsNextIndex) : value,
    })),
  connections: [],
  setConnections: (value) => set({ connections: value }),
  requests: [],
  setRequests: (value) => set({ requests: value }),
}));
