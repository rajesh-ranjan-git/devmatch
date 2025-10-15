import Image from "next/image";

const Explore = () => {
  return (
    <div className="relative flex justify-center items-center h-[80vh] container">
      <div className="h-full object-cover glass-card col-5">
        <div className="top-0 left-0 absolute w-full h-full">
          <Image
            src={"/assets/profile_photo_square.png"}
            alt="user-image"
            width={400}
            height={500}
            className="rounded-md w-full h-full object-cover pointer-events-none"
          />
          <div className="bottom-0 absolute backdrop-blur-xs hover:backdrop-blur-sm p-4 rounded-md w-full glass-interactive">
            <p>Rajesh Ranjan</p>
            <p>Full Stack Developer</p>
            <p>India Today Group</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
