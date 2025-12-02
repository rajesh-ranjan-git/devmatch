import { apiUrls } from "@/lib/api/apiUrls";
import { fetchApiData } from "@/lib/api/fetchApiData";

export const getUserDetails = async (id?: string) => {
  const result = await fetchApiData(
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
