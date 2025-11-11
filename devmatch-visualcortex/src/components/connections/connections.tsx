import {
  navbarMenuItems,
  connectionsSheetDropdownItems,
  requestsSheetDropdownItems,
} from "@/config/config";
import { ConnectionProps } from "@/types/propTypes";
import { ConnectionsSheetItemType, RequestsSheetItemType } from "@/types/types";
import useSheet from "@/hooks/useSheet";
import ConnectionsSheetItem from "@/components/connections/connectionsSheetItem";
import RequestsSheetItem from "@/components/connections/requestsSheetItem";
import ConnectionsButton from "@/components/ui/buttons/connectionsButton";
import Sheet from "@/components/ui/sheet/sheet";

const Connections = ({ name, icon, label }: ConnectionProps) => {
  const connectionsSheet = useSheet({ type: name });

  return (
    <>
      <ConnectionsButton
        name={name}
        icon={icon}
        label={label}
        onClick={() => connectionsSheet.toggle()}
      />
      <Sheet
        open={connectionsSheet.isOpen}
        onClose={() => connectionsSheet.close()}
      >
        <h1 className="p-1">{label}</h1>

        <div className="h-[92%]">
          <div className="[&::-webkit-scrollbar-track]:bg-transparent pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full w-full [&::-webkit-scrollbar]:w-1 h-full overflow-y-scroll [&::-webkit-scrollbar-thumb]:bg-glass-text-tertiary [&::-webkit-scrollbar-thumb]:hover:bg-glass-text-tertiary transition-all ease-in-out">
            {name === Object.values(navbarMenuItems)[0].name &&
              Object.values(requestsSheetDropdownItems)[0].map(
                (item, index) => (
                  <RequestsSheetItem
                    key={index}
                    item={item as RequestsSheetItemType}
                  />
                )
              )}

            {name === Object.values(navbarMenuItems)[1].name &&
              Object.values(connectionsSheetDropdownItems).map(
                (item, index) => (
                  <ConnectionsSheetItem
                    key={index}
                    item={item as ConnectionsSheetItemType}
                  />
                )
              )}
          </div>
        </div>
      </Sheet>
    </>
  );
};

export default Connections;
