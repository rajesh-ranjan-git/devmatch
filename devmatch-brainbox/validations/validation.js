import {
  ALLOWED_SPECIAL_CHARACTERS_REGEX,
  USER_NAME_REGEX,
  EMAIL_REGEX,
  NAME_REGEX,
  LOWER_CASE_REGEX,
  NUMBER_REGEX,
  status,
  UPPER_CASE_REGEX,
  userProperties,
  propertyConstraints,
  addressProperties,
  PIN_CODE_REGEX,
  COUNTRY_CODE_REGEX,
  connectionStatusProperties,
  notificationStatusProperties,
  notificationTypes,
} from "../config/config.js";
import { errorMessages } from "../config/config.js";
import { ValidationError } from "../errors/CustomError.js";
import { isPlainObject, sanitizeList } from "../utils/utils.js";

export const requestValidator = (req, res) => {
  if (!req) {
    throw new ValidationError(
      status.badRequest,
      errorMessages.INVALID_REQUEST_ERROR,
      {
        req: req,
      },
    );
  }

  if (
    req?.method === "GET" ||
    (req?.params && Object.keys(req.params).length > 0)
  ) {
    return;
  } else {
    const body = requestBodyValidator(req, res);

    return body;
  }
};

export const requestBodyValidator = (req, res) => {
  if (!req?.body || !Object.keys(req?.body).length) {
    throw new ValidationError(
      status.badRequest,
      errorMessages.INVALID_REQUEST_ERROR,
      {
        requestBody: req?.body,
      },
      req?.url,
    );
  }

  return req?.body;
};

export const userNameValidator = (userName) => {
  if (!userName?.trim().toLowerCase()) {
    return {
      isUserNameValid: false,
      message: errorMessages.USER_NAME_REQUIRED_ERROR,
    };
  }

  if (
    userName?.trim().toLowerCase().length <
    propertyConstraints.MIN_USER_NAME_LENGTH
  ) {
    return {
      isUserNameValid: false,
      message: errorMessages.USER_NAME_MIN_LENGTH_ERROR,
    };
  }

  if (
    userName?.trim().toLowerCase().length >
    propertyConstraints.MAX_USER_NAME_LENGTH
  ) {
    return {
      isUserNameValid: false,
      message: errorMessages.USER_NAME_MAX_LENGTH_ERROR,
    };
  }

  if (!USER_NAME_REGEX.test(userName?.trim().toLowerCase())) {
    return {
      isUserNameValid: false,
      message: errorMessages.INVALID_USER_NAME_ERROR,
    };
  }

  return {
    isUserNameValid: true,
    validatedUserName: userName?.trim().toLowerCase(),
  };
};

export const firstNameValidator = (firstName) => {
  if (!firstName?.trim().toLowerCase()) {
    return {
      isFirstNameValid: false,
      message: errorMessages.FIRST_NAME_REQUIRED_ERROR,
    };
  }

  nameValidator(firstName, userProperties.FIRST_NAME);

  return {
    isFirstNameValid: true,
    validatedFirstName: firstName?.trim().toLowerCase(),
  };
};

export const nameValidator = (name, type) => {
  if (!name) {
    return {
      isNameValid: true,
      validatedName: null,
    };
  }

  const trimmedName = name?.trim().toLowerCase();

  if (trimmedName.length < propertyConstraints.MIN_NAME_LENGTH) {
    return {
      isNameValid: false,
      message:
        type === userProperties.FIRST_NAME
          ? errorMessages.FIRST_NAME_MIN_LENGTH_ERROR
          : type === userProperties.MIDDLE_NAME
            ? errorMessages.MIDDLE_NAME_MIN_LENGTH_ERROR
            : type === userProperties.LAST_NAME
              ? errorMessages.LAST_NAME_MIN_LENGTH_ERROR
              : errorMessages.NICK_NAME_MIN_LENGTH_ERROR,
    };
  }

  if (trimmedName.length > propertyConstraints.MAX_NAME_LENGTH) {
    return {
      isNameValid: false,
      message:
        type === userProperties.FIRST_NAME
          ? errorMessages.FIRST_NAME_MAX_LENGTH_ERROR
          : type === userProperties.MIDDLE_NAME
            ? errorMessages.MIDDLE_NAME_MAX_LENGTH_ERROR
            : type === userProperties.LAST_NAME
              ? errorMessages.LAST_NAME_MAX_LENGTH_ERROR
              : errorMessages.NICK_NAME_MAX_LENGTH_ERROR,
    };
  }

  if (!NAME_REGEX.test(trimmedName)) {
    return {
      isNameValid: false,
      message:
        type === userProperties.FIRST_NAME
          ? errorMessages.INVALID_FIRST_NAME_ERROR
          : type === userProperties.MIDDLE_NAME
            ? errorMessages.INVALID_MIDDLE_NAME_ERROR
            : type === userProperties.LAST_NAME
              ? errorMessages.INVALID_LAST_NAME_ERROR
              : errorMessages.INVALID_NICK_NAME_ERROR,
    };
  }

  return {
    isNameValid: true,
    validatedName: trimmedName,
  };
};

export const emailValidator = (email) => {
  if (!email?.trim().toLowerCase()) {
    return {
      isEmailValid: false,
      message: errorMessages.EMAIL_REQUIRED_ERROR,
    };
  }

  if (!EMAIL_REGEX.test(email?.trim().toLowerCase())) {
    return {
      isEmailValid: false,
      message: errorMessages.INVALID_EMAIL_ERROR,
    };
  }

  return {
    isEmailValid: true,
    validatedEmail: email?.trim().toLowerCase(),
  };
};

export const passwordValidator = (
  password,
  requiredErrorMessage = errorMessages.PASSWORD_REQUIRED_ERROR,
  combinationErrorMessage = errorMessages.PASSWORD_COMBINATION_ERROR,
) => {
  if (!password?.trim()) {
    return {
      isPasswordValid: false,
      message: requiredErrorMessage,
    };
  }

  const errors = [];

  if (password?.trim().length < propertyConstraints.MIN_PASSWORD_LENGTH) {
    errors.push(errorMessages.PASSWORD_MIN_LENGTH_ERROR);
  }

  if (password?.trim().length > propertyConstraints.MAX_PASSWORD_LENGTH) {
    errors.push(errorMessages.PASSWORD_MAX_LENGTH_ERROR);
  }

  if (!UPPER_CASE_REGEX.test(password?.trim())) {
    errors.push(errorMessages.PASSWORD_UPPERCASE_ERROR);
  }

  if (!LOWER_CASE_REGEX.test(password?.trim())) {
    errors.push(errorMessages.PASSWORD_LOWERCASE_ERROR);
  }

  if (!NUMBER_REGEX.test(password?.trim())) {
    errors.push(errorMessages.PASSWORD_NUMBER_ERROR);
  }

  if (!ALLOWED_SPECIAL_CHARACTERS_REGEX.test(password?.trim())) {
    errors.push(errorMessages.PASSWORD_SPECIAL_CHARACTERS_ERROR);
  }

  if (errors.length > 0) {
    return {
      isPasswordValid: false,
      message: combinationErrorMessage,
      errors: errors,
    };
  }

  return {
    isPasswordValid: true,
    validatedPassword: password?.trim(),
  };
};

export const regexPropertiesValidator = (property, regex, error) => {
  if (!property) {
    return {
      isPropertyValid: true,
      validatedProperty: null,
    };
  }

  property = typeof property === "string" ? property?.trim() : property;

  if (!regex.test(property)) {
    return {
      isPropertyValid: false,
      message: error,
    };
  }

  return {
    isPropertyValid: true,
    validatedProperty: property,
  };
};

export const numberRegexPropertiesValidator = (property, regex, error) => {
  if (!property) {
    return {
      isPropertyValid: true,
      validatedProperty: null,
    };
  }

  property = typeof property === "string" ? property?.trim() : property;

  if (!regex.test(property) || isNaN(Number(property))) {
    return {
      isPropertyValid: false,
      message: error,
    };
  }

  return {
    isPropertyValid: true,
    validatedProperty: property,
  };
};

export const numberPropertiesValidator = (
  property,
  minValue,
  maxValue,
  errors,
) => {
  if (!property && property !== 0 && property !== "0") {
    return {
      isPropertyValid: true,
      validatedProperty: null,
    };
  }

  property =
    typeof property === "string" ? property?.trim().toLowerCase() : property;

  const isPropertyValid =
    (typeof property === "number" || typeof property === "string") &&
    !isNaN(property);

  if (!isPropertyValid) {
    return {
      isPropertyValid: false,
      message: errors.INVALID_ERROR,
    };
  }

  if (!Number.isInteger(Number(property))) {
    return {
      isPropertyValid: false,
      message: errors.DECIMAL_ERROR,
    };
  }

  if (Number(property) < minValue) {
    return {
      isPropertyValid: false,
      message: errors.MIN_LENGTH_ERROR,
    };
  }

  if (Number(property) > maxValue) {
    return {
      isPropertyValid: false,
      message: errors.MAX_LENGTH_ERROR,
    };
  }

  return {
    isPropertyValid: true,
    validatedProperty: Number(property),
  };
};

export const stringPropertiesValidator = (
  property,
  minLength,
  maxLength,
  errors,
) => {
  if (!property) {
    return {
      isPropertyValid: true,
      validatedProperty: null,
    };
  }

  const trimmedProperty =
    typeof property === "string" ? property?.trim().toLowerCase() : property;

  if (typeof property !== "string") {
    return {
      isPropertyValid: false,
      message: errors.INVALID_ERROR,
    };
  }

  if (trimmedProperty.length < minLength) {
    return {
      isPropertyValid: false,
      message: errors.MIN_LENGTH_ERROR,
    };
  }

  if (trimmedProperty.length > maxLength) {
    return {
      isPropertyValid: false,
      message: errors.MAX_LENGTH_ERROR,
    };
  }

  return {
    isPropertyValid: true,
    validatedProperty: trimmedProperty,
  };
};

export const listPropertiesValidator = (property, error) => {
  if (!property) {
    return {
      isPropertyValid: true,
      validatedProperty: null,
    };
  }

  if (typeof property !== "string" && !Array.isArray(property)) {
    return {
      isPropertyValid: false,
      message: error,
    };
  }

  return {
    isPropertyValid: true,
    validatedProperty:
      Array.isArray(property) && sanitizeList(property).length > 0
        ? property.map((s) => s.trim().toLowerCase())
        : typeof property === "string"
          ? [property?.trim().toLowerCase()]
          : [],
  };
};

export const addressValidator = (address) => {
  if (!isPlainObject(address)) {
    return {
      isAddressValid: false,
      message: errorMessages.INVALID_ADDRESS_ERROR,
    };
  }

  const validatedAddress = {};

  for (let addressField in address) {
    switch (addressField) {
      case addressProperties.STREET:
        const {
          isPropertyValid: isStreetValid,
          message: streetErrorMessage,
          validatedProperty: validatedStreet,
        } = stringPropertiesValidator(
          address[addressField],
          propertyConstraints.MIN_STRING_LENGTH,
          propertyConstraints.MAX_STRING_LENGTH,
          {
            INVALID_ERROR: errorMessages.INVALID_STREET_ERROR,
            MIN_LENGTH_ERROR: errorMessages.STREET_MIN_LENGTH_ERROR,
            MAX_LENGTH_ERROR: errorMessages.STREET_MAX_LENGTH_ERROR,
          },
        );

        if (!isStreetValid) {
          throw new ValidationError(status.badRequest, streetErrorMessage, {
            property: address[addressField],
          });
        }

        validatedAddress[addressField] = validatedStreet;
        break;

      case addressProperties.LANDMARK:
        const {
          isPropertyValid: isLandmarkValid,
          message: landmarkErrorMessage,
          validatedProperty: validatedLandmark,
        } = stringPropertiesValidator(
          address[addressField],
          propertyConstraints.MIN_STRING_LENGTH,
          propertyConstraints.MAX_STRING_LENGTH,
          {
            INVALID_ERROR: errorMessages.INVALID_LANDMARK_ERROR,
            MIN_LENGTH_ERROR: errorMessages.LANDMARK_MIN_LENGTH_ERROR,
            MAX_LENGTH_ERROR: errorMessages.LANDMARK_MAX_LENGTH_ERROR,
          },
        );

        if (!isLandmarkValid) {
          throw new ValidationError(status.badRequest, landmarkErrorMessage, {
            property: address[addressField],
          });
        }

        validatedAddress[addressField] = validatedLandmark;
        break;

      case addressProperties.CITY:
        const {
          isPropertyValid: isCityValid,
          message: cityErrorMessage,
          validatedProperty: validatedCity,
        } = stringPropertiesValidator(
          address[addressField],
          propertyConstraints.MIN_STRING_LENGTH,
          propertyConstraints.MAX_STRING_LENGTH,
          {
            INVALID_ERROR: errorMessages.INVALID_CITY_ERROR,
            MIN_LENGTH_ERROR: errorMessages.CITY_MIN_LENGTH_ERROR,
            MAX_LENGTH_ERROR: errorMessages.CITY_MAX_LENGTH_ERROR,
          },
        );

        if (!isCityValid) {
          throw new ValidationError(status.badRequest, cityErrorMessage, {
            property: address[addressField],
          });
        }

        validatedAddress[addressField] = validatedCity;
        break;

      case addressProperties.STATE:
        const {
          isPropertyValid: isStateValid,
          message: stateErrorMessage,
          validatedProperty: validatedState,
        } = stringPropertiesValidator(
          address[addressField],
          propertyConstraints.MIN_STRING_LENGTH,
          propertyConstraints.MAX_STRING_LENGTH,
          {
            INVALID_ERROR: errorMessages.INVALID_STATE_ERROR,
            MIN_LENGTH_ERROR: errorMessages.STATE_MIN_LENGTH_ERROR,
            MAX_LENGTH_ERROR: errorMessages.STATE_MAX_LENGTH_ERROR,
          },
        );

        if (!isStateValid) {
          throw new ValidationError(status.badRequest, stateErrorMessage, {
            property: address[addressField],
          });
        }

        validatedAddress[addressField] = validatedState;
        break;

      case addressProperties.COUNTRY_CODE:
        const {
          isPropertyValid: isCountryCodeValid,
          message: countryCodeErrorMessage,
          validatedProperty: validatedCountryCode,
        } = numberRegexPropertiesValidator(
          address[addressField],
          COUNTRY_CODE_REGEX,
          errorMessages.INVALID_COUNTRY_CODE_ERROR,
        );

        if (!isCountryCodeValid) {
          throw new ValidationError(
            status.badRequest,
            countryCodeErrorMessage,
            {
              property: address[addressField],
            },
          );
        }

        validatedAddress[addressField] = validatedCountryCode;
        break;

      case addressProperties.COUNTRY:
        const {
          isPropertyValid: isSCountryValid,
          message: countryErrorMessage,
          validatedProperty: validatedCountry,
        } = stringPropertiesValidator(
          address[addressField],
          propertyConstraints.MIN_STRING_LENGTH,
          propertyConstraints.MAX_STRING_LENGTH,
          {
            INVALID_ERROR: errorMessages.INVALID_COUNTRY_ERROR,
            MIN_LENGTH_ERROR: errorMessages.COUNTRY_MIN_LENGTH_ERROR,
            MAX_LENGTH_ERROR: errorMessages.COUNTRY_MAX_LENGTH_ERROR,
          },
        );

        if (!isSCountryValid) {
          throw new ValidationError(status.badRequest, countryErrorMessage, {
            property: address[addressField],
          });
        }

        validatedAddress[addressField] = validatedCountry;
        break;

      case addressProperties.PIN_CODE:
        const {
          isPropertyValid: isPinCodeValid,
          message: pinCodeErrorMessage,
          validatedProperty: validatedPinCode,
        } = numberRegexPropertiesValidator(
          address[addressField],
          PIN_CODE_REGEX,
          errorMessages.INVALID_PIN_CODE_ERROR,
        );

        if (!isPinCodeValid) {
          throw new ValidationError(status.badRequest, pinCodeErrorMessage, {
            property: address[addressField],
          });
        }

        validatedAddress[addressField] = validatedPinCode;
        break;
    }
  }

  return validatedAddress;
};

export const validateConnectionStatus = (connectionStatus) => {
  if (
    typeof connectionStatus !== "string" ||
    !Object.values(connectionStatusProperties).includes(
      connectionStatus?.trim().toLowerCase(),
    )
  ) {
    throw new ValidationError(
      status.badRequest,
      errorMessages.INVALID_CONNECTION_REQUEST_ERROR,
      { connectionStatus },
    );
  }

  return connectionStatus?.trim().toLowerCase();
};

export const validateNotificationType = (notificationType) => {
  if (!notificationType) return;

  if (
    typeof notificationType !== "string" ||
    !Object.values(notificationTypes).includes(
      notificationType?.trim().toLowerCase(),
    )
  ) {
    throw new ValidationError(
      status.badRequest,
      errorMessages.INVALID_NOTIFICATION_TYPE_ERROR,
      { notificationType },
    );
  }

  return notificationType?.trim().toLowerCase();
};

export const validateNotificationStatus = (notificationStatus) => {
  if (
    typeof notificationStatus !== "string" ||
    !Object.values(notificationStatusProperties).includes(
      notificationStatus?.trim().toLowerCase(),
    )
  ) {
    throw new ValidationError(
      status.badRequest,
      errorMessages.INVALID_NOTIFICATION_STATUS_ERROR,
      { notificationStatus },
    );
  }

  return notificationStatus?.trim().toLowerCase();
};

export const pageValidator = (page) => {
  if (page && isNaN(Number(page))) {
    throw new ValidationError(
      status.badRequest,
      errorMessages.INVALID_PAGE_ERROR,
      { page },
    );
  }

  return Number(page);
};

export const limitValidator = (limit) => {
  if (limit && isNaN(Number(limit))) {
    throw new ValidationError(
      status.badRequest,
      errorMessages.INVALID_LIMIT_ERROR,
      { limit },
    );
  }

  return Number(limit);
};
