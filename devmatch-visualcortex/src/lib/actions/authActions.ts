"use server";

import { AuthFormStateType } from "@/types/types";
import {
  emailValidator,
  firstNameValidator,
  passwordValidator,
  userNameValidator,
} from "../validations/validations";

export async function loginAction(
  prevState: AuthFormStateType,
  formData: FormData
) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const user_name = formData.get("user_name");
  const email = formData.get("email");
  const password = formData.get("password");

  const errors: AuthFormStateType["errors"] = {};

  const { validatedUserName, userNameErrors } = userNameValidator(
    user_name as string
  );
  errors.user_name = [...userNameErrors];

  const { validatedEmail, emailErrors } = emailValidator(email as string);
  errors.email = [...emailErrors];

  const { validatedPassword, passwordErrors } = passwordValidator(
    password as string
  );
  errors.password = [...passwordErrors];

  if (Object.keys(errors).length > 0) {
    return {
      message: "Validation Error",
      errors,
      success: false,
      inputs: Object.fromEntries(formData),
    };
  }

  if (
    (validatedUserName !== "rajesh" || validatedEmail !== "rajesh@gmail.com") &&
    validatedPassword !== "Rajesh@0"
  ) {
    errors.error = ["Username/Email or Password is incorrect!"];
  }

  if (errors?.error) {
    return {
      message: "Authentication Error",
      errors,
      success: false,
    };
  }

  return {
    message: "Login successful, Welcome back!",
    success: true,
  };
}

export async function registerAction(
  prevState: AuthFormStateType,
  formData: FormData
) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const user_name = formData.get("user_name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirm_password = formData.get("confirm_password");

  const errors: AuthFormStateType["errors"] = {};

  const { validatedUserName, userNameErrors } = userNameValidator(
    user_name as string
  );
  errors.user_name = [...userNameErrors];

  const { validatedEmail, emailErrors } = emailValidator(email as string);
  errors.email = [...emailErrors];

  const { validatedPassword, passwordErrors } = passwordValidator(
    password as string
  );
  errors.password = [...passwordErrors];

  const {
    validatedPassword: validatedConfirmPassword,
    passwordErrors: passwordConfirmErrors,
  } = passwordValidator(confirm_password as string);
  errors.confirm_password = [...passwordConfirmErrors];

  if (Object.keys(errors).length > 0) {
    return {
      message: "Validation Error",
      errors,
      success: false,
      inputs: Object.fromEntries(formData),
    };
  }

  return {
    message: "Registration successful, Welcome!",
    success: true,
  };
}

export async function forgotPasswordAction(
  prevState: AuthFormStateType,
  formData: FormData
) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const email = formData.get("email");
  const first_name = formData.get("first_name");
  const password = formData.get("password");
  const confirm_password = formData.get("confirm_password");

  const errors: AuthFormStateType["errors"] = {};

  const { validatedEmail, emailErrors } = emailValidator(email as string);
  errors.email = [...emailErrors];

  const { validatedFirstName, firstNameErrors } = firstNameValidator(
    first_name as string
  );
  errors.first_name = [...firstNameErrors];

  const { validatedPassword, passwordErrors } = passwordValidator(
    password as string
  );
  errors.password = [...passwordErrors];

  const {
    validatedPassword: validatedConfirmPassword,
    passwordErrors: passwordConfirmErrors,
  } = passwordValidator(confirm_password as string);
  errors.confirm_password = [...passwordConfirmErrors];

  if (Object.keys(errors).length > 0) {
    return {
      message: "Validation Error",
      errors,
      success: false,
      inputs: Object.fromEntries(formData),
    };
  }

  return {
    message: "Password reset successful, Please login again!",
    success: true,
  };
}
