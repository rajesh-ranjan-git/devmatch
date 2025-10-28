import Image from "next/image";
import { IoIosWarning } from "react-icons/io";

const NotFound = () => {
  return (
    <>
      <div className="flex justify-center items-center w-full h-[80vh] font-inter text-4xl">
        <div className="flex flex-col justify-center items-center gap-2 bg-glass-surface p-2 border border-glass-border-bright rounded-xl w-full max-w-7xl h-[95%] text-glass-text-primary">
          <div className="relative w-full h-64 overflow-hidden">
            <Image
              src={"/assets/error/404-error.webp"}
              alt="404-error"
              fill
              className="object-contain select-none"
            />
          </div>
          <h2 className="flex justify-center items-center gap-4 w-full">
            <IoIosWarning className="text-glass-warning-text text-7xl" />
            <span>Page Not Found!</span>
          </h2>
        </div>
      </div>
    </>
  );
};

export default NotFound;
