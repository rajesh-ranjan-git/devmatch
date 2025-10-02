export const status = {
  success: { message: "OK", statusCode: 200 },
  created: { message: "CREATED", statusCode: 201 },
  updated: { message: "UPDATED", statusCode: 203 },
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
  AUTHENTICATION_ERROR: "AUTHENTICATION_ERROR",
};

export const errorMessages = {
  DB_CONFIG_ERROR: "Database configuration error!",
  DB_CONNECTION_ERROR: "Database connection failed!",
  REQUEST_ERROR: "Invalid Request!",
  FIRST_NAME_REQUIRED_ERROR: "First Name is required!",
  EMAIL_REQUIRED_ERROR: "Email is required!",
  PASSWORD_REQUIRED_ERROR: "Password is required!",
  CONFIRM_PASSWORD_REQUIRED_ERROR: "Confirm Password is required!",
  INVALID_FIRST_NAME_ERROR:
    "First Name must only contain alphabets (a-z or A-Z)!",
  INVALID_EMAIL_ERROR: "Invalid Email format!",
  PASSWORD_COMBINATION_ERROR: "Invalid Password combination!",
  CONFIRM_PASSWORD_COMBINATION_ERROR: "Invalid Confirm Password combination!",
  PASSWORD_CONFIRM_PASSWORD_MISMATCH_ERROR:
    "Password and Confirm Password must be same!",
  FIRST_NAME_MIN_LENGTH_ERROR: "First Name must be at least 1 character long!",
  PASSWORD_MIN_LENGTH_ERROR: "Password must be at least 6 characters long!",
  PASSWORD_UPPERCASE_ERROR:
    "Password must contain at least one uppercase letter (A-Z)!",
  PASSWORD_LOWERCASE_ERROR:
    "Password must contain at least one lowercase letter (a-z)!",
  PASSWORD_NUMBER_ERROR: "Password must contain at least one digit (0-9)!",
  PASSWORD_SPECIAL_CHARACTERS_ERROR:
    "Password must contain at least one special character (@, #, $, %, &)!",
  USER_EXISTS_ERROR: "User already exists!",
  REGISTRATION_FAILED_ERROR: "Unable to register user!",
};

export const successMessages = {
  DB_CONNECTION_SUCCESS: "DEVMATCH DB CONNECTED",
  REGISTRATION_SUCCESS: "User registered successfully!",
};

export const FIRST_NAME_REGEX = /^[A-Za-z]+$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const UPPER_CASE_REGEX = /[A-Z]/;
export const LOWER_CASE_REGEX = /[a-z]/;
export const NUMBER_REGEX = /\d/;
export const ALLOWED_SPECIAL_CHARACTERS_REGEX = /[@#$%&]/;
