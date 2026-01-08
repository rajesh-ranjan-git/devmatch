import { useState } from "react";
import {
  CONNECTION_STATUS_PROPERTIES,
  EXPLORE_VISIBLE_USER_CARDS,
} from "@/config/constants";
import { UserCardsProps } from "@/types/propTypes";
import { updateConnectionStatus } from "@/lib/actions/actions";
import SingleUserCard from "@/components/explore/singleUserCard";

const UserCards = ({ allUsers }: UserCardsProps) => {
  const [cards, setCards] = useState(() =>
    allUsers.slice(0, EXPLORE_VISIBLE_USER_CARDS)
  );
  const [nextIndex, setNextIndex] = useState(EXPLORE_VISIBLE_USER_CARDS);

  const handleRemoveUserCard = (userId: string, status: boolean) => {
    setCards((prev) => {
      const remaining = prev.filter((u) => u?.id !== userId);

      return nextIndex < allUsers.length
        ? [allUsers[nextIndex], ...remaining]
        : remaining;
    });

    setNextIndex((i) => (i < allUsers.length ? i + 1 : i));

    updateConnectionStatus(
      status
        ? CONNECTION_STATUS_PROPERTIES.interested
        : CONNECTION_STATUS_PROPERTIES.notInterested,
      userId
    );
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

export default UserCards;
