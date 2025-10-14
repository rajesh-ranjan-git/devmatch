import Image from "next/image";

const DefaultMainContent = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 pb-10 w-full h-full container">
      <div className="z-16 w-24 h-24 object-cover">
        <Image
          src={"/assets/logo/devmatch-logo-white-circular.webp"}
          width={200}
          height={200}
          alt="devmatch-logo"
        />
      </div>
      <span className="text-3xl">DevMatch</span>
    </div>
  );
};

export default DefaultMainContent;
