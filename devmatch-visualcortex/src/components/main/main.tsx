import { ReactNodeProps } from "@/types/propTypes";

const Main = ({ children }: ReactNodeProps) => {
  return (
    <main className="relative flex-1 justify-center items-center w-screen max-w-screen h-full overflow-x-hidden font-semibold text-lg">
      {children}
    </main>
  );
};

export default Main;
