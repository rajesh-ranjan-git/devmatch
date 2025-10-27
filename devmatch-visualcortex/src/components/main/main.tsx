import { MainProps } from "@/types/propTypes";
import DefaultMainContent from "@/components/main/defaultMainContent";
import Explore from "@/components/explore/explore";
import Auth from "@/components/auth/auth";
import Profile from "@/components/profile/profile";

const Main = ({ children }: MainProps) => {
  return (
    <main className="relative flex-1 justify-center items-center w-screen max-w-screen h-full overflow-x-hidden font-semibold text-lg">
      {children}
    </main>
  );
};

export default Main;
