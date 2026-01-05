"use client";

import { useEffect, useState } from "react";
import { UserType } from "@/types/types";
import { getAllUsers } from "@/lib/actions/actions";
import UserCard from "@/components/explore/userCard";

const Explore = () => {
  const [allUsers, setAllUsers] = useState<UserType[]>([]);
  const [visibleUsers, setVisibleUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const getAllUsersData = async () => {
      const fetchedUsers = await getAllUsers();

      if (fetchedUsers) {
        setAllUsers(fetchedUsers);
        setVisibleUsers(fetchedUsers.slice(0, 10));
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
        ) : visibleUsers.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500 text-xl">No more users to show!</p>
          </div>
        ) : (
          visibleUsers.map((user) => (
            <UserCard
              key={user?.id}
              user={user}
              users={visibleUsers}
              setUsers={setVisibleUsers}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Explore;
