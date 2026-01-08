import Link from "next/link";
import { SocialMediaItemProps } from "@/types/propTypes";

const SocialMediaItem = ({ url = "#", Icon, idx }: SocialMediaItemProps) => {
  return (
    <li
      className="opacity-0 group-hover:opacity-100 mx-2.5 transition-all translate-y-10 group-hover:translate-y-0 duration-500 list-none"
      style={{
        transitionDelay: `${0.2 * idx}s`,
      }}
    >
      <Link
        href={url}
        target="_blank"
        className="text-glass-text-primary text-2xl"
      >
        <Icon />
      </Link>
    </li>
  );
};

export default SocialMediaItem;
