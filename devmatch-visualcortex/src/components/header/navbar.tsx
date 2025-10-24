import Logo from "@/components/header/logo";
import NavRight from "@/components/header/navRight";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center border w-full h-full container">
      <Logo />
      <NavRight />
    </div>
  );
};

export default Navbar;
