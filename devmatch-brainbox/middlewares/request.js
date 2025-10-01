import { validateEmail, validatePassword } from "../validations/validation.js";

const requestValidator = (req, res) => {
  if (!req || !req?.body || !Object.keys(req?.body).length) {
    throw new Error("Invalid Request!");
  }

  return req?.body;
};

export const registerRequestMiddleware = (req, res, next) => {
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

export const loginRequestMiddleware = (req, res, next) => {
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
