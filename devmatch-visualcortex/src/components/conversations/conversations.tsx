"use client";

import Image from "next/image";
import { IoSend } from "react-icons/io5";
import { CONVERSATION_TABS } from "@/config/constants";
import { conversationTabs, staticImages } from "@/config/config";
import { ConversationsProps } from "@/types/propTypes";
import { useDevMatchAppStore } from "@/store/store";
import ConversationsTab from "@/components/conversations/conversationsTab";
import Chats from "@/components/conversations/chats";
import Calls from "@/components/conversations/calls";
import Groups from "@/components/conversations/groups";
import ButtonNormal from "@/components/ui/buttons/buttonNormal";
import Textarea from "@/components/ui/inputs/textarea";
import { TiAttachmentOutline } from "react-icons/ti";

const Conversations = ({ user }: ConversationsProps) => {
  const activeConversationTab = useDevMatchAppStore(
    (state) => state.activeConversationTab,
  );
  const setActiveConversationTab = useDevMatchAppStore(
    (state) => state.setActiveConversationTab,
  );

  return (
    <div className="grid grid-cols-[1fr_3fr] rounded-xl w-full h-full">
      <div className="grid grid-rows-[auto_auto_1fr] border-r rounded-xl w-full h-[99.2%] overflow-hidden">
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

      <div className="flex flex-col">
        <div className="p-1 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 hover:bg-glass-surface-light shadow-glass-shadow-medium hover:shadow-md p-1 pr-8 rounded-lg transition-all ease-in-out cursor-pointer">
              <div className="flex justify-center items-center rounded-full w-10 h-8 font-semibold text-white">
                <Image
                  src={staticImages.avatarPlaceholder.src}
                  alt={staticImages.avatarPlaceholder.alt}
                  width={100}
                  height={100}
                  className="border rounded-full"
                />
              </div>
              <div>
                <h3 className="font-semibold text-glass-text-primary">
                  Your connections's Name
                </h3>
                <p className="text-green-400 text-xs">● Online</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-2 pr-4 overflow-y-auto">
          <div className="space-y-4 mx-auto max-w-5xl">
            {/* Received Message */}
            <div className="flex gap-3">
              <div className="flex justify-center items-center bg-green-600 rounded-full w-8 h-8 font-semibold text-white text-sm shrink-0">
                AI
              </div>
              <div className="shadow-sm p-4 rounded-lg rounded-tl-none max-w-2xl">
                <p className="text-gray-800 text-sm">
                  Hello! How can I help you today?
                </p>
                <span className="block mt-2 text-gray-400 text-xs">
                  10:30 AM
                </span>
              </div>
            </div>

            {/* Sent Message */}
            <div className="flex justify-end gap-3">
              <div className="bg-blue-600 shadow-sm p-4 rounded-lg rounded-tr-none max-w-2xl text-white">
                <p className="text-sm">
                  I need help with creating a responsive layout in Next.js using
                  Tailwind CSS.
                </p>
                <span className="block mt-2 text-blue-200 text-xs">
                  10:31 AM
                </span>
              </div>
              <div className="flex justify-center items-center bg-blue-600 rounded-full w-8 h-8 font-semibold text-white text-sm shrink-0">
                JD
              </div>
            </div>

            {/* Received Message */}
            <div className="flex gap-3">
              <div className="flex justify-center items-center bg-green-600 rounded-full w-8 h-8 font-semibold text-white text-sm shrink-0">
                AI
              </div>
              <div className="shadow-sm p-4 rounded-lg rounded-tl-none max-w-2xl">
                <p className="text-gray-800 text-sm">
                  I'd be happy to help you create a responsive layout! Tailwind
                  CSS makes it easy to build grid-based layouts with utility
                  classes. What specific layout structure are you looking for?
                </p>
                <span className="block mt-2 text-gray-400 text-xs">
                  10:32 AM
                </span>
              </div>
            </div>
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
                placeholder="Type your message"
                rows={1}
              />
              <ButtonNormal icon={<IoSend />} className="py-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversations;
