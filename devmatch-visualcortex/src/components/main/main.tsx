import DefaultAnimatedBackground from "@/components/background/defaultAnimatedBackground";
import Image from "next/image";

const main = () => {
  return (
    <main className="flex-1 justify-center items-center w-screen max-w-screen h-full overflow-x-hidden font-semibold text-lg">
      <DefaultAnimatedBackground />
      <div className="flex flex-col justify-center items-center gap-4 pb-10 w-full h-full container">
        <div className="w-24 h-24 object-cover">
          <Image
            src={"/assets/logo/devmatch-logo-white-circular.webp"}
            width={200}
            height={200}
            alt="devmatch-logo"
          />
        </div>
        <span className="text-3xl">DevMatch</span>
      </div>
    </main>
  );
};

export default main;
