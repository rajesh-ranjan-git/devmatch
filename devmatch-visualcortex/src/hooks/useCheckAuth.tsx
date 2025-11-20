import { fetchApiData } from "@/lib/utils";
import { useDevMatchAppStore } from "@/store/store";
import { useEffect } from "react";

const useCheckAuth = () => {
  const loggedInUser = useDevMatchAppStore((state) => state.loggedInUser);
  const setLoggedInUser = useDevMatchAppStore((state) => state.setLoggedInUser);

  if (loggedInUser) return;

  useEffect(() => {
    let isMounted = true;

    const fetchLoggedInUser = async () => {
      const res = await fetchApiData("http://localhost:5000/user/checkAuth");
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
