import DefaultMainContent from "@/components/main/defaultMainContent";
import AnimatedFloatingSquares from "@/components/background/animatedFloatingSquares";
import AuthForm from "@/components/auth/authForm";
import Separator from "@/components/ui/separator/separator";

const Auth = () => {
  return (
    <div className="relative flex justify-center items-center w-full h-[80vh]">
      <div className="relative flex bg-glass-surface border border-glass-border-bright rounded-xl w-full max-w-7xl h-[95%]">
        <AnimatedFloatingSquares />
        <DefaultMainContent />
        <Separator />
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
