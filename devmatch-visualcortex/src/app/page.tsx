import Image from "next/image";
import Logo from "../components/logo/logo";

export default function Home() {
  return (
    <div className="justify-items-center items-center gap-16 grid grid-rows-[20px_1fr_20px] p-8 sm:p-20 pb-20 min-h-screen font-sans">
      <main className="flex flex-col items-center sm:items-start gap-[32px] row-start-2">
        <p className="flex justify-center items-center gap-2 font-mono text-primary text-3xl sm:text-left text-center list-decimal list-inside">
          {/* <Image
            src={"/devmatch-logo.svg"}
            width={80}
            height={80}
            alt="dev-match-logo"
          /> */}
          <Image
            src={"/devmatch-logo.png"}
            width={40}
            height={40}
            alt="dev-match-logo"
            className="border-2 border-primary rounded-full"
          />
          <span>DevMatch</span>
        </p>
      </main>
      <footer className="flex flex-wrap justify-center items-center gap-2 row-start-3">
        <Logo />
        <p className="font-mono text-primary text-3xl sm:text-left text-center list-decimal list-inside">
          DevMatch
        </p>
      </footer>
    </div>
  );
}
