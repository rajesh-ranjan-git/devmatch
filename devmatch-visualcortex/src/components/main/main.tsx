import DefaultMainContent from "@/components/main/defaultMainContent";
import Explore from "@/components/explore/explore";
import Auth from "@/components/auth/auth";
import Profile from "@/components/profile/profile";

const main = () => {
  return (
    <main className="relative flex-1 justify-center items-center w-screen max-w-screen h-full overflow-x-hidden font-semibold text-lg">
      {/* <DefaultMainContent /> */}

      {/* <Explore /> */}

      {/* <Auth /> */}

      <Profile />
    </main>
  );
};

export default main;
