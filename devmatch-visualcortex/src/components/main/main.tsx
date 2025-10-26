import DefaultMainContent from "@/components/main/defaultMainContent";
import Explore from "@/components/explore/explore";
import Auth from "@/components/auth/auth";

const main = () => {
  return (
    <main className="relative flex-1 justify-center items-center w-screen max-w-screen h-full overflow-x-hidden font-semibold text-lg">
      {/* <DefaultMainContent /> */}

      {/* <Explore /> */}

      <Auth />
    </main>
  );
};

export default main;
