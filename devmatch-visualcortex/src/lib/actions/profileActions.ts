"use server";

import { ERROR_MESSAGES, USER_PROPERTY_CONSTRAINTS } from "@/config/constants";
import { allowedUpdateProfileProperties } from "@/config/config";
import { ProfileUpdateFormStateType } from "@/types/types";
import {
  emailValidator,
  firstNameValidator,
  genderValidator,
  nameValidator,
  numberPropertiesValidator,
  passwordValidator,
  userNameValidator,
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
  const address = formData.get(allowedUpdateProfileProperties.address);

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
    numberPropertiesValidator(
      phone,
      USER_PROPERTY_CONSTRAINTS.phoneLength,
      USER_PROPERTY_CONSTRAINTS.phoneLength,
      {
        invalidError: ERROR_MESSAGES.invalidPhoneError,
        decimalError: ERROR_MESSAGES.invalidPhoneError,
        minLengthError: ERROR_MESSAGES.invalidPhoneError,
        maxLengthError: ERROR_MESSAGES.invalidPhoneError,
      },
    );

  errors.phone = [...(phoneErrors ?? [])];

  const { validatedGender, genderErrors } = genderValidator(gender);

  errors.gender = [...(genderErrors ?? [])];

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
    url: apiUrls.register,
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
      facebook: validatedFacebook,
      instagram: validatedInstagram,
      twitter: validatedTwitter,
      github: validatedGithub,
      youtube: validatedYoutube,
      website: validatedWebsite,
      company: validatedCompany,
      organization: validatedOrganization,
    },
    requiresAuth: false,
  });

  if (!result?.success) {
    return {
      message: "Registration Failed!",
      result,
      success: result?.success ?? false,
    };
  }

  return {
    message: "Welcome!",
    result,
    success: result?.success ?? true,
  };
};
