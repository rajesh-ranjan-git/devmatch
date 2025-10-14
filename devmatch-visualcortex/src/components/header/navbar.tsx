import Logo from "@/components/header/logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Bell, BellDot, ChevronUp, Handshake, UserPlus } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center glass-border border-1 w-full h-full glass-lg container">
      <Logo />
      <div className="flex justify-center items-center gap-2">
        <div className="flex justify-center items-center gap-2 p-2 border-1 hover:border-white rounded-lg font-semibold transition-all ease-in-out cursor-pointer">
          <UserPlus />
          <span>Requests</span>
        </div>
        <div className="flex justify-center items-center gap-2 p-2 border-1 hover:border-white rounded-lg font-semibold transition-all ease-in-out cursor-pointer">
          <Handshake />
          <span>Connections</span>
        </div>
        <div className="flex justify-center items-center gap-2 p-2 border-1 hover:border-white rounded-lg font-semibold transition-all ease-in-out cursor-pointer">
          {/* <Bell /> */}
          <BellDot />
        </div>
        <div className="flex justify-center items-center gap-2 p-1 border-1 hover:border-white rounded-lg cursor-pointer">
          <Avatar className="hover:glass-border border-1 border-transparent active:scale-95 transition-all ease-in-out">
            <AvatarImage src="assets/avatar/default-avatar-profile-picture-male-icon.webp" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* <ChevronUp className="hover:rotate-180 transition-all duration-300 ease-in-out" /> */}
          <ChevronUp />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
