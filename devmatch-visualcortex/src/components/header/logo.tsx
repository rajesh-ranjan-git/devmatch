import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex justify-center items-center text-3xl cursor-pointer"
    >
      <div className="w-16 h-16 object-cover">
        <Image
          src={"/assets/logo/devmatch-logo-transparent-circular.webp"}
          width={200}
          height={200}
          alt="devmatch-logo"
        />
      </div>
      <span className="font-tourney tracking-wider">DevMatch</span>
    </Link>
  );
};

export default Logo;
