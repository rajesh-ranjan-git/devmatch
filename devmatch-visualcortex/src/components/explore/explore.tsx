"use client";

import { useState } from "react";
import { UserType } from "@/types/types";
import { staticUsers } from "@/config/config";
import UserCard from "@/components/explore/userCard";

const Explore = () => {
  const [users, setUsers] = useState<UserType[]>(staticUsers);

  return (
    <div className="relative flex justify-center items-center h-[80vh]">
      <div className="place-items-center grid h-full object-cover">
        {staticUsers.map((user) => (
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
