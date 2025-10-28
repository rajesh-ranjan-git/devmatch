import { Alkatra, Arima, Inter, Tourney } from "next/font/google";
import {
  LuHandshake,
  LuLogIn,
  LuLogOut,
  LuUser,
  LuUserPlus,
} from "react-icons/lu";
import { TbLockPassword } from "react-icons/tb";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import { MenuItem } from "@/types/types";

export const alkatra = Alkatra({
  variable: "--font-alkatra",
});

export const arima = Arima({
  variable: "--font-arima",
});

export const inter = Inter({
  variable: "--font-inter",
});

export const tourney = Tourney({
  variable: "--font-tourney",
});

export const theme = {
  dark: {
    name: "DARK",
    type: "dark",
    label: "Dark",
  },
  light: {
    name: "LIGHT",
    type: "light",
    label: "Light",
  },
};

export const navbarMenuItems: MenuItem[] = [
  {
    name: "REQUESTS",
    label: "Requests",
    icon: <LuUserPlus />,
  },
  {
    name: "CONNECTIONS",
    label: "Connections",
    icon: <LuHandshake />,
  },
];

export const profileDropdownItems: MenuItem[] = [
  {
    name: "PROFILE",
    label: "Profile",
    icon: <LuUser />,
  },
  {
    name: "LOGOUT",
    label: "Logout",
    icon: <LuLogOut />,
  },
];

export const authFields = {
  userName: {
    name: "USERNAME",
    type: "text",
    label: "User Name",
    placeholder: "User Name",
    icon: <LuUser />,
  },
  firstName: {
    name: "FIRSTNAME",
    type: "text",
    label: "First Name",
    placeholder: "First Name",
    icon: <LuUser />,
  },
  login: {
    name: "LOGIN",
    type: "login",
    label: "Login",
    url: "/login",
    icon: <LuLogIn />,
  },
  register: {
    name: "REGISTER",
    type: "register",
    label: "Register",
    url: "/register",
    icon: <LuUserPlus />,
  },
  password: {
    name: "PASSWORD",
    type: "password",
    label: "Password",
    placeholder: "Password",
    icon: <TbLockPassword />,
  },
  forgotPassword: {
    name: "FORGOTPASSWORD",
    type: "forgotPassword",
    label: "Forgot Password",
    placeholder: "Forgot Password",
    url: "/forgot-password",
    icon: <TbLockPassword />,
  },
  confirmPassword: {
    name: "CONFIRMPASSWORD",
    type: "password",
    label: "Confirm Password",
    placeholder: "Confirm Password",
    url: "/confirm-password",
    icon: <TbLockPassword />,
  },
};

export const staticImages = {
  navLogo: {
    src: "/assets/logo/devmatch-logo-transparent-circular.webp",
    alt: "devmatch-logo",
  },
  mainLogo: {
    src: "/assets/logo/devmatch-logo-white-circular.webp",
    alt: "devmatch-logo",
  },
  notFoundError: {
    src: "/assets/error/404-error.webp",
    alt: "404-error",
  },
  avatarPlaceholder: {
    src: "/assets/avatar/default-avatar-profile-picture-male-icon.webp",
    alt: "avatar-icon",
  },
  profilePlaceholder: {
    src: "/assets/profile_photo_square.png",
    alt: "profile-pic",
  },
};

export const socialMediaIcons = {
  facebook: { url: "#", Icon: FaFacebookF },
  instagram: { url: "#", Icon: FaInstagram },
  twitter: { url: "#", Icon: FaXTwitter },
  github: { url: "#", Icon: FaGithub },
};

export const errorMessages = {
  GLOBAL_ERROR: "Something went wrong!",
  PAGE_NOT_FOUND_ERROR: "Page Not Found!",
};
