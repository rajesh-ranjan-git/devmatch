import SocialMediaItem from "@/components/socialMedia/socialMediaItem";
import { socialMediaIcons } from "@/config/config";

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
