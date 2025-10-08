import {
  allowedUpdateProfileProperties,
  AVATAR_URL_REGEX,
  errorMessages,
  genderProperties,
  GITHUB_REGEX,
  maritalStatusProperties,
  PHONE_REGEX,
  propertyConstraints,
  status,
  WEBSITE_REGEX,
} from "../config/config.js";
import { ValidationError } from "../errors/CustomError.js";
import {
  nameValidator,
  phoneValidator,
  numberPropertiesValidator,
  stringPropertiesValidator,
  regexPropertiesValidator,
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
        isPropertyValid: isAgeValid,
        message: ageErrorMessage,
        validatedProperty: validatedAge,
      } = numberPropertiesValidator(
        properties[property],
        propertyConstraints.MIN_AGE,
        propertyConstraints.MAX_AGE,
        {
          INVALID_ERROR: errorMessages.INVALID_AGE_ERROR,
          DECIMAL_ERROR: errorMessages.DECIMAL_AGE_ERROR,
          MIN_ERROR: errorMessages.MIN_AGE_ERROR,
          MAX_ERROR: errorMessages.MAX_AGE_ERROR,
        }
      );

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
      } = regexPropertiesValidator(
        properties[property],
        PHONE_REGEX,
        errorMessages.INVALID_PHONE_ERROR
      );

      if (!isPhoneValid) {
        throw new ValidationError(status.badRequest, phoneErrorMessage, {
          property: properties[property],
        });
      }

      validatedProperties[property] = validatedPhone;
      return validatedProperties;
    case allowedUpdateProfileProperties.GENDER:
      Object.values(genderProperties).forEach((value) => {
        if (value === properties[property]) {
          validatedProperties[property] = properties[property];
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
      const {
        isAvatarUrlValid,
        message: avatarUrlErrorMessage,
        validatedAvatarUrl,
      } = regexPropertiesValidator(
        properties[property],
        AVATAR_URL_REGEX,
        errorMessages.INVALID_AVATAR_URL_ERROR
      );

      if (!isAvatarUrlValid) {
        throw new ValidationError(status.badRequest, avatarUrlErrorMessage, {
          property: properties[property],
        });
      }

      validatedProperties[property] = validatedAvatarUrl;

      return validatedProperties;
    case allowedUpdateProfileProperties.BIO:
      const {
        isPropertyValid: isBioValid,
        message: bioErrorMessage,
        validatedProperty: validatedBio,
      } = stringPropertiesValidator(
        properties[property],
        propertyConstraints.MIN_STRING_LENGTH,
        propertyConstraints.MAX_STRING_LENGTH,
        {
          INVALID_ERROR: errorMessages.INVALID_BIO_ERROR,
          MIN_ERROR: errorMessages.BIO_MIN_LENGTH_ERROR,
          MAX_ERROR: errorMessages.BIO_MAX_LENGTH_ERROR,
        }
      );

      if (!isBioValid) {
        throw new ValidationError(status.badRequest, bioErrorMessage, {
          property: properties[property],
        });
      }

      validatedProperties[property] = validatedBio;

      return validatedProperties;
    case allowedUpdateProfileProperties.MARITAL_STATUS:
      Object.values(maritalStatusProperties).forEach((value) => {
        if (value === properties[property]) {
          validatedProperties[property] = properties[property];
        }
      });

      if (
        !Object.keys(validatedProperties).includes(
          allowedUpdateProfileProperties.MARITAL_STATUS
        )
      ) {
        throw new ValidationError(
          status.badRequest,
          errorMessages.INVALID_MARITAL_STATUS_ERROR,
          {
            property: properties[property],
          }
        );
      }

      return validatedProperties;
    case allowedUpdateProfileProperties.JOB_PROFILE:
      const {
        isPropertyValid: isJobProfileValid,
        message: jobProfileErrorMessage,
        validatedProperty: validatedJobProfile,
      } = stringPropertiesValidator(
        properties[property],
        propertyConstraints.MIN_STRING_LENGTH,
        propertyConstraints.MAX_STRING_LENGTH,
        {
          INVALID_ERROR: errorMessages.INVALID_JOB_PROFILE_ERROR,
          MIN_ERROR: errorMessages.JOB_PROFILE_MIN_LENGTH_ERROR,
          MAX_ERROR: errorMessages.JOB_PROFILE_MAX_LENGTH_ERROR,
        }
      );

      if (!isJobProfileValid) {
        throw new ValidationError(status.badRequest, jobProfileErrorMessage, {
          property: properties[property],
        });
      }

      validatedProperties[property] = validatedJobProfile;

      return validatedProperties;
    case allowedUpdateProfileProperties.EXPERIENCE:
      const {
        isPropertyValid: isExperienceValid,
        message: experienceErrorMessage,
        validatedProperty: validatedExperience,
      } = numberPropertiesValidator(
        properties[property],
        propertyConstraints.MIN_EXPERIENCE,
        propertyConstraints.MAX_EXPERIENCE,
        {
          INVALID_ERROR: errorMessages.INVALID_EXPERIENCE_ERROR,
          DECIMAL_ERROR: errorMessages.DECIMAL_EXPERIENCE_ERROR,
          MIN_ERROR: errorMessages.MIN_EXPERIENCE_ERROR,
          MAX_ERROR: errorMessages.MAX_EXPERIENCE_ERROR,
        }
      );

      if (!isExperienceValid) {
        throw new ValidationError(status.badRequest, experienceErrorMessage, {
          property: properties[property],
        });
      }

      validatedProperties[property] = validatedExperience;
      return validatedProperties;
    case allowedUpdateProfileProperties.GITHUB:
      const {
        isPropertyValid: isGithubValid,
        message: githubErrorMessage,
        validatedProperty: validatedGithub,
      } = regexPropertiesValidator(
        properties[property],
        GITHUB_REGEX,
        errorMessages.INVALID_GITHUB_URL_ERROR
      );

      if (!isGithubValid) {
        throw new ValidationError(status.badRequest, githubErrorMessage, {
          property: properties[property],
        });
      }

      validatedProperties[property] = validatedGithub;
      return validatedProperties;
    case allowedUpdateProfileProperties.WEBSITE:
      const {
        isPropertyValid: isWebsiteValid,
        message: websiteErrorMessage,
        validatedProperty: validatedWebsite,
      } = regexPropertiesValidator(
        properties[property],
        WEBSITE_REGEX,
        errorMessages.INVALID_WEBSITE_URL_ERROR
      );

      if (!isWebsiteValid) {
        throw new ValidationError(status.badRequest, websiteErrorMessage, {
          property: properties[property],
        });
      }

      validatedProperties[property] = validatedWebsite;
      return validatedProperties;
    case allowedUpdateProfileProperties.ORGANIZATION:
      const {
        isPropertyValid: isOrganizationValid,
        message: organizationErrorMessage,
        validatedProperty: validatedOrganization,
      } = stringPropertiesValidator(
        properties[property],
        propertyConstraints.MIN_STRING_LENGTH,
        propertyConstraints.MAX_STRING_LENGTH,
        {
          INVALID_ERROR: errorMessages.INVALID_ORGANIZATION_ERROR,
          MIN_ERROR: errorMessages.ORGANIZATION_MIN_LENGTH_ERROR,
          MAX_ERROR: errorMessages.ORGANIZATION_MAX_LENGTH_ERROR,
        }
      );

      if (!isOrganizationValid) {
        throw new ValidationError(status.badRequest, organizationErrorMessage, {
          property: properties[property],
        });
      }

      validatedProperties[property] = validatedOrganization;

      return validatedProperties;
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
