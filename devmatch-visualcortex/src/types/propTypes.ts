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

export interface ConsoleBannerProps {
  nodeVersion: string;
}

export interface ConnectionProps {
  type: SheetTypes;
  icon: ReactNode;
}

export interface ButtonProps {
  popoverTarget?: string | undefined;
  text?: string | null;
  icon?: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface FormErrorMessageProps {
  errors: string[] | null;
}

export interface DropdownProps {
  id: string;
  className?: string;
  children?: ReactNode;
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
  name?: string;
}

export interface UserDetailsCardContentProps {
  name?: string;
  jobProfile?: string;
  organization?: string;
}

export interface AuthFormWrapperProps {
  type: string;
}

export interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  defaultValue?: string;
  className?: string;
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

export interface ProfileComponentProps {
  user: UserType;
}

export interface UserCardsProps {
  allUsers: UserType[];
}

export interface SingleUserCardProps {
  user: UserType;
  isFront: boolean;
  cardIndex: number;
  onRemove: (userId: string, status: boolean) => void;
}

export interface UserInfoButtonProps {
  profileUrl: string;
}

export interface RequestsSheetItemProps {
  item: SheetItemType;
}

export interface ConnectionsSheetItemProps {
  item: SheetItemType;
}
