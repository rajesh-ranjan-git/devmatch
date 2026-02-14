"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { IoSend } from "react-icons/io5";
import { TiAttachmentOutline } from "react-icons/ti";
import { CONVERSATION_TABS } from "@/config/constants";
import { conversationTabs, staticImages } from "@/config/config";
import { MessageType } from "@/types/types";
import { ConversationsProps } from "@/types/propTypes";
import { getFullName, toTitleCase } from "@/lib/utils/utils";
import { useDevMatchAppStore } from "@/store/store";
import { createSocketConnection } from "@/socket/socket";
import ConversationsTab from "@/components/conversations/conversationsTab";
import Chats from "@/components/conversations/chats";
import Calls from "@/components/conversations/calls";
import ChatMessages from "@/components/conversations/chatMessages";
import Groups from "@/components/conversations/groups";
import DefaultMainContent from "@/components/main/defaultMainContent";
import ButtonNormal from "@/components/ui/buttons/buttonNormal";
import Textarea from "@/components/ui/inputs/textarea";

const Conversations = ({ user }: ConversationsProps) => {
  const [chatMessages, setChatMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState<MessageType>({
    text: "",
    sentBy: "",
    sentAt: "",
  });

  const loggedInUser = useDevMatchAppStore((state) => state.loggedInUser);
  const activeConversationTab = useDevMatchAppStore(
    (state) => state.activeConversationTab,
  );
  const setActiveConversationTab = useDevMatchAppStore(
    (state) => state.setActiveConversationTab,
  );

  const handleSendMessage = () => {
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      userId: loggedInUser?.id,
      targetUserId: user?.id,
      message: newMessage.text,
    });

    setNewMessage({
      text: "",
      sentBy: "",
      sentAt: "",
      deliveredAt: "",
      seen: false,
    });
  };

  return (
    <div className="grid grid-cols-[1fr_3fr] rounded-xl w-full h-full">
      <div className="grid grid-rows-[auto_auto_1fr] border-r rounded-xl w-full h-[99.2%] overflow-hidden select-none">
        <div className="border-b">
          <div className="grid grid-cols-[1fr_1fr_1fr] w-[101%]">
            {Object.values(conversationTabs).map((tab, idx) => (
              <ConversationsTab
                key={idx}
                tab={tab.tab}
                activeTab={activeConversationTab}
                setActiveTab={setActiveConversationTab}
                icon={tab.icon}
              />
            ))}
          </div>
        </div>

        {activeConversationTab === CONVERSATION_TABS.calls ? (
          <Calls />
        ) : activeConversationTab === CONVERSATION_TABS.chats ? (
          <Chats />
        ) : activeConversationTab === CONVERSATION_TABS.groups ? (
          <Groups />
        ) : null}
      </div>

      <div className="flex flex-col h-full min-h-0 overflow-hidden">
        {user ? (
          <>
            <div className="p-1 border-b select-none">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 hover:bg-glass-surface-light shadow-glass-shadow-medium hover:shadow p-1 pr-8 rounded-lg transition-all ease-in-out cursor-pointer">
                  <div className="flex justify-center items-center shadow-glass-shadow-heavy shadow-md rounded-full w-10 h-10 font-semibold text-white">
                    <Image
                      src={
                        user?.avatarUrl ?? staticImages.avatarPlaceholder.src
                      }
                      alt={staticImages.avatarPlaceholder.alt}
                      width={100}
                      height={100}
                      className="border rounded-full w-full h-full object-cover select-none"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-glass-text-primary">
                      {toTitleCase(getFullName(user))}
                    </h3>
                    <p className="text-green-400 text-xs">● Online</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 p-2 pr-1 h-full overflow-y-auto">
              <div className="space-y-4 [&::-webkit-scrollbar-thumb]:bg-glass-surface-light [&::-webkit-scrollbar-track]:bg-transparent mx-auto pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full w-full [&::-webkit-scrollbar]:w-1 max-w-5xl h-full overflow-y-auto [&::-webkit-scrollbar-thumb]:hover:bg-glass-text-tertiary transition-all ease-in-out">
                <ChatMessages
                  user={user}
                  chatMessages={chatMessages}
                  setChatMessages={setChatMessages}
                />
              </div>
            </div>

            <div className="p-2 pr-4 border-t">
              <div className="mx-auto max-w-5xl">
                <div className="flex items-center gap-2">
                  <ButtonNormal
                    icon={<TiAttachmentOutline size={24} />}
                    className="py-5"
                  />
                  <Textarea
                    name="sendMessage"
                    placeholder="Type your message..."
                    rows={1}
                    value={newMessage.text}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      if (loggedInUser?.id) {
                        setNewMessage({
                          text: e.target.value,
                          sentBy: loggedInUser.id,
                          sentAt: new Date().toISOString(),
                        });
                      }
                    }}
                    onKeyDown={handleSendMessage}
                  />
                  <ButtonNormal
                    icon={<IoSend />}
                    className="py-5"
                    onClick={handleSendMessage}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>
            <DefaultMainContent />
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversations;
