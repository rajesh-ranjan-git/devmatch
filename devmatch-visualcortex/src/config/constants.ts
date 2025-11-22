export const STORAGE = { local: "local", session: "session" } as const;

export const BANNER_FONTS = {
  big: "Big",
  doom: "Doom",
  standard: "Standard",
  slant: "Slant",
  ghost: "Ghost",
  ansiShadow: "ANSI Shadow",
  epic: "Epic",
  bloody: "Bloody",
  cuberLarge: "Cyberlarge",
};

export const BANNER_THEMES = [
  {
    name: "Cyber Blue",
    gradient: ["#00eaff", "#0077ff"],
    taglineColor: "#00eaff",
  },
  {
    name: "Neon Purple",
    gradient: ["#9d4edd", "#7b2cbf", "#5a189a"],
    taglineColor: "#9d4edd",
  },
  {
    name: "Sunset Pink-Blue",
    gradient: ["#ff5f8f", "#ff99c8", "#00bbf9", "#00f5d4"],
    taglineColor: "#ff5f8f",
  },
  {
    name: "Retro 80s Neon",
    gradient: ["#ff00ff", "#ff0099", "#00e5ff"],
    taglineColor: "#ff00ff",
  },
  {
    name: "Vercel Monochrome",
    gradient: ["#ffffff", "#8d8d8d", "#333333"],
    taglineColor: "#ffffff",
  },
  {
    name: "Matrix Green",
    gradient: ["#00ff41", "#00b300"],
    taglineColor: "#00ff41",
  },
  {
    name: "Gold Luxury",
    gradient: ["#fff3b0", "#ffd60a", "#fca311", "#e85d04"],
    taglineColor: "#fca311",
  },
  {
    name: "Fire Lava",
    gradient: ["#ff0000", "#ff7b00", "#ffb100"],
    taglineColor: "#ff7b00",
  },
  {
    name: "Ice Blue",
    gradient: ["#caf0f8", "#90e0ef", "#00b4d8", "#0077b6"],
    taglineColor: "#00b4d8",
  },
  {
    name: "DevMatch Teal-Purple (Default)",
    gradient: ["#00f5d4", "#7b2cbf"],
    taglineColor: "#00f5d4",
  },
];

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
