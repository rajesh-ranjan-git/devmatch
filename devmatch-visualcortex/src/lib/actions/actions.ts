import { apiRequest } from "@/lib/api/api";
import { apiUrls } from "@/lib/api/apiUtils";
import { NotificationActionType } from "@/types/types";

export const checkAuth = async () => {
  const result = await apiRequest({
    url: apiUrls?.checkAuth,
  });

  return result?.success ? result?.data?.user : null;
};

export const getUserDetails = async (id?: string) => {
  const result = await apiRequest({
    url: id ? `${apiUrls?.viewProfile}/${id}` : apiUrls?.viewProfile,
  });

  return result?.success ? result?.data?.user : null;
};

export const getAllUsers = async () => {
  const result = await apiRequest({
    url: `${apiUrls?.explore}?page=1&limit=10`,
  });

  return result?.success ? result?.data?.data?.users : null;
};

export const updateConnectionStatus = async (
  status: string,
  userId: string,
) => {
  const result = await apiRequest({
    method: "POST",
    url: `${apiUrls?.connect}/${status}/${userId}`,
  });

  return result?.success ? result?.data : null;
};

export const getConnectionsAndRequests = async () => {
  const connectionsResult = await apiRequest({
    url: apiUrls?.viewConnections,
  });

  const requestsResult = await apiRequest({
    url: apiUrls?.viewRequests,
  });

  return {
    connections: connectionsResult?.data?.data?.connections,
    requests: requestsResult?.data?.data?.requests,
  };
};

export const getNotifications = async () => {
  const result = await apiRequest({
    url: apiUrls?.viewNotifications,
  });

  return result?.success ? result?.data?.data?.notifications : null;
};

export const markNotificationRead = async ({
  id,
  type,
  removeNotificationFlag = false,
}: NotificationActionType) => {
  const result = await apiRequest({
    method: "POST",
    url:
      id && type && removeNotificationFlag
        ? `${apiUrls?.markNotificationRead}/delete/${type}/${id}`
        : id && type
          ? `${apiUrls?.markNotificationRead}/read/${type}/${id}`
          : type
            ? `${apiUrls?.markNotificationRead}/read/${type}`
            : `${apiUrls?.markNotificationRead}/read`,
  });

  return result?.success ? result?.data?.notification : null;
};
