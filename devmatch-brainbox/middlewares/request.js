import { errorMessages } from "../config/errorsConfig.js";
import { ValidationError } from "../errors/CustomError.js";
import {
  requestValidator,
  validateEmail,
  validatePassword,
} from "../validations/validation.js";

export const registerRequestMiddleware = (req, res, next) => {
  try {
    const { firstName, email, password, confirmPassword } = requestValidator(
      req,
      res
    );

    if (!firstName) {
      throw new ValidationError(errorMessages.FIRST_NAME_REQUIRED_ERROR, {
        firstName,
      });
    }

    if (!email) {
      throw new ValidationError(errorMessages.EMAIL_REQUIRED_ERROR, { email });
    }

    const { isEmailValid, message: emailErrorMessage } = validateEmail(email);
    if (!isEmailValid) {
      throw new ValidationError(emailErrorMessage, { email });
    }

    if (!password) {
      throw new ValidationError(errorMessages.PASSWORD_REQUIRED_ERROR, {
        password,
      });
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
      throw new ValidationError(errorMessages.CONFIRM_PASSWORD_REQUIRED_ERROR, {
        confirmPassword,
      });
    }

    const {
      isPasswordValid: isConfirmPasswordValid,
      message: confirmPasswordErrorMessage,
      errors: confirmPasswordErrors,
    } = validatePassword(
      confirmPassword,
      errorMessages.CONFIRM_PASSWORD_COMBINATION_ERROR
    );

    if (!isConfirmPasswordValid) {
      throw new ValidationError(confirmPasswordErrorMessage, {
        errors: confirmPasswordErrors,
        confirmPassword,
      });
    }

    if (password !== confirmPassword) {
      throw new ValidationError(
        errorMessages.PASSWORD_CONFIRM_PASSWORD_MISMATCH_ERROR,
        {
          password,
          confirmPassword,
        }
      );
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
      throw new ValidationError(errorMessages.EMAIL_REQUIRED_ERROR, { email });
    }

    const { isEmailValid, message: emailErrorMessage } = validateEmail(email);
    if (!isEmailValid) {
      throw new ValidationError(emailErrorMessage, {
        email,
        password,
      });
    }

    if (!password) {
      throw new ValidationError(errorMessages.PASSWORD_REQUIRED_ERROR, {
        password,
      });
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
      throw new ValidationError(errorMessages.EMAIL_REQUIRED_ERROR, { email });
    }

    const { isEmailValid, message: emailErrorMessage } = validateEmail(email);
    if (!isEmailValid) {
      throw new ValidationError(emailErrorMessage, {
        email,
        password,
      });
    }

    if (!password) {
      throw new ValidationError(errorMessages.PASSWORD_REQUIRED_ERROR, {
        password,
      });
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
      throw new ValidationError(errorMessages.CONFIRM_PASSWORD_REQUIRED_ERROR, {
        confirmPassword,
      });
    }

    const {
      isPasswordValid: isConfirmPasswordValid,
      message: confirmPasswordErrorMessage,
      errors: confirmPasswordErrors,
    } = validatePassword(
      confirmPassword,
      errorMessages.CONFIRM_PASSWORD_COMBINATION_ERROR
    );

    if (!isConfirmPasswordValid) {
      throw new ValidationError(confirmPasswordErrorMessage, {
        errors: confirmPasswordErrors,
        confirmPassword,
      });
    }

    if (password !== confirmPassword) {
      throw new ValidationError(
        errorMessages.PASSWORD_CONFIRM_PASSWORD_MISMATCH_ERROR,
        {
          password,
          confirmPassword,
        }
      );
    }

    req.data = { email, password };

    next();
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};
