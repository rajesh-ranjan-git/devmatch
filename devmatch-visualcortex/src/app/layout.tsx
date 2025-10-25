import type { Metadata } from "next";
import { alkatra, arima, tourney } from "@/config/config";
import "./globals.css";
import ThemeManager from "@/components/theme/themeManager";

export const metadata: Metadata = {
  title: "DevMatch",
  description:
    "DevMatch is a social platform where developers connect, collaborate, and grow together. Discover like-minded peers, participate in friendly competitions, find collaborators for projects, and build meaningful professional relationships with the developer community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${alkatra.variable} ${arima.variable} ${tourney.variable} antialiased max-h-screen h-screen overflow-hidden bg-glass-accent-cyan`}
        suppressHydrationWarning
      >
        <ThemeManager />
        {children}
      </body>
    </html>
  );
}
