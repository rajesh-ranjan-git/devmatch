import Image from "next/image";

const DefaultMainContent = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 pb-10 w-full h-full font-arima font-bold container">
      <div className="z-16 w-24 h-24 object-cover">
        <Image
          src={"/assets/logo/devmatch-logo-white-circular.webp"}
          width={200}
          height={200}
          alt="devmatch-logo"
          className="shadow-glass-shadow-heavy shadow-lg rounded-full"
        />
      </div>
      <span className="text-glass-text-primary text-3xl">DevMatch</span>
    </div>
  );
};

export default DefaultMainContent;
