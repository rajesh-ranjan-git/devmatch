import { LuLogIn } from "react-icons/lu";
import Input from "@/components/auth/input";
import SubmitButton from "../ui/buttons/submitButton";

const AuthForm = () => {
  return (
    <div className="relative p-10 w-full h-full">
      <h2 className="before:-bottom-2.5 before:left-0 before:absolute relative before:rounded-full before:w-20 before:h-1 font-arima font-extrabold text-glass-text-primary before:bg-glass-text-primary text-2xl before:content-[''] tracking-wider">
        Login Form
      </h2>
      <form className="text-md">
        <div className="mt-5 w-full">
          <Input type="text" placeholder="Username" />
        </div>
        <div className="mt-5 w-full">
          <Input type="password" placeholder="Password" />
        </div>
        <SubmitButton icon={<LuLogIn />} label="Login" />
        <div className="flex gap-2 mt-1.5 text-glass-text-primary text-sm">
          Forgot password?{" "}
          <div className="font-semibold text-glass-text-primary hover:underline underline-offset-2 cursor-pointer">
            Click Here
          </div>
        </div>
        <div className="flex gap-2 mt-1.5 text-glass-text-primary text-sm">
          Don't have an account?{" "}
          <div className="font-semibold text-glass-text-primary hover:underline underline-offset-2 cursor-pointer">
            Sign Up
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
