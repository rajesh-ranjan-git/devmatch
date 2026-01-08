"use client";

import { useEffect } from "react";
import { EXPLORE_VISIBLE_USER_CARDS } from "@/config/constants";
import { getAllUsers } from "@/lib/actions/actions";
import { useDevMatchAppStore } from "@/store/store";
import UserCards from "@/components/explore/userCards";

const Explore = () => {
  const allUsers = useDevMatchAppStore((state) => state.allUsers);
  const setAllUsers = useDevMatchAppStore((state) => state.setAllUsers);
  const setUserCards = useDevMatchAppStore((state) => state.setUserCards);

  useEffect(() => {
    const getAllUsersData = async () => {
      const fetchedUsers = await getAllUsers();

      if (fetchedUsers) {
        setAllUsers(fetchedUsers);
      }
    };

    getAllUsersData();
  }, []);

  useEffect(() => {
    if (allUsers?.length) {
      setUserCards(allUsers.reverse().slice(0, EXPLORE_VISIBLE_USER_CARDS));
    }
  }, [allUsers]);

  return (
    <div className="relative flex justify-center items-center h-[80vh]">
      <div className="place-items-center grid h-full object-cover">
        {!allUsers || allUsers?.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500 text-xl">No users to show!</p>
          </div>
        ) : (
          <UserCards allUsers={allUsers} />
        )}
      </div>
    </div>
  );
};

export default Explore;
