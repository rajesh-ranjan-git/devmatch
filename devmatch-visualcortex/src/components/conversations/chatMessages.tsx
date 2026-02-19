import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { TbMessageReportFilled } from "react-icons/tb";
import { MessageType } from "@/types/types";
import { ChatMessagesProps } from "@/types/propTypes";
import { useDevMatchAppStore } from "@/store/store";
import { createSocketConnection } from "@/socket/socket";
import { shouldShowChatSeparator } from "@/lib/utils/utils";
import { getChatMessages } from "@/lib/actions/conversationActions";
import { getCookies } from "@/lib/api/cookiesHandler";
import ReceivedChatBubble from "@/components/conversations/receivedChatBubble";
import SentChatBubble from "@/components/conversations/sentChatBubble";
import ChatsSeparator from "@/components/conversations/chatsSeparator";

const ChatMessages = ({
  user,
  chatMessages,
  setChatMessages,
  handleResendMessage,
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

    let socket: Socket;

    const initSocket = async () => {
      const token = await getCookies("authToken");

      if (!token || typeof token !== "string") return;

      socket = createSocketConnection({ token });

      socket.emit("join-chat", {
        targetUserId: user?.id,
      });

      socket.on("received-message", (message: MessageType) => {
        console.log("debug from socket received-message : ", message);
        setChatMessages((chatMessages) => [...chatMessages, message]);
      });
    };

    initSocket();

    return () => {
      socket.disconnect();
    };
  }, [loggedInUser, user]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchChatMessages = async (id: string) => {
      const data = await getChatMessages(id);

      console.log("debug from chatMessages fetchChatMessages data : ", data);

      setChatMessages(data);
    };

    fetchChatMessages(user?.id);
  }, [user]);

  return (
    <div className="w-full overflow-hidden">
      {chatMessages?.length ? (
        <>
          {chatMessages?.map((message, idx) => {
            const previousMessage = idx > 0 ? chatMessages[idx - 1] : null;

            const showChatSeparator = shouldShowChatSeparator(
              message?.createdAt ?? Date.now().toLocaleString(),
              previousMessage?.createdAt,
            );

            return message?.senderId === user?.id ? (
              <div key={idx}>
                {showChatSeparator && (
                  <ChatsSeparator
                    date={message?.createdAt ?? Date.now().toLocaleString()}
                  />
                )}

                <ReceivedChatBubble
                  key={idx}
                  user={user}
                  message={message}
                  isLatestMessage={chatMessages?.length - 1 === idx}
                />
              </div>
            ) : message?.senderId === loggedInUser?.id ? (
              <div key={idx}>
                {showChatSeparator && (
                  <ChatsSeparator
                    date={message?.createdAt ?? Date.now().toLocaleString()}
                  />
                )}

                <SentChatBubble
                  key={idx}
                  user={user}
                  message={message}
                  isLatestMessage={chatMessages?.length - 1 === idx}
                  handleResendMessage={handleResendMessage}
                />
              </div>
            ) : null;
          })}

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
