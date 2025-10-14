import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex justify-center items-center font-bold text-2xl cursor-pointer">
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
  );
};

export default Logo;
