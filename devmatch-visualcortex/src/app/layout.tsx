import type { Metadata } from "next";
import { alkatra, arima, inter, tourney } from "@/config/config";
import { ReactNodeProps } from "@/types/propTypes";
import ThemeManager from "@/components/theme/themeManager";
import ErrorWrapper from "@/components/errors/errorWrapper";
import Header from "@/components/header/header";
import DefaultAnimatedBackground from "@/components/background/defaultAnimatedBackground";
import "@/app/globals.css";

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
        <ThemeManager />
        <DefaultAnimatedBackground />
        <Header />
        <ErrorWrapper>{children}</ErrorWrapper>
      </body>
    </html>
  );
}
