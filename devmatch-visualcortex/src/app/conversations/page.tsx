import Conversations from "@/components/conversations/conversations";

const ConversationsDefaultPage = () => {
  return (
    <div className="relative flex justify-center items-center w-full h-[85vh] overflow-hidden">
      <div className="relative bg-glass-surface shadow-glass-shadow-heavy shadow-md border border-glass-border-bright rounded-xl w-full max-w-7xl h-[95%] overflow-hidden">
        <Conversations />
      </div>
    </div>
  );
};

export default ConversationsDefaultPage;
