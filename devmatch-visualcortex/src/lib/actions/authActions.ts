"use server";

import { cookies } from "next/headers";
import { AuthFormStateType } from "@/types/types";
import { ERROR_MESSAGES } from "@/config/constants";
import {
  emailValidator,
  firstNameValidator,
  passwordValidator,
  userNameValidator,
} from "@/lib/validations/validations";
import { apiUrls } from "@/lib/api/apiUrls";
import { api } from "../api/apiHandler";

export const registerAction = async (
  prevState: AuthFormStateType,
  formData: FormData
) => {
  const userName = formData.get("userName");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const errors: AuthFormStateType["errors"] = {};

  const { validatedUserName, userNameErrors } = userNameValidator(
    userName as string
  );
  errors.userName = [...(userNameErrors ?? [])];

  const { validatedEmail, emailErrors } = emailValidator(email as string);
  errors.email = [...(emailErrors ?? [])];

  const { validatedPassword, passwordErrors } = passwordValidator(
    password as string
  );
  errors.password = [...(passwordErrors ?? [])];

  const {
    validatedPassword: validatedConfirmPassword,
    passwordErrors: passwordConfirmErrors,
  } = passwordValidator(confirmPassword as string);
  errors.confirmPassword = [...(passwordConfirmErrors ?? [])];

  if (Object.values(errors).filter((item) => item.length > 0).length > 0) {
    return {
      message: "Validation Error",
      errors,
      success: false,
      inputs: Object.fromEntries(formData),
    };
  }

  const result = await api.post(apiUrls.register, {
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

  const cookieStore = await cookies();
  // const rawCookie = result?.cookies?.[0];
  // const tokenMatch = rawCookie?.match(/authToken=([^;]+)/);
  // const token = tokenMatch?.[1];

  // if (token) {
  //   cookieStore.set({
  //     name: "authToken",
  //     value: token,
  //     httpOnly: true,
  //     path: "/",
  //   });
  // } else {
  //   console.error("Auth token not found in cookies!");
  // }

  return {
    message: "Welcome!",
    result,
    success: result?.success ?? true,
  };
};

export const loginAction = async (
  prevState: AuthFormStateType,
  formData: FormData
) => {
  const userName = formData.get("userName");
  const email = formData.get("email");
  const password = formData.get("password");

  const errors: AuthFormStateType["errors"] = {};

  const { validatedUserName, userNameErrors } = userNameValidator(
    userName as string
  );
  errors.userName = [...(userNameErrors ?? [])];

  const { validatedEmail, emailErrors } = emailValidator(email as string);
  errors.email = [...(emailErrors ?? [])];

  if (validatedUserName && !validatedEmail) {
    errors.email = [];
  } else if (!validatedUserName && validatedEmail) {
    errors.userName = [];
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

  const result = await api.post(apiUrls.login, {
    data: {
      userName: validatedUserName,
      email: validatedEmail,
      password: validatedPassword,
    },
  });

  if (!result?.success) {
    return {
      message: "Authentication Error",
      result,
      success: result?.success ?? false,
    };
  }

  const cookieStore = await cookies();
  // const rawCookie = result?.cookies?.[0];
  // const tokenMatch = rawCookie?.match(/authToken=([^;]+)/);
  // const token = tokenMatch?.[1];

  // if (token) {
  //   cookieStore.set({
  //     name: "authToken",
  //     value: token,
  //     httpOnly: true,
  //     path: "/",
  //   });
  // } else {
  //   console.error("Auth token not found in cookies!");
  // }

  return {
    message: "Welcome back!",
    result,
    success: result?.success ?? true,
  };
};

export const forgotPasswordAction = async (
  prevState: AuthFormStateType,
  formData: FormData
) => {
  const email = formData.get("email");
  const firstName = formData.get("firstName");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const errors: AuthFormStateType["errors"] = {};

  const { validatedEmail, emailErrors } = emailValidator(email as string);
  errors.email = [...(emailErrors ?? [])];

  const { validatedFirstName, firstNameErrors } = firstNameValidator(
    firstName as string
  );
  errors.firstName = [...(firstNameErrors ?? [])];

  const { validatedPassword, passwordErrors } = passwordValidator(
    password as string
  );
  errors.password = [...(passwordErrors ?? [])];

  const {
    validatedPassword: validatedConfirmPassword,
    passwordErrors: passwordConfirmErrors,
  } = passwordValidator(confirmPassword as string);
  errors.confirmPassword = [...(passwordConfirmErrors ?? [])];

  if (validatedPassword !== validatedConfirmPassword) {
    errors.confirmPassword = [
      ERROR_MESSAGES.passwordConfirmPasswordMismatchError,
    ];
  }

  if (Object.values(errors).filter((item) => item.length > 0).length > 0) {
    return {
      message: "Validation Error",
      errors,
      success: false,
      inputs: Object.fromEntries(formData),
    };
  }

  const result = await api.patch(apiUrls.forgotPassword, {
    data: {
      firstName: validatedFirstName,
      email: validatedEmail,
      password: validatedPassword,
      confirmPassword: validatedConfirmPassword,
    },
  });

  if (!result?.success) {
    return {
      message: "Forgot Password Error!",
      result,
      success: result?.success ?? false,
    };
  }

  return {
    message: "Password Reset Successful!",
    result,
    success: result?.success ?? true,
  };
};
