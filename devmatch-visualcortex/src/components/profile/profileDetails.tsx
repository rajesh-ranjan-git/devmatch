import Image from "next/image";
import { MdEdit, MdOutlineEdit } from "react-icons/md";

const ProfileDetails = () => {
  return (
    <div className="relative flex flex-col p-8 w-full h-full">
      <div className="flex gap-4">
        <div className="group relative border border-glass-border-bright rounded-full w-12 h-11 object-cover overflow-hidden cursor-pointer">
          <div className="-top-0.5 -left-1.5 absolute flex justify-center items-center bg-glass-surface-heavy opacity-0 group-hover:opacity-100 backdrop-blur-xs w-14 h-12 transition-all translate-y-full group-hover:translate-y-0 duration-300 ease-in-out">
            <MdEdit />
          </div>
          <Image
            src="/assets/profile_photo_square.png"
            alt="pic"
            width={100}
            height={100}
            className="rounded-full w-full h-full object-cover select-none"
          />
        </div>
        <h2 className="before:-bottom-2.5 before:left-0 before:absolute relative mb-10 before:rounded-full w-full before:w-20 before:h-1 font-arima font-extrabold text-glass-text-primary before:bg-glass-text-primary text-2xl before:content-[''] tracking-wider">
          Rajesh Ranjan
        </h2>
      </div>

      <ul className="w-full text-glass-text-primary">
        <li className="flex gap-4 w-full">
          <div className="w-1/4">Nick Name</div>
          <div className="w-3/4">Rajjo</div>
        </li>
        <li className="flex gap-4 w-full">
          <div className="w-1/4">Job Profile</div>
          <div className="w-3/4">Full Stack Developer</div>
        </li>
        <li className="flex gap-4 w-full">
          <div className="w-1/4">Company</div>
          <div className="w-3/4">Business Today Technology</div>
        </li>
        <li className="flex gap-4 w-full">
          <div className="w-1/4">Organization</div>
          <div className="w-3/4">India Today Group</div>
        </li>
        <li className="flex gap-4 w-full">
          <div className="w-1/4">Experience</div>
          <div className="w-3/4">7+ yrs</div>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDetails;
