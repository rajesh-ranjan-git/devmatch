import { useDevMatchAppStore } from "@/store/store";
import { ConnectionProps } from "@/types/propTypes";
import ConnectionButton from "@/components/ui/buttons/ConnectionButton";
import Sheet from "@/components/ui/sheet/sheet";

const Connections = ({ name, icon, label }: ConnectionProps) => {
  const activeConnectionSheet = useDevMatchAppStore(
    (state) => state.activeConnectionSheet
  );
  const setActiveConnectionSheet = useDevMatchAppStore(
    (state) => state.setActiveConnectionSheet
  );

  const isOpen = activeConnectionSheet === name;

  return (
    <>
      <ConnectionButton
        name={name}
        icon={icon}
        label={label}
        onClick={() => setActiveConnectionSheet(name)}
      />
      <Sheet open={isOpen} onClose={() => setActiveConnectionSheet(null)}>
        {label}
      </Sheet>
    </>
  );
};

export default Connections;
