import { RefObject } from "react";

export type DevMatchAppState = {
  switchTheme: string;
  setSwitchTheme: (value: string) => void;
  activeSheet: string | null;
  setActiveSheet: (name: string | null) => void;
  activeContextMenu: string | null;
  setActiveContextMenu: (name: string | null) => void;
};

export type AnyRef =
  | RefObject<HTMLElement>
  | RefObject<HTMLElement>[]
  | null
  | undefined;

export type StorageType = "local" | "session";

export type User = {
  id: number;
  name: string;
  designation: string;
  company: string;
};
