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

      <div className="[&::-webkit-scrollbar-track]:bg-transparent pr-4 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar]:w-1 overflow-y-scroll [&::-webkit-scrollbar-thumb]:bg-glass-text-tertiary [&::-webkit-scrollbar-thumb]:hover:bg-glass-text-tertiary transition-all ease-in-out">
        <table className="w-full text-glass-text-primary">
          <tbody>
            <tr>
              <td className="py-2 w-1/4 font-semibold text-glass-text-primary">
                Nick Name
              </td>
              <td className="py-2 w-3/4 font-normal text-glass-text-secondary">
                <div className="flex justify-between items-center">
                  <span>Rajjo</span>
                  <div className="group/icon flex justify-center items-center hover:bg-glass-surface-heavy backdrop-blur-3xl border-transparent hover:border-glass-border-bright rounded-sm text-glass-text-primary text-2xl transition-all ease-in-out cursor-pointer">
                    <MdOutlineEdit className="group-hover/icon:hidden" />
                    <MdEdit className="hidden group-hover/icon:block" />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2 w-1/4 font-semibold text-glass-text-primary">
                Job Profile
              </td>
              <td className="py-2 w-3/4 font-normal text-glass-text-secondary">
                <div className="flex justify-between items-center">
                  <span>Full Stack Developer</span>
                  <div className="group/icon justify-center items-center hover:bg-glass-surface-heavy backdrop-blur-3xl border-transparentflex hover:border-glass-border-bright rounded-sm w-7glass-text-primary text-2xl transition-all ease-in-out cursor-pointer">
                    <MdOutlineEdit className="group-hover/icon:hidden" />
                    <MdEdit className="hidden group-hover/icon:block" />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2 w-1/4 font-semibold text-glass-text-primary">
                Company
              </td>
              <td className="py-2 w-3/4 font-normal text-glass-text-secondary">
                <div className="flex justify-between items-center">
                  <span>Business Today Technology</span>
                  <div className="group/icon flex justify-center items-center hover:bg-glass-surface-heavy backdrop-blur-3xl border-transparent hover:border-glass-border-bright rounded-sm text-glass-text-primary text-2xl transition-all ease-in-out cursor-pointer">
                    <MdOutlineEdit className="group-hover/icon:hidden" />
                    <MdEdit className="hidden group-hover/icon:block" />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2 w-1/4 font-semibold text-glass-text-primary">
                Organization
              </td>
              <td className="py-2 w-3/4 font-normal text-glass-text-secondary">
                <div className="flex justify-between items-center">
                  <span>India Today Group</span>
                  <div className="group/icon justify-center items-center hover:bg-glass-surface-heavy backdrop-blur-3xl border-transparentflex hover:border-glass-border-bright rounded-sm w-7glass-text-primary text-2xl transition-all ease-in-out cursor-pointer">
                    <MdOutlineEdit className="group-hover/icon:hidden" />
                    <MdEdit className="hidden group-hover/icon:block" />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2 w-1/4 font-semibold text-glass-text-primary">
                Experience
              </td>
              <td className="py-2 w-3/4 font-normal text-glass-text-secondary">
                <div className="flex justify-between items-center">
                  <span>7+ yrs</span>
                  <div className="group/icon flex justify-center items-center hover:bg-glass-surface-heavy backdrop-blur-3xl border-transparent hover:border-glass-border-bright rounded-sm text-glass-text-primary text-2xl transition-all ease-in-out cursor-pointer">
                    <MdOutlineEdit className="group-hover/icon:hidden" />
                    <MdEdit className="hidden group-hover/icon:block" />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2 w-1/4 font-semibold text-glass-text-primary">
                Experience
              </td>
              <td className="py-2 w-3/4 font-normal text-glass-text-secondary">
                <div className="flex justify-between items-center">
                  <span>7+ yrs</span>
                  <div className="group/icon justify-center items-center hover:bg-glass-surface-heavy backdrop-blur-3xl border-transparentflex hover:border-glass-border-bright rounded-sm w-7glass-text-primary text-2xl transition-all ease-in-out cursor-pointer">
                    <MdOutlineEdit className="group-hover/icon:hidden" />
                    <MdEdit className="hidden group-hover/icon:block" />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2 w-1/4 font-semibold text-glass-text-primary">
                Experience
              </td>
              <td className="py-2 w-3/4 font-normal text-glass-text-secondary">
                <div className="flex justify-between items-center">
                  <span>7+ yrs</span>
                  <div className="group/icon flex justify-center items-center hover:bg-glass-surface-heavy backdrop-blur-3xl border-transparent hover:border-glass-border-bright rounded-sm text-glass-text-primary text-2xl transition-all ease-in-out cursor-pointer">
                    <MdOutlineEdit className="group-hover/icon:hidden" />
                    <MdEdit className="hidden group-hover/icon:block" />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2 w-1/4 font-semibold text-glass-text-primary">
                Experience
              </td>
              <td className="py-2 w-3/4 font-normal text-glass-text-secondary">
                <div className="flex justify-between items-center">
                  <span>7+ yrs</span>
                  <div className="group/icon justify-center items-center hover:bg-glass-surface-heavy backdrop-blur-3xl border-transparentflex hover:border-glass-border-bright rounded-sm w-7glass-text-primary text-2xl transition-all ease-in-out cursor-pointer">
                    <MdOutlineEdit className="group-hover/icon:hidden" />
                    <MdEdit className="hidden group-hover/icon:block" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileDetails;
