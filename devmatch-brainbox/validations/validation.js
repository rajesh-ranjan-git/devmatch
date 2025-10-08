import {
  ALLOWED_SPECIAL_CHARACTERS_REGEX,
  EMAIL_REGEX,
  NAME_REGEX,
  LOWER_CASE_REGEX,
  NUMBER_REGEX,
  status,
  UPPER_CASE_REGEX,
  userProperties,
  propertyConstraints,
} from "../config/config.js";
import { errorMessages } from "../config/config.js";
import { ValidationError } from "../errors/CustomError.js";

export const requestValidator = (req, res) => {
  if (!req) {
    throw new ValidationError(status.badRequest, errorMessages.REQUEST_ERROR, {
      req: req,
    });
  }

  if (req?.method === "GET") {
    return;
  } else {
    const body = requestBodyValidator(req, res);

    return body;
  }
};

export const requestBodyValidator = (req, res) => {
  if (!req?.body || !Object.keys(req?.body).length) {
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
  if (!firstName?.trim().toLowerCase()) {
    return {
      isFirstNameValid: false,
      message: errorMessages.FIRST_NAME_REQUIRED_ERROR,
    };
  }

  nameValidator(firstName, userProperties.FIRST_NAME);

  return {
    isFirstNameValid: true,
    validatedFirstName: firstName?.trim().toLowerCase(),
  };
};

export const nameValidator = (name, type) => {
  if (name?.trim().toLowerCase().length < propertyConstraints.MIN_NAME_LENGTH) {
    return {
      isNameValid: false,
      message:
        type === userProperties.FIRST_NAME
          ? errorMessages.FIRST_NAME_MIN_LENGTH_ERROR
          : type === userProperties.MIDDLE_NAME
          ? errorMessages.MIDDLE_NAME_MIN_LENGTH_ERROR
          : type === userProperties.LAST_NAME
          ? errorMessages.LAST_NAME_MIN_LENGTH_ERROR
          : errorMessages.NICK_NAME_MIN_LENGTH_ERROR,
    };
  }

  if (name?.trim().toLowerCase().length > propertyConstraints.MAX_NAME_LENGTH) {
    return {
      isNameValid: false,
      message:
        type === userProperties.FIRST_NAME
          ? errorMessages.FIRST_NAME_MAX_LENGTH_ERROR
          : type === userProperties.MIDDLE_NAME
          ? errorMessages.MIDDLE_NAME_MAX_LENGTH_ERROR
          : type === userProperties.LAST_NAME
          ? errorMessages.LAST_NAME_MAX_LENGTH_ERROR
          : errorMessages.NICK_NAME_MAX_LENGTH_ERROR,
    };
  }

  if (!NAME_REGEX.test(name?.trim().toLowerCase())) {
    return {
      isNameValid: false,
      message:
        type === userProperties.FIRST_NAME
          ? errorMessages.INVALID_FIRST_NAME_ERROR
          : type === userProperties.MIDDLE_NAME
          ? errorMessages.INVALID_MIDDLE_NAME_ERROR
          : type === userProperties.LAST_NAME
          ? errorMessages.INVALID_LAST_NAME_ERROR
          : errorMessages.INVALID_NICK_NAME_ERROR,
    };
  }

  return {
    isNameValid: true,
    validatedName: name?.trim().toLowerCase(),
  };
};

export const emailValidator = (email) => {
  if (!email?.trim().toLowerCase()) {
    return {
      isEmailValid: false,
      message: errorMessages.EMAIL_REQUIRED_ERROR,
    };
  }

  if (!EMAIL_REGEX.test(email?.trim().toLowerCase())) {
    return {
      isEmailValid: false,
      message: errorMessages.INVALID_EMAIL_ERROR,
    };
  }

  return {
    isEmailValid: true,
    validatedEmail: email?.trim().toLowerCase(),
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

  if (password?.trim().length < propertyConstraints.MIN_PASSWORD_LENGTH) {
    errors.push(errorMessages.PASSWORD_MIN_LENGTH_ERROR);
  }

  if (password?.trim().length > propertyConstraints.MAX_PASSWORD_LENGTH) {
    errors.push(errorMessages.PASSWORD_MAX_LENGTH_ERROR);
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

export const regexPropertiesValidator = (property, regex, error) => {
  property = typeof property === "string" ? property.trim() : property;

  if (!regex.test(property)) {
    return {
      isPropertyValid: false,
      message: error,
    };
  }

  return {
    isPropertyValid: true,
    validatedProperty: property,
  };
};

export const numberPropertiesValidator = (
  property,
  minValue,
  maxValue,
  errors
) => {
  property = typeof property === "string" ? property.trim() : property;

  const isPropertyValid =
    (typeof property === "number" || typeof property === "string") &&
    !isNaN(property) &&
    property !== "";

  if (!isPropertyValid) {
    return {
      isPropertyValid: false,
      message: errors.INVALID_ERROR,
    };
  }

  if (!Number.isInteger(property)) {
    return {
      isPropertyValid: false,
      message: errors.DECIMAL_ERROR,
    };
  }

  if (Number(property) <= minValue) {
    return {
      isPropertyValid: false,
      message: errors.MIN_ERROR,
    };
  }

  if (Number(property) > maxValue) {
    return {
      isPropertyValid: false,
      message: errors.MAX_ERROR,
    };
  }

  return {
    isPropertyValid: true,
    validatedProperty: Number(property),
  };
};

export const stringPropertiesValidator = (
  property,
  minLength,
  maxLength,
  errors
) => {
  if (!typeof property === "string") {
    return {
      isPropertyValid: false,
      message: errors.INVALID_ERROR,
    };
  }

  if (property.trim().toLowerCase().length <= minLength) {
    return {
      isPropertyValid: false,
      message: errors.MIN_LENGTH_ERROR,
    };
  }

  if (property.trim().toLowerCase().length > maxLength) {
    return {
      isPropertyValid: false,
      message: errors.MAX_LENGTH_ERROR,
    };
  }

  return {
    isPropertyValid: true,
    validatedProperty: property.trim().toLowerCase(),
  };
};

export const listPropertiesValidator = (property, errors) => {
  if (!typeof property === "string" || !Array.isArray(property)) {
    return {
      isPropertyValid: false,
      message: errors.INVALID_ERROR,
    };
  }

  return {
    isPropertyValid: true,
    validatedProperty: Array.isArray(property)
      ? property.map((s) => s.trim().toLowerCase())
      : typeof property === "string"
      ? [property.trim().toLowerCase()]
      : [],
  };
};
