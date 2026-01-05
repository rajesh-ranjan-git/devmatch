"use client";

import { useEffect, useState } from "react";
import { UserType } from "@/types/types";
import { getAllUsers } from "@/lib/actions/actions";
import UserCard from "@/components/explore/userCard";

const Explore = () => {
  const [allUsers, setAllUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const getAllUsersData = async () => {
      const fetchedUsers = await getAllUsers();

      if (fetchedUsers) {
        setAllUsers(fetchedUsers);
      }
    };

    getAllUsersData();
  }, []);

  return (
    <div className="relative flex justify-center items-center h-[80vh]">
      <div className="place-items-center grid h-full object-cover">
        {!allUsers || allUsers?.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500 text-xl">No users to show!</p>
          </div>
        ) : (
          <UserCard allUsers={allUsers} />
        )}
      </div>
    </div>
  );
};

export default Explore;
