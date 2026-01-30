import { FaPeopleGroup, FaRocketchat } from "react-icons/fa6";
import { IoCallSharp, IoSend } from "react-icons/io5";
import ButtonNormal from "@/components/ui/buttons/buttonNormal";
import Textarea from "@/components/ui/inputs/textarea";

const Chat = () => {
  return (
    <div className="grid grid-cols-[1fr_3fr] rounded-xl w-full h-full">
      <div className="grid grid-rows-[auto_auto_1fr] border-r rounded-xl w-full h-[99.2%] overflow-hidden">
        <div className="border-b">
          <div className="grid grid-cols-[1fr_1fr_1fr] w-full">
            <div className="flex justify-center items-center gap-2 bg-glass-surface-light hover:bg-glass-surface-heavy p-2 py-4 border-r cursor-pointer">
              <span>
                <IoCallSharp />
              </span>
              <span>Calls</span>
            </div>
            <div className="flex justify-center items-center gap-2 bg-glass-surface-light hover:bg-glass-surface-heavy p-2 border-r cursor-pointer">
              <span>
                <FaRocketchat />
              </span>
              <span>Chats</span>
            </div>
            <div className="flex justify-center items-center gap-2 bg-glass-surface-light hover:bg-glass-surface-heavy p-2 cursor-pointer">
              <span>
                <FaPeopleGroup />
              </span>
              <span>Groups</span>
            </div>
          </div>
        </div>

        <div className="p-2 pt-3">
          <ButtonNormal className="p-4 py-5 w-full">New Chat</ButtonNormal>
        </div>

        <div className="p-2 pr-1 h-[72%]">
          <div className="space-y-1 [&::-webkit-scrollbar-thumb]:bg-glass-surface-light [&::-webkit-scrollbar-track]:bg-transparent pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full w-full [&::-webkit-scrollbar]:w-1 h-full overflow-y-auto [&::-webkit-scrollbar-thumb]:hover:bg-glass-text-tertiary transition-all ease-in-out">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 bg-glass-surface-light hover:bg-glass-surface-heavy p-2 border rounded-lg transition-colors cursor-pointer"
              >
                <div className="flex justify-center items-center bg-green-600 rounded-full w-10 h-10 font-semibold text-white">
                  AI
                </div>
                <div>
                  <h3 className="mb-1 font-medium text-glass-text-primary text-sm">
                    Chat Conversation {item}
                  </h3>
                  <p className="text-glass-text-secondary text-xs truncate">
                    Last message preview goes here...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="p-2 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="flex justify-center items-center bg-green-600 rounded-full w-10 h-10 font-semibold text-white">
                AI
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Chat Assistant</h3>
                <p className="text-green-600 text-xs">● Online</p>
              </div>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
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
              <button className="p-1 text-glass-text-secondary hover:text-glass-text-primary cursor-pointer">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button>
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

export default Chat;
