import { use } from "react";
import { getUserDetails } from "@/lib/actions/actions";
import Chat from "@/components/chat/Chat";
import AnimatedFloatingSquares from "@/components/background/animatedFloatingSquares";

const ChatLayout = () => {
  const user = use(getUserDetails());

  return (
    <div className="relative flex justify-center items-center w-full h-[85vh] overflow-hidden">
      <div className="relative bg-glass-surface shadow-glass-shadow-heavy shadow-md border border-glass-border-bright rounded-xl w-full max-w-7xl h-[95%]">
        <AnimatedFloatingSquares />
        <Chat />
      </div>
    </div>
  );
};

export default ChatLayout;
