import { ValidationError } from "../errors/CustomError.js";
import { validateEmail, validatePassword } from "../validations/validation.js";

const requestValidator = (req, res) => {
  if (!req || !req?.body || !Object.keys(req?.body).length) {
    throw new ValidationError("Invalid Request!", { requestBody: req?.body });
  }

  return req?.body;
};

export const registerRequestMiddleware = (req, res, next) => {
  try {
    const { firstName, email, password } = requestValidator(req, res);

    if (!firstName) {
      throw new ValidationError("First Name is required!", {
        firstName,
      });
    }

    if (!email) {
      throw new ValidationError("Email is required!", { email });
    }

    if (!password) {
      throw new ValidationError("Password is required!", { password });
    }

    const { isEmailValid, message: emailErrorMessage } = validateEmail(email);

    if (!isEmailValid) {
      throw new ValidationError(emailErrorMessage, { email });
    }

    const {
      isPasswordValid,
      message: passwordErrorMessage,
      errors: passwordErrors,
    } = validatePassword(password);

    if (!isPasswordValid) {
      throw new ValidationError(passwordErrorMessage, {
        errors: passwordErrors,
        password,
      });
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
      throw new ValidationError("Email is required!", { email });
    }

    if (!password) {
      throw new ValidationError("Password is required!", { password });
    }

    if (
      !validateEmail(email).isEmailValid ||
      !validatePassword(password).isPasswordValid
    ) {
      throw new ValidationError("Invalid email / password combination!", {
        email,
        password,
      });
    }

    req.data = { email, password };

    next();
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};
