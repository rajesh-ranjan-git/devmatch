import {
  ALLOWED_SPECIAL_CHARACTERS_REGEX,
  EMAIL_REGEX,
  FIRST_NAME_REGEX,
  LOWER_CASE_REGEX,
  NUMBER_REGEX,
  status,
  UPPER_CASE_REGEX,
} from "../config/config.js";
import { errorMessages } from "../config/config.js";
import { ValidationError } from "../errors/CustomError.js";

export const requestValidator = (req, res) => {
  if (!req || !req?.body || !Object.keys(req?.body).length) {
    throw new ValidationError(
      status.badRequest,
      errorMessages.REQUEST_ERROR,
      {
        requestBody: req?.body,
      },
      req?.url
    );
  }

  return req?.body;
};

export const firstNameValidator = (firstName) => {
  if (!firstName?.trim()) {
    return {
      isFirstNameValid: false,
      message: errorMessages.FIRST_NAME_REQUIRED_ERROR,
    };
  }

  if (firstName?.trim().length < 1) {
    return {
      isFirstNameValid: false,
      message: errorMessages.FIRST_NAME_MIN_LENGTH_ERROR,
    };
  }

  if (!FIRST_NAME_REGEX.test(firstName?.trim())) {
    return {
      isFirstNameValid: false,
      message: errorMessages.INVALID_FIRST_NAME_ERROR,
    };
  }

  return {
    isFirstNameValid: true,
    validatedFirstName: firstName?.trim(),
  };
};

export const emailValidator = (email) => {
  if (!email?.trim()) {
    return {
      isEmailValid: false,
      message: errorMessages.EMAIL_REQUIRED_ERROR,
    };
  }

  if (!EMAIL_REGEX.test(email?.trim())) {
    return {
      isEmailValid: false,
      message: errorMessages.INVALID_EMAIL_ERROR,
    };
  }

  return {
    isEmailValid: true,
    validatedEmail: email?.trim(),
  };
};

export const passwordValidator = (
  password,
  requiredErrorMessage = errorMessages.PASSWORD_REQUIRED_ERROR,
  combinationErrorMessage = errorMessages.PASSWORD_COMBINATION_ERROR
) => {
  if (!password?.trim()) {
    return {
      isPasswordValid: false,
      message: requiredErrorMessage,
    };
  }

  const errors = [];

  if (password?.trim().length < 6) {
    errors.push(errorMessages.PASSWORD_MIN_LENGTH_ERROR);
  }

  if (!UPPER_CASE_REGEX.test(password?.trim())) {
    errors.push(errorMessages.PASSWORD_UPPERCASE_ERROR);
  }

  if (!LOWER_CASE_REGEX.test(password?.trim())) {
    errors.push(errorMessages.PASSWORD_LOWERCASE_ERROR);
  }

  if (!NUMBER_REGEX.test(password?.trim())) {
    errors.push(errorMessages.PASSWORD_NUMBER_ERROR);
  }

  if (!ALLOWED_SPECIAL_CHARACTERS_REGEX.test(password?.trim())) {
    errors.push(errorMessages.PASSWORD_SPECIAL_CHARACTERS_ERROR);
  }

  if (errors.length > 0) {
    return {
      isPasswordValid: false,
      message: combinationErrorMessage,
      errors: errors,
    };
  }

  return {
    isPasswordValid: true,
    validatedPassword: password?.trim(),
  };
};
