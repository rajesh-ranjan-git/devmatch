import type { Metadata } from "next";
import { alkatra, arima, inter, tourney } from "@/config/config";
import { ReactNodeProps } from "@/types/propTypes";
import { ToastProvider } from "@/components/toast/toast";
import ThemeManager from "@/components/theme/themeManager";
import DefaultAnimatedBackground from "@/components/background/defaultAnimatedBackground";
import InitialLoader from "@/components/ui/loaders/initialLoader";
import ErrorWrapper from "@/components/errors/errorWrapper";
import Header from "@/components/header/header";
import ConsoleBanner from "@/components/banner/consoleBanner";
import "@/app/globals.css";
import Flash from "@/components/flash/flash";

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "DevMatch",
    template: "%s | DevMatch",
  },
  description:
    "DevMatch is a social platform where developers connect, collaborate, and grow together. Discover like-minded peers, participate in friendly competitions, find collaborators for projects, and build meaningful professional relationships with the developer community.",
};

export default function RootLayout({ children }: Readonly<ReactNodeProps>) {
  return (
    <html lang="en">
      <body
        className={`${alkatra.variable} ${arima.variable} ${inter.variable} ${tourney.variable} max-h-screen h-screen overflow-hidden bg-glass-accent-cyan`}
        suppressHydrationWarning
      >
        <ToastProvider>
          <ConsoleBanner nodeVersion={process.version} />
          <ThemeManager />
          <DefaultAnimatedBackground />
          <Flash />
          <ErrorWrapper>
            {/* <InitialLoader /> */}
            <Header />
            {children}
          </ErrorWrapper>
        </ToastProvider>
      </body>
    </html>
  );
}
