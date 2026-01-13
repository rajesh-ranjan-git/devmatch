import { Alkatra, Arima, Inter, Tourney } from "next/font/google";
import {
  LuHandshake,
  LuLogIn,
  LuLogOut,
  LuUser,
  LuUserMinus,
  LuUserPen,
  LuUserPlus,
} from "react-icons/lu";
import { TbLockPassword, TbPasswordUser, TbWorld } from "react-icons/tb";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaUpload,
} from "react-icons/fa6";
import { BsCamera } from "react-icons/bs";
import {
  ACCOUNT_OPTIONS_DROPDOWN_ITEMS,
  AUTH_FORM_FIELDS,
  INPUT_TYPES,
} from "@/config/constants";
import {
  AccountOptionsDropdownItemType,
  AuthFormFieldButtonItemsType,
  AuthFormFieldInputItemsType,
  CameraDropdownItemType,
  NavbarMenuItemType,
  SocialMediaIconType,
  StaticImageType,
} from "@/types/types";
import { getUrlString, toTitleCase } from "@/lib/utils/utils";
import { authRoutes } from "@/lib/routes/routes";
import { MdPassword } from "react-icons/md";

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

export const navbarMenuItems: NavbarMenuItemType[] = [
  {
    type: "connections",
    icon: <LuHandshake />,
  },
  {
    type: "requests",
    icon: <LuUserPlus />,
  },
];

export const accountOptionsDropdownItems: AccountOptionsDropdownItemType[] = [
  {
    type: ACCOUNT_OPTIONS_DROPDOWN_ITEMS.profile,
    url: getUrlString(ACCOUNT_OPTIONS_DROPDOWN_ITEMS.profile),
    icon: <LuUser />,
  },
  {
    type: ACCOUNT_OPTIONS_DROPDOWN_ITEMS.logout,
    url: getUrlString(ACCOUNT_OPTIONS_DROPDOWN_ITEMS.logout),
    icon: <LuLogOut />,
  },
];

export const cameraDropDownItems: CameraDropdownItemType[] = [
  {
    type: "fromCamera",
    label: "Open camera",
    icon: <BsCamera />,
  },
  {
    type: "fromDevice",
    label: "Upload from device",
    icon: <FaUpload />,
  },
];

export const authFormFieldInputItems: AuthFormFieldInputItemsType = {
  userName: {
    name: AUTH_FORM_FIELDS.userName,
    type: INPUT_TYPES.text,
    label: toTitleCase(AUTH_FORM_FIELDS.userName),
    placeholder: toTitleCase(AUTH_FORM_FIELDS.userName),
    icon: <LuUser />,
  },
  firstName: {
    name: AUTH_FORM_FIELDS.firstName,
    type: INPUT_TYPES.text,
    label: toTitleCase(AUTH_FORM_FIELDS.firstName),
    placeholder: toTitleCase(AUTH_FORM_FIELDS.firstName),
    icon: <LuUser />,
  },
  email: {
    name: AUTH_FORM_FIELDS.email,
    type: INPUT_TYPES.email,
    label: toTitleCase(AUTH_FORM_FIELDS.email),
    placeholder: toTitleCase(AUTH_FORM_FIELDS.email),
    icon: <LuUser />,
  },
  password: {
    name: AUTH_FORM_FIELDS.password,
    type: INPUT_TYPES.password,
    label: toTitleCase(AUTH_FORM_FIELDS.password),
    placeholder: toTitleCase(AUTH_FORM_FIELDS.password),
    icon: <MdPassword />,
  },
  confirmPassword: {
    name: AUTH_FORM_FIELDS.confirmPassword,
    type: INPUT_TYPES.password,
    label: toTitleCase(AUTH_FORM_FIELDS.confirmPassword),
    placeholder: toTitleCase(AUTH_FORM_FIELDS.confirmPassword),
    icon: <MdPassword />,
  },
};

export const authFormFieldButtonItems: AuthFormFieldButtonItemsType = {
  login: {
    name: AUTH_FORM_FIELDS.login,
    type: INPUT_TYPES.submit,
    label: toTitleCase(AUTH_FORM_FIELDS.login),
    url: getUrlString(authRoutes.login),
    icon: <LuLogIn />,
  },
  register: {
    name: AUTH_FORM_FIELDS.register,
    type: INPUT_TYPES.submit,
    label: toTitleCase(AUTH_FORM_FIELDS.register),
    url: getUrlString(authRoutes.register),
    icon: <LuUserPlus />,
  },
  forgotPassword: {
    name: AUTH_FORM_FIELDS.forgotPassword,
    type: INPUT_TYPES.submit,
    label: "Forgot Password",
    url: getUrlString(authRoutes.forgotPassword),
    icon: <MdPassword />,
  },
  updateProfile: {
    name: AUTH_FORM_FIELDS.updateProfile,
    label: "Update Profile",
    url: getUrlString(AUTH_FORM_FIELDS.updateProfile),
    icon: <LuUserPen />,
  },
  updatePassword: {
    name: AUTH_FORM_FIELDS.updateProfile,
    label: "Update Password",
    url: getUrlString(AUTH_FORM_FIELDS.updatePassword),
    icon: <MdPassword />,
  },
  deleteAccount: {
    name: AUTH_FORM_FIELDS.deleteAccount,
    label: "Delete Account",
    url: getUrlString(AUTH_FORM_FIELDS.deleteAccount),
    icon: <LuUserMinus />,
  },
};

export const staticImages: StaticImageType = {
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
    src: "/assets/avatar/user.webp",
    alt: "avatar-icon",
  },
  profilePlaceholder: {
    src: "/assets/avatar/user.webp",
    alt: "profile-pic",
  },
};

export const socialMediaIcons: SocialMediaIconType = {
  facebook: { Icon: FaFacebookF },
  instagram: { Icon: FaInstagram },
  twitter: { Icon: FaXTwitter },
  github: { Icon: FaGithub },
  linkedin: { Icon: FaLinkedin },
  youtube: { Icon: FaYoutube },
  website: { Icon: TbWorld },
};
