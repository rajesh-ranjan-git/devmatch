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
  nameValidator,
  numberPropertiesValidator,
  numberRegexPropertiesValidator,
  regexPropertiesValidator,
  stringPropertiesValidator,
} from "@/lib/validations/validations";
import { apiUrls } from "@/lib/api/apiUtils";
import { apiRequest } from "@/lib/api/api";

export const updateProfileDetailsAction = async (
  prevState: ProfileUpdateFormStateType,
  formData: FormData,
) => {
  const firstName = formData.get(
    allowedUpdateProfileProperties.firstName,
  ) as string;
  const middleName = formData.get(
    allowedUpdateProfileProperties.middleName,
  ) as string;
  const lastName = formData.get(
    allowedUpdateProfileProperties.lastName,
  ) as string;
  const nickName = formData.get(
    allowedUpdateProfileProperties.nickName,
  ) as string;
  const age = formData.get(allowedUpdateProfileProperties.age) as string;
  const phone = formData.get(allowedUpdateProfileProperties.phone) as string;
  const gender = formData.get(allowedUpdateProfileProperties.gender) as string;
  const bio = formData.get(allowedUpdateProfileProperties.bio) as string;
  const maritalStatus = formData.get(
    allowedUpdateProfileProperties.maritalStatus,
  ) as string;
  const jobProfile = formData.get(
    allowedUpdateProfileProperties.jobProfile,
  ) as string;
  const experience = formData.get(
    allowedUpdateProfileProperties.experience,
  ) as string;
  const facebook = formData.get(
    allowedUpdateProfileProperties.facebook,
  ) as string;
  const instagram = formData.get(
    allowedUpdateProfileProperties.instagram,
  ) as string;
  const twitter = formData.get(
    allowedUpdateProfileProperties.twitter,
  ) as string;
  const github = formData.get(allowedUpdateProfileProperties.github) as string;
  const linkedin = formData.get(
    allowedUpdateProfileProperties.linkedin,
  ) as string;
  const youtube = formData.get(
    allowedUpdateProfileProperties.youtube,
  ) as string;
  const website = formData.get(
    allowedUpdateProfileProperties.website,
  ) as string;
  const company = formData.get(
    allowedUpdateProfileProperties.company,
  ) as string;
  const organization = formData.get(
    allowedUpdateProfileProperties.organization,
  ) as string;
  const skills = formData.get(allowedUpdateProfileProperties.skills);
  const interests = formData.get(allowedUpdateProfileProperties.interests);
  const address = Object.fromEntries(
    Object.entries(ADDRESS_PROPERTIES).map(([key, value]) => [
      key,
      formData.get(value),
    ]),
  ) as Record<keyof typeof ADDRESS_PROPERTIES, FormDataEntryValue | null>;

  const errors: ProfileUpdateFormStateType["errors"] = {};

  const { validatedName: validatedFirstName, nameErrors: firstNameErrors } =
    nameValidator(firstName, allowedUpdateProfileProperties.firstName);

  errors.firstName = [...(firstNameErrors ?? [])];

  const { validatedName: validatedMiddleName, nameErrors: middleNameErrors } =
    nameValidator(middleName, allowedUpdateProfileProperties.middleName);

  errors.middleName = [...(middleNameErrors ?? [])];

  const { validatedName: validatedLastName, nameErrors: lastNameErrors } =
    nameValidator(lastName, allowedUpdateProfileProperties.lastName);

  errors.lastName = [...(lastNameErrors ?? [])];

  const { validatedName: validatedNickName, nameErrors: nickNameErrors } =
    nameValidator(nickName, allowedUpdateProfileProperties.nickName);

  errors.nickName = [...(nickNameErrors ?? [])];

  const { validatedProperty: validatedAge, propertyErrors: ageErrors } =
    numberPropertiesValidator(
      age,
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

  const { validatedProperty: validatedPhone, propertyErrors: phoneErrors } =
    numberRegexPropertiesValidator(
      phone,
      PHONE_REGEX,
      ERROR_MESSAGES.invalidPhoneError,
    );

  errors.phone = [...(phoneErrors ?? [])];

  const { validatedProperty: validatedGender, propertyErrors: genderErrors } =
    allowedStringValidator(gender, Object.values(GENDER_PROPERTIES), {
      invalidError: ERROR_MESSAGES.invalidGenderError,
    });

  errors.gender = [...(genderErrors ?? [])];

  const {
    validatedProperty: validatedJobProfile,
    propertyErrors: jobProfileErrors,
  } = stringPropertiesValidator(
    jobProfile,
    USER_PROPERTY_CONSTRAINTS.minStringLength,
    USER_PROPERTY_CONSTRAINTS.maxStringLength,
    {
      invalidError: ERROR_MESSAGES.invalidJobProfileError,
      minLengthError: ERROR_MESSAGES.jobProfileMinLengthError,
      maxLengthError: ERROR_MESSAGES.jobProfileMaxLengthError,
    },
  );

  errors.jobProfile = [...(jobProfileErrors ?? [])];

  const {
    validatedProperty: validatedMaritalStatus,
    propertyErrors: maritalStatusErrors,
  } = allowedStringValidator(
    maritalStatus,
    Object.values(MARITAL_STATUS_PROPERTIES),
    {
      invalidError: ERROR_MESSAGES.invalidMaritalStatusError,
    },
  );

  errors.maritalStatus = [...(maritalStatusErrors ?? [])];

  const { validatedProperty: validatedBio, propertyErrors: bioErrors } =
    stringPropertiesValidator(
      bio,
      USER_PROPERTY_CONSTRAINTS.minStringLength,
      USER_PROPERTY_CONSTRAINTS.maxStringLength,
      {
        invalidError: ERROR_MESSAGES.invalidBioError,
        minLengthError: ERROR_MESSAGES.bioMinLengthError,
        maxLengthError: ERROR_MESSAGES.bioMaxLengthError,
      },
    );

  errors.bio = [...(bioErrors ?? [])];

  const {
    validatedProperty: validatedExperience,
    propertyErrors: experienceErrors,
  } = numberPropertiesValidator(
    experience,
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

  const {
    validatedProperty: validatedFacebookUrl,
    propertyErrors: facebookUrlErrors,
  } = regexPropertiesValidator(
    facebook,
    FACEBOOK_REGEX,
    ERROR_MESSAGES.invalidFacebookUrlError,
  );

  errors.facebook = [...(facebookUrlErrors ?? [])];

  const {
    validatedProperty: validatedInstagramUrl,
    propertyErrors: instagramUrlErrors,
  } = regexPropertiesValidator(
    instagram,
    INSTAGRAM_REGEX,
    ERROR_MESSAGES.invalidInstagramUrlError,
  );

  errors.instagram = [...(instagramUrlErrors ?? [])];
  const {
    validatedProperty: validatedTwitterUrl,
    propertyErrors: twitterUrlErrors,
  } = regexPropertiesValidator(
    twitter,
    TWITTER_REGEX,
    ERROR_MESSAGES.invalidTwitterUrlError,
  );

  errors.twitter = [...(twitterUrlErrors ?? [])];

  const {
    validatedProperty: validatedGithubUrl,
    propertyErrors: githubUrlErrors,
  } = regexPropertiesValidator(
    github,
    GITHUB_REGEX,
    ERROR_MESSAGES.invalidGithubUrlError,
  );

  errors.github = [...(githubUrlErrors ?? [])];

  const {
    validatedProperty: validatedLinkedinUrl,
    propertyErrors: linkedinUrlErrors,
  } = regexPropertiesValidator(
    linkedin,
    LINKEDIN_REGEX,
    ERROR_MESSAGES.invalidLinkedinUrlError,
  );

  errors.linkedin = [...(linkedinUrlErrors ?? [])];

  const {
    validatedProperty: validatedYoutubeUrl,
    propertyErrors: youtubeUrlErrors,
  } = regexPropertiesValidator(
    youtube,
    YOUTUBE_REGEX,
    ERROR_MESSAGES.invalidYoutubeUrlError,
  );

  errors.youtube = [...(youtubeUrlErrors ?? [])];

  const {
    validatedProperty: validatedWebsiteUrl,
    propertyErrors: websiteUrlErrors,
  } = regexPropertiesValidator(
    website,
    WEBSITE_REGEX,
    ERROR_MESSAGES.invalidWebsiteUrlError,
  );

  errors.website = [...(websiteUrlErrors ?? [])];

  const { validatedProperty: validatedCompany, propertyErrors: companyErrors } =
    stringPropertiesValidator(
      company,
      USER_PROPERTY_CONSTRAINTS.minStringLength,
      USER_PROPERTY_CONSTRAINTS.maxStringLength,
      {
        invalidError: ERROR_MESSAGES.invalidCompanyError,
        minLengthError: ERROR_MESSAGES.companyMinLengthError,
        maxLengthError: ERROR_MESSAGES.companyMaxLengthError,
      },
    );

  errors.company = [...(companyErrors ?? [])];

  const {
    validatedProperty: validatedOrganization,
    propertyErrors: organizationErrors,
  } = stringPropertiesValidator(
    organization,
    USER_PROPERTY_CONSTRAINTS.minStringLength,
    USER_PROPERTY_CONSTRAINTS.maxStringLength,
    {
      invalidError: ERROR_MESSAGES.invalidOrganizationError,
      minLengthError: ERROR_MESSAGES.organizationMinLengthError,
      maxLengthError: ERROR_MESSAGES.organizationMaxLengthError,
    },
  );

  errors.organization = [...(organizationErrors ?? [])];

  const skillsFormData =
    typeof skills === "string"
      ? skills.split(",")
      : Array.isArray(skills)
        ? skills
        : null;

  const { validatedProperty: validatedSkills, propertyErrors: skillsErrors } =
    listPropertiesValidator(skillsFormData, ERROR_MESSAGES.invalidSkillsError);

  errors.skills = [...(skillsErrors ?? [])];

  const interestsFormData =
    typeof interests === "string"
      ? interests.split(",")
      : Array.isArray(interests)
        ? interests
        : null;

  const {
    validatedProperty: validatedInterests,
    propertyErrors: interestsErrors,
  } = listPropertiesValidator(
    interestsFormData,
    ERROR_MESSAGES.invalidInterestsError,
  );

  errors.interests = [...(interestsErrors ?? [])];

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

  if (Object.values(errors).filter((item) => item.length > 0).length > 0) {
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
    data: {
      firstName: validatedFirstName,
      middleName: validatedMiddleName,
      lastName: validatedLastName,
      nickName: validatedNickName,
      age: validatedAge,
      phone: validatedPhone,
      gender: validatedGender,
      bio: validatedBio,
      maritalStatus: validatedMaritalStatus,
      jobProfile: validatedJobProfile,
      experience: validatedExperience,
      facebook: validatedFacebookUrl,
      instagram: validatedInstagramUrl,
      twitter: validatedTwitterUrl,
      github: validatedGithubUrl,
      linkedin: validatedLinkedinUrl,
      youtube: validatedYoutubeUrl,
      website: validatedWebsiteUrl,
      company: validatedCompany,
      organization: validatedOrganization,
      skills: validatedSkills,
      interests: validatedInterests,
      address: validatedAddress,
    },
    requiresAuth: true,
  });

  if (!result?.success) {
    return {
      message: "Profile update failed!",
      result,
      inputs: Object.fromEntries(formData),
      success: result?.success ?? false,
    };
  }

  revalidatePath(profileRoutes.profile);

  return {
    message: "Profile update successful!",
    result,
    success: result?.success ?? true,
  };
};
