import {
  allowedUpdateProfileProperties,
  errorMessages,
  genderProperties,
  status,
} from "../config/config.js";
import { ValidationError } from "../errors/CustomError.js";
import {
  nameValidator,
  ageValidator,
  phoneValidator,
} from "../validations/validation.js";

export const omitObjectProperties = (obj, keysToOmit) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keysToOmit.includes(key))
  );
};

const addToValidatedProperties = (
  properties,
  validatedProperties = {},
  property
) => {
  if (
    property === allowedUpdateProfileProperties.FIRST_NAME ||
    property === allowedUpdateProfileProperties.MIDDLE_NAME ||
    property === allowedUpdateProfileProperties.LAST_NAME ||
    property === allowedUpdateProfileProperties.NICK_NAME
  ) {
    const {
      isNameValid,
      message: nameErrorMessage,
      validatedName,
    } = nameValidator(properties[property]);

    if (!isNameValid) {
      throw new ValidationError(status.badRequest, nameErrorMessage, {
        property: properties[property],
      });
    }

    validatedProperties[property] = validatedName;

    return validatedProperties;
  }

  switch (property) {
    case allowedUpdateProfileProperties.AGE:
      const {
        isAgeValid,
        message: ageErrorMessage,
        validatedAge,
      } = ageValidator(properties[property]);

      if (!isAgeValid) {
        throw new ValidationError(status.badRequest, ageErrorMessage, {
          property: properties[property],
        });
      }

      validatedProperties[property] = validatedAge;
      return validatedProperties;
    case allowedUpdateProfileProperties.PHONE:
      const {
        isPhoneValid,
        message: phoneErrorMessage,
        validatedPhone,
      } = phoneValidator(properties[property]);

      if (!isPhoneValid) {
        throw new ValidationError(status.badRequest, phoneErrorMessage, {
          property: properties[property],
        });
      }

      validatedProperties[property] = validatedPhone;
      return validatedProperties;
    case allowedUpdateProfileProperties.GENDER:
      console.log("debug genderProperties : ", genderProperties);
      Object.values(genderProperties).forEach((value) => {
        console.log("debug value : ", value);
        if (value === properties[property]) {
          console.log("debug properties[property] : ", properties[property]);
          validatedProperties[property] = properties[property];

          console.log(
            "debug validatedProperties after update : ",
            validatedProperties
          );
        }
      });

      if (
        !Object.keys(validatedProperties).includes(
          allowedUpdateProfileProperties.GENDER
        )
      ) {
        throw new ValidationError(
          status.badRequest,
          errorMessages.INVALID_GENDER_ERROR,
          {
            property: properties[property],
          }
        );
      }

      return validatedProperties;
    case allowedUpdateProfileProperties.AVATAR_URL:
      // Code to execute if expression === value2
      return;
    case allowedUpdateProfileProperties.BIO:
      // Code to execute if expression === value2
      return;
    case allowedUpdateProfileProperties.MARITAL_STATUS:
      // Code to execute if expression === value2
      return;
    case allowedUpdateProfileProperties.JOB_PROFILE:
      // Code to execute if expression === value2
      return;
    case allowedUpdateProfileProperties.EXPERIENCE:
      // Code to execute if expression === value2
      return;
    case allowedUpdateProfileProperties.GITHUB:
      // Code to execute if expression === value2
      return;
    case allowedUpdateProfileProperties.WEBSITE:
      // Code to execute if expression === value2
      return;
    case allowedUpdateProfileProperties.ORGANIZATION:
      // Code to execute if expression === value2
      return;
    case allowedUpdateProfileProperties.SKILLS:
      // Code to execute if expression === value2
      return;
    case allowedUpdateProfileProperties.INTERESTS:
      // Code to execute if expression === value2
      return;
    case allowedUpdateProfileProperties.ADDRESS:
      // Code to execute if expression === value2
      return;
  }
};

export const validatePropertiesToUpdate = (properties) => {
  let validatedProperties = {};

  for (let property in properties) {
    const propertiesToAdd = addToValidatedProperties(
      properties,
      validatedProperties,
      property
    );
    validatedProperties = { ...validatedProperties, ...propertiesToAdd };
  }

  return validatedProperties;
};
