import { AuthProps } from "@/types/propTypes";
import DefaultMainContent from "@/components/main/defaultMainContent";
import AnimatedFloatingSquares from "@/components/background/animatedFloatingSquares";
import AuthForm from "@/components/auth/authForm";
import VerticalSeparator from "@/components/ui/separators/verticalSeparator";

const Auth = ({ type }: AuthProps) => {
  return (
    <div className="relative flex justify-center items-center w-full h-[85vh] overflow-hidden">
      <div className="relative flex bg-glass-surface border border-glass-border-bright rounded-xl w-full max-w-7xl h-[95%]">
        <AnimatedFloatingSquares />
        <DefaultMainContent />
        <VerticalSeparator />
        <AuthForm type={type} />
      </div>
    </div>
  );
};

export default Auth;
