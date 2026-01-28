"use server";

import { revalidatePath } from "next/cache";
import {
  ADDRESS_PROPERTIES,
  ERROR_MESSAGES,
  FACEBOOK_REGEX,
  GENDER_PROPERTIES,
  GITHUB_REGEX,
  INSTAGRAM_REGEX,
  LINKEDIN_REGEX,
  MARITAL_STATUS_PROPERTIES,
  PHONE_REGEX,
  TWITTER_REGEX,
  USER_PROPERTY_CONSTRAINTS,
  WEBSITE_REGEX,
  YOUTUBE_REGEX,
} from "@/config/constants";
import { allowedUpdateProfileProperties } from "@/config/config";
import { ProfileUpdateFormStateType } from "@/types/types";
import { profileRoutes } from "@/lib/routes/routes";
import {
  addressValidator,
  allowedStringValidator,
  listPropertiesValidator,
  nameFieldValidator,
  numberPropertiesValidator,
  numberRegexPropertiesValidator,
  regexFieldValidator,
  stringFieldValidator,
} from "@/lib/validations/validations";
import { apiUrls } from "@/lib/api/apiUtils";
import { apiRequest } from "@/lib/api/api";

export const updateProfileDetailsAction = async (
  prevState: ProfileUpdateFormStateType,
  formData: FormData,
) => {
  const getFormValue = (key: keyof typeof allowedUpdateProfileProperties) =>
    formData.get(allowedUpdateProfileProperties[key]) as string;

  const fields = {
    firstName: getFormValue(allowedUpdateProfileProperties.firstName),
    middleName: getFormValue(allowedUpdateProfileProperties.middleName),
    lastName: getFormValue(allowedUpdateProfileProperties.lastName),
    nickName: getFormValue(allowedUpdateProfileProperties.nickName),
    age: getFormValue(allowedUpdateProfileProperties.age),
    phone: getFormValue(allowedUpdateProfileProperties.phone),
    gender: getFormValue(allowedUpdateProfileProperties.gender),
    bio: getFormValue(allowedUpdateProfileProperties.bio),
    maritalStatus: getFormValue(allowedUpdateProfileProperties.maritalStatus),
    jobProfile: getFormValue(allowedUpdateProfileProperties.jobProfile),
    experience: getFormValue(allowedUpdateProfileProperties.experience),
    facebook: getFormValue(allowedUpdateProfileProperties.facebook),
    instagram: getFormValue(allowedUpdateProfileProperties.instagram),
    twitter: getFormValue(allowedUpdateProfileProperties.twitter),
    github: getFormValue(allowedUpdateProfileProperties.github),
    linkedin: getFormValue(allowedUpdateProfileProperties.linkedin),
    youtube: getFormValue(allowedUpdateProfileProperties.youtube),
    website: getFormValue(allowedUpdateProfileProperties.website),
    company: getFormValue(allowedUpdateProfileProperties.company),
    organization: getFormValue(allowedUpdateProfileProperties.organization),
    skills: formData.get(allowedUpdateProfileProperties.skills),
    interests: formData.get(allowedUpdateProfileProperties.interests),
  };

  const address = Object.fromEntries(
    Object.entries(ADDRESS_PROPERTIES).map(([key, value]) => [
      key,
      formData.get(value),
    ]),
  ) as Record<keyof typeof ADDRESS_PROPERTIES, FormDataEntryValue | null>;

  const errors: ProfileUpdateFormStateType["errors"] = {};
  const validatedData: Record<string, any> = {};

  validatedData.firstName = nameFieldValidator(
    fields.firstName,
    allowedUpdateProfileProperties.firstName,
    errors,
  );
  validatedData.middleName = nameFieldValidator(
    fields.middleName,
    allowedUpdateProfileProperties.middleName,
    errors,
  );
  validatedData.lastName = nameFieldValidator(
    fields.lastName,
    allowedUpdateProfileProperties.lastName,
    errors,
  );
  validatedData.nickName = nameFieldValidator(
    fields.nickName,
    allowedUpdateProfileProperties.nickName,
    errors,
  );

  const { validatedProperty: validatedAge, propertyErrors: ageErrors } =
    numberPropertiesValidator(
      fields.age,
      USER_PROPERTY_CONSTRAINTS.minAge,
      USER_PROPERTY_CONSTRAINTS.maxAge,
      {
        invalidError: ERROR_MESSAGES.invalidAgeError,
        decimalError: ERROR_MESSAGES.decimalAgeError,
        minLengthError: ERROR_MESSAGES.minAgeError,
        maxLengthError: ERROR_MESSAGES.maxAgeError,
      },
    );
  errors.age = [...(ageErrors ?? [])];
  validatedData.age = validatedAge;

  const { validatedProperty: validatedPhone, propertyErrors: phoneErrors } =
    numberRegexPropertiesValidator(
      fields.phone,
      PHONE_REGEX,
      ERROR_MESSAGES.invalidPhoneError,
    );
  errors.phone = [...(phoneErrors ?? [])];
  validatedData.phone = validatedPhone;

  const { validatedProperty: validatedGender, propertyErrors: genderErrors } =
    allowedStringValidator(fields.gender, Object.values(GENDER_PROPERTIES), {
      invalidError: ERROR_MESSAGES.invalidGenderError,
    });
  errors.gender = [...(genderErrors ?? [])];
  validatedData.gender = validatedGender;

  const {
    validatedProperty: validatedMaritalStatus,
    propertyErrors: maritalStatusErrors,
  } = allowedStringValidator(
    fields.maritalStatus,
    Object.values(MARITAL_STATUS_PROPERTIES),
    {
      invalidError: ERROR_MESSAGES.invalidMaritalStatusError,
    },
  );
  errors.maritalStatus = [...(maritalStatusErrors ?? [])];
  validatedData.maritalStatus = validatedMaritalStatus;

  validatedData.jobProfile = stringFieldValidator(
    fields.jobProfile,
    allowedUpdateProfileProperties.jobProfile,
    {
      invalidError: ERROR_MESSAGES.invalidJobProfileError,
      minLengthError: ERROR_MESSAGES.jobProfileMinLengthError,
      maxLengthError: ERROR_MESSAGES.jobProfileMaxLengthError,
    },
    errors,
  );

  validatedData.bio = stringFieldValidator(
    fields.bio,
    allowedUpdateProfileProperties.bio,
    {
      invalidError: ERROR_MESSAGES.invalidBioError,
      minLengthError: ERROR_MESSAGES.bioMinLengthError,
      maxLengthError: ERROR_MESSAGES.bioMaxLengthError,
    },
    errors,
  );

  validatedData.company = stringFieldValidator(
    fields.company,
    allowedUpdateProfileProperties.company,
    {
      invalidError: ERROR_MESSAGES.invalidCompanyError,
      minLengthError: ERROR_MESSAGES.companyMinLengthError,
      maxLengthError: ERROR_MESSAGES.companyMaxLengthError,
    },
    errors,
  );

  validatedData.organization = stringFieldValidator(
    fields.organization,
    allowedUpdateProfileProperties.organization,
    {
      invalidError: ERROR_MESSAGES.invalidOrganizationError,
      minLengthError: ERROR_MESSAGES.organizationMinLengthError,
      maxLengthError: ERROR_MESSAGES.organizationMaxLengthError,
    },
    errors,
  );

  const {
    validatedProperty: validatedExperience,
    propertyErrors: experienceErrors,
  } = numberPropertiesValidator(
    fields.experience,
    USER_PROPERTY_CONSTRAINTS.minExperience,
    USER_PROPERTY_CONSTRAINTS.maxExperience,
    {
      invalidError: ERROR_MESSAGES.invalidExperienceError,
      decimalError: ERROR_MESSAGES.decimalExperienceError,
      minLengthError: ERROR_MESSAGES.minExperienceError,
      maxLengthError: ERROR_MESSAGES.maxExperienceError,
    },
  );
  errors.experience = [...(experienceErrors ?? [])];
  validatedData.experience = validatedExperience;

  validatedData.facebook = regexFieldValidator(
    fields.facebook,
    FACEBOOK_REGEX,
    ERROR_MESSAGES.invalidFacebookUrlError,
    allowedUpdateProfileProperties.facebook,
    errors,
  );

  validatedData.instagram = regexFieldValidator(
    fields.instagram,
    INSTAGRAM_REGEX,
    ERROR_MESSAGES.invalidInstagramUrlError,
    allowedUpdateProfileProperties.instagram,
    errors,
  );

  validatedData.twitter = regexFieldValidator(
    fields.twitter,
    TWITTER_REGEX,
    ERROR_MESSAGES.invalidTwitterUrlError,
    allowedUpdateProfileProperties.twitter,
    errors,
  );

  validatedData.github = regexFieldValidator(
    fields.github,
    GITHUB_REGEX,
    ERROR_MESSAGES.invalidGithubUrlError,
    allowedUpdateProfileProperties.github,
    errors,
  );

  validatedData.linkedin = regexFieldValidator(
    fields.linkedin,
    LINKEDIN_REGEX,
    ERROR_MESSAGES.invalidLinkedinUrlError,
    allowedUpdateProfileProperties.linkedin,
    errors,
  );

  validatedData.youtube = regexFieldValidator(
    fields.youtube,
    YOUTUBE_REGEX,
    ERROR_MESSAGES.invalidYoutubeUrlError,
    allowedUpdateProfileProperties.youtube,
    errors,
  );

  validatedData.website = regexFieldValidator(
    fields.website,
    WEBSITE_REGEX,
    ERROR_MESSAGES.invalidWebsiteUrlError,
    allowedUpdateProfileProperties.website,
    errors,
  );

  const skillsFormData =
    typeof fields.skills === "string"
      ? fields.skills.split(",")
      : Array.isArray(fields.skills)
        ? fields.skills
        : null;

  const { validatedProperty: validatedSkills, propertyErrors: skillsErrors } =
    listPropertiesValidator(skillsFormData, ERROR_MESSAGES.invalidSkillsError);
  errors.skills = [...(skillsErrors ?? [])];
  validatedData.skills = validatedSkills;

  const interestsFormData =
    typeof fields.interests === "string"
      ? fields.interests.split(",")
      : Array.isArray(fields.interests)
        ? fields.interests
        : null;

  const {
    validatedProperty: validatedInterests,
    propertyErrors: interestsErrors,
  } = listPropertiesValidator(
    interestsFormData,
    ERROR_MESSAGES.invalidInterestsError,
  );
  errors.interests = [...(interestsErrors ?? [])];
  validatedData.interests = validatedInterests;

  let parsedAddress: Record<string, any> | null = null;

  if (typeof address === "string") {
    try {
      parsedAddress = JSON.parse(address);
    } catch {
      parsedAddress = null;
    }
  } else {
    parsedAddress = address;
  }

  const { validatedAddress, addressErrors } = addressValidator(parsedAddress);
  errors.address = [...(addressErrors ?? [])];
  validatedData.address = validatedAddress;

  const hasErrors = Object.values(errors).some((item) => item.length > 0);

  if (hasErrors) {
    return {
      message: "Validation Error",
      errors,
      success: false,
      inputs: Object.fromEntries(formData),
    };
  }

  const result = await apiRequest({
    method: "post",
    url: apiUrls.updateProfile,
    data: validatedData,
    requiresAuth: true,
  });

  if (!result?.success) {
    return {
      message: "Profile update failed!",
      result,
      errors,
      inputs: Object.fromEntries(formData),
      success: result?.success ?? false,
    };
  }

  revalidatePath(profileRoutes.profile);

  return {
    message: "Profile update successful!",
    result,
    errors,
    success: result?.success ?? true,
  };
};
