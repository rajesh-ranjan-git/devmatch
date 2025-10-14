import Image from "next/image";

export default function Home() {
  return (
    <>
      <header className="glass-border border-b-2 w-screen max-w-screen h-16 overflow-x-hidden font-bold text-3xl glass">
        <div className="flex justify-center items-center w-full h-full container">
          DevMatch
        </div>
      </header>
      <main className="flex-1 justify-center items-center w-screen max-w-screen h-full overflow-x-hidden font-semibold text-lg">
        <div className="flex justify-center items-center pb-10 w-full h-full container">
          DevMatch
        </div>
      </main>
      <footer className="bottom-0 shadow-bottom fixed glass-border border-t-2 w-screen max-w-screen h-10 overflow-x-hidden font-semibold text-xl">
        <div className="flex justify-center items-center w-full h-full container">
          DevMatch
        </div>
      </footer>
    </>
  );
}
