"use client";

import { useState } from "react";
import UserCard from "@/components/cards/userCard";
import { staticUsers } from "@/config/config";
import { User } from "@/types/types";

const Explore = () => {
  const [users, setUsers] = useState<User[]>(staticUsers);

  return (
    <div className="relative flex justify-center items-center h-[80vh]">
      <div className="place-items-center grid h-full object-cover">
        {users.map((user) => (
          <UserCard
            key={user.id}
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
