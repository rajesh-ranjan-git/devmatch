import { useState } from "react";
import { EXPLORE_VISIBLE_USER_CARDS } from "@/config/constants";
import { UserCardProps } from "@/types/propTypes";
import SingleUserCard from "@/components/explore/singleUserCard";

const UserCard = ({ allUsers }: UserCardProps) => {
  const [cards, setCards] = useState(() =>
    allUsers.slice(0, EXPLORE_VISIBLE_USER_CARDS)
  );
  const [nextIndex, setNextIndex] = useState(EXPLORE_VISIBLE_USER_CARDS);

  const handleRemoveUserCard = (userId: string) => {
    setCards((prev) => {
      const remaining = prev.filter((u) => u?.id !== userId);

      if (nextIndex < allUsers.length) {
        remaining.unshift(allUsers[nextIndex]);
        setNextIndex((i) => i + 1);
      }

      return remaining;
    });
  };

  if (cards.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500 text-xl">No more users to show!</p>
      </div>
    );
  }

  return (
    <>
      {cards.map((user, index) => {
        const isFront = index === cards.length - 1;

        return (
          <SingleUserCard
            key={user?.id}
            user={user}
            isFront={isFront}
            cardIndex={index}
            onRemove={handleRemoveUserCard}
          />
        );
      })}
    </>
  );
};

export default UserCard;
