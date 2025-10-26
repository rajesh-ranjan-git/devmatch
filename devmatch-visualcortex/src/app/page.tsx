import Main from "@/components/main/main";
import Header from "@/components/header/header";
import DefaultAnimatedBackground from "@/components/background/defaultAnimatedBackground";
import AnimatedBackground from "@/components/background/animatedBackground";

export default function Home() {
  return (
    <>
      <DefaultAnimatedBackground />
      {/* <AnimatedBackground /> */}
      <Header />
      <Main />
    </>
  );
}
