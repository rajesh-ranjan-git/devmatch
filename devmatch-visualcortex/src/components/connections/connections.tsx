import { useDevMatchAppStore } from "@/store/store";
import { ConnectionProps } from "@/types/propTypes";

const Connections = ({ name, icon, label }: ConnectionProps) => {
  const switchTheme = useDevMatchAppStore((state) => state.switchTheme);

  return (
    <div
      className={`flex justify-center items-center gap-2 p-2 border  rounded-lg font-semibold transition-all ease-in-out cursor-pointer ${
        switchTheme === "dark" ? "hover:border-white" : "hover:border-black"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default Connections;
