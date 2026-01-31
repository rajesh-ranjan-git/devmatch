import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";
import {
  THEMES,
  EXPLORE_VISIBLE_USER_CARDS,
  CONVERSATION_TABS,
} from "@/config/constants";
import {
  ConversationTabsType,
  ContextMenuTypes,
  NotificationItemType,
  SheetItemType,
  SheetTypes,
  ThemeTypes,
  UserType,
} from "@/types/types";

type DevMatchAppState = {
  switchTheme: ThemeTypes;
  setSwitchTheme: Dispatch<SetStateAction<ThemeTypes>>;
  loggedInUser: UserType;
  setLoggedInUser: Dispatch<SetStateAction<UserType>>;
  activeSheet: SheetTypes;
  setActiveSheet: Dispatch<SetStateAction<SheetTypes>>;
  activeContextMenu: ContextMenuTypes;
  setActiveContextMenu: Dispatch<SetStateAction<ContextMenuTypes>>;
  allUsers: UserType[];
  setAllUsers: Dispatch<SetStateAction<UserType[]>>;
  userCards: UserType[];
  setUserCards: Dispatch<SetStateAction<UserType[]>>;
  userCardsNextIndex: number;
  setUserCardsNextIndex: Dispatch<SetStateAction<number>>;
  connections: SheetItemType[];
  setConnections: Dispatch<SetStateAction<SheetItemType[]>>;
  requests: SheetItemType[];
  setRequests: Dispatch<SetStateAction<SheetItemType[]>>;
  connectionNotifications: NotificationItemType[];
  setConnectionNotifications: Dispatch<SetStateAction<NotificationItemType[]>>;
  chatNotifications: NotificationItemType[];
  setChatNotifications: Dispatch<SetStateAction<NotificationItemType[]>>;
  activeConversationTab: ConversationTabsType;
  setActiveConversationTab: Dispatch<SetStateAction<ConversationTabsType>>;
};

export const useDevMatchAppStore = create<DevMatchAppState>((set) => ({
  switchTheme: THEMES.dark,
  setSwitchTheme: (themeOrUpdater) =>
    set((state) => ({
      switchTheme:
        typeof themeOrUpdater === "function"
          ? themeOrUpdater(state.switchTheme)
          : themeOrUpdater,
    })),

  loggedInUser: null,
  setLoggedInUser: (userOrUpdater) =>
    set((state) => ({
      loggedInUser:
        typeof userOrUpdater === "function"
          ? userOrUpdater(state.loggedInUser)
          : userOrUpdater,
    })),

  activeSheet: null,
  setActiveSheet: (sheetOrUpdater) =>
    set((state) => ({
      activeSheet:
        typeof sheetOrUpdater === "function"
          ? sheetOrUpdater(state.activeSheet)
          : sheetOrUpdater,
    })),

  activeContextMenu: null,
  setActiveContextMenu: (contextMenuOrUpdater) =>
    set((state) => ({
      activeContextMenu:
        typeof contextMenuOrUpdater === "function"
          ? contextMenuOrUpdater(state.activeContextMenu)
          : contextMenuOrUpdater,
    })),

  allUsers: [],
  setAllUsers: (usersOrUpdater) =>
    set((state) => ({
      allUsers:
        typeof usersOrUpdater === "function"
          ? usersOrUpdater(state.allUsers)
          : usersOrUpdater,
    })),

  userCards: [],
  setUserCards: (cardsOrUpdater) =>
    set((state) => ({
      userCards:
        typeof cardsOrUpdater === "function"
          ? cardsOrUpdater(state.userCards)
          : cardsOrUpdater,
    })),

  userCardsNextIndex: EXPLORE_VISIBLE_USER_CARDS,
  setUserCardsNextIndex: (indexOrUpdater) =>
    set((state) => ({
      userCardsNextIndex:
        typeof indexOrUpdater === "function"
          ? indexOrUpdater(state.userCardsNextIndex)
          : indexOrUpdater,
    })),

  connections: [],
  setConnections: (connectionsOrUpdater) =>
    set((state) => ({
      connections:
        typeof connectionsOrUpdater === "function"
          ? connectionsOrUpdater(state.connections)
          : connectionsOrUpdater,
    })),

  requests: [],
  setRequests: (requestsOrUpdater) =>
    set((state) => ({
      requests:
        typeof requestsOrUpdater === "function"
          ? requestsOrUpdater(state.requests)
          : requestsOrUpdater,
    })),

  connectionNotifications: [],
  setConnectionNotifications: (notificationsOrUpdater) =>
    set((state) => ({
      connectionNotifications:
        typeof notificationsOrUpdater === "function"
          ? notificationsOrUpdater(state.connectionNotifications)
          : notificationsOrUpdater,
    })),

  chatNotifications: [],
  setChatNotifications: (notificationsOrUpdater) =>
    set((state) => ({
      chatNotifications:
        typeof notificationsOrUpdater === "function"
          ? notificationsOrUpdater(state.chatNotifications)
          : notificationsOrUpdater,
    })),
  activeConversationTab: CONVERSATION_TABS.chats,
  setActiveConversationTab: (conversationTabOrUpdater) =>
    set((state) => ({
      activeConversationTab:
        typeof conversationTabOrUpdater === "function"
          ? conversationTabOrUpdater(state.activeConversationTab)
          : conversationTabOrUpdater,
    })),
}));
