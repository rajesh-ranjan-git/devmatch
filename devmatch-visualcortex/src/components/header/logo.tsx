import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/explore"
      className="flex justify-center items-center gap-2 text-3xl cursor-pointer"
    >
      <div className="w-16 h-16 object-cover">
        <Image
          src={"/assets/logo/devmatch-logo-transparent-circular.webp"}
          width={200}
          height={200}
          alt="devmatch-logo"
        />
      </div>
      <span className="font-tourney text-glass-text-primary tracking-wider">
        DevMatch
      </span>
    </Link>
  );
};

export default Logo;
