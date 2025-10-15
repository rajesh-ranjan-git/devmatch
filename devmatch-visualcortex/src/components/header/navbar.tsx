import Logo from "@/components/header/logo";
import NavRight from "@/components/header/navRight";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center glass-border border-1 w-full h-full glass-md container">
      <Logo />
      <NavRight />
    </div>
  );
};

export default Navbar;
