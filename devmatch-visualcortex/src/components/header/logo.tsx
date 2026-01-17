import Image from "next/image";
import Link from "next/link";
import { staticImages } from "@/config/config";

const Logo = () => {
  return (
    <Link
      href="/explore"
      className="flex justify-center items-center gap-2 text-3xl cursor-pointer"
    >
      <div className="bg-white m-2 rounded-full w-12 h-12 object-cover">
        <Image
          src={staticImages.navLogo.src}
          alt={staticImages.navLogo.alt}
          width={200}
          height={200}
          className="shadow-glass-shadow-heavy shadow-md rounded-full"
        />
      </div>
      <span className="font-tourney text-glass-text-primary tracking-wider">
        DevMatch
      </span>
    </Link>
  );
};

export default Logo;
