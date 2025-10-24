const AnimatedBackground = () => {
  return (
    <div className="z-0 fixed inset-0 opacity-[0.2] blur-[100px] m-auto w-full h-full">
      <div className="absolute inset-0 m-auto rounded-full w-screen min-w-screen h-screen overflow-hidden scale-80">
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#08f,#f60,#bbffa1,#4c00ff,#ab2666,#09f)] m-auto w-screen h-screen animate-[spinBlob_8s_linear_infinite]"></div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
