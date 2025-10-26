import DefaultMainContent from "@/components/main/defaultMainContent";
import AnimatedFloatingSquares from "@/components/auth/animatedFloatingSquares";
import AuthForm from "@/components/auth/authForm";
import Separator from "@/components/ui/separator/separator";

const Auth = () => {
  return (
    <div className="relative flex justify-center items-center w-full h-[80vh]">
      <div className="relative flex bg-glass-surface border border-glass-border-bright rounded-xl w-[60%] h-[95%]">
        <AnimatedFloatingSquares />
        <DefaultMainContent />
        <Separator />
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
