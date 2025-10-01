import {
  ALLOWED_SPECIAL_CHARACTERS_REGEX,
  EMAIL_REGEX,
  LOWER_CASE_REGEX,
  NUMBER_REGEX,
  UPPER_CASE_REGEX,
} from "../config/config.js";

export const validateEmail = (email) => {
  if (!EMAIL_REGEX.test(email)) {
    return {
      isEmailValid: false,
      emailError: "Invalid Email format!",
    };
  }

  return {
    isEmailValid: true,
    emailError: null,
  };
};

export const validatePassword = (password) => {
  const errors = [];

  if (password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  if (!UPPER_CASE_REGEX.test(password)) {
    errors.push("Password must contain at least one uppercase letter (A-Z)");
  }

  if (!LOWER_CASE_REGEX.test(password)) {
    errors.push("Password must contain at least one lowercase letter (a-z)");
  }

  if (!NUMBER_REGEX.test(password)) {
    errors.push("Password must contain at least one digit (0-9)");
  }

  if (!ALLOWED_SPECIAL_CHARACTERS_REGEX.test(password)) {
    errors.push(
      "Password must contain at least one special character (@, #, $, %, &)"
    );
  }

  if (errors.length > 0) {
    return {
      isPasswordValid: false,
      passwordError: errors,
    };
  }

  return {
    isPasswordValid: true,
    passwordError: [],
  };
};
