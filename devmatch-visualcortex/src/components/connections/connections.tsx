import { useEffect, useState } from "react";
import { navbarMenuItems } from "@/config/config";
import { ConnectionRequestsDataType, SheetItemType } from "@/types/types";
import { ConnectionProps } from "@/types/propTypes";
import useSheet from "@/hooks/useSheet";
import { toTitleCase } from "@/lib/utils/utils";
import {
  getConnectionsAndRequests,
  updateConnectionStatus,
} from "@/lib/actions/actions";
import SheetItem from "@/components/connections/sheetItem";
import ConnectionsButton from "@/components/ui/buttons/connectionsButton";
import Sheet from "@/components/ui/sheet/sheet";
import { useDevMatchAppStore } from "@/store/store";

const Connections = ({ type, icon }: ConnectionProps) => {
  const connections = useDevMatchAppStore((state) => state.connections);
  const setConnections = useDevMatchAppStore((state) => state.setConnections);
  const requests = useDevMatchAppStore((state) => state.requests);
  const setRequests = useDevMatchAppStore((state) => state.setRequests);

  const connectionsSheet = useSheet({ type: type });

  const handleConnectionAction = async (status: string, id: string) => {
    updateConnectionStatus(status, id);

    setRequests(
      requests.filter(
        (request: ConnectionRequestsDataType) => request?.senderId !== id
      )
    );

    setConnections(
      connections.filter(
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
            (acc: SheetItemType[], curr: ConnectionRequestsDataType) => [
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
            (acc: SheetItemType[], curr: ConnectionRequestsDataType) => [
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
            {/* {type === navbarMenuItems[0].type ? (
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
            ) : null} */}
          </div>
        </div>
      </Sheet>
    </>
  );
};

export default Connections;
