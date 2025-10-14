import DefaultAnimatedBackground from "@/components/background/defaultAnimatedBackground";

const main = () => {
  return (
    <main className="flex-1 justify-center items-center w-screen max-w-screen h-full overflow-x-hidden font-semibold text-lg">
      <DefaultAnimatedBackground />
      <div className="flex justify-center items-center pb-10 w-full h-full container">
        DevMatch is here!
      </div>
    </main>
  );
};

export default main;
