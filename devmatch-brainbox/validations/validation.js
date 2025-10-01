import {
  ALLOWED_SPECIAL_CHARACTERS_REGEX,
  EMAIL_REGEX,
  LOWER_CASE_REGEX,
  NUMBER_REGEX,
  UPPER_CASE_REGEX,
} from "../config/config.js";
import { errorMessages } from "../config/errorsConfig.js";
import { ValidationError } from "../errors/CustomError.js";

export const requestValidator = (req, res) => {
  if (!req || !req?.body || !Object.keys(req?.body).length) {
    throw new ValidationError(errorMessages.REQUEST_ERROR, {
      requestBody: req?.body,
    });
  }

  return req?.body;
};

export const emailValidator = (email) => {
  if (!EMAIL_REGEX.test(email)) {
    return {
      isEmailValid: false,
      message: errorMessages.INVALID_EMAIL_ERROR,
    };
  }

  return {
    isEmailValid: true,
  };
};

export const passwordValidator = (
  password,
  message = errorMessages.PASSWORD_COMBINATION_ERROR
) => {
  const errors = [];

  if (password.length < 6) {
    errors.push(errorMessages.PASSWORD_MINIMUM_LENGTH_ERROR);
  }

  if (!UPPER_CASE_REGEX.test(password)) {
    errors.push(errorMessages.PASSWORD_UPPERCASE_ERROR);
  }

  if (!LOWER_CASE_REGEX.test(password)) {
    errors.push(errorMessages.PASSWORD_LOWERCASE_ERROR);
  }

  if (!NUMBER_REGEX.test(password)) {
    errors.push(errorMessages.PASSWORD_NUMBER_ERROR);
  }

  if (!ALLOWED_SPECIAL_CHARACTERS_REGEX.test(password)) {
    errors.push(errorMessages.PASSWORD_SPECIAL_CHARACTERS_ERROR);
  }

  if (errors.length > 0) {
    return {
      isPasswordValid: false,
      message,
      errors: errors,
    };
  }

  return {
    isPasswordValid: true,
  };
};
