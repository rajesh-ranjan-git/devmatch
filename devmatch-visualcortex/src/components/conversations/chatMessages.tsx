import { useEffect, useState } from "react";
import { ChatMessagesProps } from "@/types/propTypes";
import { useDevMatchAppStore } from "@/store/store";
import { createSocketConnection } from "@/socket/socket";
import ReceivedChatBubble from "@/components/conversations/receivedChatBubble";
import SentChatBubble from "@/components/conversations/sentChatBubble";
import ChatsSeparator from "@/components/conversations/chatsSeparator";
import { TbMessageReportFilled } from "react-icons/tb";

const ChatMessages = ({ user, chatMessages }: ChatMessagesProps) => {
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
    <div className="w-full h-full overflow-hidden">
      {chatMessages?.length ? (
        chatMessages?.map((message, idx) => (
          <ReceivedChatBubble key={idx} user={user} message={message.text} />
        ))
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 w-full h-full text-xl">
          <span>
            <TbMessageReportFilled size={40} />
          </span>
          <span>No messages yet!</span>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
