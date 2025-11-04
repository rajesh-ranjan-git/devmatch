import { ConnectionProps } from "@/types/propTypes";
import useSheet from "@/hooks/useSheet";
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
        {label}
      </Sheet>
    </>
  );
};

export default Connections;
