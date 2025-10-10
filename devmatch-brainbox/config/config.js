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
export const AVATAR_URL_REGEX =
  /^(https?:\/\/)([a-zA-Z0-9\-._~%]+@)?([a-zA-Z0-9\-._~%]+\.)+[a-zA-Z]{2,}(\/[^\s?#]*)*(\.(jpg|jpeg|png|gif|webp|svg))?(\?[^\s]*)?$/i;
export const GITHUB_REGEX =
  /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9-]{1,39}\/?$/;
export const WEBSITE_REGEX =
  /^https?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(:\d+)?(\/[^\s]*)?$/;
export const COUNTRY_CODE_REGEX = /^\d{1,3}$/;
export const PIN_CODE_REGEX = /^\d{6}$/;

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
  CONNECTION_ERROR: "CONNECTION_ERROR",
};

export const errorMessages = {
  DB_CONFIG_ERROR: "Database configuration error!",
  DB_CONNECTION_ERROR: "Database connection failed!",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  REQUEST_ERROR: "Invalid request!",
  FIRST_NAME_REQUIRED_ERROR: "First name is required!",
  EMAIL_REQUIRED_ERROR: "Email is required!",
  PASSWORD_REQUIRED_ERROR: "Password is required!",
  OLD_PASSWORD_REQUIRED_ERROR: "Old Password is required!",
  NEW_PASSWORD_REQUIRED_ERROR: "New Password is required!",
  CONFIRM_PASSWORD_REQUIRED_ERROR: "Confirm password is required!",
  INVALID_USER_ID_FORMAT_ERROR: "Invalid user id format!",
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
  INVALID_GENDER_ERROR: "Invalid gender!",
  INVALID_MARITAL_STATUS_ERROR: "Invalid marital status!",
  INVALID_AVATAR_URL_ERROR: "Invalid avatar url!",
  INVALID_BIO_ERROR: "Invalid Bio!",
  BIO_MIN_LENGTH_ERROR: "Bio must be at least 2 characters long!",
  BIO_MAX_LENGTH_ERROR: "Bio must not be longer than 100 characters!",
  INVALID_EXPERIENCE_ERROR: "Invalid experience!",
  DECIMAL_EXPERIENCE_ERROR: "Experience must not be in decimals!",
  MIN_EXPERIENCE_ERROR: "Experience must be more than 0 years!",
  MAX_EXPERIENCE_ERROR: "Experience must be less than 70 years!",
  INVALID_JOB_PROFILE_ERROR: "Invalid job profile!",
  JOB_PROFILE_MIN_LENGTH_ERROR:
    "Job profile must be at least 2 characters long!",
  JOB_PROFILE_MAX_LENGTH_ERROR:
    "Job profile must not be longer than 100 characters!",
  INVALID_GITHUB_URL_ERROR: "Invalid github url!",
  INVALID_WEBSITE_URL_ERROR: "Invalid website url!",
  INVALID_ORGANIZATION_ERROR: "Invalid organization!",
  ORGANIZATION_MIN_LENGTH_ERROR:
    "Organization must be at least 2 characters long!",
  ORGANIZATION_MAX_LENGTH_ERROR:
    "Organization must not be longer than 100 characters!",
  INVALID_SKILLS_ERROR: "Invalid skills!",
  INVALID_INTERESTS_ERROR: "Invalid interests!",
  INVALID_ADDRESS_ERROR: "Invalid address!",
  INVALID_STREET_ERROR: "Invalid street!",
  STREET_MIN_LENGTH_ERROR: "Street must be at least 2 characters long!",
  STREET_MAX_LENGTH_ERROR: "Street must not be longer than 100 characters!",
  INVALID_LANDMARK_ERROR: "Invalid Landmark!",
  LANDMARK_MIN_LENGTH_ERROR: "Landmark must be at least 2 characters long!",
  LANDMARK_MAX_LENGTH_ERROR: "Landmark must not be longer than 100 characters!",
  INVALID_CITY_ERROR: "Invalid city!",
  CITY_MIN_LENGTH_ERROR: "City must be at least 2 characters long!",
  CITY_MAX_LENGTH_ERROR: "City must not be longer than 100 characters!",
  INVALID_STATE_ERROR: "Invalid state!",
  STATE_MIN_LENGTH_ERROR: "State must be at least 2 characters long!",
  STATE_MAX_LENGTH_ERROR: "State must not be longer than 100 characters!",
  INVALID_COUNTRY_ERROR: "Invalid country!",
  COUNTRY_MIN_LENGTH_ERROR: "Country must be at least 2 characters long!",
  COUNTRY_MAX_LENGTH_ERROR: "Country must not be longer than 100 characters!",
  INVALID_COUNTRY_CODE_ERROR: "Invalid country code!",
  INVALID_PIN_CODE_ERROR: "Invalid pin code!",
  CONNECTION_REQUEST_FAILED_ERROR: "Unable to send connection request!",
  SELF_CONNECTION_ERROR: "Sender and receiver must be different!",
  INVALID_CONNECTION_STATUS_ERROR: "Invalid connection status!",
  BLOCKED_ERROR: "Forbidden connection request!",
};

export const successMessages = {
  DB_CONNECTION_SUCCESS: "DEVMATCH DB CONNECTED",
  REGISTRATION_SUCCESS: "Registration successful!",
  LOGIN_SUCCESS: "Login Successful!",
  LOGOUT_SUCCESS: "Logout Successful!",
  PASSWORD_UPDATE_SUCCESS: "Password update successful!",
  FETCH_PROFILE_SUCCESS: "Profile fetch successful!",
  USER_UPDATE_SUCCESS: "User update success!",
  CONNECTION_REQUEST_SUCCESS: "Connection request sent!",
  CONNECTION_REVIEW_SUCCESS: "Responded to connection request!",
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

export const connectionProperties = {
  SENDER_ID: "senderId",
  RECEIVER_ID: "receiverId",
  CONNECTION_STATUS: "connectionStatus",
  REJECTED_BY_SENDER_COUNT: "rejectedBySenderCount",
  REJECTED_BY_RECEIVER_COUNT: "rejectedByReceiverCount",
  LAST_ACTIONED_BY: "lastActionedBy",
};

export const connectionStatusProperties = {
  INTERESTED: "interested",
  NOT_INTERESTED: "not-interested",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  BLOCKED: "blocked",
};

export const propertyConstraints = {
  MIN_NAME_LENGTH: 1,
  MAX_NAME_LENGTH: 100,
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 100,
  MIN_AGE: 18,
  MAX_AGE: 100,
  MIN_EXPERIENCE: 0,
  MAX_EXPERIENCE: 70,
  MIN_STRING_LENGTH: 2,
  MAX_STRING_LENGTH: 100,
  PHONE_LENGTH: 10,
  PIN_CODE_LENGTH: 6,
};
