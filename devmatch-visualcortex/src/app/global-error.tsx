"use client"; // Error boundaries must be Client Components

import "./globals.css";

export default function GlobalError() {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col justify-center items-center min-h-screen">
          <h2 className="mb-4 font-bold text-2xl">Something went wrong!</h2>
          <button
            onClick={() => {
              // refresh the page
              window.location.reload();
            }}
            className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded font-bold text-white"
          >
            Refresh
          </button>
        </div>
      </body>
    </html>
  );
}
