import { UserDetailsCardContentProps } from "@/types/propTypes";
import SocialMedia from "@/components/socialMedia/socialMedia";

const UserDetailsCardContent = ({
  name,
  jobProfile,
  organization,
  socialMedia,
}: UserDetailsCardContentProps) => {
  return (
    <div className="-bottom-40 group-hover:bottom-0 z-10 absolute flex flex-col justify-center items-center gap-4 bg-glass-surface-light shadow-[0_-0.6rem_0.6rem_rgba(0,0,0,0.1)] backdrop-blur-2xl border-glass-border-subtle border-t rounded-t-xl w-full h-40 transition-[bottom] duration-500 delay-700 group-hover:delay-[0s]">
      <h3 className="opacity-0 group-hover:opacity-100 mx-0 mt-5 mb-4 font-semibold text-glass-text-primary text-xl text-center uppercase leading-4 tracking-widest transition-all -translate-y-5 group-hover:translate-0 duration-500 delay-500">
        {name}
        <br />
        <span className="font-light text-xs normal-case">{jobProfile}</span>
        <br />
        <span className="font-semibold text-xs normal-case">
          {organization}
        </span>
      </h3>

      <SocialMedia socialMedia={socialMedia} />
    </div>
  );
};

export default UserDetailsCardContent;
