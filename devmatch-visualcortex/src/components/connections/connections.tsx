import { ConnectionProps } from "@/types/propTypes";
import { navbarMenuItems } from "@/config/config";
import useSheet from "@/hooks/useSheet";
import { toTitleCase } from "@/lib/utils/utils";
import ConnectionsSheetItem from "@/components/connections/connectionsSheetItem";
import RequestsSheetItem from "@/components/connections/requestsSheetItem";
import ConnectionsButton from "@/components/ui/buttons/connectionsButton";
import Sheet from "@/components/ui/sheet/sheet";
import { useEffect, useState } from "react";
import {
  getConnectionsAndRequests,
  updateConnectionStatus,
} from "@/lib/actions/actions";
import {
  ConnectionRequestsDataType,
  ConnectionsSheetItemType,
  RequestsSheetItemType,
} from "@/types/types";

const Connections = ({ type, icon }: ConnectionProps) => {
  const [connections, setConnections] = useState([]);
  const [requests, setRequests] = useState([]);

  const connectionsSheet = useSheet({ type: type });

  const handleConnectionAction = async (status: string, id: string) => {
    updateConnectionStatus(status, id);

    setRequests((prevRequests) =>
      prevRequests.filter(
        (request: ConnectionRequestsDataType) => request?.senderId !== id
      )
    );

    setConnections((prevConnections) =>
      prevConnections.filter(
        (connection: ConnectionRequestsDataType) =>
          connection?.otherUserId !== id
      )
    );
  };

  useEffect(() => {
    const fetchConnectionsAndRequests = async () => {
      const data = await getConnectionsAndRequests();

      if (data?.connections && data?.connections?.length > 0) {
        setConnections(
          data?.connections?.reduce(
            (
              acc: ConnectionsSheetItemType[],
              curr: ConnectionRequestsDataType
            ) => [
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
            (
              acc: RequestsSheetItemType[],
              curr: ConnectionRequestsDataType
            ) => [
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
                  <ConnectionsSheetItem
                    key={index}
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
                  <RequestsSheetItem
                    key={index}
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
