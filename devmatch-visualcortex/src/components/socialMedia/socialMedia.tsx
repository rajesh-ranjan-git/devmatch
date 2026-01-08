import { socialMediaIcons } from "@/config/config";
import { SocialMediaProps } from "@/types/propTypes";
import SocialMediaItem from "@/components/socialMedia/socialMediaItem";

const SocialMedia = ({ socialMedia }: SocialMediaProps) => {
  if (!socialMedia) return null;

  return (
    <ul className="bottom-2.5 relative flex">
      {Object.entries(socialMedia).map(([platform, url], i) => {
        const icon =
          socialMediaIcons[platform as keyof typeof socialMediaIcons];

        if (!url || !icon) return null;

        return (
          <SocialMediaItem key={i} url={url} Icon={icon.Icon} idx={i + 1} />
        );
      })}
    </ul>
  );
};

export default SocialMedia;
