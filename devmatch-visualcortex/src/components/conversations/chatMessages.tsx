import { useEffect, useRef } from "react";
import { TbMessageReportFilled } from "react-icons/tb";
import { ChatMessagesProps } from "@/types/propTypes";
import { useDevMatchAppStore } from "@/store/store";
import { createSocketConnection } from "@/socket/socket";
import ReceivedChatBubble from "@/components/conversations/receivedChatBubble";
import SentChatBubble from "@/components/conversations/sentChatBubble";
import ChatsSeparator from "@/components/conversations/chatsSeparator";
import { MessageType } from "@/types/types";

const ChatMessages = ({
  user,
  chatMessages,
  setChatMessages,
}: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loggedInUser = useDevMatchAppStore((state) => state.loggedInUser);

  const scrollToBottom = () => {
    const container = messagesEndRef.current?.closest(".overflow-y-auto");

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    if (!user?.id || !loggedInUser?.id) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", {
      userId: loggedInUser?.id,
      targetUserId: user?.id,
    });

    socket.on("receivedMessage", (message: MessageType) => {
      setChatMessages((chatMessages) => [...chatMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [loggedInUser, user]);

  return (
    <div className="w-full overflow-hidden">
      {chatMessages?.length ? (
        <>
          {chatMessages?.map((message, idx) => (
            <ReceivedChatBubble key={idx} user={user} message={message.text} />
          ))}
          <div ref={messagesEndRef} />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 pt-8 w-full h-full text-xl">
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
