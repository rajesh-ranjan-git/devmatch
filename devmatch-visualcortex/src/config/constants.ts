export const STORAGE = { local: "local", session: "session" } as const;

export const THEMES = {
  dark: "dark",
  light: "light",
} as const;

export const NAVBAR_MENU_ITEMS = {
  requests: "requests",
  connections: "connections",
} as const;

export const NOTIFICATION_DROPDOWN_ITEMS = {
  profile: "profile",
  logout: "logout",
} as const;

export const ACCOUNT_OPTIONS_DROPDOWN_ITEMS = {
  profile: "profile",
  logout: "logout",
} as const;

export const AUTH_FORM_FIELDS = {
  user_name: "user_name",
  email: "email",
  login: "login",
  register: "register",
  password: "password",
  confirm_password: "confirm_password",
  forgot_password: "forgot_password",
  update_profile: "update_profile",
  delete_account: "delete_account",
} as const;

export const SOCIAL_MEDIA = {
  facebook: "facebook",
  instagram: "instagram",
  twitter: "twitter",
  github: "github",
} as const;

export const INPUT_TYPES = {
  text: "text",
  email: "email",
  password: "password",
  submit: "submit",
  radio: "radio",
  checkbox: "checkbox",
  textarea: "textarea",
} as const;
