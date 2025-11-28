import { socialMediaIcons } from "@/config/config";
import SocialMediaItem from "@/components/socialMedia/socialMediaItem";

const SocialMedia = () => {
  return (
    <ul className="bottom-2.5 relative flex">
      {Object.values(socialMediaIcons).map((item, i) => (
        <SocialMediaItem key={i} url={item.url} Icon={item.Icon} idx={i + 1} />
      ))}
    </ul>
  );
};

export default SocialMedia;
