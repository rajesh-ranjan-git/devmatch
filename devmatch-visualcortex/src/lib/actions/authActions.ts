"use server";

export interface AuthFormState {
  message: string;
  success?: boolean;
  inputs?: Record<string, FormDataEntryValue>;
  errors?: {
    user_name?: string[];
    email?: string[];
    password?: string[];
    confirm_password?: string[];
    first_name?: string[];
    error?: string[];
  };
}

export async function loginAction(
  prevState: AuthFormState,
  formData: FormData
) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const user_name = formData.get("user_name");
  const email = formData.get("email");
  const password = formData.get("password");

  const errors: AuthFormState["errors"] = {};

  if (!user_name) {
    errors.user_name = ["Username is required!"];
  }

  if (!email) {
    errors.email = ["Email is required!"];
  }

  if (!password) {
    errors.password = ["Password is required!"];
  }

  if (Object.keys(errors).length > 0) {
    return {
      message: "Validation Error",
      errors,
      success: false,
      inputs: Object.fromEntries(formData),
    };
  }

  if (
    (user_name !== "rajesh" || email !== "rajesh@gmail.com") &&
    password !== "Rajesh@0"
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
  prevState: AuthFormState,
  formData: FormData
) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const user_name = formData.get("user_name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirm_password = formData.get("confirm_password");

  const errors: AuthFormState["errors"] = {};

  if (!user_name) {
    errors.user_name = ["Username is required!"];
  }

  if (!email) {
    errors.email = ["Email is required!"];
  }

  if (!password) {
    errors.password = ["Password is required!"];
  }

  if (!confirm_password) {
    errors.confirm_password = ["Confirm Password is required!"];
  }

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
  prevState: AuthFormState,
  formData: FormData
) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const email = formData.get("email");
  const first_name = formData.get("first_name");
  const password = formData.get("password");
  const confirm_password = formData.get("confirm_password");

  const errors: AuthFormState["errors"] = {};

  if (!email) {
    errors.email = ["Email is required!"];
  }

  if (!first_name) {
    errors.first_name = ["First Name is required!"];
  }

  if (!password) {
    errors.password = ["Password is required!"];
  }

  if (!confirm_password) {
    errors.confirm_password = ["Confirm Password is required!"];
  }

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
