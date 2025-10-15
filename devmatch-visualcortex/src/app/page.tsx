import Main from "@/components/main/main";
import Header from "@/components/header/header";
import DefaultAnimatedBackground from "@/components/background/defaultAnimatedBackground";

export default function Home() {
  return (
    <>
      <div className="absolute backdrop-blur-xs w-full h-full glass-bg"></div>
      <DefaultAnimatedBackground />
      <Header />
      <Main />
    </>
  );
}
