"use client";

import { useState } from "react";
import { UserType } from "@/types/types";
import { staticUsers } from "@/config/config";
import { useDevMatchAppStore } from "@/store/store";
import UserCard from "@/components/explore/userCard";

const Explore = () => {
  const [users, setUsers] = useState<UserType[]>(staticUsers);

  const loggedInUser = useDevMatchAppStore((state) => state.loggedInUser);

  if (!loggedInUser) return;

  return (
    <div className="relative flex justify-center items-center h-[80vh]">
      <div className="place-items-center grid h-full object-cover">
        {users.map((user) => (
          <UserCard
            key={user.ID}
            user={user}
            users={users}
            setUsers={setUsers}
          />
        ))}
      </div>
    </div>
  );
};

export default Explore;
