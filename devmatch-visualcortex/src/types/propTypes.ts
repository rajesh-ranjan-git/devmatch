import { Dispatch, ReactNode, RefObject } from "react";
import { IconType } from "react-icons";
import {
  ConnectionsSheetItemType,
  ContextMenuTypes,
  RequestsSheetItemType,
  SheetTypes,
  StorageType,
  User,
} from "@/types/types";

export interface ReactNodeProps {
  children: ReactNode;
}

export interface ConnectionProps {
  type: SheetTypes;
  icon: ReactNode;
}

export interface ButtonProps {
  text?: string | null;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export interface ContextMenuProps {
  open: boolean;
  className?: string;
  children?: ReactNode;
}

export interface NameCardContentProps {
  name: string;
}

export interface UserDetailsCardContentProps {
  name: string;
  designation: string;
  company: string;
}

export interface AuthFormWrapperProps {
  type: string;
}

export interface InputProps {
  type: string;
  placeholder: string;
}

export interface SocialMediaItemProps {
  url: string;
  Icon: IconType;
  idx: number;
}

export interface UseContextMenuProps {
  type: ContextMenuTypes;
}

export interface UseSheetProps {
  type: SheetTypes;
}

export interface UseOutsideClickProps {
  ref: RefObject<HTMLElement | null>;
  when: boolean;
  callback: () => void;
}

export interface UseWebStorageProps<T> {
  key: string;
  value: T;
  type?: StorageType;
  expiresIn?: number;
}

export interface StoredData<T> {
  data: T;
  expiresAt?: number;
}

export interface UserCardProps {
  user: User;
  users: User[];
  setUsers: Dispatch<React.SetStateAction<User[]>>;
}

export interface RequestsSheetItemProps {
  item: RequestsSheetItemType;
}

export interface ConnectionsSheetItemProps {
  item: ConnectionsSheetItemType;
}
