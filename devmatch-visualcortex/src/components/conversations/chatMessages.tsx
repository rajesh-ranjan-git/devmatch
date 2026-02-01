import ReceivedChatBubble from "@/components/conversations/receivedChatBubble";
import SentChatBubble from "@/components/conversations/sentChatBubble";

const ChatMessages = () => {
  return (
    <div className="w-full overflow-hidden">
      <ReceivedChatBubble />

      <SentChatBubble />
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
