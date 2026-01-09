import { CONNECTION_STATUS_PROPERTIES } from "@/config/constants";
import { UserType } from "@/types/types";
import { UserCardsProps } from "@/types/propTypes";
import { updateConnectionStatus } from "@/lib/actions/actions";
import { useDevMatchAppStore } from "@/store/store";
import { useToast } from "@/components/toast/toast";
import SingleUserCard from "@/components/explore/singleUserCard";

const UserCards = ({ allUsers }: UserCardsProps) => {
  const userCards = useDevMatchAppStore((state) => state.userCards);
  const setUserCards = useDevMatchAppStore((state) => state.setUserCards);
  const userCardsNextIndex = useDevMatchAppStore(
    (state) => state.userCardsNextIndex
  );
  const setUserCardsNextIndex = useDevMatchAppStore(
    (state) => state.setUserCardsNextIndex
  );
  const connections = useDevMatchAppStore((state) => state.connections);
  const setConnections = useDevMatchAppStore((state) => state.setConnections);
  const requests = useDevMatchAppStore((state) => state.requests);
  const setRequests = useDevMatchAppStore((state) => state.setRequests);

  const { showToast } = useToast();

  const handleConnectionAction = async (status: string, id: string) => {
    const prevConnections = connections;
    const prevRequests = requests;
    const prevCards = userCards;

    const updatedConnections = await updateConnectionStatus(status, id);

    if (!updatedConnections?.status) {
      setConnections(prevConnections);
      setRequests(prevRequests);
      setUserCards(prevCards);

      showToast({
        title: "Connection update failed!",
        message: "Unable to update connection status.",
        variant: "error",
      });
    }
  };

  const handleRemoveUserCard = (userId: string, status: string) => {
    setUserCards((prev: UserType[]) => {
      const remaining = prev.filter((u: UserType) => u?.id !== userId);

      return userCardsNextIndex < allUsers.length
        ? [allUsers[userCardsNextIndex], ...remaining]
        : remaining;
    });

    setUserCardsNextIndex((i: number) => (i < allUsers.length ? i + 1 : i));

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
      setConnections(connections.filter((c) => c?.otherUser?.id !== userId));

      setRequests(requests.filter((r) => r?.sender?.id !== userId));
    }

    handleConnectionAction(status, userId);
  };

  if (userCards.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500 text-xl">No more users to show!</p>
      </div>
    );
  }

  return (
    <>
      {userCards.map((user, index) => {
        const isFront = index === userCards.length - 1;

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
