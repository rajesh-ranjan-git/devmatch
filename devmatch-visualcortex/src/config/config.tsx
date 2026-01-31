import { Alkatra, Arima, Inter, Tourney } from "next/font/google";
import { TbPasswordUser, TbWorld } from "react-icons/tb";
import {
  FaUser,
  FaHandshake,
  FaUserMinus,
  FaUserPen,
  FaUserPlus,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaUpload,
  FaRing,
  FaFacebook,
  FaTwitter,
  FaRoad,
  FaLandmark,
  FaCity,
  FaFlag,
  FaGlobe,
  FaMapPin,
  FaRocketchat,
  FaPeopleGroup,
} from "react-icons/fa6";
import { BsCamera } from "react-icons/bs";
import {
  ACCOUNT_OPTIONS_DROPDOWN_ITEMS,
  ADDRESS_PROPERTIES,
  AUTH_FORM_FIELDS,
  CONVERSATION_TABS,
  INPUT_TYPES,
  UPDATE_PASSWORD_FORM_FIELDS,
  USER_PROPERTIES,
} from "@/config/constants";
import {
  AccountOptionsDropdownItemType,
  AddressFormFieldInputItemsType,
  AuthFormFieldButtonItemsType,
  AuthFormFieldInputItemsType,
  CameraDropdownItemType,
  ConversationTabsType,
  ConversationTabType,
  NavbarMenuItemType,
  ProfileDetailsFormFieldButtonItemsType,
  ProfileFormFieldInputItemsType,
  SocialMediaIconType,
  StaticImageType,
  UpdatePasswordFormFieldInputItemsType,
} from "@/types/types";
import {
  getUrlString,
  omitObjectProperties,
  toTitleCase,
} from "@/lib/utils/utils";
import { authRoutes } from "@/lib/routes/routes";
import {
  MdBadge,
  MdBusiness,
  MdEmail,
  MdFavorite,
  MdInfo,
  MdLocationOn,
  MdPassword,
  MdPerson,
  MdPhone,
  MdPsychology,
  MdPublic,
  MdWc,
  MdWork,
} from "react-icons/md";
import { IoCallSharp, IoLogIn, IoLogOut } from "react-icons/io5";
import { RiUserSmileFill } from "react-icons/ri";
import { FaBirthdayCake, FaMapMarkedAlt } from "react-icons/fa";
import { ImCross } from "react-icons/im";

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
    icon: <FaHandshake />,
  },
  {
    type: "requests",
    icon: <FaUserPlus />,
  },
];

export const accountOptionsDropdownItems: AccountOptionsDropdownItemType[] = [
  {
    type: ACCOUNT_OPTIONS_DROPDOWN_ITEMS.profile,
    url: getUrlString(ACCOUNT_OPTIONS_DROPDOWN_ITEMS.profile),
    icon: <FaUser />,
  },
  {
    type: ACCOUNT_OPTIONS_DROPDOWN_ITEMS.logout,
    url: getUrlString(ACCOUNT_OPTIONS_DROPDOWN_ITEMS.logout),
    icon: <IoLogOut />,
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
    icon: <FaUser />,
  },
  firstName: {
    name: AUTH_FORM_FIELDS.firstName,
    type: INPUT_TYPES.text,
    label: "First Name",
    placeholder: "First Name",
    icon: <FaUser />,
  },
  email: {
    name: AUTH_FORM_FIELDS.email,
    type: INPUT_TYPES.email,
    label: toTitleCase(AUTH_FORM_FIELDS.email),
    placeholder: toTitleCase(AUTH_FORM_FIELDS.email),
    icon: <MdEmail />,
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
    label: "Confirm Password",
    placeholder: "Confirm Password",
    icon: <MdPassword />,
  },
};

export const authFormFieldButtonItems: AuthFormFieldButtonItemsType = {
  login: {
    name: AUTH_FORM_FIELDS.login,
    type: INPUT_TYPES.submit,
    label: toTitleCase(AUTH_FORM_FIELDS.login),
    url: getUrlString(authRoutes.login),
    icon: <IoLogIn />,
  },
  register: {
    name: AUTH_FORM_FIELDS.register,
    type: INPUT_TYPES.submit,
    label: toTitleCase(AUTH_FORM_FIELDS.register),
    url: getUrlString(authRoutes.register),
    icon: <FaUserPlus />,
  },
  forgotPassword: {
    name: AUTH_FORM_FIELDS.forgotPassword,
    type: INPUT_TYPES.submit,
    label: "Forgot Password",
    url: getUrlString(authRoutes.forgotPassword),
    icon: <TbPasswordUser />,
  },
  updateProfile: {
    name: AUTH_FORM_FIELDS.updateProfile,
    label: "Update Profile",
    url: getUrlString(AUTH_FORM_FIELDS.updateProfile),
    icon: <FaUserPen />,
  },
  updatePassword: {
    name: AUTH_FORM_FIELDS.updateProfile,
    label: "Update Password",
    url: getUrlString(AUTH_FORM_FIELDS.updatePassword),
    icon: <TbPasswordUser />,
  },
  deleteAccount: {
    name: AUTH_FORM_FIELDS.deleteAccount,
    label: "Delete Account",
    url: getUrlString(AUTH_FORM_FIELDS.deleteAccount),
    icon: <FaUserMinus />,
  },
};

export const allowedUpdateProfileProperties = omitObjectProperties(
  USER_PROPERTIES,
  [
    USER_PROPERTIES.id,
    USER_PROPERTIES.email,
    USER_PROPERTIES.userName,
    USER_PROPERTIES.password,
    USER_PROPERTIES.previousPassword,
    USER_PROPERTIES.passwordLastUpdated,
    USER_PROPERTIES.avatarUrl,
    USER_PROPERTIES.coverPhotoUrl,
    USER_PROPERTIES.createdAt,
    USER_PROPERTIES.updatedAt,
  ],
);

export const profileDetailsFormFieldInputItems: ProfileFormFieldInputItemsType =
  {
    email: {
      name: USER_PROPERTIES.email,
      type: INPUT_TYPES.email,
      label: "Email",
      placeholder: "Enter your email...",
      icon: <MdEmail />,
    },
    userName: {
      name: USER_PROPERTIES.userName,
      type: INPUT_TYPES.text,
      label: "User Name",
      placeholder: "Enter your user name...",
      icon: <MdPerson />,
    },
    firstName: {
      name: USER_PROPERTIES.firstName,
      type: INPUT_TYPES.text,
      label: "First Name",
      placeholder: "Enter your first name...",
      icon: <MdBadge />,
    },
    middleName: {
      name: USER_PROPERTIES.middleName,
      type: INPUT_TYPES.text,
      label: "Middle Name",
      placeholder: "Enter your middle name...",
      icon: <MdBadge />,
    },
    lastName: {
      name: USER_PROPERTIES.lastName,
      type: INPUT_TYPES.text,
      label: "Last Name",
      placeholder: "Enter your last name...",
      icon: <MdBadge />,
    },
    nickName: {
      name: USER_PROPERTIES.nickName,
      type: INPUT_TYPES.text,
      label: "Nick Name",
      placeholder: "Enter your nick name...",
      icon: <RiUserSmileFill />,
    },
    age: {
      name: USER_PROPERTIES.age,
      type: INPUT_TYPES.number,
      label: "Age",
      placeholder: "Enter your age...",
      icon: <FaBirthdayCake />,
    },
    phone: {
      name: USER_PROPERTIES.phone,
      type: INPUT_TYPES.number,
      label: "Phone Number",
      placeholder: "Enter your phone number...",
      icon: <MdPhone />,
    },
    gender: {
      name: USER_PROPERTIES.gender,
      type: INPUT_TYPES.radio,
      label: "Gender",
      placeholder: "Choose your gender...",
      icon: <MdWc />,
    },
    bio: {
      name: USER_PROPERTIES.bio,
      type: INPUT_TYPES.textarea,
      label: "Bio",
      placeholder: "Enter your bio...",
      icon: <MdInfo />,
    },
    maritalStatus: {
      name: USER_PROPERTIES.maritalStatus,
      type: INPUT_TYPES.radio,
      label: "Marital Status",
      placeholder: "Choose marital status...",
      icon: <FaRing />,
    },
    jobProfile: {
      name: USER_PROPERTIES.jobProfile,
      type: INPUT_TYPES.text,
      label: "Job Profile",
      placeholder: "Enter job profile...",
      icon: <MdWork />,
    },
    experience: {
      name: USER_PROPERTIES.experience,
      type: INPUT_TYPES.text,
      label: "Experience",
      placeholder: "Enter your experience...",
      icon: <MdBusiness />,
    },
    facebook: {
      name: USER_PROPERTIES.facebook,
      type: INPUT_TYPES.text,
      label: "Facebook",
      placeholder: "Enter your facebook url...",
      icon: <FaFacebook />,
    },
    instagram: {
      name: USER_PROPERTIES.instagram,
      type: INPUT_TYPES.text,
      label: "Instagram",
      placeholder: "Enter your instagram url...",
      icon: <FaInstagram />,
    },
    twitter: {
      name: USER_PROPERTIES.twitter,
      type: INPUT_TYPES.text,
      label: "Twitter",
      placeholder: "Enter your twitter url...",
      icon: <FaTwitter />,
    },
    github: {
      name: USER_PROPERTIES.github,
      type: INPUT_TYPES.text,
      label: "Github",
      placeholder: "Enter your github url...",
      icon: <FaGithub />,
    },
    linkedin: {
      name: USER_PROPERTIES.linkedin,
      type: INPUT_TYPES.text,
      label: "Linkedin",
      placeholder: "Enter your linkedin url...",
      icon: <FaLinkedin />,
    },
    youtube: {
      name: USER_PROPERTIES.youtube,
      type: INPUT_TYPES.text,
      label: "Youtube",
      placeholder: "Enter your youtube url...",
      icon: <FaYoutube />,
    },
    website: {
      name: USER_PROPERTIES.website,
      type: INPUT_TYPES.text,
      label: "Website",
      placeholder: "Enter your website url...",
      icon: <MdPublic />,
    },
    company: {
      name: USER_PROPERTIES.company,
      type: INPUT_TYPES.text,
      label: "Company",
      placeholder: "Enter your company name...",
      icon: <MdBusiness />,
    },
    organization: {
      name: USER_PROPERTIES.organization,
      type: INPUT_TYPES.text,
      label: "Organization",
      placeholder: "Enter your organization name...",
      icon: <MdBusiness />,
    },
    skills: {
      name: USER_PROPERTIES.skills,
      label: "Skills",
      icon: <MdPsychology />,
    },
    interests: {
      name: USER_PROPERTIES.interests,
      label: "Interests",
      icon: <MdFavorite />,
    },
    address: {
      name: USER_PROPERTIES.address,
      type: INPUT_TYPES.text,
      label: "Address",
      placeholder: "Enter your address...",
      icon: <MdLocationOn />,
    },
  };

export const addressFormFieldInputItems: AddressFormFieldInputItemsType = {
  street: {
    name: ADDRESS_PROPERTIES.street,
    type: INPUT_TYPES.text,
    label: "Street",
    placeholder: "Enter your street...",
    icon: <FaRoad />,
  },
  landmark: {
    name: ADDRESS_PROPERTIES.landmark,
    type: INPUT_TYPES.text,
    label: "Landmark",
    placeholder: "Enter your landmark...",
    icon: <FaLandmark />,
  },
  city: {
    name: ADDRESS_PROPERTIES.city,
    type: INPUT_TYPES.text,
    label: "City",
    placeholder: "Enter your city...",
    icon: <FaCity />,
  },
  state: {
    name: ADDRESS_PROPERTIES.state,
    type: INPUT_TYPES.text,
    label: "State",
    placeholder: "Enter your state...",
    icon: <FaMapMarkedAlt />,
  },
  countryCode: {
    name: ADDRESS_PROPERTIES.countryCode,
    type: INPUT_TYPES.text,
    label: "Country Code",
    placeholder: "Enter your countryCode...",
    icon: <FaFlag />,
  },
  country: {
    name: ADDRESS_PROPERTIES.country,
    type: INPUT_TYPES.text,
    label: "Country",
    placeholder: "Enter your country...",
    icon: <FaGlobe />,
  },
  pinCode: {
    name: ADDRESS_PROPERTIES.pinCode,
    type: INPUT_TYPES.text,
    label: "Pin Code",
    placeholder: "Enter your pinCode...",
    icon: <FaMapPin />,
  },
};

export const profileDetailsFormFieldButtonItems: ProfileDetailsFormFieldButtonItemsType =
  {
    update: {
      name: "update",
      label: "Update",
      icon: <FaUserPen />,
    },
    discard: {
      name: "discard",
      label: "Discard",
      icon: <ImCross />,
    },
  };

export const updatePasswordFormFieldInputItems: UpdatePasswordFormFieldInputItemsType =
  {
    oldPassword: {
      name: UPDATE_PASSWORD_FORM_FIELDS.oldPassword,
      type: INPUT_TYPES.password,
      label: "Old Password",
      placeholder: "Old Password",
      icon: <MdPassword />,
    },
    newPassword: {
      name: UPDATE_PASSWORD_FORM_FIELDS.newPassword,
      type: INPUT_TYPES.password,
      label: "New Password",
      placeholder: "New Password",
      icon: <MdPassword />,
    },
    confirmPassword: {
      name: UPDATE_PASSWORD_FORM_FIELDS.confirmPassword,
      type: INPUT_TYPES.password,
      label: "Confirm Password",
      placeholder: "Confirm Password",
      icon: <MdPassword />,
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

export const conversationTabs: Record<
  ConversationTabsType,
  ConversationTabType
> = {
  calls: {
    tab: CONVERSATION_TABS.calls,
    icon: <IoCallSharp />,
  },
  chats: {
    tab: CONVERSATION_TABS.chats,
    icon: <FaRocketchat />,
  },
  groups: {
    tab: CONVERSATION_TABS.groups,
    icon: <FaPeopleGroup />,
  },
};
