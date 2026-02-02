import { toTitleCase } from "@/lib/utils/utils";
import { ConversationTabProps } from "@/types/propTypes";

const ConversationsTab = ({
  tab,
  activeTab,
  setActiveTab,
  icon,
  className,
}: ConversationTabProps) => {
  return (
    <div
      className={`flex justify-center items-center gap-2  hover:bg-glass-surface-heavy p-2 py-4 border-r last:border-r-0 cursor-pointer transition-all ease-in-out ${activeTab === tab ? "bg-glass-surface-heavy" : "bg-transparent"} ${className}`}
      onClick={() => setActiveTab(tab)}
    >
      <span>{icon}</span>
      <span>{toTitleCase(tab)}</span>
    </div>
  );
};

export default ConversationsTab;
