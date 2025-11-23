"use client";

import { useActionState, useEffect } from "react";
import Form from "next/form";
import Link from "next/link";
import { AUTH_FORM_FIELDS, INPUT_TYPES } from "@/config/constants";
import {
  authFormFieldInputItems,
  authFormFieldButtonItems,
} from "@/config/config";
import { AuthFormWrapperProps } from "@/types/propTypes";
import { authRoutes } from "@/lib/routes/routes";
import { toTitleCase } from "@/lib/utils/utils";
import {
  loginAction,
  registerAction,
  forgotPasswordAction,
  AuthFormState,
} from "@/lib/actions/authActions";
import Input from "@/components/auth/input";
import SubmitButton from "@/components/ui/buttons/submitButton";

const AuthForm = ({ type }: AuthFormWrapperProps) => {
  const initialState: AuthFormState = { message: "" };

  const [state, formAction, isPending] = useActionState(
    type === authRoutes.login
      ? loginAction
      : type === authRoutes.register
      ? registerAction
      : forgotPasswordAction,
    initialState
  );

  useEffect(() => {
    console.log("debug from authForm state : ", state);
  }, [state]);

  return (
    <div className="relative flex flex-col justify-center items-center py-8 pr-2 w-full h-full">
      <div className="px-8 w-full">
        <h2 className="before:-bottom-2.5 before:left-0 before:absolute relative mb-2 before:rounded-full w-full before:w-20 before:h-1 overflow-x-visible font-arima font-extrabold text-glass-text-primary before:bg-glass-text-primary text-2xl before:content-[''] tracking-wider">
          {type === authRoutes.login
            ? authFormFieldButtonItems?.login?.label
            : type === authRoutes.register
            ? authFormFieldButtonItems?.register?.label
            : authFormFieldButtonItems?.forgot_password?.label}
        </h2>
      </div>
      <div className="[&::-webkit-scrollbar-track]:bg-transparent mt-3 px-8 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full w-full [&::-webkit-scrollbar]:w-1 h-full overflow-x-visible overflow-y-scroll [&::-webkit-scrollbar-thumb]:bg-glass-text-tertiary [&::-webkit-scrollbar-thumb]:hover:bg-glass-text-tertiary transition-all ease-in-out">
        <Form
          className="w-[90%] text-md"
          action={formAction}
          autoComplete="false"
        >
          {type === authRoutes.login ? (
            <>
              <div className="w-full">
                <Input
                  name={
                    authFormFieldInputItems?.user_name?.name ??
                    AUTH_FORM_FIELDS.user_name
                  }
                  type={
                    authFormFieldInputItems?.user_name?.type ?? INPUT_TYPES.text
                  }
                  placeholder={
                    authFormFieldInputItems?.user_name?.placeholder ??
                    toTitleCase(AUTH_FORM_FIELDS.user_name)
                  }
                  defaultValue={
                    state?.success === false &&
                    state?.inputs &&
                    state?.inputs?.user_name
                      ? (state?.inputs?.user_name as string)
                      : ""
                  }
                  className={
                    state?.success === false &&
                    state?.errors &&
                    state?.errors?.user_name
                      ? "shadow-red-400"
                      : ""
                  }
                />
                {!state?.success &&
                  state?.errors &&
                  state?.errors?.user_name && (
                    <p className="mx-5 mt-2 text-red-400 text-sm">
                      {state?.errors?.user_name}
                    </p>
                  )}
              </div>
              <div className="mt-3 ml-5 w-full">OR</div>
              <div className="w-full">
                <Input
                  name={
                    authFormFieldInputItems?.email?.name ??
                    AUTH_FORM_FIELDS.email
                  }
                  type={
                    authFormFieldInputItems?.email?.type ?? INPUT_TYPES.email
                  }
                  placeholder={
                    authFormFieldInputItems?.email?.placeholder ??
                    toTitleCase(INPUT_TYPES.email)
                  }
                  defaultValue={
                    state?.success === false &&
                    state?.inputs &&
                    state?.inputs?.email
                      ? (state?.inputs?.email as string)
                      : ""
                  }
                  className={
                    state?.success === false &&
                    state?.errors &&
                    state?.errors?.email
                      ? "shadow-red-400"
                      : ""
                  }
                />
                {!state?.success && state?.errors && state?.errors?.email && (
                  <p className="mx-5 mt-2 text-red-400 text-sm">
                    {state?.errors?.email}
                  </p>
                )}
              </div>
              <div className="w-full">
                <Input
                  name={
                    authFormFieldInputItems?.password?.name ??
                    AUTH_FORM_FIELDS.password
                  }
                  type={
                    authFormFieldInputItems?.password?.type ??
                    INPUT_TYPES.password
                  }
                  placeholder={
                    authFormFieldInputItems?.password?.placeholder ??
                    toTitleCase(INPUT_TYPES.password)
                  }
                  defaultValue={
                    state?.success === false &&
                    state?.inputs &&
                    state?.inputs?.password
                      ? (state?.inputs?.password as string)
                      : ""
                  }
                  className={
                    state?.success === false &&
                    state?.errors &&
                    state?.errors?.password
                      ? "shadow-red-400"
                      : ""
                  }
                />
                {!state?.success &&
                  state?.errors &&
                  state?.errors?.password && (
                    <p className="mx-5 mt-2 text-red-400 text-sm">
                      {state?.errors?.password}
                    </p>
                  )}
              </div>
            </>
          ) : type === authRoutes?.register ? (
            <>
              <div className="w-full">
                <Input
                  name={
                    authFormFieldInputItems?.user_name?.name ??
                    AUTH_FORM_FIELDS.user_name
                  }
                  type={
                    authFormFieldInputItems?.user_name?.type ?? INPUT_TYPES.text
                  }
                  placeholder={
                    authFormFieldInputItems?.user_name?.placeholder ??
                    toTitleCase(AUTH_FORM_FIELDS.user_name)
                  }
                  defaultValue={
                    state?.success === false &&
                    state?.inputs &&
                    state?.inputs?.user_name
                      ? (state?.inputs?.user_name as string)
                      : ""
                  }
                  className={
                    state?.success === false &&
                    state?.errors &&
                    state?.errors?.user_name
                      ? "shadow-red-400"
                      : ""
                  }
                />
                {!state?.success &&
                  state?.errors &&
                  state?.errors?.user_name && (
                    <p className="mx-5 mt-2 text-red-400 text-sm">
                      {state?.errors?.user_name}
                    </p>
                  )}
              </div>
              <div className="w-full">
                <Input
                  name={
                    authFormFieldInputItems?.email?.name ??
                    AUTH_FORM_FIELDS.email
                  }
                  type={
                    authFormFieldInputItems?.email?.type ?? INPUT_TYPES.email
                  }
                  placeholder={
                    authFormFieldInputItems?.email?.placeholder ??
                    toTitleCase(INPUT_TYPES.email)
                  }
                  defaultValue={
                    state?.success === false &&
                    state?.inputs &&
                    state?.inputs?.email
                      ? (state?.inputs?.email as string)
                      : ""
                  }
                  className={
                    state?.success === false &&
                    state?.errors &&
                    state?.errors?.email
                      ? "shadow-red-400"
                      : ""
                  }
                />
                {!state?.success && state?.errors && state?.errors?.email && (
                  <p className="mx-5 mt-2 text-red-400 text-sm">
                    {state?.errors?.email}
                  </p>
                )}
              </div>
              <div className="w-full">
                <Input
                  name={
                    authFormFieldInputItems?.password?.name ??
                    AUTH_FORM_FIELDS.password
                  }
                  type={
                    authFormFieldInputItems?.password?.type ??
                    INPUT_TYPES.password
                  }
                  placeholder={
                    authFormFieldInputItems?.password?.placeholder ??
                    toTitleCase(INPUT_TYPES.password)
                  }
                  defaultValue={
                    state?.success === false &&
                    state?.inputs &&
                    state?.inputs?.password
                      ? (state?.inputs?.password as string)
                      : ""
                  }
                  className={
                    state?.success === false &&
                    state?.errors &&
                    state?.errors?.password
                      ? "shadow-red-400"
                      : ""
                  }
                />
                {!state?.success &&
                  state?.errors &&
                  state?.errors?.password && (
                    <p className="mx-5 mt-2 text-red-400 text-sm">
                      {state?.errors?.password}
                    </p>
                  )}
              </div>
              <div className="w-full">
                <Input
                  name={
                    authFormFieldInputItems?.confirm_password?.name ??
                    AUTH_FORM_FIELDS.confirm_password
                  }
                  type={
                    authFormFieldInputItems?.confirm_password?.type ??
                    INPUT_TYPES.password
                  }
                  placeholder={
                    authFormFieldInputItems?.confirm_password?.placeholder ??
                    toTitleCase(INPUT_TYPES.password)
                  }
                  defaultValue={
                    state?.success === false &&
                    state?.inputs &&
                    state?.inputs?.confirm_password
                      ? (state?.inputs?.confirm_password as string)
                      : ""
                  }
                  className={
                    state?.success === false &&
                    state?.errors &&
                    state?.errors?.confirm_password
                      ? "shadow-red-400"
                      : ""
                  }
                />
                {!state?.success &&
                  state?.errors &&
                  state?.errors?.confirm_password && (
                    <p className="mx-5 mt-2 text-red-400 text-sm">
                      {state?.errors?.confirm_password}
                    </p>
                  )}
              </div>
            </>
          ) : (
            <>
              <div className="w-full">
                <Input
                  name={
                    authFormFieldInputItems?.email?.name ??
                    AUTH_FORM_FIELDS.email
                  }
                  type={
                    authFormFieldInputItems?.email?.type ?? INPUT_TYPES.email
                  }
                  placeholder={
                    authFormFieldInputItems?.email?.placeholder ??
                    toTitleCase(INPUT_TYPES.email)
                  }
                  defaultValue={
                    state?.success === false &&
                    state?.inputs &&
                    state?.inputs?.email
                      ? (state?.inputs?.email as string)
                      : ""
                  }
                  className={
                    state?.success === false &&
                    state?.errors &&
                    state?.errors?.email
                      ? "shadow-red-400"
                      : ""
                  }
                />
                {!state?.success && state?.errors && state?.errors?.email && (
                  <p className="mx-5 mt-2 text-red-400 text-sm">
                    {state?.errors?.email}
                  </p>
                )}
              </div>
              <div className="mt-3 ml-5 w-full text-sm">
                Enter First Name for security!
              </div>
              <div className="w-full">
                <Input
                  name={
                    authFormFieldInputItems?.first_name?.name ??
                    AUTH_FORM_FIELDS.first_name
                  }
                  type={
                    authFormFieldInputItems?.first_name?.type ??
                    INPUT_TYPES.text
                  }
                  placeholder={
                    authFormFieldInputItems?.first_name?.placeholder ??
                    toTitleCase(AUTH_FORM_FIELDS.first_name)
                  }
                  defaultValue={
                    state?.success === false &&
                    state?.inputs &&
                    state?.inputs?.first_name
                      ? (state?.inputs?.first_name as string)
                      : ""
                  }
                  className={
                    state?.success === false &&
                    state?.errors &&
                    state?.errors?.first_name
                      ? "shadow-red-400"
                      : ""
                  }
                />
                {!state?.success &&
                  state?.errors &&
                  state?.errors?.first_name && (
                    <p className="mx-5 mt-2 text-red-400 text-sm">
                      {state?.errors?.first_name}
                    </p>
                  )}
              </div>
              <div className="w-full">
                <Input
                  name={
                    authFormFieldInputItems?.password?.name ??
                    AUTH_FORM_FIELDS.password
                  }
                  type={
                    authFormFieldInputItems?.password?.type ??
                    INPUT_TYPES.password
                  }
                  placeholder={
                    authFormFieldInputItems?.password?.placeholder ??
                    toTitleCase(INPUT_TYPES.password)
                  }
                  defaultValue={
                    state?.success === false &&
                    state?.inputs &&
                    state?.inputs?.password
                      ? (state?.inputs?.password as string)
                      : ""
                  }
                  className={
                    state?.success === false &&
                    state?.errors &&
                    state?.errors?.password
                      ? "shadow-red-400"
                      : ""
                  }
                />
                {!state?.success &&
                  state?.errors &&
                  state?.errors?.password && (
                    <p className="mx-5 mt-2 text-red-400 text-sm">
                      {state?.errors?.password}
                    </p>
                  )}
              </div>
              <div className="w-full">
                <Input
                  name={
                    authFormFieldInputItems?.confirm_password?.name ??
                    AUTH_FORM_FIELDS.confirm_password
                  }
                  type={
                    authFormFieldInputItems?.confirm_password?.type ??
                    INPUT_TYPES.password
                  }
                  placeholder={
                    authFormFieldInputItems?.confirm_password?.placeholder ??
                    toTitleCase(INPUT_TYPES.password)
                  }
                  defaultValue={
                    state?.success === false &&
                    state?.inputs &&
                    state?.inputs?.confirm_password
                      ? (state?.inputs?.confirm_password as string)
                      : ""
                  }
                  className={
                    state?.success === false &&
                    state?.errors &&
                    state?.errors?.confirm_password
                      ? "shadow-red-400"
                      : ""
                  }
                />
                {!state?.success &&
                  state?.errors &&
                  state?.errors?.confirm_password && (
                    <p className="mx-5 mt-2 text-red-400 text-sm">
                      {state?.errors?.confirm_password}
                    </p>
                  )}
              </div>
            </>
          )}

          {type === authRoutes.login ? (
            <SubmitButton
              icon={authFormFieldButtonItems?.login?.icon}
              text={
                isPending
                  ? "Logging in..."
                  : authFormFieldButtonItems?.login?.label
              }
              className={isPending ? "w-64" : ""}
            />
          ) : type === authRoutes.register ? (
            <SubmitButton
              icon={authFormFieldButtonItems?.register?.icon}
              text={
                isPending
                  ? "Registering..."
                  : authFormFieldButtonItems?.register?.label
              }
              className={isPending ? "w-64" : ""}
            />
          ) : (
            <SubmitButton
              icon={authFormFieldButtonItems?.forgot_password?.icon}
              text={
                isPending
                  ? "Resetting Password..."
                  : authFormFieldButtonItems?.forgot_password?.label
              }
              className={isPending ? "w-84" : "w-64"}
            />
          )}

          {type !== authRoutes.forgotPassword ? (
            <div className="flex gap-2 mt-1.5 text-glass-text-primary text-sm">
              Forgot password?{" "}
              <Link
                href={authFormFieldButtonItems?.forgot_password?.url ?? "#"}
                className="font-semibold text-glass-text-primary hover:underline underline-offset-2 cursor-pointer"
              >
                Click Here
              </Link>
            </div>
          ) : (
            <>
              <div className="flex gap-2 mt-1.5 text-glass-text-primary text-sm">
                Don't have an account?{" "}
                <Link
                  href={authFormFieldButtonItems?.register?.url ?? "#"}
                  className="font-semibold text-glass-text-primary hover:underline underline-offset-2 cursor-pointer"
                >
                  {authFormFieldButtonItems?.register?.label}
                </Link>
              </div>
              <div className="flex gap-2 mt-1.5 text-glass-text-primary text-sm">
                Already a member?{" "}
                <Link
                  href={authFormFieldButtonItems?.login?.url ?? "#"}
                  className="font-semibold text-glass-text-primary hover:underline underline-offset-2 cursor-pointer"
                >
                  {authFormFieldButtonItems?.login?.label}
                </Link>
              </div>
            </>
          )}

          {type === authRoutes.login ? (
            <div className="flex gap-2 mt-1.5 text-glass-text-primary text-sm">
              Don't have an account?{" "}
              <Link
                href={authFormFieldButtonItems?.register?.url ?? "#"}
                className="font-semibold text-glass-text-primary hover:underline underline-offset-2 cursor-pointer"
              >
                {authFormFieldButtonItems?.register?.label}
              </Link>
            </div>
          ) : type === authRoutes?.register ? (
            <div className="flex gap-2 mt-1.5 text-glass-text-primary text-sm">
              Already a member?{" "}
              <Link
                href={authFormFieldButtonItems?.login?.url ?? "#"}
                className="font-semibold text-glass-text-primary hover:underline underline-offset-2 cursor-pointer"
              >
                {authFormFieldButtonItems?.login?.label}
              </Link>
            </div>
          ) : null}
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
