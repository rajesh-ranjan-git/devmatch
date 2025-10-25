import { useDevMatchAppStore } from "@/store/store";
import { ConnectionProps } from "@/types/propTypes";
import Button2 from "@/components/ui/buttons/Button2";

const Connections = ({ name, icon, label }: ConnectionProps) => {
  const switchTheme = useDevMatchAppStore((state) => state.switchTheme);

  return <Button2 name={name} icon={icon} label={label} />;
};

export default Connections;
