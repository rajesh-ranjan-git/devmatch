import Link from "next/link";
import { authFields } from "@/config/config";
import { AuthProps } from "@/types/propTypes";
import Input from "@/components/auth/input";
import SubmitButton from "@/components/ui/buttons/submitButton";

const AuthForm = ({ type }: AuthProps) => {
  return (
    <div className="relative flex flex-col justify-center items-center p-10 w-full h-full">
      <h2 className="before:-bottom-2.5 before:left-0 before:absolute relative mb-2 before:rounded-full w-full before:w-20 before:h-1 font-arima font-extrabold text-glass-text-primary before:bg-glass-text-primary text-2xl before:content-[''] tracking-wider">
        {type === authFields.login.type
          ? authFields.login.label
          : type === authFields.register.type
          ? authFields.register.label
          : authFields.forgotPassword.label}
      </h2>
      <form className="w-full text-md">
        <div className="mt-3 w-full">
          <Input
            type={authFields.userName.type}
            placeholder={authFields.userName.placeholder}
          />
        </div>
        {type === authFields.login.type ? (
          <div className="mt-3 w-full">
            <Input
              type={authFields.password.type}
              placeholder={authFields.password.placeholder}
            />
          </div>
        ) : type === authFields.register.type ? (
          <>
            <div className="w-full">
              <Input
                type={authFields.firstName.type}
                placeholder={authFields.firstName.placeholder}
              />
            </div>
            <div className="w-full">
              <Input
                type={authFields.password.type}
                placeholder={authFields.password.placeholder}
              />
            </div>
            <div className="w-full">
              <Input
                type={authFields.confirmPassword.type}
                placeholder={authFields.confirmPassword.placeholder}
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-full">
              <Input
                type={authFields.password.type}
                placeholder={authFields.password.placeholder}
              />
            </div>
            <div className="w-full">
              <Input
                type={authFields.confirmPassword.type}
                placeholder={authFields.confirmPassword.placeholder}
              />
            </div>
          </>
        )}

        {type === authFields.login.type ? (
          <SubmitButton
            icon={authFields.login.icon}
            label={authFields.login.label}
          />
        ) : type === authFields.register.type ? (
          <SubmitButton
            icon={authFields.register.icon}
            label={authFields.register.label}
          />
        ) : (
          <SubmitButton
            icon={authFields.forgotPassword.icon}
            label={authFields.forgotPassword.label}
            className="w-64"
          />
        )}

        {type !== authFields.forgotPassword.type ? (
          <div className="flex gap-2 mt-1.5 text-glass-text-primary text-sm">
            Forgot password?{" "}
            <Link
              href={authFields.forgotPassword.url}
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
                href={authFields.register.url}
                className="font-semibold text-glass-text-primary hover:underline underline-offset-2 cursor-pointer"
              >
                {authFields.register.label}
              </Link>
            </div>
            <div className="flex gap-2 mt-1.5 text-glass-text-primary text-sm">
              Already a member?{" "}
              <Link
                href={authFields.login.url}
                className="font-semibold text-glass-text-primary hover:underline underline-offset-2 cursor-pointer"
              >
                {authFields.login.label}
              </Link>
            </div>
          </>
        )}

        {type === authFields.login.type ? (
          <div className="flex gap-2 mt-1.5 text-glass-text-primary text-sm">
            Don't have an account?{" "}
            <Link
              href={authFields.register.url}
              className="font-semibold text-glass-text-primary hover:underline underline-offset-2 cursor-pointer"
            >
              {authFields.register.label}
            </Link>
          </div>
        ) : type === authFields.register.type ? (
          <div className="flex gap-2 mt-1.5 text-glass-text-primary text-sm">
            Already a member?{" "}
            <Link
              href={authFields.login.url}
              className="font-semibold text-glass-text-primary hover:underline underline-offset-2 cursor-pointer"
            >
              {authFields.login.label}
            </Link>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default AuthForm;
