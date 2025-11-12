import { Dispatch, ReactNode, RefObject } from "react";
import { IconType } from "react-icons";
import {
  ContextMenuTypes,
  SheetItemType,
  SheetTypes,
  StorageTypes,
  UserType,
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
  type?: StorageTypes;
  expiresIn?: number;
}

export interface StoredData<T> {
  data: T;
  expiresAt?: number;
}

export interface UserCardProps {
  user: UserType;
  users: UserType[];
  setUsers: Dispatch<React.SetStateAction<UserType[]>>;
}

export interface RequestsSheetItemProps {
  item: SheetItemType;
}

export interface ConnectionsSheetItemProps {
  item: SheetItemType;
}
