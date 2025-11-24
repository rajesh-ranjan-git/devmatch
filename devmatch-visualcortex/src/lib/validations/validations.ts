import {
  ALLOWED_SPECIAL_CHARACTERS_REGEX,
  EMAIL_REGEX,
  errorMessages,
  LOWER_CASE_REGEX,
  NAME_REGEX,
  NUMBER_REGEX,
  propertyConstraints,
  UPPER_CASE_REGEX,
  USER_NAME_REGEX,
  userProperties,
} from "@/config/constants";
import { AuthFormStateType } from "@/types/types";

export const userNameValidator = (user_name: string) => {
  const userNameErrors: string[] = [];
  const value = user_name?.trim().toLowerCase();

  if (!value) {
    userNameErrors.push(errorMessages.USER_NAME_REQUIRED_ERROR);
  }

  if (value.length < propertyConstraints.MIN_USER_NAME_LENGTH) {
    userNameErrors.push(errorMessages.USER_NAME_MIN_LENGTH_ERROR);
  }

  if (value.length > propertyConstraints.MAX_USER_NAME_LENGTH) {
    userNameErrors.push(errorMessages.USER_NAME_MAX_LENGTH_ERROR);
  }

  if (!USER_NAME_REGEX.test(value)) {
    userNameErrors.push(errorMessages.INVALID_USER_NAME_ERROR);
  }

  return {
    validatedUserName: value,
    userNameErrors,
  };
};

export const emailValidator = (email: string) => {
  const emailErrors: string[] = [];
  const value = email?.trim().toLowerCase();

  if (!value) {
    emailErrors.push(errorMessages.EMAIL_REQUIRED_ERROR);
  }

  if (!EMAIL_REGEX.test(value)) {
    emailErrors.push(errorMessages.INVALID_EMAIL_ERROR);
  }

  return {
    validatedEmail: value,
    emailErrors,
  };
};

export const passwordValidator = (password: string) => {
  const passwordErrors: string[] = [];
  const value = password?.trim();

  if (!value) {
    passwordErrors.push(errorMessages.PASSWORD_REQUIRED_ERROR);
  }

  if (value.length < propertyConstraints.MIN_PASSWORD_LENGTH) {
    passwordErrors.push(errorMessages.PASSWORD_MIN_LENGTH_ERROR);
  }

  if (value.length > propertyConstraints.MAX_PASSWORD_LENGTH) {
    passwordErrors.push(errorMessages.PASSWORD_MAX_LENGTH_ERROR);
  }

  if (!UPPER_CASE_REGEX.test(value)) {
    passwordErrors.push(errorMessages.PASSWORD_UPPERCASE_ERROR);
  }

  if (!LOWER_CASE_REGEX.test(value)) {
    passwordErrors.push(errorMessages.PASSWORD_LOWERCASE_ERROR);
  }

  if (!NUMBER_REGEX.test(value)) {
    passwordErrors.push(errorMessages.PASSWORD_NUMBER_ERROR);
  }

  if (!ALLOWED_SPECIAL_CHARACTERS_REGEX.test(value)) {
    passwordErrors.push(errorMessages.PASSWORD_SPECIAL_CHARACTERS_ERROR);
  }

  return {
    validatedPassword: value,
    passwordErrors,
  };
};

export const firstNameValidator = (firstName: string) => {
  const firstNameErrors: string[] = [];
  const value = firstName?.trim().toLowerCase();

  if (!value) {
    firstNameErrors.push(errorMessages.FIRST_NAME_REQUIRED_ERROR);
  }

  const { validatedName, nameErrors } = nameValidator(
    value,
    userProperties.FIRST_NAME
  );

  return {
    validatedFirstName: validatedName,
    firstNameErrors: [...firstNameErrors, ...nameErrors],
  };
};

export const nameValidator = (name: string, type: string) => {
  const nameErrors: string[] = [];

  if (name.length < propertyConstraints.MIN_NAME_LENGTH) {
    if (type === userProperties.FIRST_NAME) {
      nameErrors.push(errorMessages.FIRST_NAME_MIN_LENGTH_ERROR);
    } else if (type === userProperties.MIDDLE_NAME) {
      nameErrors.push(errorMessages.MIDDLE_NAME_MIN_LENGTH_ERROR);
    } else if (type === userProperties.LAST_NAME) {
      nameErrors.push(errorMessages.LAST_NAME_MIN_LENGTH_ERROR);
    } else {
      nameErrors.push(errorMessages.NICK_NAME_MIN_LENGTH_ERROR);
    }
  }

  if (name.length > propertyConstraints.MAX_NAME_LENGTH) {
    if (type === userProperties.FIRST_NAME) {
      nameErrors.push(errorMessages.FIRST_NAME_MAX_LENGTH_ERROR);
    } else if (type === userProperties.MIDDLE_NAME) {
      nameErrors.push(errorMessages.MIDDLE_NAME_MAX_LENGTH_ERROR);
    } else if (type === userProperties.LAST_NAME) {
      nameErrors.push(errorMessages.LAST_NAME_MAX_LENGTH_ERROR);
    } else {
      nameErrors.push(errorMessages.NICK_NAME_MAX_LENGTH_ERROR);
    }
  }

  if (!NAME_REGEX.test(name)) {
    if (type === userProperties.FIRST_NAME) {
      nameErrors.push(errorMessages.INVALID_FIRST_NAME_ERROR);
    } else if (type === userProperties.MIDDLE_NAME) {
      nameErrors.push(errorMessages.INVALID_MIDDLE_NAME_ERROR);
    } else if (type === userProperties.LAST_NAME) {
      nameErrors.push(errorMessages.INVALID_LAST_NAME_ERROR);
    } else {
      nameErrors.push(errorMessages.INVALID_NICK_NAME_ERROR);
    }
  }

  return {
    validatedName: name,
    nameErrors,
  };
};
