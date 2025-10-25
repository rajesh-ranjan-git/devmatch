import { Alkatra, Arima, Tourney } from "next/font/google";
import { MenuItem } from "@/types/types";
import { LuHandshake, LuLogOut, LuUser, LuUserPlus } from "react-icons/lu";

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
    icon: <LuUserPlus />,
    label: "Requests",
  },
  {
    name: "CONNECTIONS",
    icon: <LuHandshake />,
    label: "Connections",
  },
];

export const profileDropdownItems: MenuItem[] = [
  {
    name: "PROFILE",
    icon: <LuUser />,
    label: "Profile",
  },
  {
    name: "Logout",
    icon: <LuLogOut />,
    label: "Logout",
  },
];
