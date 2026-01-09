import { create } from "zustand";
import { THEMES, EXPLORE_VISIBLE_USER_CARDS } from "@/config/constants";
import {
  ContextMenuTypes,
  NotificationItemType,
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
  allUsers: UserType[];
  setAllUsers: (allUsers: UserType[]) => void;
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
  connectionNotifications: NotificationItemType[];
  setConnectionNotifications: (connections: NotificationItemType[]) => void;
  chatNotifications: NotificationItemType[];
  setChatNotifications: (connections: NotificationItemType[]) => void;
};

export const useDevMatchAppStore = create<DevMatchAppState>((set) => ({
  switchTheme: THEMES.dark,
  setSwitchTheme: (theme) => set({ switchTheme: theme }),
  loggedInUser: null,
  setLoggedInUser: (user) => set({ loggedInUser: user }),
  activeSheet: null,
  setActiveSheet: (sheet) => set({ activeSheet: sheet }),
  activeContextMenu: null,
  setActiveContextMenu: (contextMenu) =>
    set({ activeContextMenu: contextMenu }),
  allUsers: [],
  setAllUsers: (users) => set({ allUsers: users }),
  userCards: [],
  setUserCards: (card) =>
    set((state) => ({
      userCards: typeof card === "function" ? card(state.userCards) : card,
    })),
  userCardsNextIndex: EXPLORE_VISIBLE_USER_CARDS,
  setUserCardsNextIndex: (cardNextIndex) =>
    set((state) => ({
      userCardsNextIndex:
        typeof cardNextIndex === "function"
          ? cardNextIndex(state.userCardsNextIndex)
          : cardNextIndex,
    })),
  connections: [],
  setConnections: (connection) => set({ connections: connection }),
  requests: [],
  setRequests: (request) => set({ requests: request }),
  connectionNotifications: [],
  setConnectionNotifications: (connection) =>
    set({ connectionNotifications: connection }),
  chatNotifications: [],
  setChatNotifications: (connection) => set({ chatNotifications: connection }),
}));
