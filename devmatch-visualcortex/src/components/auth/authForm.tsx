"use client";

import { useActionState, useEffect } from "react";
import Form from "next/form";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AUTH_FORM_FIELDS, INPUT_TYPES } from "@/config/constants";
import {
  authFormFieldInputItems,
  authFormFieldButtonItems,
} from "@/config/config";
import { AuthFormStateType } from "@/types/types";
import { AuthFormWrapperProps } from "@/types/propTypes";
import { authRoutes } from "@/lib/routes/routes";
import { toTitleCase } from "@/lib/utils/utils";
import {
  loginAction,
  registerAction,
  forgotPasswordAction,
} from "@/lib/actions/authActions";
import { useDevMatchAppStore } from "@/store/store";
import Input from "@/components/auth/input";
import FormErrorMessage from "@/components/errors/formErrorMessage";
import { useToast } from "@/components/toast/toast";
import SubmitButton from "@/components/ui/buttons/submitButton";

const AuthForm = ({ type }: AuthFormWrapperProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const { showToast } = useToast();

  const setLoggedInUser = useDevMatchAppStore((state) => state.setLoggedInUser);

  const initialState: AuthFormStateType = { message: "" };

  const [state, formAction, isPending] = useActionState(
    type === authRoutes.login
      ? loginAction
      : type === authRoutes.register
      ? registerAction
      : forgotPasswordAction,
    initialState
  );

  useEffect(() => {
    if (!state?.success && !state?.result?.success && state?.result?.error) {
      showToast({
        title: toTitleCase(state?.message),
        message: state?.result?.error?.message,
        variant: "error",
      });
    } else if (state?.result?.success && state?.result?.data) {
      setLoggedInUser(state?.result?.data?.user);
      if (pathname.includes(authRoutes.forgotPassword)) {
        router.push("/login");
      } else {
        router.push("/explore");
      }
      showToast({
        title: toTitleCase(state?.message),
        message: state?.result?.data?.message,
        variant: "success",
      });
    }
  }, [state?.result]);

  return (
    <div className="relative flex flex-col justify-center items-center py-8 pr-2 w-full h-full transition-all ease-in-out">
      <div className="px-8 w-full transition-all ease-in-out">
        <h2 className="before:-bottom-2.5 before:left-0 before:absolute relative mb-2 before:rounded-full w-full before:w-20 before:h-1 overflow-x-visible font-arima font-extrabold text-glass-text-primary before:bg-glass-text-primary text-2xl before:content-[''] tracking-wider">
          {type === authRoutes.login
            ? authFormFieldButtonItems?.login?.label
            : type === authRoutes.register
            ? authFormFieldButtonItems?.register?.label
            : authFormFieldButtonItems?.forgotPassword?.label}
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
                    authFormFieldInputItems?.userName?.name ??
                    AUTH_FORM_FIELDS.userName
                  }
                  type={
                    authFormFieldInputItems?.userName?.type ?? INPUT_TYPES.text
                  }
                  placeholder={
                    authFormFieldInputItems?.userName?.placeholder ??
                    toTitleCase(AUTH_FORM_FIELDS.userName)
                  }
                  defaultValue={
                    state?.success === false &&
                    state?.inputs &&
                    state?.inputs?.userName
                      ? (state?.inputs?.userName as string)
                      : ""
                  }
                  className={
                    state?.success === false &&
                    state?.errors &&
                    state?.errors?.userName &&
                    state?.errors?.userName?.length > 0
                      ? "shadow-red-400"
                      : ""
                  }
                />

                <FormErrorMessage
                  errors={
                    !state?.success && state?.errors && state?.errors?.userName
                      ? state?.errors?.userName
                      : null
                  }
                />
              </div>
              <div className="mt-2 ml-5 w-full">OR</div>
              <div className="-mt-2 w-full">
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
                    state?.errors?.email &&
                    state?.errors?.email?.length > 0
                      ? "shadow-red-400"
                      : ""
                  }
                />
                <FormErrorMessage
                  errors={
                    !state?.success && state?.errors && state?.errors?.email
                      ? state?.errors?.email
                      : null
                  }
                />
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
                    state?.errors?.password &&
                    state?.errors?.password?.length > 0
                      ? "shadow-red-400"
                      : ""
                  }
                />
                <FormErrorMessage
                  errors={
                    !state?.success && state?.errors && state?.errors?.password
                      ? state?.errors?.password
                      : null
                  }
                />
              </div>
            </>
          ) : type === authRoutes?.register ? (
            <>
              <div className="w-full">
                <Input
                  name={
                    authFormFieldInputItems?.userName?.name ??
                    AUTH_FORM_FIELDS.userName
                  }
                  type={
                    authFormFieldInputItems?.userName?.type ?? INPUT_TYPES.text
                  }
                  placeholder={
                    authFormFieldInputItems?.userName?.placeholder ??
                    toTitleCase(AUTH_FORM_FIELDS.userName)
                  }
                  defaultValue={
                    state?.success === false &&
                    state?.inputs &&
                    state?.inputs?.userName
                      ? (state?.inputs?.userName as string)
                      : ""
                  }
                  className={
                    state?.success === false &&
                    state?.errors &&
                    state?.errors?.userName &&
                    state?.errors?.userName?.length > 0
                      ? "shadow-red-400"
                      : ""
                  }
                />
                <FormErrorMessage
                  errors={
                    !state?.success && state?.errors && state?.errors?.userName
                      ? state?.errors?.userName
                      : null
                  }
                />
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
                    state?.errors?.email &&
                    state?.errors?.email?.length > 0
                      ? "shadow-red-400"
                      : ""
                  }
                />
                <FormErrorMessage
                  errors={
                    !state?.success && state?.errors && state?.errors?.email
                      ? state?.errors?.email
                      : null
                  }
                />
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
                    state?.errors?.password &&
                    state?.errors?.password?.length > 0
                      ? "shadow-red-400"
                      : ""
                  }
                />
                <FormErrorMessage
                  errors={
                    !state?.success && state?.errors && state?.errors?.password
                      ? state?.errors?.password
                      : null
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  name={
                    authFormFieldInputItems?.confirmPassword?.name ??
                    AUTH_FORM_FIELDS.confirmPassword
                  }
                  type={
                    authFormFieldInputItems?.confirmPassword?.type ??
                    INPUT_TYPES.password
                  }
                  placeholder={
                    authFormFieldInputItems?.confirmPassword?.placeholder ??
                    toTitleCase(INPUT_TYPES.password)
                  }
                  defaultValue={
                    state?.success === false &&
                    state?.inputs &&
                    state?.inputs?.confirmPassword
                      ? (state?.inputs?.confirmPassword as string)
                      : ""
                  }
                  className={
                    state?.success === false &&
                    state?.errors &&
                    state?.errors?.confirmPassword &&
                    state?.errors?.confirmPassword?.length > 0
                      ? "shadow-red-400"
                      : ""
                  }
                />
                <FormErrorMessage
                  errors={
                    !state?.success &&
                    state?.errors &&
                    state?.errors?.confirmPassword
                      ? state?.errors?.confirmPassword
                      : null
                  }
                />
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
                    state?.errors?.email &&
                    state?.errors?.email?.length > 0
                      ? "shadow-red-400"
                      : ""
                  }
                />
                <FormErrorMessage
                  errors={
                    !state?.success && state?.errors && state?.errors?.email
                      ? state?.errors?.email
                      : null
                  }
                />
              </div>
              <div className="mt-3 ml-5 w-full text-sm">
                Enter First Name for security!
              </div>
              <div className="w-full">
                <Input
                  name={
                    authFormFieldInputItems?.firstName?.name ??
                    AUTH_FORM_FIELDS.firstName
                  }
                  type={
                    authFormFieldInputItems?.firstName?.type ?? INPUT_TYPES.text
                  }
                  placeholder={
                    authFormFieldInputItems?.firstName?.placeholder ??
                    toTitleCase(AUTH_FORM_FIELDS.firstName)
                  }
                  defaultValue={
                    state?.success === false &&
                    state?.inputs &&
                    state?.inputs?.firstName
                      ? (state?.inputs?.firstName as string)
                      : ""
                  }
                  className={
                    state?.success === false &&
                    state?.errors &&
                    state?.errors?.firstName &&
                    state?.errors?.firstName?.length > 0
                      ? "shadow-red-400"
                      : ""
                  }
                />

                <FormErrorMessage
                  errors={
                    !state?.success && state?.errors && state?.errors?.firstName
                      ? state?.errors?.firstName
                      : null
                  }
                />
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
                    state?.errors?.password &&
                    state?.errors?.password?.length > 0
                      ? "shadow-red-400"
                      : ""
                  }
                />
                <FormErrorMessage
                  errors={
                    !state?.success && state?.errors && state?.errors?.password
                      ? state?.errors?.password
                      : null
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  name={
                    authFormFieldInputItems?.confirmPassword?.name ??
                    AUTH_FORM_FIELDS.confirmPassword
                  }
                  type={
                    authFormFieldInputItems?.confirmPassword?.type ??
                    INPUT_TYPES.password
                  }
                  placeholder={
                    authFormFieldInputItems?.confirmPassword?.placeholder ??
                    toTitleCase(INPUT_TYPES.password)
                  }
                  defaultValue={
                    state?.success === false &&
                    state?.inputs &&
                    state?.inputs?.confirmPassword
                      ? (state?.inputs?.confirmPassword as string)
                      : ""
                  }
                  className={
                    state?.success === false &&
                    state?.errors &&
                    state?.errors?.confirmPassword &&
                    state?.errors?.confirmPassword?.length > 0
                      ? "shadow-red-400"
                      : ""
                  }
                />
                <FormErrorMessage
                  errors={
                    !state?.success &&
                    state?.errors &&
                    state?.errors?.confirmPassword
                      ? state?.errors?.confirmPassword
                      : null
                  }
                />
              </div>
            </>
          )}

          {type === authRoutes.login ? (
            <SubmitButton
              icon={
                isPending ? (
                  <svg
                    className="mr-3 -ml-1 w-5 h-5 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  authFormFieldButtonItems?.login?.icon
                )
              }
              text={
                isPending
                  ? "Logging in..."
                  : authFormFieldButtonItems?.login?.label
              }
              disabled={isPending}
              className={isPending ? "w-64" : ""}
            />
          ) : type === authRoutes.register ? (
            <SubmitButton
              icon={
                isPending ? (
                  <svg
                    className="mr-3 -ml-1 w-5 h-5 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  authFormFieldButtonItems?.register?.icon
                )
              }
              text={
                isPending
                  ? "Registering..."
                  : authFormFieldButtonItems?.register?.label
              }
              disabled={isPending}
              className={isPending ? "w-64" : ""}
            />
          ) : (
            <SubmitButton
              icon={
                isPending ? (
                  <svg
                    className="mr-3 -ml-1 w-5 h-5 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  authFormFieldButtonItems?.forgotPassword?.icon
                )
              }
              text={
                isPending
                  ? "Resetting Password..."
                  : authFormFieldButtonItems?.forgotPassword?.label
              }
              disabled={isPending}
              className={isPending ? "w-84" : "w-64"}
            />
          )}

          {type !== authRoutes.forgotPassword ? (
            <div className="flex gap-2 mt-1.5 text-glass-text-primary text-sm">
              Forgot password?{" "}
              <Link
                href={authFormFieldButtonItems?.forgotPassword?.url ?? "#"}
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
