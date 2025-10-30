import { Alkatra, Arima, Inter, Tourney } from "next/font/google";
import {
  LuCloudUpload,
  LuHandshake,
  LuLogIn,
  LuLogOut,
  LuUser,
  LuUserMinus,
  LuUserPen,
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
import { BsCamera } from "react-icons/bs";

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
    url: "/profile",
    icon: <LuUser />,
  },
  {
    name: "LOGOUT",
    label: "Logout",
    url: "/logout",
    icon: <LuLogOut />,
  },
];

export const cameraDropdownItems: MenuItem[] = [
  {
    name: "OPEN CAMERA",
    label: "Open camera",
    icon: <BsCamera />,
  },
  {
    name: "UPLOAD FROM DEVICE",
    label: "Upload from device",
    icon: <LuCloudUpload />,
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
    name: "FIRST NAME",
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
  confirmPassword: {
    name: "CONFIRM PASSWORD",
    type: "password",
    label: "Confirm Password",
    placeholder: "Confirm Password",
    url: "/confirm-password",
    icon: <TbLockPassword />,
  },
  forgotPassword: {
    name: "FORGOT PASSWORD",
    type: "forgotPassword",
    label: "Forgot Password",
    placeholder: "Forgot Password",
    url: "/forgot-password",
    icon: <TbLockPassword />,
  },
  updateProfile: {
    name: "UPDATE PROFILE",
    type: "updateProfile",
    label: "Update Profile",
    placeholder: "Update Profile",
    url: "/update-profile",
    icon: <LuUserPen />,
  },
  deleteAccount: {
    name: "DELETE ACCOUNT",
    type: "deleteAccount",
    label: "Delete Account",
    placeholder: "Delete Account",
    url: "/delete-account",
    icon: <LuUserMinus />,
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
