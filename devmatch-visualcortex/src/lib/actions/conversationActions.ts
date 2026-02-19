import { apiRequest } from "@/lib/api/api";
import { apiUrls } from "@/lib/api/apiUtils";

export const getChats = async () => {
  const result = await apiRequest({
    url: apiUrls.chats,
  });

  console.log("debug from conversationActions getChats result : ", result);

  return result?.success ? result?.data?.user : null;
};

export const getChatMessages = async (id: string) => {
  const result = await apiRequest({
    url: `${apiUrls.chats}/${id}`,
  });

  return result?.success ? result?.data?.data?.messages : null;
};

export const getGroups = async () => {
  const result = await apiRequest({
    url: apiUrls.groupChats,
  });

  console.log("debug from conversationActions getGroups result : ", result);

  return result?.success ? result?.data?.user : null;
};

export const getGroupChatMessages = async (id: string) => {
  const result = await apiRequest({
    url: `${apiUrls.groupChats}/${id}`,
  });

  console.log(
    "debug from conversationActions getGroupChatMessages result : ",
    result,
  );

  return result?.success ? result?.data?.user : null;
};
