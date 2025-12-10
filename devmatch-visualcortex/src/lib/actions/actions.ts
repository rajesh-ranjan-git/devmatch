import { apiRequest } from "@/lib/api/api";
import { apiUrls } from "@/lib/api/apiUtils";
import { getCookies } from "@/lib/api/cookiesHandler";

let authorizedUser;

export const checkAuth = async () => {
  const token = await getCookies("authToken");

  const result = await apiRequest({
    url: apiUrls.checkAuth,
    options: { headers: { Authorization: `Bearer ${token}` } },
  });

  if (result && result?.success && result?.data && result?.data?.user) {
    authorizedUser = result?.data?.user;
    return authorizedUser;
  }
};
