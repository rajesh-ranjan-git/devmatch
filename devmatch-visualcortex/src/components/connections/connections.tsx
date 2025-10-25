import { useDevMatchAppStore } from "@/store/store";
import { ConnectionProps } from "@/types/propTypes";
import Button2 from "@/components/ui/buttons/Button2";
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
      <Button2
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
