import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import SocialMediaItem from "@/components/socialMedia/socialMediaItem";

const SocialMedia = () => {
  return (
    <ul className="bottom-2.5 relative flex">
      {[
        { url: "#", Icon: FaFacebookF },
        { url: "#", Icon: FaInstagram },
        { url: "#", Icon: FaXTwitter },
        { url: "#", Icon: FaGithub },
      ].map((item, i) => (
        <SocialMediaItem key={i} url={item.url} Icon={item.Icon} idx={i + 1} />
      ))}
    </ul>
  );
};

export default SocialMedia;
