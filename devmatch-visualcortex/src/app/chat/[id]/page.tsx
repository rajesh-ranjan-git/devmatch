import { getUserDetails } from "@/lib/actions/actions";
import Chat from "@/components/chat/Chat";
import AnimatedFloatingSquares from "@/components/background/animatedFloatingSquares";

const ChatPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await getUserDetails(id);

  return (
    <div className="relative flex justify-center items-center w-full h-[85vh] overflow-hidden">
      <div className="relative bg-glass-surface shadow-glass-shadow-heavy shadow-md border border-glass-border-bright rounded-xl w-full max-w-7xl h-[95%]">
        <AnimatedFloatingSquares />
        <Chat user={user} />
      </div>
    </div>
  );
};

export default ChatPage;
