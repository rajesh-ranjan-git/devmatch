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
}
