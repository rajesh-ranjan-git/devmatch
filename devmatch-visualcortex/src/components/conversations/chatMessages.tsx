import { ConversationsProps } from "@/types/propTypes";
import ReceivedChatBubble from "@/components/conversations/receivedChatBubble";
import SentChatBubble from "@/components/conversations/sentChatBubble";
import ChatsSeparator from "@/components/conversations/chatsSeparator";

const ChatMessages = ({ user }: ConversationsProps) => {
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
