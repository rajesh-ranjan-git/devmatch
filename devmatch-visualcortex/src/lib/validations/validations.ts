import {
  ALLOWED_SPECIAL_CHARACTERS_REGEX,
  EMAIL_REGEX,
  ERROR_MESSAGES,
  LOWER_CASE_REGEX,
  NAME_REGEX,
  NUMBER_REGEX,
  USER_PROPERTY_CONSTRAINTS,
  UPPER_CASE_REGEX,
  USER_NAME_REGEX,
  USER_PROPERTIES,
} from "@/config/constants";

export const userNameValidator = (user_name: string) => {
  const userNameErrors: string[] = [];
  const value = user_name?.trim().toLowerCase();

  if (!value) {
    userNameErrors.push(ERROR_MESSAGES.userNameRequiredError);
  }

  if (value.length < USER_PROPERTY_CONSTRAINTS.minUserNameLength) {
    userNameErrors.push(ERROR_MESSAGES.userNameMinLengthError);
  }

  if (value.length > USER_PROPERTY_CONSTRAINTS.maxUserNameLength) {
    userNameErrors.push(ERROR_MESSAGES.userNameMaxLengthError);
  }

  if (!USER_NAME_REGEX.test(value)) {
    userNameErrors.push(ERROR_MESSAGES.invalidUserNameError);
  }

  if (userNameErrors && userNameErrors?.length > 0) {
    return { userNameErrors };
  }

  return { validatedUserName: value };
};

export const emailValidator = (email: string) => {
  const emailErrors: string[] = [];
  const value = email?.trim().toLowerCase();

  if (!value) {
    emailErrors.push(ERROR_MESSAGES.emailRequiredError);
  }

  if (!EMAIL_REGEX.test(value)) {
    emailErrors.push(ERROR_MESSAGES.invalidEmailError);
  }

  if (emailErrors && emailErrors?.length > 0) {
    return { emailErrors };
  }

  return { validatedEmail: value };
};

export const passwordValidator = (password: string) => {
  const passwordErrors: string[] = [];
  const value = password?.trim();

  if (!value) {
    passwordErrors.push(ERROR_MESSAGES.passwordRequiredError);
  }

  if (value.length < USER_PROPERTY_CONSTRAINTS.minPasswordLength) {
    passwordErrors.push(ERROR_MESSAGES.passwordMinLengthError);
  }

  if (value.length > USER_PROPERTY_CONSTRAINTS.maxPasswordLength) {
    passwordErrors.push(ERROR_MESSAGES.passwordMaxLengthError);
  }

  if (!UPPER_CASE_REGEX.test(value)) {
    passwordErrors.push(ERROR_MESSAGES.passwordUppercaseError);
  }

  if (!LOWER_CASE_REGEX.test(value)) {
    passwordErrors.push(ERROR_MESSAGES.passwordLowercaseError);
  }

  if (!NUMBER_REGEX.test(value)) {
    passwordErrors.push(ERROR_MESSAGES.passwordNumberError);
  }

  if (!ALLOWED_SPECIAL_CHARACTERS_REGEX.test(value)) {
    passwordErrors.push(ERROR_MESSAGES.passwordSpecialCharactersError);
  }

  if (passwordErrors && passwordErrors?.length > 0) {
    return { passwordErrors };
  }

  return { validatedPassword: value };
};

export const firstNameValidator = (firstName: string) => {
  const firstNameErrors: string[] = [];
  const value = firstName?.trim().toLowerCase();

  if (!value) {
    firstNameErrors.push(ERROR_MESSAGES.firstNameRequiredError);
  }

  const { validatedName, nameErrors } = nameValidator(
    value,
    USER_PROPERTIES.firstName
  );

  if (nameErrors && nameErrors?.length > 0) {
    return { firstNameErrors: [...firstNameErrors, ...nameErrors] };
  }

  return { validatedFirstName: validatedName };
};

export const nameValidator = (name: string, type: string) => {
  const nameErrors: string[] = [];

  if (name.length < USER_PROPERTY_CONSTRAINTS.minNameLength) {
    if (type === USER_PROPERTIES.firstName) {
      nameErrors.push(ERROR_MESSAGES.firstNameMinLengthError);
    } else if (type === USER_PROPERTIES.middleName) {
      nameErrors.push(ERROR_MESSAGES.middleNameMinLengthError);
    } else if (type === USER_PROPERTIES.lastName) {
      nameErrors.push(ERROR_MESSAGES.lastNameMinLengthError);
    } else {
      nameErrors.push(ERROR_MESSAGES.nickNameMinLengthError);
    }
  }

  if (name.length > USER_PROPERTY_CONSTRAINTS.maxNameLength) {
    if (type === USER_PROPERTIES.firstName) {
      nameErrors.push(ERROR_MESSAGES.firstNameMaxLengthError);
    } else if (type === USER_PROPERTIES.middleName) {
      nameErrors.push(ERROR_MESSAGES.middleNameMaxLengthError);
    } else if (type === USER_PROPERTIES.lastName) {
      nameErrors.push(ERROR_MESSAGES.lastNameMaxLengthError);
    } else {
      nameErrors.push(ERROR_MESSAGES.nickNameMaxLengthError);
    }
  }

  if (!NAME_REGEX.test(name)) {
    if (type === USER_PROPERTIES.firstName) {
      nameErrors.push(ERROR_MESSAGES.invalidFirstNameError);
    } else if (type === USER_PROPERTIES.middleName) {
      nameErrors.push(ERROR_MESSAGES.invalidMiddleNameError);
    } else if (type === USER_PROPERTIES.lastName) {
      nameErrors.push(ERROR_MESSAGES.invalidLastNameError);
    } else {
      nameErrors.push(ERROR_MESSAGES.invalidNickNameError);
    }
  }

  if (nameErrors && nameErrors?.length > 0) {
    return { nameErrors };
  }

  return { validatedName: name };
};
