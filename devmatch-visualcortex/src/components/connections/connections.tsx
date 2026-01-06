import { ConnectionProps } from "@/types/propTypes";
import {
  navbarMenuItems,
  requestsSheetItems,
  connectionsSheetItems,
} from "@/config/config";
import useSheet from "@/hooks/useSheet";
import { toTitleCase } from "@/lib/utils/utils";
import ConnectionsSheetItem from "@/components/connections/connectionsSheetItem";
import RequestsSheetItem from "@/components/connections/requestsSheetItem";
import ConnectionsButton from "@/components/ui/buttons/connectionsButton";
import Sheet from "@/components/ui/sheet/sheet";

const Connections = ({ type, icon }: ConnectionProps) => {
  const connectionsSheet = useSheet({ type: type });

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
          <div className="[&::-webkit-scrollbar-track]:bg-transparent pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full w-full [&::-webkit-scrollbar]:w-1 h-full overflow-y-scroll [&::-webkit-scrollbar-thumb]:bg-glass-text-tertiary [&::-webkit-scrollbar-thumb]:hover:bg-glass-text-tertiary transition-all ease-in-out">
            {type === navbarMenuItems[0].type &&
              requestsSheetItems?.requests?.map((item, index) => (
                <RequestsSheetItem key={index} item={item} />
              ))}

            {type === navbarMenuItems[1].type &&
              connectionsSheetItems?.connections?.map((item, index) => (
                <ConnectionsSheetItem key={index} item={item} />
              ))}
          </div>
        </div>
      </Sheet>
    </>
  );
};

export default Connections;
