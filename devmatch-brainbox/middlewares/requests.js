import {
  ALLOWED_SPECIAL_CHARACTERS_REGEX,
  EMAIL_REGEX,
  LOWER_CASE_REGEX,
  NUMBER_REGEX,
  UPPER_CASE_REGEX,
} from "../config/config.js";

const requestValidator = (req, res) => {
  if (!req || !req?.body || !Object.keys(req?.body).length) {
    throw new Error("Invalid Request!");
  }

  return req?.body;
};

const validateEmail = (email) => {
  if (!EMAIL_REGEX.test(email)) {
    return {
      isEmailValid: false,
      emailError: "Invalid Email!",
    };
  }

  return {
    isEmailValid: true,
    emailError: null,
  };
};

const validatePassword = (password) => {
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

export const registerRequestValidator = (req, res, next) => {
  try {
    const { firstName, email, password } = requestValidator(req, res);

    if (!firstName) {
      throw new Error("First Name is required!");
    }

    if (!email) {
      throw new Error("Email is required!");
    }

    if (!password) {
      throw new Error("Password is required!");
    }

    const { isEmailValid, emailError } = validateEmail(email);

    if (!isEmailValid) {
      throw new Error(emailError);
    }

    const { isPasswordValid, passwordError } = validatePassword(password);

    if (!isPasswordValid) {
      const error = new Error("Invalid Password combination!");
      error.errors = passwordError;
      throw error;
    }

    req.data = { email, password };

    next();
  } catch (error) {
    return res
      .status(400)
      .json({ status: "fail", error: error.message, errors: error.errors });
  }
};

export const loginRequestValidator = (req, res, next) => {
  try {
    const { email, password } = requestValidator(req, res);

    if (!email) {
      throw new Error("Email is required!");
    }

    if (!password) {
      throw new Error("Password is required!");
    }

    if (
      !validator.isEmail(email) ||
      !validatePassword(password).isPasswordValid
    ) {
      throw new Error("Invalid email / password combination!");
    }

    req.data = { email, password };

    next();
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};
