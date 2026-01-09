import { useEffect } from "react";
import { CONNECTION_STATUS_PROPERTIES } from "@/config/constants";
import { navbarMenuItems } from "@/config/config";
import { SheetItemType, UserType } from "@/types/types";
import { ConnectionProps } from "@/types/propTypes";
import useSheet from "@/hooks/useSheet";
import { useToast } from "@/components/toast/toast";
import { toTitleCase } from "@/lib/utils/utils";
import {
  getConnectionsAndRequests,
  updateConnectionStatus,
} from "@/lib/actions/actions";
import { useDevMatchAppStore } from "@/store/store";
import ConnectionsButton from "@/components/ui/buttons/connectionsButton";
import Sheet from "@/components/ui/sheet/sheet";
import SheetItem from "@/components/connections/sheetItem";

const Connections = ({ type, icon }: ConnectionProps) => {
  const allUsers = useDevMatchAppStore((state) => state.allUsers);
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

  const connectionsSheet = useSheet({ type: type });
  const { showToast } = useToast();

  const handleConnectionAction = async (status: string, id: string) => {
    const prevRequests = requests;
    const prevConnections = connections;

    if (type === navbarMenuItems[0].type) {
      setConnections(connections.filter((c) => c?.otherUser?.id !== id));
    }

    if (type === navbarMenuItems[1].type) {
      const request = requests.find((r) => r.sender?.id === id);

      if (status === CONNECTION_STATUS_PROPERTIES.accepted) {
        setConnections([
          ...connections,
          {
            connectionStatus: status,
            otherUser: request?.sender,
            otherUserId: request?.sender?.id,
            connectedSince: request?.receivedRequestOn,
          },
        ]);
      }

      setRequests(requests.filter((r) => r?.sender?.id !== id));
    }

    if (
      (status === CONNECTION_STATUS_PROPERTIES.accepted ||
        status === CONNECTION_STATUS_PROPERTIES.blocked) &&
      userCards.find((user) => user?.id === id)
    ) {
      setUserCards((prev: UserType[]) => {
        const remaining = prev.filter((u: UserType) => u?.id !== id);

        return userCardsNextIndex < allUsers.length
          ? [allUsers[userCardsNextIndex], ...remaining]
          : remaining;
      });

      setUserCardsNextIndex((i: number) => (i < allUsers.length ? i + 1 : i));
    }

    const updatedConnections = await updateConnectionStatus(status, id);

    if (!updatedConnections?.status) {
      setConnections(prevConnections);
      setRequests(prevRequests);

      showToast({
        title: "Connection update failed!",
        message: "Unable to update connection status.",
        variant: "error",
      });
    }
  };

  useEffect(() => {
    const fetchConnectionsAndRequests = async () => {
      const data = await getConnectionsAndRequests();

      if (data?.connections && data?.connections?.length > 0) {
        setConnections(
          data?.connections?.reduce(
            (acc: SheetItemType[], curr: SheetItemType) => [
              {
                status: curr?.connectionStatus,
                otherUser: curr?.otherUser,
                otherUserId: curr?.otherUserId,
                connectedSince: curr?.updatedAt,
              },
              ...acc,
            ],
            []
          )
        );
      }

      if (data?.requests && data?.requests?.length > 0) {
        setRequests(
          data?.requests?.reduce(
            (acc: SheetItemType[], curr: SheetItemType) => [
              {
                status: curr?.connectionStatus,
                sender: curr?.senderId,
                receivedRequestOn: curr?.updatedAt,
              },
              ...acc,
            ],
            []
          )
        );
      }
    };

    fetchConnectionsAndRequests();
  }, []);

  return (
    <>
      <ConnectionsButton
        text={type}
        icon={icon}
        onClick={() => connectionsSheet.toggle()}
      />
      <Sheet
        open={connectionsSheet.isOpen}
        onClose={() => connectionsSheet.close()}
      >
        <h1 className="p-1">{toTitleCase(type ?? "")}</h1>

        <div className="h-[92%]">
          <div className="flex flex-col gap-2 [&::-webkit-scrollbar-track]:bg-transparent pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full w-full [&::-webkit-scrollbar]:w-1 h-full overflow-y-scroll [&::-webkit-scrollbar-thumb]:bg-glass-text-tertiary [&::-webkit-scrollbar-thumb]:hover:bg-glass-text-tertiary transition-all ease-in-out">
            {type === navbarMenuItems[0].type ? (
              connections && connections?.length > 0 ? (
                connections?.map((connection, index) => (
                  <SheetItem
                    key={index}
                    type={type}
                    connection={connection}
                    handleConnectionAction={handleConnectionAction}
                    onSheetClose={() => connectionsSheet.close()}
                  />
                ))
              ) : (
                <div className="flex justify-center items-center w-full h-full text-sm">
                  <p>No connections yet...</p>
                </div>
              )
            ) : type === navbarMenuItems[1].type ? (
              requests && requests?.length > 0 ? (
                requests?.map((request, index) => (
                  <SheetItem
                    key={index}
                    type={type}
                    request={request}
                    handleConnectionAction={handleConnectionAction}
                    onSheetClose={() => connectionsSheet.close()}
                  />
                ))
              ) : (
                <div className="flex justify-center items-center w-full h-full text-sm">
                  <p>No pending requests...</p>
                </div>
              )
            ) : null}
          </div>
        </div>
      </Sheet>
    </>
  );
};

export default Connections;
