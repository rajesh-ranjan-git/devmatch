import { Alkatra, Arima, Tourney } from "next/font/google";
import { MenuItem } from "@/types/types";

// * --- Google Fonts --- * //

export const alkatra = Alkatra({
  variable: "--font-alkatra",
});

export const arima = Arima({
  variable: "--font-arima",
});

export const tourney = Tourney({
  variable: "--font-tourney",
});

// * --- Menu Items --- * //
export const navbarMenuItems: MenuItem[] = [
  {
    name: "REQUESTS",
    icon: <></>,
    label: "Requests",
  },
  {
    name: "CONNECTIONS",
    icon: <></>,
    label: "Connections",
  },
];

export const profileDropdownItems: MenuItem[] = [
  {
    name: "PROFILE",
    icon: <></>,
    label: "Profile",
  },
  {
    name: "Logout",
    icon: <></>,
    label: "Logout",
  },
];
