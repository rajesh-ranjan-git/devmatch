import { errorMessages } from "../config/errorsConfig.js";
import { ValidationError } from "../errors/CustomError.js";
import {
  requestValidator,
  emailValidator,
  passwordValidator,
} from "../validations/validation.js";

export const registerRequestMiddleware = (req, res, next) => {
  try {
    const { firstName, email, password, confirmPassword } = requestValidator(
      req,
      res
    );

    if (!firstName) {
      throw new ValidationError(
        errorMessages.FIRST_NAME_REQUIRED_ERROR,
        {
          firstName,
        },
        req?.url
      );
    }

    if (!email) {
      throw new ValidationError(
        errorMessages.EMAIL_REQUIRED_ERROR,
        { email },
        req?.url
      );
    }

    const {
      isEmailValid,
      message: emailErrorMessage,
      validatedEmail,
    } = emailValidator(email);
    if (!isEmailValid) {
      throw new ValidationError(emailErrorMessage, { email }, req?.url);
    }

    if (!password) {
      throw new ValidationError(
        errorMessages.PASSWORD_REQUIRED_ERROR,
        {
          password,
        },
        req?.url
      );
    }

    const {
      isPasswordValid,
      message: passwordErrorMessage,
      errors: passwordErrors,
      validatedPassword,
    } = passwordValidator(password);

    if (!isPasswordValid) {
      throw new ValidationError(
        passwordErrorMessage,
        {
          errors: passwordErrors,
          password,
        },
        req?.url
      );
    }

    if (!confirmPassword) {
      throw new ValidationError(
        errorMessages.CONFIRM_PASSWORD_REQUIRED_ERROR,
        {
          confirmPassword,
        },
        req?.url
      );
    }

    const {
      isPasswordValid: isConfirmPasswordValid,
      message: confirmPasswordErrorMessage,
      errors: confirmPasswordErrors,
    } = passwordValidator(
      confirmPassword,
      errorMessages.CONFIRM_PASSWORD_COMBINATION_ERROR
    );

    if (!isConfirmPasswordValid) {
      throw new ValidationError(
        confirmPasswordErrorMessage,
        {
          errors: confirmPasswordErrors,
          confirmPassword,
        },
        req?.url
      );
    }

    if (password !== confirmPassword) {
      throw new ValidationError(
        errorMessages.PASSWORD_CONFIRM_PASSWORD_MISMATCH_ERROR,
        {
          password,
          confirmPassword,
        },
        req?.url
      );
    }

    req.data = { email: validatedEmail, password: validatedPassword };

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
      throw new ValidationError(
        errorMessages.EMAIL_REQUIRED_ERROR,
        { email },
        req?.url
      );
    }

    const {
      isEmailValid,
      message: emailErrorMessage,
      validatedEmail,
    } = emailValidator(email);
    if (!isEmailValid) {
      throw new ValidationError(
        emailErrorMessage,
        {
          email,
          password,
        },
        req?.url
      );
    }

    if (!password) {
      throw new ValidationError(
        errorMessages.PASSWORD_REQUIRED_ERROR,
        {
          password,
        },
        req?.url
      );
    }

    const {
      isPasswordValid,
      message: passwordErrorMessage,
      errors: passwordErrors,
      validatedPassword,
    } = passwordValidator(password);

    if (!isPasswordValid) {
      throw new ValidationError(
        passwordErrorMessage,
        {
          errors: passwordErrors,
          password,
        },
        req?.url
      );
    }

    req.data = { email: validatedEmail, password: validatedPassword };

    next();
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

export const forgotPasswordRequestMiddleware = (req, res, next) => {
  try {
    const { email, password, confirmPassword } = requestValidator(req, res);

    if (!email) {
      throw new ValidationError(
        errorMessages.EMAIL_REQUIRED_ERROR,
        { email },
        req?.url
      );
    }

    const {
      isEmailValid,
      message: emailErrorMessage,
      validatedEmail,
    } = emailValidator(email);
    if (!isEmailValid) {
      throw new ValidationError(
        emailErrorMessage,
        {
          email,
          password,
        },
        req?.url
      );
    }

    if (!password) {
      throw new ValidationError(
        errorMessages.PASSWORD_REQUIRED_ERROR,
        {
          password,
        },
        req?.url
      );
    }

    const {
      isPasswordValid,
      message: passwordErrorMessage,
      errors: passwordErrors,
      validatedPassword,
    } = passwordValidator(password);

    if (!isPasswordValid) {
      throw new ValidationError(
        passwordErrorMessage,
        {
          errors: passwordErrors,
          password,
        },
        req?.url
      );
    }

    if (!confirmPassword) {
      throw new ValidationError(
        errorMessages.CONFIRM_PASSWORD_REQUIRED_ERROR,
        {
          confirmPassword,
        },
        req?.url
      );
    }

    const {
      isPasswordValid: isConfirmPasswordValid,
      message: confirmPasswordErrorMessage,
      errors: confirmPasswordErrors,
    } = passwordValidator(
      confirmPassword,
      errorMessages.CONFIRM_PASSWORD_COMBINATION_ERROR
    );

    if (!isConfirmPasswordValid) {
      throw new ValidationError(
        confirmPasswordErrorMessage,
        {
          errors: confirmPasswordErrors,
          confirmPassword,
        },
        req?.url
      );
    }

    if (password !== confirmPassword) {
      throw new ValidationError(
        errorMessages.PASSWORD_CONFIRM_PASSWORD_MISMATCH_ERROR,
        {
          password,
          confirmPassword,
        },
        req?.url
      );
    }

    req.data = { email: validatedEmail, password: validatedPassword };

    next();
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};
