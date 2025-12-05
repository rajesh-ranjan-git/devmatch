import { apiUrls } from "@/lib/api/apiUtils";
import { api } from "@/lib/api/apiHandler";

export const getUserDetails = async (id?: string) => {
  const result = await api.get(
    id ? `${apiUrls.viewProfile}/${id}` : apiUrls.viewProfile
  );

  if (
    result.success &&
    result.data &&
    result.data.data &&
    result.data.data.user
  )
    return result.data.data.user;

  return null;
};
