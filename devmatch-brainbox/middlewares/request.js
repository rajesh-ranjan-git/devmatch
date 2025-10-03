import { status } from "../config/config.js";
import { errorMessages } from "../config/config.js";
import { ValidationError } from "../errors/CustomError.js";
import {
  requestValidator,
  emailValidator,
  passwordValidator,
  firstNameValidator,
} from "../validations/validation.js";

export const registerRequestMiddleware = (req, res, next) => {
  try {
    const { firstName, email, password, confirmPassword } = requestValidator(
      req,
      res
    );

    const {
      isFirstNameValid,
      message: firstNameErrorMessage,
      validatedFirstName,
    } = firstNameValidator(firstName);

    if (!isFirstNameValid) {
      throw new ValidationError(
        status.badRequest,
        firstNameErrorMessage,
        { firstName },
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
        status.badRequest,
        emailErrorMessage,
        { email },
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
        status.badRequest,
        passwordErrorMessage,
        {
          errors: passwordErrors,
          password,
        },
        req?.url
      );
    }

    const {
      isPasswordValid: isConfirmPasswordValid,
      message: confirmPasswordErrorMessage,
      errors: confirmPasswordErrors,
      validatedPassword: validatedConfirmPassword,
    } = passwordValidator(
      confirmPassword,
      errorMessages.CONFIRM_PASSWORD_REQUIRED_ERROR,
      errorMessages.CONFIRM_PASSWORD_COMBINATION_ERROR
    );

    if (!isConfirmPasswordValid) {
      throw new ValidationError(
        status.badRequest,
        confirmPasswordErrorMessage,
        {
          errors: confirmPasswordErrors,
          password,
        },
        req?.url
      );
    }

    if (validatedPassword !== validatedConfirmPassword) {
      throw new ValidationError(
        status.badRequest,
        errorMessages.PASSWORD_CONFIRM_PASSWORD_MISMATCH_ERROR,
        {
          password,
          confirmPassword,
        },
        req?.url
      );
    }

    req.data = {
      firstName: validatedFirstName,
      email: validatedEmail,
      password: validatedPassword,
    };

    next();
  } catch (error) {
    return res
      .status(
        error?.status?.statusCode || status.internalServerError.statusCode
      )
      .json({
        status: error?.status?.message || status.internalServerError.message,
        statusCode:
          error?.status?.statusCode || status.internalServerError.statusCode,
        apiUrl: error?.apiUrl,
        error: {
          type: error?.type,
          message: error?.message,
          data: error?.data,
        },
      });
  }
};

export const loginRequestMiddleware = (req, res, next) => {
  try {
    const { email, password } = requestValidator(req, res);

    const {
      isEmailValid,
      message: emailErrorMessage,
      validatedEmail,
    } = emailValidator(email);

    if (!isEmailValid) {
      throw new ValidationError(
        status.badRequest,
        emailErrorMessage,
        {
          email,
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
        status.badRequest,
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
    return res
      .status(
        error?.status?.statusCode || status.internalServerError.statusCode
      )
      .json({
        status: error?.status?.message || status.internalServerError.message,
        statusCode:
          error?.status?.statusCode || status.internalServerError.statusCode,
        apiUrl: error?.apiUrl,
        error: {
          type: error?.type,
          message: error?.message,
          data: error?.data,
        },
      });
  }
};

export const requestMiddleware = (req, res, next) => {
  requestValidator(req, res);

  next();
};
