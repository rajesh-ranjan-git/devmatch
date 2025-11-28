import {
  allowedUpdateProfileProperties,
  PHOTO_URL_REGEX,
  connectionStatusProperties,
  errorMessages,
  genderProperties,
  GITHUB_REGEX,
  maritalStatusProperties,
  notificationTypes,
  PHONE_REGEX,
  propertyConstraints,
  status,
  WEBSITE_REGEX,
  LINKEDIN_REGEX,
} from "../config/config.js";
import { ValidationError } from "../errors/CustomError.js";
import {
  nameValidator,
  numberPropertiesValidator,
  stringPropertiesValidator,
  regexPropertiesValidator,
  listPropertiesValidator,
  addressValidator,
} from "../validations/validation.js";

export const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const isPlainObject = (data) => {
  return typeof data === "object" && data !== null && !Array.isArray(data);
};

export const omitObjectProperties = (obj, keysToOmit) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keysToOmit.includes(key))
  );
};

export const selectObjectProperties = (obj, keysToSelect) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => keysToSelect.includes(key))
  );
};

export const toTitleCase = (str) => {
  if (!str) {
    return "";
  }
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
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
    } = nameValidator(properties[property], property);

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
          MIN_LENGTH_ERROR: errorMessages.MIN_AGE_ERROR,
          MAX_LENGTH_ERROR: errorMessages.MAX_AGE_ERROR,
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
        PHOTO_URL_REGEX,
        errorMessages.INVALID_PHOTO_URL_ERROR
      );

      if (!isAvatarUrlValid) {
        throw new ValidationError(status.badRequest, avatarUrlErrorMessage, {
          property: properties[property],
        });
      }

      validatedProperties[property] = validatedAvatarUrl;

      return validatedProperties;
    case allowedUpdateProfileProperties.COVER_PHOTO_URL:
      const {
        isCoverPhotoUrlValid,
        message: coverPhotoUrlErrorMessage,
        validatedCoverPhotoUrl,
      } = regexPropertiesValidator(
        properties[property],
        PHOTO_URL_REGEX,
        errorMessages.INVALID_PHOTO_URL_ERROR
      );

      if (!isCoverPhotoUrlValid) {
        throw new ValidationError(
          status.badRequest,
          coverPhotoUrlErrorMessage,
          {
            property: properties[property],
          }
        );
      }

      validatedProperties[property] = validatedCoverPhotoUrl;

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
          MIN_LENGTH_ERROR: errorMessages.BIO_MIN_LENGTH_ERROR,
          MAX_LENGTH_ERROR: errorMessages.BIO_MAX_LENGTH_ERROR,
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
          MIN_LENGTH_ERROR: errorMessages.JOB_PROFILE_MIN_LENGTH_ERROR,
          MAX_LENGTH_ERROR: errorMessages.JOB_PROFILE_MAX_LENGTH_ERROR,
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
          MIN_LENGTH_ERROR: errorMessages.MIN_EXPERIENCE_ERROR,
          MAX_LENGTH_ERROR: errorMessages.MAX_EXPERIENCE_ERROR,
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
    case allowedUpdateProfileProperties.LINKEDIN:
      const {
        isPropertyValid: isLinkedinValid,
        message: linkedinErrorMessage,
        validatedProperty: validatedLinkedin,
      } = regexPropertiesValidator(
        properties[property],
        LINKEDIN_REGEX,
        errorMessages.INVALID_LINKEDIN_URL_ERROR
      );

      if (!isLinkedinValid) {
        throw new ValidationError(status.badRequest, linkedinErrorMessage, {
          property: properties[property],
        });
      }

      validatedProperties[property] = validatedLinkedin;
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
          MIN_LENGTH_ERROR: errorMessages.ORGANIZATION_MIN_LENGTH_ERROR,
          MAX_LENGTH_ERROR: errorMessages.ORGANIZATION_MAX_LENGTH_ERROR,
        }
      );

      if (!isOrganizationValid) {
        throw new ValidationError(status.badRequest, organizationErrorMessage, {
          property: properties[property],
        });
      }

      validatedProperties[property] = validatedOrganization;

      return validatedProperties;
    case allowedUpdateProfileProperties.COMPANY:
      const {
        isPropertyValid: isCompanyValid,
        message: companyErrorMessage,
        validatedProperty: validatedCompany,
      } = stringPropertiesValidator(
        properties[property],
        propertyConstraints.MIN_STRING_LENGTH,
        propertyConstraints.MAX_STRING_LENGTH,
        {
          INVALID_ERROR: errorMessages.INVALID_COMPANY_ERROR,
          MIN_LENGTH_ERROR: errorMessages.COMPANY_MIN_LENGTH_ERROR,
          MAX_LENGTH_ERROR: errorMessages.COMPANY_MAX_LENGTH_ERROR,
        }
      );

      if (!isCompanyValid) {
        throw new ValidationError(status.badRequest, companyErrorMessage, {
          property: properties[property],
        });
      }

      validatedProperties[property] = validatedCompany;

      return validatedProperties;
    case allowedUpdateProfileProperties.SKILLS:
      const {
        isPropertyValid: isSkillsValid,
        message: skillsErrorMessage,
        validatedProperty: validatedSkills,
      } = listPropertiesValidator(
        properties[property],
        errorMessages.INVALID_SKILLS_ERROR
      );

      if (!isSkillsValid) {
        throw new ValidationError(status.badRequest, skillsErrorMessage, {
          property: properties[property],
        });
      }

      validatedProperties[property] = validatedSkills;

      return validatedProperties;
    case allowedUpdateProfileProperties.INTERESTS:
      const {
        isPropertyValid: isInterestsValid,
        message: interestsErrorMessage,
        validatedProperty: validatedInterests,
      } = listPropertiesValidator(
        properties[property],
        errorMessages.INVALID_INTERESTS_ERROR
      );

      if (!isInterestsValid) {
        throw new ValidationError(status.badRequest, interestsErrorMessage, {
          property: properties[property],
        });
      }

      validatedProperties[property] = validatedInterests;

      return validatedProperties;
    case allowedUpdateProfileProperties.ADDRESS:
      validatedProperties[property] = addressValidator(properties[property]);

      return validatedProperties;
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

export const getNotificationBody = (name, type, connectionStatus) => {
  if (type === notificationTypes.CONNECTION) {
    if (connectionStatus === connectionStatusProperties.INTERESTED) {
      return `${toTitleCase(name)} sent you a connection request!`;
    } else {
      return `${toTitleCase(name)} accepted your connection request!`;
    }
  } else {
    return "Chat feature is not built yet!";
  }
};
