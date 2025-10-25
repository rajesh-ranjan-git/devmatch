import { useDevMatchAppStore } from "@/store/store";
import { ConnectionProps } from "@/types/propTypes";
import Button2 from "@/components/ui/buttons/Button2";
import Sheet from "@/components/ui/sheet/sheet";

const Connections = ({ name, icon, label }: ConnectionProps) => {
  const switchTheme = useDevMatchAppStore((state) => state.switchTheme);
  const toggleConnectionSheet = useDevMatchAppStore(
    (state) => state.toggleConnectionSheet
  );
  const setToggleConnectionSheet = useDevMatchAppStore(
    (state) => state.setToggleConnectionSheet
  );

  return (
    <>
      <Button2
        name={name}
        icon={icon}
        label={label}
        onClick={() => setToggleConnectionSheet(!toggleConnectionSheet)}
      />
      <Sheet
        open={toggleConnectionSheet}
        onClose={() => setToggleConnectionSheet(false)}
      >
        Sheet
      </Sheet>
    </>
  );
};

export default Connections;
