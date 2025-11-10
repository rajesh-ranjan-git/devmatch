import { Dispatch, ReactElement, RefObject } from "react";
import { IconType } from "react-icons";
import { User } from "@/types/types";

export interface ReactNodeProps {
  children: React.ReactNode;
}

export interface ConnectionProps {
  name: string;
  icon: ReactElement;
  label: string;
}

export interface ButtonProps {
  name?: string;
  icon?: ReactElement;
  label?: string;
  children?: ReactElement;
  className?: string;
  onClick?: () => void;
}

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export interface ContextMenuProps {
  open: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface NameCardContentProps {
  name: string;
}

export interface UserDetailsCardContentProps {
  name: string;
  designation: string;
  company: string;
}

export interface AuthProps {
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
  type: string | null;
}

export interface UseSheetProps {
  type: string | null;
}

export interface UseOutsideClickProps {
  ref: RefObject<HTMLElement | null>;
  when: boolean;
  callback: () => void;
}

export interface UserCardProps {
  user: User;
  users: User[];
  setUsers: Dispatch<React.SetStateAction<User[]>>;
}
