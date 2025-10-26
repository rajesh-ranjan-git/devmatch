import Link from "next/link";
import { IconType } from "react-icons";

const SocialMediaItem = ({
  url = "#",
  Icon,
  idx,
}: {
  url: string;
  Icon: IconType;
  idx: number;
}) => {
  return (
    <li
      className="opacity-0 group-hover:opacity-100 mx-2.5 transition-all translate-y-10 group-hover:translate-y-0 duration-500 list-none"
      style={{
        transitionDelay: `${0.2 * idx}s`,
      }}
    >
      <Link href={url} className="text-glass-text-primary text-2xl">
        <Icon />
      </Link>
    </li>
  );
};

export default SocialMediaItem;
