import Link from "next/link";
import { LuLogIn, LuUserPlus } from "react-icons/lu";
import { TbLockPassword } from "react-icons/tb";
import { AuthProps } from "@/types/propTypes";
import Input from "@/components/auth/input";
import SubmitButton from "@/components/ui/buttons/submitButton";

const AuthForm = ({ type }: AuthProps) => {
  return (
    <div className="relative flex flex-col justify-center items-center p-10 w-full h-full">
      <h2 className="before:-bottom-2.5 before:left-0 before:absolute relative mb-2 before:rounded-full w-full before:w-20 before:h-1 font-arima font-extrabold text-glass-text-primary before:bg-glass-text-primary text-2xl before:content-[''] tracking-wider">
        {type === "login"
          ? "Login"
          : type === "register"
          ? "Register"
          : "Forgot Password"}
      </h2>
      <form className="w-full text-md">
        <div className="mt-3 w-full">
          <Input type="text" placeholder="Username" />
        </div>
        {type === "login" ? (
          <div className="mt-3 w-full">
            <Input type="password" placeholder="Password" />
          </div>
        ) : type === "register" ? (
          <>
            <div className="w-full">
              <Input type="password" placeholder="Password" />
            </div>
            <div className="w-full">
              <Input type="confirmPassword" placeholder="Confirm Password" />
            </div>
          </>
        ) : (
          <>
            <div className="w-full">
              <Input type="password" placeholder="Password" />
            </div>
            <div className="w-full">
              <Input type="confirmPassword" placeholder="Confirm Password" />
            </div>
          </>
        )}

        {type === "login" ? (
          <SubmitButton icon={<LuLogIn />} label="Login" />
        ) : type === "register" ? (
          <SubmitButton icon={<LuUserPlus />} label="Register" />
        ) : (
          <SubmitButton
            icon={<TbLockPassword />}
            label="Forgot Password"
            className="w-64"
          />
        )}

        {type !== "forgotPassword" ? (
          <div className="flex gap-2 mt-1.5 text-glass-text-primary text-sm">
            Forgot password?{" "}
            <Link
              href={"/forgot-password"}
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
                href={"/register"}
                className="font-semibold text-glass-text-primary hover:underline underline-offset-2 cursor-pointer"
              >
                Register
              </Link>
            </div>
            <div className="flex gap-2 mt-1.5 text-glass-text-primary text-sm">
              Already a member?{" "}
              <Link
                href={"/login"}
                className="font-semibold text-glass-text-primary hover:underline underline-offset-2 cursor-pointer"
              >
                Login
              </Link>
            </div>
          </>
        )}

        {type === "login" ? (
          <div className="flex gap-2 mt-1.5 text-glass-text-primary text-sm">
            Don't have an account?{" "}
            <Link
              href={"/register"}
              className="font-semibold text-glass-text-primary hover:underline underline-offset-2 cursor-pointer"
            >
              Register
            </Link>
          </div>
        ) : type === "register" ? (
          <div className="flex gap-2 mt-1.5 text-glass-text-primary text-sm">
            Already a member?{" "}
            <Link
              href={"/login"}
              className="font-semibold text-glass-text-primary hover:underline underline-offset-2 cursor-pointer"
            >
              Login
            </Link>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default AuthForm;
