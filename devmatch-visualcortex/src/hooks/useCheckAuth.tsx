import { fetchApiData } from "@/lib/api/fetchApiData";
import { useDevMatchAppStore } from "@/store/store";
import { useEffect } from "react";

const useCheckAuth = () => {
  const loggedInUser = useDevMatchAppStore((state) => state.loggedInUser);
  const setLoggedInUser = useDevMatchAppStore((state) => state.setLoggedInUser);

  if (loggedInUser) return;

  useEffect(() => {
    let isMounted = true;

    const fetchLoggedInUser = async () => {
      const result = await fetchApiData("/api/users");
      if (result.success) {
        console.log(result.data);
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
