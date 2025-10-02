import { status } from "../config/config.js";
import { errorMessages } from "../config/errorsConfig.js";
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
      throw new ValidationError(firstNameErrorMessage, { firstName }, req?.url);
    }

    const {
      isEmailValid,
      message: emailErrorMessage,
      validatedEmail,
    } = emailValidator(email);

    if (!isEmailValid) {
      throw new ValidationError(emailErrorMessage, { email }, req?.url);
    }

    console.log("debug password from requestValidator : ", password);

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
    return res.status(status.failure.statusCode).json({
      status: status.failure.message,
      error: {
        apiURL: error?.apiURL,
        type: error?.type,
        message: error?.message,
        data: error?.data?.errors,
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
    return res.status(status.failure.statusCode).json({
      status: status.failure.message,
      error: {
        apiURL: error?.apiURL,
        type: error?.type,
        message: error?.message,
        data: error?.data?.errors,
      },
    });
  }
};

export const forgotPasswordRequestMiddleware = (req, res, next) => {
  try {
    const { email, password, confirmPassword } = requestValidator(req, res);

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

    const {
      isPasswordValid: isConfirmPasswordValid,
      message: confirmPasswordErrorMessage,
      errors: confirmPasswordErrors,
    } = passwordValidator(
      confirmPassword,
      errorMessages.CONFIRM_PASSWORD_REQUIRED_ERROR,
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
    return res.status(status.failure.statusCode).json({
      status: status.failure.message,
      error: {
        apiURL: error?.apiURL,
        type: error?.type,
        message: error?.message,
        data: error?.data?.errors,
      },
    });
  }
};
