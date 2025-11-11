import Link from "next/link";
import { authFormFields } from "@/config/config";
import { AuthFormWrapperProps } from "@/types/propTypes";
import Input from "@/components/auth/input";
import SubmitButton from "@/components/ui/buttons/submitButton";

const AuthForm = ({ type }: AuthFormWrapperProps) => {
  return (
    <div className="relative flex flex-col justify-center items-center p-10 w-full h-full">
      <h2 className="before:-bottom-2.5 before:left-0 before:absolute relative mb-2 before:rounded-full w-full before:w-20 before:h-1 font-arima font-extrabold text-glass-text-primary before:bg-glass-text-primary text-2xl before:content-[''] tracking-wider">
        {type === authFormFields.login.type
          ? authFormFields.login.label
          : type === authFormFields.register.type
          ? authFormFields.register.label
          : authFormFields.forgotPassword.label}
      </h2>
      <form className="w-full text-md">
        <div className="mt-3 w-full">
          <Input
            type={authFormFields.userName.type}
            placeholder={authFormFields.userName.placeholder}
          />
        </div>
        {type === authFormFields.login.type ? (
          <div className="mt-3 w-full">
            <Input
              type={authFormFields.password.type}
              placeholder={authFormFields.password.placeholder}
            />
          </div>
        ) : type === authFormFields.register.type ? (
          <>
            <div className="w-full">
              <Input
                type={authFormFields.firstName.type}
                placeholder={authFormFields.firstName.placeholder}
              />
            </div>
            <div className="w-full">
              <Input
                type={authFormFields.password.type}
                placeholder={authFormFields.password.placeholder}
              />
            </div>
            <div className="w-full">
              <Input
                type={authFormFields.confirmPassword.type}
                placeholder={authFormFields.confirmPassword.placeholder}
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-full">
              <Input
                type={authFormFields.password.type}
                placeholder={authFormFields.password.placeholder}
              />
            </div>
            <div className="w-full">
              <Input
                type={authFormFields.confirmPassword.type}
                placeholder={authFormFields.confirmPassword.placeholder}
              />
            </div>
          </>
        )}

        {type === authFormFields.login.type ? (
          <SubmitButton
            icon={authFormFields.login.icon}
            type={authFormFields.login.label}
          />
        ) : type === authFormFields.register.type ? (
          <SubmitButton
            icon={authFormFields.register.icon}
            type={authFormFields.register.label}
          />
        ) : (
          <SubmitButton
            icon={authFormFields.forgotPassword.icon}
            type={authFormFields.forgotPassword.label}
            className="w-64"
          />
        )}

        {type !== authFormFields.forgotPassword.type ? (
          <div className="flex gap-2 mt-1.5 text-glass-text-primary text-sm">
            Forgot password?{" "}
            <Link
              href={authFormFields.forgotPassword.url}
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
                href={authFormFields.register.url}
                className="font-semibold text-glass-text-primary hover:underline underline-offset-2 cursor-pointer"
              >
                {authFormFields.register.label}
              </Link>
            </div>
            <div className="flex gap-2 mt-1.5 text-glass-text-primary text-sm">
              Already a member?{" "}
              <Link
                href={authFormFields.login.url}
                className="font-semibold text-glass-text-primary hover:underline underline-offset-2 cursor-pointer"
              >
                {authFormFields.login.label}
              </Link>
            </div>
          </>
        )}

        {type === authFormFields.login.type ? (
          <div className="flex gap-2 mt-1.5 text-glass-text-primary text-sm">
            Don't have an account?{" "}
            <Link
              href={authFormFields.register.url}
              className="font-semibold text-glass-text-primary hover:underline underline-offset-2 cursor-pointer"
            >
              {authFormFields.register.label}
            </Link>
          </div>
        ) : type === authFormFields.register.type ? (
          <div className="flex gap-2 mt-1.5 text-glass-text-primary text-sm">
            Already a member?{" "}
            <Link
              href={authFormFields.login.url}
              className="font-semibold text-glass-text-primary hover:underline underline-offset-2 cursor-pointer"
            >
              {authFormFields.login.label}
            </Link>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default AuthForm;
