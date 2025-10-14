import Image from "next/image";

const Header = () => {
  return (
    <header className="flex justify-center items-center pt-4 pb-2 w-screen max-w-screen h-20 overflow-x-hidden font-bold text-3xl">
      <div className="flex justify-center items-center glass-border border-1 w-full h-full glass-lg container">
        <div className="w-16 h-16 object-cover">
          <Image
            src={"/assets/logo/devmatch-logo-transparent-circular.webp"}
            width={200}
            height={200}
            alt="devmatch-logo"
          />
        </div>
        <span>DevMatch</span>
      </div>
    </header>
  );
};

export default Header;
