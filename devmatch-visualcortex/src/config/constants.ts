export const APP = {
  name: "devmatch",
  desc: "Tinder for Software Engineers!",
} as const;

export const STORAGE = { local: "local", session: "session" } as const;

export const EXPLORE_VISIBLE_USER_CARDS = 5;

export const BANNER_FONTS = {
  ansiShadow: { name: "ANSI Shadow", url: "/assets/fonts/ansi_shadow.flf" },
} as const;

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

export const NOTIFICATION_TYPES = {
  connection: "connection",
  chat: "chat",
};

export const ACCOUNT_OPTIONS_DROPDOWN_ITEMS = {
  profile: "profile",
  logout: "logout",
} as const;

export const AUTH_FORM_FIELDS = {
  userName: "userName",
  firstName: "firstName",
  email: "email",
  login: "login",
  register: "register",
  password: "password",
  confirmPassword: "confirmPassword",
  forgotPassword: "forgotPassword",
  updateProfile: "updateProfile",
  updatePassword: "updatePassword",
  deleteAccount: "deleteAccount",
} as const;

export const SOCIAL_MEDIA = {
  facebook: "facebook",
  instagram: "instagram",
  twitter: "twitter",
  github: "github",
  linkedin: "linkedin",
  youtube: "youtube",
  website: "website",
} as const;

export const INPUT_TYPES = {
  text: "text",
  email: "text",
  password: "password",
  number: "text",
  submit: "submit",
  hidden: "hidden",
  radio: "radio",
  checkbox: "checkbox",
  textarea: "textarea",
} as const;

export const MESSAGE_TITLES = {
  bannerFailed: "Banner Failed",
  authenticationSuccess: "Authentication Success",
  authenticationFailed: "Authentication Failed",
  registrationSuccess: "Registration Success",
  registrationFailed: "Registration Failed",
  loginSuccess: "Login Success",
  loginFailed: "Login Failed",
  logoutSuccess: "Logout Success",
  logoutFailed: "Logout Success",
  passwordUpdateSuccess: "Password Update Success",
  passwordUpdateFailed: "Password Update Failed",
  updateSuccess: "Update Success",
  updateFailed: "Update Failed",
  welcome: "Welcome",
  welcomeBack: "Welcome Back",
} as const;

export const ERROR_TYPES = {
  networkError: "NETWORK_ERROR",
  timeoutError: "TIMEOUT_ERROR",
  validationError: "VALIDATION_ERROR",
  authenticationError: "AUTHENTICATION_ERROR",
  forbiddenError: "FORBIDDEN_ERROR",
  connectionError: "CONNECTION_ERROR",
  notificationError: "NOTIFICATION_ERROR",
  notFoundError: "NOT_FOUND_ERROR",
  conflictError: "CONFLICT_ERROR",
  serverError: "SERVER_ERROR",
  rateLimitError: "RATE_LIMIT_ERROR",
  unknownError: "UNKNOWN_ERROR",
} as const;

export const ERROR_MESSAGES = {
  globalError: "Something went wrong!",
  pageNotFoundError: "Page Not Found!",
  internalServerError: "Internal Server Error",
  bannerError: "Failed to show DevMatch banner!",
  invalidError: "Invalid request!",
  userNameRequiredError: "User name is required!",
  firstNameRequiredError: "First name is required!",
  emailRequiredError: "Email is required!",
  passwordRequiredError: "Password is required!",
  oldPasswordRequiredError: "Old Password is required!",
  newPasswordRequiredError: "New Password is required!",
  confirmPasswordError: "Confirm password is required!",
  invalidUserIdFormatError: "Invalid user id format!",
  invalidUserNameError:
    "User name must only contain alphabets (a-z or A-Z) and special characters (!,@,#,$,%,&,_)!",
  invalidFirstNameError: "First name must only contain alphabets (a-z or A-Z)!",
  invalidMiddleNameError:
    "Middle name must only contain alphabets (a-z or A-Z)!",
  invalidLastNameError: "Last name must only contain alphabets (a-z or A-Z)!",
  invalidNickNameError: "Nick name must only contain alphabets (a-z or A-Z)!",
  invalidEmailError: "Invalid email format!",
  passwordCombinationError: "Invalid password combination!",
  oldPasswordCombinationError: "Invalid old password combination!",
  newPasswordCombinationError: "Invalid new password combination!",
  confirmPasswordCombinationError: "Invalid confirm password combination!",
  passwordConfirmPasswordMismatchError:
    "Password and confirm password must be same!",
  newPasswordConfirmPasswordMismatchError:
    "New password and confirm password must be same!",
  userNameMinLengthError: "User name must be at least 1 character long!",
  userNameMaxLengthError: "User name must not be longer than 100 characters!",
  firstNameMinLengthError: "First name must be at least 1 character long!",
  firstNameMaxLengthError: "First name must not be longer than 100 characters!",
  middleNameMinLengthError: "Middle name must be at least 1 character long!",
  middleNameMaxLengthError:
    "Middle name must not be longer than 100 characters!",
  lastNameMinLengthError: "Last name must be at least 1 character long!",
  lastNameMaxLengthError: "Last name must not be longer than 100 characters!",
  nickNameMinLengthError: "Nick name must be at least 1 character long!",
  nickNameMaxLengthError: "Nick name must not be longer than 100 characters!",
  passwordMinLengthError: "Password must be at least 6 characters long!",
  passwordMaxLengthError: "Password must not be longer than 100 characters!",
  passwordUppercaseError:
    "Password must contain at least one uppercase letter (A-Z)!",
  passwordLowercaseError:
    "Password must contain at least one lowercase letter (a-z)!",
  passwordNumberError: "Password must contain at least one digit (0-9)!",
  passwordSpecialCharactersError:
    "Password must contain at least one special character (@, #, $, %, &)!",
  userExistsError: "User already exists!",
  userNotExistsError: "User does not exist!",
  registrationFailedError: "Unable to register user!",
  incorrectEmailPasswordError: "Incorrect email or password!",
  incorrectSecurityQuestionAnswerError: "Incorrect security question's answer!",
  incorrectOldPasswordError: "Incorrect old password! ",
  passwordUpdateFailedError: "Unable to update password!",
  passwordAlreadyUsedError:
    "New password must be different from previous password!",
  passwordExpiredError: "Password expired!",
  unauthorizedUserError: "Unauthorized user!",
  forbiddenUpdateError: "Update not allowed!",
  forbiddenPropertyUpdateError: "Property update not allowed!",
  forbiddenPropertiesUpdateError: "Some property updates not allowed!",
  userUpdateFailedError: "Unable to update user!",
  invalidAgeError: "Invalid age!",
  decimalAgeError: "Age must not be in decimals!",
  minAgeError: "User must be older than 18 years!",
  maxAgeError: "User must be younger than 18 years!",
  invalidPhoneError: "Invalid phone number!",
  invalidGenderError: "Invalid gender!",
  invalidMaritalStatusError: "Invalid marital status!",
  invalidPhotoUrlError: "Invalid photo url!",
  invalidBioError: "Invalid Bio!",
  bioMinLengthError: "Bio must be at least 2 characters long!",
  bioMaxLengthError: "Bio must not be longer than 100 characters!",
  invalidExperienceError: "Invalid experience!",
  decimalExperienceError: "Experience must not be in decimals!",
  minExperienceError: "Experience must be more than 0 years!",
  maxExperienceError: "Experience must be less than 70 years!",
  invalidJobProfileError: "Invalid job profile!",
  jobProfileMinLengthError: "Job profile must be at least 2 characters long!",
  jobProfileMaxLengthError:
    "Job profile must not be longer than 100 characters!",
  invalidFacebookUrlError: "Invalid facebook url!",
  invalidInstagramUrlError: "Invalid instagram url!",
  invalidTwitterUrlError: "Invalid twitter url!",
  invalidGithubUrlError: "Invalid github url!",
  invalidLinkedinUrlError: "Invalid linkedin url!",
  invalidYoutubeUrlError: "Invalid youtube url!",
  invalidWebsiteUrlError: "Invalid website url!",
  invalidCompanyError: "Invalid company!",
  companyMinLengthError: "Company must be at least 2 characters long!",
  companyMaxLengthError: "Company must not be longer than 100 characters!",
  invalidOrganizationError: "Invalid organization!",
  organizationMinLengthError:
    "Organization must be at least 2 characters long!",
  organizationMaxLengthError:
    "Organization must not be longer than 100 characters!",
  invalidSkillsError: "Invalid skills!",
  invalidInterestsError: "Invalid interests!",
  invalidAddressError: "Invalid address!",
  invalidStreetError: "Invalid street!",
  streetMinLengthError: "Street must be at least 2 characters long!",
  streetMaxLengthError: "Street must not be longer than 100 characters!",
  invalidLandmarkError: "Invalid Landmark!",
  landmarkMinLengthError: "Landmark must be at least 2 characters long!",
  landmarkMaxLengthError: "Landmark must not be longer than 100 characters!",
  invalidCityError: "Invalid city!",
  cityMinLengthError: "City must be at least 2 characters long!",
  cityMaxLengthError: "City must not be longer than 100 characters!",
  invalidStateError: "Invalid state!",
  stateMinLengthError: "State must be at least 2 characters long!",
  stateMaxLengthError: "State must not be longer than 100 characters!",
  invalidCountryError: "Invalid country!",
  countryMinLengthError: "Country must be at least 2 characters long!",
  countryMaxLengthError: "Country must not be longer than 100 characters!",
  invalidCountryCodeError: "Invalid country code!",
  invalidPinCodeError: "Invalid pin code!",
  connectionRequestFailedError: "Unable to send connection request!",
  selfConnectionError: "Logged in user and other user must be different!",
  invalidConnectionRequestError: "Invalid connection request!",
  viewConnectionRequestError: "Unable to get connections requests!",
  invalidPageError: "Invalid page!",
} as const;

export const FALLBACK_MESSAGES = {
  noNotifications: "All caught up!",
} as const;

export const NAME_REGEX = /^[A-Za-z]+$/;
export const USER_NAME_REGEX = /^[A-Za-z0-9!@#$%&_]{4,}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&]).{6,}$/;
export const UPPER_CASE_REGEX = /[A-Z]/;
export const LOWER_CASE_REGEX = /[a-z]/;
export const NUMBER_REGEX = /\d/;
export const ALLOWED_SPECIAL_CHARACTERS_REGEX = /[@#$%&]/;
export const PHONE_REGEX = /^\d{10}$/;
export const PHOTO_URL_REGEX =
  /^(https?:\/\/)([a-zA-Z0-9\-._~%]+@)?([a-zA-Z0-9\-._~%]+\.)+[a-zA-Z]{2,}(\/[^\s?#]*)*(\.(jpg|jpeg|png|gif|webp|svg))?(\?[^\s]*)?$/i;
export const FACEBOOK_REGEX =
  /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]+)(?:\/)?/im;
export const INSTAGRAM_REGEX =
  /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/i;
export const TWITTER_REGEX =
  /https?:\/\/(?:www\.|m\.)?(?:twitter|x)\.com\/@?([a-zA-Z0-9_]{1,15})(?:\/?|\?[^\s\/]*|\/[^\s\/]*)$/i;
export const GITHUB_REGEX =
  /^(https?:\/\/)?(www\.)?github\.com\/([a-zA-Z0-9_-]+)\/?$/;
export const LINKEDIN_REGEX =
  /^(https?:\/\/)?([\w]+\.)?linkedin\.com\/(mwlite\/|m\/)?in\/([a-zA-Z0-9À-ž_.-]+)\/?$/;
export const YOUTUBE_REGEX =
  /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:channel\/|user\/|c\/|@)?([\w-]+)/;
export const WEBSITE_REGEX =
  /^https?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(:\d+)?(\/[^\s]*)?$/;
export const COUNTRY_CODE_REGEX = /^\d{1,3}$/;
export const PIN_CODE_REGEX = /^\d{6}$/;

export const USER_PROPERTIES = {
  id: "id",
  email: "email",
  userName: "userName",
  password: "password",
  previousPassword: "previousPassword",
  passwordLastUpdated: "passwordLastUpdated",
  firstName: "firstName",
  middleName: "middleName",
  lastName: "lastName",
  nickName: "nickName",
  age: "age",
  phone: "phone",
  gender: "gender",
  avatarUrl: "avatarUrl",
  coverPhotoUrl: "coverPhotoUrl",
  bio: "bio",
  maritalStatus: "maritalStatus",
  jobProfile: "jobProfile",
  experience: "experience",
  facebook: "facebook",
  instagram: "instagram",
  twitter: "twitter",
  github: "github",
  linkedin: "linkedin",
  youtube: "youtube",
  website: "website",
  company: "company",
  organization: "organization",
  skills: "skills",
  interests: "interests",
  address: "address",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
} as const;

export const GENDER_PROPERTIES = {
  male: "male",
  female: "female",
  other: "other",
} as const;

export const MARITAL_STATUS_PROPERTIES = {
  single: "single",
  married: "married",
  separated: "separated",
} as const;

export const ADDRESS_PROPERTIES = {
  street: "street",
  landmark: "landmark",
  city: "city",
  state: "state",
  countryCode: "countryCode",
  country: "country",
  pinCode: "pinCode",
} as const;

export const USER_PROPERTY_LABELS = {
  id: "ID",
  email: "Email",
  userName: "Username",
  password: "Password",
  previousPassword: "Previous Password",
  passwordLastUpdated: "Password Updated",
  firstName: "First Name",
  middleName: "Middle Name",
  lastName: "Last Name",
  nickName: "Nickname",
  age: "Age",
  phone: "Phone",
  gender: "Gender",
  avatarUrl: "Avatar",
  coverPhotoUrl: "Cover Photo",
  bio: "Bio",
  maritalStatus: "Marital Status",
  jobProfile: "Job Profile",
  experience: "Experience",
  facebook: "Facebook",
  instagram: "Instagram",
  twitter: "Twitter",
  github: "GitHub",
  linkedin: "LinkedIn",
  youtube: "Youtube",
  website: "Website",
  company: "Company",
  organization: "Organization",
  skills: "Skills",
  interests: "Interests",
  address: "Address",
  createdAt: "Member Since",
  updatedAt: "Profile Updated",
} as const;

export const USER_PROPERTY_CONSTRAINTS = {
  minUserNameLength: 1,
  maxUserNameLength: 100,
  minNameLength: 1,
  maxNameLength: 100,
  minPasswordLength: 6,
  maxPasswordLength: 100,
  minAge: 18,
  maxAge: 100,
  minExperience: 0,
  maxExperience: 70,
  minStringLength: 2,
  maxStringLength: 100,
  phoneLength: 10,
  pinCodeLength: 6,
} as const;

export const CONNECTION_STATUS_PROPERTIES = {
  interested: "interested",
  notInterested: "not-interested",
  accepted: "accepted",
  rejected: "rejected",
  blocked: "blocked",
} as const;
