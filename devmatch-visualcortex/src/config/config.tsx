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
import { TbLockPassword } from "react-icons/tb";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaUpload,
  FaXTwitter,
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
  NotificationsItemsType,
  SheetItemsType,
  SocialMediaIconType,
  StaticImageType,
  UserType,
} from "@/types/types";
import { formatDate, getUrlString, toTitleCase } from "@/lib/utils/utils";
import { authRoutes } from "@/lib/routes/routes";

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

export const notificationsDropdownItems: NotificationsItemsType = {
  request: [
    {
      name: "Rajesh Ranjan",
      designation: "Full Stack Developer",
      body: "Rajesh sent you a friend request!",
      url: "/profile",
    },
    {
      name: "Kripanidhan",
      designation: "Software Development Engineer",
      body: "Kripanidhan sent you a friend request!",
      url: "/profile",
    },
    {
      name: "Sayantanee Mohanta",
      designation: "HelpDesk Senior Associate",
      body: "Sayantanee sent you a friend request!",
      url: "/profile",
    },
    {
      name: "Rahee",
      designation: "Software Engineer",
      body: "Rahee sent you a friend request!",
      url: "/profile",
    },
  ],
  chat: [
    {
      name: "Rajesh Ranjan",
      designation: "Full Stack Developer",
      body: "Rajesh sent you a message!",
      url: "/profile",
    },
    {
      name: "Kripanidhan",
      designation: "Software Development Engineer",
      body: "Kripanidhan sent you a message!",
      url: "/profile",
    },
    {
      name: "Sayantanee Mohanta",
      designation: "HelpDesk Senior Associate",
      body: "Sayantanee sent you a message!",
      url: "/profile",
    },
    {
      name: "Rahee",
      designation: "Software Engineer",
      body: "Rahee sent you a message!",
      url: "/profile",
    },
  ],
};

export const connectionsSheetItems: SheetItemsType = {
  connections: [
    {
      name: "Rajesh Ranjan",
      designation: "Full Stack Developer",
      connectedSince: `Connected since ${formatDate(
        Date.now().toLocaleString()
      )}`,
      url: "/profile",
    },
    {
      name: "Kripanidhan",
      designation: "Software Development Engineer",
      connectedSince: `Connected since ${formatDate(
        Date.now().toLocaleString()
      )}`,
      url: "/profile",
    },
    {
      name: "Sayantanee Mohanta",
      designation: "HelpDesk Senior Associate",
      connectedSince: `Connected since ${formatDate(
        Date.now().toLocaleString()
      )}`,
      url: "/profile",
    },
    {
      name: "Rahee",
      designation: "Software Engineer",
      connectedSince: `Connected since ${formatDate(
        Date.now().toLocaleString()
      )}`,
      url: "/profile",
    },
    {
      name: "Rajesh Ranjan",
      designation: "Full Stack Developer",
      connectedSince: `Connected since ${formatDate(
        Date.now().toLocaleString()
      )}`,
      url: "/profile",
    },
    {
      name: "Kripanidhan",
      designation: "Software Development Engineer",
      connectedSince: `Connected since ${formatDate(
        Date.now().toLocaleString()
      )}`,
      url: "/profile",
    },
    {
      name: "Sayantanee Mohanta",
      designation: "HelpDesk Senior Associate",
      connectedSince: `Connected since ${formatDate(
        Date.now().toLocaleString()
      )}`,
      url: "/profile",
    },
    {
      name: "Rahee",
      designation: "Software Engineer",
      connectedSince: `Connected since ${formatDate(
        Date.now().toLocaleString()
      )}`,
      url: "/profile",
    },
  ],
};

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
    icon: <TbLockPassword />,
  },
  confirmPassword: {
    name: AUTH_FORM_FIELDS.confirmPassword,
    type: INPUT_TYPES.password,
    label: toTitleCase(AUTH_FORM_FIELDS.confirmPassword),
    placeholder: toTitleCase(AUTH_FORM_FIELDS.confirmPassword),
    icon: <TbLockPassword />,
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
    label: toTitleCase(AUTH_FORM_FIELDS.forgotPassword),
    url: getUrlString(authRoutes.forgotPassword),
    icon: <TbLockPassword />,
  },
  updateProfile: {
    name: AUTH_FORM_FIELDS.updateProfile,
    label: toTitleCase(AUTH_FORM_FIELDS.updateProfile),
    url: getUrlString(AUTH_FORM_FIELDS.updateProfile),
    icon: <LuUserPen />,
  },
  deleteAccount: {
    name: AUTH_FORM_FIELDS.deleteAccount,
    label: toTitleCase(AUTH_FORM_FIELDS.deleteAccount),
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
    src: "/assets/avatar/default-avatar-profile-picture-male-icon.webp",
    alt: "avatar-icon",
  },
  profilePlaceholder: {
    src: "/assets/profile_photo_square.png",
    alt: "profile-pic",
  },
};

export const socialMediaIcons: SocialMediaIconType = {
  facebook: { url: "#", Icon: FaFacebookF },
  instagram: { url: "#", Icon: FaInstagram },
  twitter: { url: "#", Icon: FaXTwitter },
  github: { url: "#", Icon: FaGithub },
};

export const staticUsers: UserType[] = [
  {
    id: "1",
    firstName: "Rajesh",
    lastName: "Ranjan",
    jobProfile: "Full Stack Developer",
    organization: "India Today Group",
  },
  {
    id: "2",
    firstName: "Kripanidhan",
    lastName: "Kumar",
    jobProfile: "Full Stack Developer",
    organization: "India Today Group",
  },
  {
    id: "3",
    firstName: "Sayantanee",
    lastName: "Mohanta",
    jobProfile: "HelpDesk Senior Associate",
    organization: "NTT Data Services",
  },
  {
    id: "4",
    firstName: "Rahee",
    lastName: "Mohanta",
    jobProfile: "HelpDesk Senior Associate",
    organization: "NTT Data Services",
  },
];
