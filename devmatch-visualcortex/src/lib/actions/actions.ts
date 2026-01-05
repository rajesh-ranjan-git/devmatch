import { apiRequest } from "@/lib/api/api";
import { apiUrls } from "@/lib/api/apiUtils";

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
