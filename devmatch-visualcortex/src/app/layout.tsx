import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeLayout from "@/components/theme/themeLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased  max-h-screen h-screen overflow-hidden glass-bg dark`}
        suppressHydrationWarning
      >
        <ThemeLayout>{children}</ThemeLayout>
      </body>
    </html>
  );
}
