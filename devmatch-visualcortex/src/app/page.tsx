import Image from "next/image";

export default function Home() {
  return (
    <div className="justify-items-center items-center gap-16 grid grid-rows-[20px_1fr_20px] p-8 sm:p-20 pb-20 min-h-screen font-sans">
      <main className="flex flex-col items-center sm:items-start gap-[32px] row-start-2">
        <p className="font-mono text-5xl sm:text-left text-center list-decimal list-inside">
          DevMatch
        </p>
      </main>
      <footer className="flex flex-wrap justify-center items-center gap-[24px] row-start-3"></footer>
    </div>
  );
}
