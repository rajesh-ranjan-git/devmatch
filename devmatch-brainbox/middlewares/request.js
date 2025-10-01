import { ValidationError } from "../errors/CustomError.js";
import {
  requestValidator,
  validateEmail,
  validatePassword,
} from "../validations/validation.js";

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

    const { isEmailValid, message: emailErrorMessage } = validateEmail(email);
    if (!isEmailValid) {
      throw new ValidationError(emailErrorMessage, { email });
    }

    if (!password) {
      throw new ValidationError("Password is required!", { password });
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

    const { isEmailValid, message: emailErrorMessage } = validateEmail(email);
    if (!isEmailValid) {
      throw new ValidationError(emailErrorMessage, {
        email,
        password,
      });
    }

    if (!password) {
      throw new ValidationError("Password is required!", { password });
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
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

export const forgotPasswordRequestMiddleware = (req, res, next) => {
  try {
    const { email, password, confirmPassword } = requestValidator(req, res);

    if (!email) {
      throw new ValidationError("Email is required!", { email });
    }

    const { isEmailValid, message: emailErrorMessage } = validateEmail(email);
    if (!isEmailValid) {
      throw new ValidationError(emailErrorMessage, {
        email,
        password,
      });
    }

    if (!password) {
      throw new ValidationError("Password is required!", { password });
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

    if (!confirmPassword) {
      throw new ValidationError("Confirm Password is required!", {
        confirmPassword,
      });
    }

    const {
      isPasswordValid: isConfirmPasswordValid,
      confirmPasswordErrorMessage = "Invalid Confirm Password combination!",
      errors: confirmPasswordErrors,
    } = validatePassword(confirmPassword);

    if (!isConfirmPasswordValid) {
      throw new ValidationError(confirmPasswordErrorMessage, {
        errors: confirmPasswordErrors,
        confirmPassword,
      });
    }

    if (password !== confirmPassword) {
      throw new ValidationError("Password and Confirm Password must be same!", {
        password,
        confirmPassword,
      });
    }

    req.data = { email, password, confirmPassword };

    next();
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};
