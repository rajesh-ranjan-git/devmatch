import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiUrls } from "@/lib/api/apiUrls";
import { fetchApiData } from "@/lib/api/fetchApiData";
import { useDevMatchAppStore } from "@/store/store";

const useCheckAuth = () => {
  const router = useRouter();

  const loggedInUser = useDevMatchAppStore((state) => state.loggedInUser);
  const setLoggedInUser = useDevMatchAppStore((state) => state.setLoggedInUser);

  if (loggedInUser) return;

  useEffect(() => {
    let isMounted = true;

    const fetchLoggedInUser = async () => {
      const result = await fetchApiData(apiUrls.checkAuth);
      console.log("debug from useCheckAuth result : ", result);
      if (result.success) {
        console.log(result.data);
        router.push("/login");
      }
      if (isMounted) {
        // safe to update state
      }
    };

    fetchLoggedInUser();

    return () => {
      isMounted = false;
    };
  }, [loggedInUser]);

  return loggedInUser;
};

export default useCheckAuth;
