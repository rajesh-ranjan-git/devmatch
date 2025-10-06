import { omitObjectProperties } from "../utils/utils.js";

export const NAME_REGEX = /^[A-Za-z]+$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&]).{6,}$/;
export const UPPER_CASE_REGEX = /[A-Z]/;
export const LOWER_CASE_REGEX = /[a-z]/;
export const NUMBER_REGEX = /\d/;
export const ALLOWED_SPECIAL_CHARACTERS_REGEX = /[@#$%&]/;
export const PHONE_REGEX = /^\d{10}$/;

export const status = {
  success: { message: "OK", statusCode: 200 },
  created: { message: "CREATED", statusCode: 201 },
  updated: { message: "UPDATED", statusCode: 201 },
  deleted: { message: "DELETED", statusCode: 204 },
  badRequest: {
    message: "BAD REQUEST",
    statusCode: 400,
  },
  forbidden: {
    message: "FORBIDDEN",
    statusCode: 403,
  },
  notFound: {
    message: "NOT FOUND",
    statusCode: 404,
  },
  conflict: {
    message: "CONFLICT",
    statusCode: 409,
  },
  internalServerError: {
    message: "INTERNAL SERVER ERROR",
    statusCode: 500,
  },
};

export const errorTypes = {
  NETWORK_ERROR: "NETWORK_ERROR",
  DATABASE_CONFIG_ERROR: "DATABASE_CONFIG_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  DATABASE_ERROR: "DATABASE_ERROR",
  BCRYPT_ERROR: "BCRYPT_ERROR",
  JWT_ERROR: "JWT_ERROR",
  AUTHENTICATION_ERROR: "AUTHENTICATION_ERROR",
  FORBIDDEN_ERROR: "FORBIDDEN_ERROR",
};

export const errorMessages = {
  DB_CONFIG_ERROR: "Database configuration error!",
  DB_CONNECTION_ERROR: "Database connection failed!",
  REQUEST_ERROR: "Invalid request!",
  FIRST_NAME_REQUIRED_ERROR: "First name is required!",
  EMAIL_REQUIRED_ERROR: "Email is required!",
  PASSWORD_REQUIRED_ERROR: "Password is required!",
  OLD_PASSWORD_REQUIRED_ERROR: "Old Password is required!",
  NEW_PASSWORD_REQUIRED_ERROR: "New Password is required!",
  CONFIRM_PASSWORD_REQUIRED_ERROR: "Confirm password is required!",
  INVALID_USER_ID_FORMAT: "Invalid user id format!",
  INVALID_FIRST_NAME_ERROR:
    "First name must only contain alphabets (a-z or A-Z)!",
  INVALID_MIDDLE_NAME_ERROR:
    "Middle name must only contain alphabets (a-z or A-Z)!",
  INVALID_LAST_NAME_ERROR:
    "Last name must only contain alphabets (a-z or A-Z)!",
  INVALID_NICK_NAME_ERROR:
    "Nick name must only contain alphabets (a-z or A-Z)!",
  INVALID_EMAIL_ERROR: "Invalid email format!",
  PASSWORD_COMBINATION_ERROR: "Invalid password combination!",
  OLD_PASSWORD_COMBINATION_ERROR: "Invalid old password combination!",
  NEW_PASSWORD_COMBINATION_ERROR: "Invalid new password combination!",
  CONFIRM_PASSWORD_COMBINATION_ERROR: "Invalid confirm password combination!",
  PASSWORD_CONFIRM_PASSWORD_MISMATCH_ERROR:
    "Password and confirm password must be same!",
  NEW_PASSWORD_CONFIRM_PASSWORD_MISMATCH_ERROR:
    "New password and confirm password must be same!",
  FIRST_NAME_MIN_LENGTH_ERROR: "First name must be at least 1 character long!",
  FIRST_NAME_MAX_LENGTH_ERROR:
    "First name must not be longer than 100 characters!",
  MIDDLE_NAME_MIN_LENGTH_ERROR:
    "Middle name must be at least 1 character long!",
  MIDDLE_NAME_MAX_LENGTH_ERROR:
    "Middle name must not be longer than 100 characters!",
  LAST_NAME_MIN_LENGTH_ERROR: "Last name must be at least 1 character long!",
  LAST_NAME_MAX_LENGTH_ERROR:
    "Last name must not be longer than 100 characters!",
  NICK_NAME_MIN_LENGTH_ERROR: "Nick name must be at least 1 character long!",
  NICK_NAME_MAX_LENGTH_ERROR:
    "Nick name must not be longer than 100 characters!",
  PASSWORD_MIN_LENGTH_ERROR: "Password must be at least 6 characters long!",
  PASSWORD_MAX_LENGTH_ERROR: "Password must not be longer than 100 characters!",
  PASSWORD_UPPERCASE_ERROR:
    "Password must contain at least one uppercase letter (A-Z)!",
  PASSWORD_LOWERCASE_ERROR:
    "Password must contain at least one lowercase letter (a-z)!",
  PASSWORD_NUMBER_ERROR: "Password must contain at least one digit (0-9)!",
  PASSWORD_SPECIAL_CHARACTERS_ERROR:
    "Password must contain at least one special character (@, #, $, %, &)!",
  USER_EXISTS_ERROR: "User already exists!",
  USER_NOT_EXIST_ERROR: "User does not exist!",
  REGISTRATION_FAILED_ERROR: "Unable to register user!",
  BCRYPT_ERROR: "Unable to encrypt password!",
  JWT_ERROR: "Unable to generate token!",
  JWT_EXPIRED_ERROR: "Token expired!",
  JWT_INVALID_ERROR: "Invalid token!",
  JWT_NOT_BEFORE_ERROR: "Not before token error!",
  INCORRECT_EMAIL_PASSWORD_ERROR: "Incorrect email or password!",
  INCORRECT_SECURITY_QUESTION_ANSWER_ERROR:
    "Incorrect security question's answer!",
  INCORRECT_OLD_PASSWORD_ERROR: "Incorrect old password! ",
  PASSWORD_UPDATE_FAILED: "Unable to update password!",
  PASSWORD_ALREADY_USED_ERROR:
    "New password must be different from previous password!",
  PASSWORD_EXPIRED_ERROR: "Password expired!",
  UNAUTHORIZED_USER_ERROR: "Unauthorized user!",
  FORBIDDEN_UPDATE_ERROR: "Update not allowed!",
  FORBIDDEN_PROPERTY_UPDATE_ERROR: "Property update not allowed!",
  FORBIDDEN_PROPERTIES_UPDATE_ERROR: "Some property updates not allowed!",
  USER_UPDATE_FAILED_ERROR: "Unable to update user!",
  INVALID_AGE_ERROR: "Invalid age!",
  DECIMAL_AGE_ERROR: "Age must not be in decimals!",
  MIN_AGE_ERROR: "User must be older than 18 years!",
  MAX_AGE_ERROR: "User must be younger than 18 years!",
  INVALID_PHONE_ERROR: "Invalid phone number!",
};

export const successMessages = {
  DB_CONNECTION_SUCCESS: "DEVMATCH DB CONNECTED",
  REGISTRATION_SUCCESS: "Registration successful!",
  LOGIN_SUCCESS: "Login Successful!",
  LOGOUT_SUCCESS: "Logout Successful!",
  PASSWORD_UPDATE_SUCCESS: "Password update successful!",
  FETCH_PROFILE_SUCCESS: "Profile fetch successful!",
  USER_UPDATE_SUCCESS: "User update success!",
};

export const jwtKnownErrors = {
  TOKEN_EXPIRED_ERROR: "TokenExpiredError",
  JWT_ERROR: "JsonWebTokenError",
  NOT_BEFORE_ERROR: "NotBeforeError",
};

export const userProperties = {
  ID: "id",
  EMAIL: "email",
  PASSWORD: "password",
  PREVIOUS_PASSWORD: "previousPassword",
  PASSWORD_LAST_UPDATED: "passwordLastUpdated",
  FIRST_NAME: "firstName",
  MIDDLE_NAME: "middleName",
  LAST_NAME: "lastName",
  NICK_NAME: "nickName",
  AGE: "age",
  PHONE: "phone",
  GENDER: "gender",
  AVATAR_URL: "avatarUrl",
  BIO: "bio",
  MARITAL_STATUS: "maritalStatus",
  JOB_PROFILE: "jobProfile",
  EXPERIENCE: "experience",
  GITHUB: "github",
  WEBSITE: "website",
  ORGANIZATION: "organization",
  SKILLS: "skills",
  INTERESTS: "interests",
  ADDRESS: "address",
  CREATED_AT: "createdAt",
  UPDATED_AT: "updatedAt",
};

export const genderProperties = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
};

export const maritalStatusProperties = {
  MARRIED: "married",
  SINGLE: "single",
  SEPARATED: "separated",
};

export const addressProperties = {
  STREET: "street",
  LANDMARK: "landmark",
  CITY: "city",
  STATE: "state",
  COUNTRY_CODE: "countryCode",
  COUNTRY: "country",
  PIN_CODE: "pinCode",
};

export const publicProfileProperties = omitObjectProperties(userProperties, [
  "PASSWORD",
  "PREVIOUS_PASSWORD",
  "PASSWORD_LAST_UPDATED",
  "UPDATED_AT",
]);

export const privateProfileProperties = omitObjectProperties(userProperties, [
  "PASSWORD",
  "PREVIOUS_PASSWORD",
]);

export const allowedUpdateProfileProperties = omitObjectProperties(
  userProperties,
  [
    "EMAIL",
    "PASSWORD",
    "PREVIOUS_PASSWORD",
    "PASSWORD_LAST_UPDATED",
    "CREATED_AT",
    "UPDATED_AT",
  ]
);
