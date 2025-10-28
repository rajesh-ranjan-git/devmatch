"use client";

import { alkatra, arima, errorMessages, inter, tourney } from "@/config/config";
import ThemeManager from "@/components/theme/themeManager";
import Header from "@/components/header/header";
import DefaultAnimatedBackground from "@/components/background/defaultAnimatedBackground";
import ButtonNormal from "@/components/ui/buttons/buttonNormal";
import "@/app/globals.css";

export default function GlobalError() {
  return (
    <html lang="en">
      <body
        className={`${alkatra.variable} ${arima.variable} ${inter.variable} ${tourney.variable} max-h-screen h-screen overflow-hidden bg-glass-accent-cyan`}
        suppressHydrationWarning
      >
        <ThemeManager />
        <DefaultAnimatedBackground />
        <Header />
        <div className="flex flex-col justify-center items-center">
          <div className="relative flex justify-center items-center w-full h-[80vh] font-arima">
            <div className="relative flex flex-col justify-center items-center gap-2 bg-glass-surface p-2 border border-glass-border-bright rounded-xl w-full max-w-7xl h-[95%] text-glass-text-primary">
              <h2 className="mb-4 font-bold text-4xl">
                {errorMessages.GLOBAL_ERROR}
              </h2>
              <ButtonNormal
                label="Refresh"
                onClick={() => {
                  window.location.reload();
                }}
              />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
