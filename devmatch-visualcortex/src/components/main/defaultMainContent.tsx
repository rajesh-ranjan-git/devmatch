import Image from "next/image";
import { staticImages } from "@/config/config";

const DefaultMainContent = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 pb-10 w-full h-full font-arima font-bold text-glass-text-primary select-none container">
      <div className="z-16 w-24 h-24 object-cover">
        <Image
          src={staticImages.mainLogo.src}
          alt={staticImages.mainLogo.alt}
          width={200}
          height={200}
          className="shadow-glass-shadow-heavy shadow-lg rounded-full"
        />
      </div>
      <span className="text-3xl">DevMatch</span>
    </div>
  );
};

export default DefaultMainContent;
