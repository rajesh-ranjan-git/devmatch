import Logo from "@/components/header/logo";
import NavbarRight from "@/components/header/navbarRight";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-glass-surface-heavy shadow-glass-shadow-heavy shadow-md mx-auto px-4 py-1 border border-glass-border-bright rounded-xl w-full max-w-7xl h-full">
      <Logo />
      <NavbarRight />
    </div>
  );
};

export default Navbar;
