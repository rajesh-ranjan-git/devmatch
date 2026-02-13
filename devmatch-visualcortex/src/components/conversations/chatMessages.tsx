import { useEffect, useState } from "react";
import { ConversationsProps } from "@/types/propTypes";
import { useDevMatchAppStore } from "@/store/store";
import { createSocketConnection } from "@/socket/socket";
import ReceivedChatBubble from "@/components/conversations/receivedChatBubble";
import SentChatBubble from "@/components/conversations/sentChatBubble";
import ChatsSeparator from "@/components/conversations/chatsSeparator";

const ChatMessages = ({ user }: ConversationsProps) => {
  const [chatMessages, setChatMessages] = useState({ text: "Hello bro!" });

  const loggedInUser = useDevMatchAppStore((state) => state.loggedInUser);

  useEffect(() => {
    if (!user?.id || !loggedInUser?.id) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", {
      userId: loggedInUser?.id,
      targetUserId: user?.id,
    });

    return () => {
      socket.disconnect();
    };
  }, [loggedInUser, user]);

  return (
    <div className="w-full overflow-hidden">
      <ReceivedChatBubble user={user} />

      <SentChatBubble />

      <ChatsSeparator />

      <ReceivedChatBubble user={user} />

      <SentChatBubble />
      <ReceivedChatBubble user={user} />

      <SentChatBubble />
      <ReceivedChatBubble user={user} />

      <SentChatBubble />
    </div>
  );
};

export default ChatMessages;
