export default function Home() {
  return (
    <>
      <header className="flex justify-center items-center pt-4 w-screen max-w-screen h-20 overflow-x-hidden font-bold text-3xl">
        <div className="flex justify-center items-center glass-border border-2 w-full h-full glass container">
          DevMatch
        </div>
      </header>
      <main className="flex-1 justify-center items-center w-screen max-w-screen h-full overflow-x-hidden font-semibold text-lg">
        <div className="blob-outer-container">
          <div className="blob-inner-container">
            <div className="blob"></div>
          </div>
        </div>
        <div className="flex justify-center items-center pb-10 w-full h-full container">
          DevMatch
        </div>
      </main>
      <footer className="bottom-0 shadow-bottom fixed glass-border border-t-2 rounded-t-lg w-screen max-w-screen h-10 overflow-x-hidden font-semibold text-xl">
        <div className="flex justify-center items-center w-full h-full container">
          DevMatch
        </div>
      </footer>
    </>
  );
}
