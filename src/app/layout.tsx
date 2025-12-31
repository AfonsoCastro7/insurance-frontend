import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import type { CSSProperties } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jose Castro Seguros",
  description: "Jose Castro Seguros",
  icons: {
    icon: "/insurance-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bodyStyle: CSSProperties & {
    "--font-geist-sans": string;
    "--font-geist-mono": string;
  } = {
    fontFamily: "var(--font-geist-sans)",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    "--font-geist-sans": geistSans.style.fontFamily,
    "--font-geist-mono": geistMono.style.fontFamily,
  };

  return (
    <html lang="en">
      <body style={bodyStyle}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
