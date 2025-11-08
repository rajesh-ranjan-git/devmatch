import { navbarMenuItems } from "@/config/config";
import { ConnectionProps } from "@/types/propTypes";
import useSheet from "@/hooks/useSheet";
import RequestsSheetItems from "@/components/requests/requestsSheetItems";
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

        {name === Object.values(navbarMenuItems)[0].name && (
          <RequestsSheetItems />
        )}
      </Sheet>
    </>
  );
};

export default Connections;
