import { useState } from "react";
import {
  CONNECTION_STATUS_PROPERTIES,
  EXPLORE_VISIBLE_USER_CARDS,
} from "@/config/constants";
import { UserCardsProps } from "@/types/propTypes";
import { updateConnectionStatus } from "@/lib/actions/actions";
import { useDevMatchAppStore } from "@/store/store";
import { useToast } from "@/components/toast/toast";
import SingleUserCard from "@/components/explore/singleUserCard";

const UserCards = ({ allUsers }: UserCardsProps) => {
  const [cards, setCards] = useState(() =>
    allUsers.slice(0, EXPLORE_VISIBLE_USER_CARDS)
  );
  const [nextIndex, setNextIndex] = useState(EXPLORE_VISIBLE_USER_CARDS);

  const connections = useDevMatchAppStore((state) => state.connections);
  const setConnections = useDevMatchAppStore((state) => state.setConnections);
  const requests = useDevMatchAppStore((state) => state.requests);
  const setRequests = useDevMatchAppStore((state) => state.setRequests);

  const { showToast } = useToast();

  const handleConnectionAction = async (status: string, id: string) => {
    const prevConnections = connections;
    const prevRequests = requests;
    const prevCards = cards;

    const updatedConnections = await updateConnectionStatus(status, id);

    if (!updatedConnections?.status) {
      setConnections(prevConnections);
      setRequests(prevRequests);
      setCards(prevCards);

      showToast({
        title: "Connection update failed!",
        message: "Unable to update connection status.",
        variant: "error",
      });
    }
  };

  const handleRemoveUserCard = (userId: string, status: string) => {
    setCards((prev) => {
      const remaining = prev.filter((u) => u?.id !== userId);

      return nextIndex < allUsers.length
        ? [allUsers[nextIndex], ...remaining]
        : remaining;
    });

    setNextIndex((i) => (i < allUsers.length ? i + 1 : i));

    if (status === CONNECTION_STATUS_PROPERTIES.accepted) {
      const request = requests.find((r) => r.sender?.id === userId);

      setConnections([
        ...connections,
        {
          connectionStatus: status,
          otherUser: request?.sender,
          otherUserId: request?.sender?.id,
          connectedSince: request?.receivedRequestOn,
        },
      ]);

      setRequests(requests.filter((r) => r?.sender?.id !== userId));
    } else if (
      status === CONNECTION_STATUS_PROPERTIES.rejected ||
      status === CONNECTION_STATUS_PROPERTIES.blocked
    ) {
      setConnections(connections.filter((c) => c?.otherUserId !== userId));

      setRequests(requests.filter((r) => r?.sender?.id !== userId));
    }

    handleConnectionAction(status, userId);
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
