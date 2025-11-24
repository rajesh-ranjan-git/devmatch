"use server";

import { AuthFormStateType } from "@/types/types";
import {
  emailValidator,
  firstNameValidator,
  passwordValidator,
  userNameValidator,
} from "../validations/validations";
import { fetchApiData } from "../api/fetchApiData";
import { apiUrls } from "../api/apiUrls";
import { toTitleCase } from "../utils/utils";

export async function registerAction(
  prevState: AuthFormStateType,
  formData: FormData
) {
  const user_name = formData.get("user_name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirm_password = formData.get("confirm_password");

  const errors: AuthFormStateType["errors"] = {};

  const { validatedUserName, userNameErrors } = userNameValidator(
    user_name as string
  );
  errors.user_name = [...(userNameErrors ?? [])];

  const { validatedEmail, emailErrors } = emailValidator(email as string);
  errors.email = [...(emailErrors ?? [])];

  const { validatedPassword, passwordErrors } = passwordValidator(
    password as string
  );
  errors.password = [...(passwordErrors ?? [])];

  const {
    validatedPassword: validatedConfirmPassword,
    passwordErrors: passwordConfirmErrors,
  } = passwordValidator(confirm_password as string);
  errors.confirm_password = [...(passwordConfirmErrors ?? [])];

  if (Object.values(errors).filter((item) => item.length > 0).length > 0) {
    return {
      message: "Validation Error",
      errors,
      success: false,
      inputs: Object.fromEntries(formData),
    };
  }

  const result = await fetchApiData(apiUrls.register, {
    method: "POST",
    data: {
      userName: validatedUserName,
      email: validatedEmail,
      password: validatedPassword,
      confirmPassword: validatedConfirmPassword,
    },
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
}

export async function loginAction(
  prevState: AuthFormStateType,
  formData: FormData
) {
  const user_name = formData.get("user_name");
  const email = formData.get("email");
  const password = formData.get("password");

  const errors: AuthFormStateType["errors"] = {};

  const { validatedUserName, userNameErrors } = userNameValidator(
    user_name as string
  );
  errors.user_name = [...(userNameErrors ?? [])];

  const { validatedEmail, emailErrors } = emailValidator(email as string);
  errors.email = [...(emailErrors ?? [])];

  if (validatedUserName && !validatedEmail) {
    errors.email = [];
  } else if (!validatedUserName && validatedEmail) {
    errors.user_name = [];
  }

  const { validatedPassword, passwordErrors } = passwordValidator(
    password as string
  );
  errors.password = [...(passwordErrors ?? [])];

  if (Object.values(errors).filter((error) => error.length > 0).length > 0) {
    return {
      message: "Validation Error",
      errors,
      success: false,
      inputs: Object.fromEntries(formData),
    };
  }

  const result = await fetchApiData(apiUrls.login, {
    method: "POST",
    data: { email: validatedEmail, password: validatedPassword },
  });

  if (!result?.success) {
    return {
      message: "Authentication Error",
      result,
      success: result?.success ?? false,
    };
  }

  return {
    message: "Welcome back!",
    result,
    success: result?.success ?? true,
  };
}

export async function forgotPasswordAction(
  prevState: AuthFormStateType,
  formData: FormData
) {
  const email = formData.get("email");
  const first_name = formData.get("first_name");
  const password = formData.get("password");
  const confirm_password = formData.get("confirm_password");

  const errors: AuthFormStateType["errors"] = {};

  const { validatedEmail, emailErrors } = emailValidator(email as string);
  errors.email = [...(emailErrors ?? [])];

  const { validatedFirstName, firstNameErrors } = firstNameValidator(
    first_name as string
  );
  errors.first_name = [...(firstNameErrors ?? [])];

  const { validatedPassword, passwordErrors } = passwordValidator(
    password as string
  );
  errors.password = [...(passwordErrors ?? [])];

  const {
    validatedPassword: validatedConfirmPassword,
    passwordErrors: passwordConfirmErrors,
  } = passwordValidator(confirm_password as string);
  errors.confirm_password = [...(passwordConfirmErrors ?? [])];

  if (Object.values(errors).filter((item) => item.length > 0).length > 0) {
    return {
      message: "Validation Error",
      errors,
      success: false,
      inputs: Object.fromEntries(formData),
    };
  }

  const result = await fetchApiData(apiUrls.register, {
    method: "POST",
    data: {
      first_name: validatedFirstName,
      email: validatedEmail,
      password: validatedPassword,
      confirm_password: validatedConfirmPassword,
    },
  });

  if (!result?.success) {
    return {
      message: "Registration Error!",
      result,
      success: result?.success ?? false,
    };
  }

  return {
    message: "Password reset successful, Please login again!",
    result,
    success: result?.success ?? true,
  };
}
