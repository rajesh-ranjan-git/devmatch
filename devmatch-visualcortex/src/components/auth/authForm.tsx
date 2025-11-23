import Link from "next/link";
import { INPUT_TYPES } from "@/config/constants";
import {
  authFormFieldInputItems,
  authFormFieldButtonItems,
} from "@/config/config";
import { AuthFormWrapperProps } from "@/types/propTypes";
import { toTitleCase } from "@/lib/utils/utils";
import Input from "@/components/auth/input";
import SubmitButton from "@/components/ui/buttons/submitButton";
import { authRoutes } from "@/lib/routes/routes";

const AuthForm = ({ type }: AuthFormWrapperProps) => {
  return (
    <div className="relative flex flex-col justify-center items-center p-10 w-full h-full">
      <h2 className="before:-bottom-2.5 before:left-0 before:absolute relative mb-2 before:rounded-full w-full before:w-20 before:h-1 font-arima font-extrabold text-glass-text-primary before:bg-glass-text-primary text-2xl before:content-[''] tracking-wider">
        {type === authRoutes.login
          ? authFormFieldButtonItems?.login?.label
          : type === authRoutes.register
          ? authFormFieldButtonItems?.register?.label
          : authFormFieldButtonItems?.forgot_password?.label}
      </h2>
      <form className="w-full text-md">
        <div className="mt-3 w-full">
          <Input
            type={authFormFieldInputItems?.user_name?.type ?? INPUT_TYPES.text}
            placeholder={
              authFormFieldInputItems?.user_name?.placeholder ??
              toTitleCase(INPUT_TYPES.email)
            }
          />
        </div>
        {type === authRoutes.login ? (
          <div className="mt-3 w-full">
            <Input
              type={authFormFieldInputItems?.password?.type ?? INPUT_TYPES.text}
              placeholder={
                authFormFieldInputItems?.password?.placeholder ??
                toTitleCase(INPUT_TYPES.email)
              }
            />
          </div>
        ) : type === authRoutes?.register ? (
          <>
            <div className="w-full">
              <Input
                type={authFormFieldInputItems?.email?.type ?? INPUT_TYPES.email}
                placeholder={
                  authFormFieldInputItems?.email?.placeholder ??
                  toTitleCase(INPUT_TYPES.email)
                }
              />
            </div>
            <div className="w-full">
              <Input
                type={
                  authFormFieldInputItems?.password?.type ??
                  INPUT_TYPES.password
                }
                placeholder={
                  authFormFieldInputItems?.password?.placeholder ??
                  toTitleCase(INPUT_TYPES.password)
                }
              />
            </div>
            <div className="w-full">
              <Input
                type={
                  authFormFieldInputItems?.confirm_password?.type ??
                  INPUT_TYPES.password
                }
                placeholder={
                  authFormFieldInputItems?.confirm_password?.placeholder ??
                  toTitleCase(INPUT_TYPES.password)
                }
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-full">
              <Input
                type={
                  authFormFieldInputItems?.password?.type ??
                  INPUT_TYPES.password
                }
                placeholder={
                  authFormFieldInputItems?.password?.placeholder ??
                  toTitleCase(INPUT_TYPES.password)
                }
              />
            </div>
            <div className="w-full">
              <Input
                type={
                  authFormFieldInputItems?.confirm_password?.type ??
                  INPUT_TYPES.password
                }
                placeholder={
                  authFormFieldInputItems?.confirm_password?.placeholder ??
                  toTitleCase(INPUT_TYPES.password)
                }
              />
            </div>
          </>
        )}

        {type === authRoutes.login ? (
          <SubmitButton
            icon={authFormFieldButtonItems?.login?.icon}
            text={authFormFieldButtonItems?.login?.label}
          />
        ) : type === authRoutes.register ? (
          <SubmitButton
            icon={authFormFieldButtonItems?.register?.icon}
            text={authFormFieldButtonItems?.register?.label}
          />
        ) : (
          <SubmitButton
            icon={authFormFieldButtonItems?.forgot_password?.icon}
            text={authFormFieldButtonItems?.forgot_password?.label}
            className="w-64"
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
      </form>
    </div>
  );
};

export default AuthForm;
