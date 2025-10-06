import { allowedUpdateProfileProperties, status } from "../config/config.js";
import { ValidationError } from "../errors/CustomError.js";
import { nameValidator } from "../validations/validation.js";

export const omitObjectProperties = (obj, keysToOmit) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keysToOmit.includes(key))
  );
};

export const validatePropertiesToUpdate = (properties) => {
  const validatedProperties = {};

  for (let property in properties) {
    switch (property) {
      case allowedUpdateProfileProperties.FIRST_NAME ||
        allowedUpdateProfileProperties.MIDDLE_NAME ||
        allowedUpdateProfileProperties.LAST_NAME ||
        allowedUpdateProfileProperties.NICK_NAME:
        const {
          isNameValid,
          message: nameErrorMessage,
          validatedName,
        } = nameValidator(properties[property]);

        if (!isNameValid) {
          throw new ValidationError(status.badRequest, nameErrorMessage, {
            property,
          });
        }

        validatedProperties[property] = validatedName;
        break;
      case allowedUpdateProfileProperties.AGE:
        // Code to execute if expression === value2
        break;
      case allowedUpdateProfileProperties.PHONE:
        // Code to execute if expression === value2
        break;
      case allowedUpdateProfileProperties.GENDER:
        // Code to execute if expression === value2
        break;
      case allowedUpdateProfileProperties.AVATAR_URL:
        // Code to execute if expression === value2
        break;
      case allowedUpdateProfileProperties.BIO:
        // Code to execute if expression === value2
        break;
      case allowedUpdateProfileProperties.MARITAL_STATUS:
        // Code to execute if expression === value2
        break;
      case allowedUpdateProfileProperties.JOB_PROFILE:
        // Code to execute if expression === value2
        break;
      case allowedUpdateProfileProperties.EXPERIENCE:
        // Code to execute if expression === value2
        break;
      case allowedUpdateProfileProperties.GITHUB:
        // Code to execute if expression === value2
        break;
      case allowedUpdateProfileProperties.WEBSITE:
        // Code to execute if expression === value2
        break;
      case allowedUpdateProfileProperties.ORGANIZATION:
        // Code to execute if expression === value2
        break;
      case allowedUpdateProfileProperties.SKILLS:
        // Code to execute if expression === value2
        break;
      case allowedUpdateProfileProperties.INTERESTS:
        // Code to execute if expression === value2
        break;
      case allowedUpdateProfileProperties.ADDRESS:
        // Code to execute if expression === value2
        break;
      default:
      // Code to execute if no case matches
    }
  }

  return validatedProperties;
};
