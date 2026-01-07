import { ConnectionProps } from "@/types/propTypes";
import { navbarMenuItems, connectionsSheetItems } from "@/config/config";
import useSheet from "@/hooks/useSheet";
import { toTitleCase } from "@/lib/utils/utils";
import ConnectionsSheetItem from "@/components/connections/connectionsSheetItem";
import RequestsSheetItem from "@/components/connections/requestsSheetItem";
import ConnectionsButton from "@/components/ui/buttons/connectionsButton";
import Sheet from "@/components/ui/sheet/sheet";
import { useEffect, useState } from "react";
import { getConnectionsAndRequests } from "@/lib/actions/actions";
import {
  ConnectionRequestsDataType,
  RequestsSheetItemType,
} from "@/types/types";

const Connections = ({ type, icon }: ConnectionProps) => {
  const [requests, setRequests] = useState([
    {
      status: "",
      sender: {},
      receivedRequestOn: "",
    },
  ]);

  const connectionsSheet = useSheet({ type: type });

  useEffect(() => {
    const fetchConnectionsAndRequests = async () => {
      const data = await getConnectionsAndRequests();

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
              requests && requests?.length > 0 ? (
                requests?.map((request, index) => (
                  <RequestsSheetItem key={index} request={request} />
                ))
              ) : (
                <div className="flex justify-center items-center w-full h-full text-sm">
                  <p>No pending requests...</p>
                </div>
              )
            ) : (
              type === navbarMenuItems[1].type &&
              connectionsSheetItems?.connections?.map((item, index) => (
                <ConnectionsSheetItem key={index} item={item} />
              ))
            )}
          </div>
        </div>
      </Sheet>
    </>
  );
};

export default Connections;
