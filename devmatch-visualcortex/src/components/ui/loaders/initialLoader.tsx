"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { staticImages } from "@/config/config";

const InitialLoader = () => {
  const [showInitialLoader, setShowInitialLoader] = useState(true);

  useEffect(() => {
    if (showInitialLoader) {
      const timer = setTimeout(() => {
        setShowInitialLoader(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showInitialLoader]);

  return (
    <>
      {showInitialLoader && (
        <div className="z-100 fixed inset-0 flex flex-col justify-center items-center backdrop-blur-3xl w-screen h-screen">
          <div className="z-100 fixed inset-0 flex flex-col justify-center items-center bg-glass-surface-light opacity-0 w-screen h-screen animate-[fadeIn_0.5s_ease-in_forwards,fadeOut_0.5s_ease-out_3s_forwards]">
            <div className="z-16 w-24 h-24 object-cover">
              <Image
                src={staticImages.mainLogo.src}
                alt={staticImages.mainLogo.alt}
                width={200}
                height={200}
                className="shadow-glass-shadow-heavy shadow-lg rounded-full select-none"
              />
            </div>
            <span className="text-3xl">DevMatch</span>
            <div className="bg-glass-surface shadow-md mt-4 mb-2 rounded-full w-64 h-2 overflow-hidden">
              <div className="bg-glass-surface-heavy rounded-full w-0 h-full animate-[fillLeftToRight_1s_linear_0.5s_forwards]"></div>
            </div>
            <span
              className={
                "text-md relative after:content-[''] after:absolute after:overflow-hidden after:whitespace-nowrap  after:h-full  after:align-middle after:animate-[dots_2s_steps(3,end)_infinite]"
              }
            >
              Welcome
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default InitialLoader;
