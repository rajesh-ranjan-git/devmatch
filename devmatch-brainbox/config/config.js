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
  FIRST_NAME_MAX_LENGTH_ERROR:
    "First Name must not be longer than 100 characters!",
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
  INCORRECT_EMAIL_PASSWORD_ERROR: "Incorrect Email / Password!",
  INCORRECT_SECURITY_QUESTION_ANSWER_ERROR:
    "Incorrect security question's answer!",
  PASSWORD_UPDATE_FAILED: "Unable to update password!",
  PASSWORD_ALREADY_USED_ERROR:
    "New password must be different from previous password!",
  PASSWORD_EXPIRED_ERROR: "Password expired!",
};

export const successMessages = {
  DB_CONNECTION_SUCCESS: "DEVMATCH DB CONNECTED",
  REGISTRATION_SUCCESS: "Registration successful!",
  LOGIN_SUCCESS: "Login Successful!",
  LOGOUT_SUCCESS: "Logout Successful!",
  PASSWORD_UPDATE_SUCCESS: "Password updated!",
};

export const FIRST_NAME_REGEX = /^[A-Za-z]+$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&]).{6,}$/;
export const UPPER_CASE_REGEX = /[A-Z]/;
export const LOWER_CASE_REGEX = /[a-z]/;
export const NUMBER_REGEX = /\d/;
export const ALLOWED_SPECIAL_CHARACTERS_REGEX = /[@#$%&]/;
