import { ReactElement } from "react";

export interface ConnectionProps {
  name: String;
  icon: ReactElement;
  label: String;
}

export interface ButtonProps {
  name?: String;
  icon?: ReactElement;
  label?: String;
  child?: ReactElement;
  onClick?: () => void;
}

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}
