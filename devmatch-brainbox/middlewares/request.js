import {
  allowedUpdateProfileProperties,
  status,
  errorMessages,
} from "../config/config.js";
import { ForbiddenError, ValidationError } from "../errors/CustomError.js";
import {
  requestValidator,
  emailValidator,
  passwordValidator,
  firstNameValidator,
  userNameValidator,
} from "../validations/validation.js";

export const requestMiddleware = (req, res, next) => {
  requestValidator(req, res);

  next();
};

export const registerRequestMiddleware = (req, res, next) => {
  try {
    const { userName, email, password, confirmPassword } = requestValidator(
      req,
      res
    );

    console.log("debug from registerRequestMiddleware req?.body : ", req?.body);
    console.log("debug from registerRequestMiddleware userName : ", userName);

    const {
      isUserNameValid,
      message: userNameErrorMessage,
      validatedUserName,
    } = userNameValidator(userName);

    if (!isUserNameValid) {
      throw new ValidationError(
        status.badRequest,
        userNameErrorMessage,
        { userName },
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
      userName: validatedUserName,
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
        apiUrl: error?.apiUrl || req?.url,
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
        apiUrl: error?.apiUrl || req?.url,
        error: {
          type: error?.type,
          message: error?.message,
          data: error?.data,
        },
      });
  }
};

export const forgotPasswordRequestMiddleware = (req, res, next) => {
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
        apiUrl: error?.apiUrl || req?.url,
        error: {
          type: error?.type,
          message: error?.message,
          data: error?.data,
        },
      });
  }
};

export const updatePasswordRequestMiddleware = (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req?.body;

    const {
      isPasswordValid: isOldPasswordValid,
      message: oldPasswordErrorMessage,
      errors: oldPasswordErrors,
      validatedPassword: validatedOldPassword,
    } = passwordValidator(
      oldPassword,
      errorMessages.OLD_PASSWORD_REQUIRED_ERROR,
      errorMessages.OLD_PASSWORD_COMBINATION_ERROR
    );

    if (!isOldPasswordValid) {
      throw new ValidationError(
        status.badRequest,
        oldPasswordErrorMessage,
        {
          errors: oldPasswordErrors,
          password: oldPassword,
        },
        req?.url
      );
    }

    const {
      isPasswordValid: isNewPasswordValid,
      message: newPasswordErrorMessage,
      errors: newPasswordErrors,
      validatedPassword: validatedNewPassword,
    } = passwordValidator(
      newPassword,
      errorMessages.NEW_PASSWORD_REQUIRED_ERROR,
      errorMessages.NEW_PASSWORD_COMBINATION_ERROR
    );

    if (!isNewPasswordValid) {
      throw new ValidationError(
        status.badRequest,
        newPasswordErrorMessage,
        {
          errors: newPasswordErrors,
          password: newPassword,
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
          password: confirmPassword,
        },
        req?.url
      );
    }

    if (validatedNewPassword !== validatedConfirmPassword) {
      throw new ValidationError(
        status.badRequest,
        errorMessages.NEW_PASSWORD_CONFIRM_PASSWORD_MISMATCH_ERROR,
        {
          password: newPassword,
          confirmPassword,
        },
        req?.url
      );
    }

    req.data = {
      ...req?.data,
      oldPassword: validatedOldPassword,
      newPassword: validatedNewPassword,
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
        apiUrl: error?.apiUrl || req?.url,
        error: {
          type: error?.type,
          message: error?.message,
          data: error?.data,
        },
      });
  }
};

export const updateProfileRequestMiddleware = (req, res, next) => {
  try {
    const { id, ...incomingProperties } = req?.data;

    let propertiesToUpdate = {};

    if (incomingProperties && Object.keys(incomingProperties).length > 0) {
      const propertyKeys = Object.keys(incomingProperties).filter((key) =>
        Object.values(allowedUpdateProfileProperties).includes(key)
      );

      if (!propertyKeys || (propertyKeys && !propertyKeys.length)) {
        throw ForbiddenError(
          status.forbidden,
          errorMessages.FORBIDDEN_PROPERTIES_UPDATE_ERROR,
          {
            properties: Object.keys(incomingProperties),
          },
          req?.url
        );
      }

      propertyKeys.forEach(
        (key) => (propertiesToUpdate[key] = incomingProperties[key])
      );
    }

    req.data = {
      id: req?.data?.id,
      ...propertiesToUpdate,
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
        apiUrl: error?.apiUrl || req?.url,
        error: {
          type: error?.type,
          message: error?.message,
          data: error?.data,
        },
      });
  }
};
