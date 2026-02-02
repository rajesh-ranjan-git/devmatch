import ReceivedChatBubble from "@/components/conversations/receivedChatBubble";
import SentChatBubble from "@/components/conversations/sentChatBubble";
import ChatsSeparator from "@/components/conversations/chatsSeparator";

const ChatMessages = () => {
  return (
    <div className="w-full overflow-hidden">
      <ReceivedChatBubble />

      <SentChatBubble />

      <ChatsSeparator />

      <ReceivedChatBubble />

      <SentChatBubble />
      <ReceivedChatBubble />

      <SentChatBubble />
      <ReceivedChatBubble />

      <SentChatBubble />
    </div>
  );
};

export default ChatMessages;
