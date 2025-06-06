import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import Main from "./Main";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "JCM Constructora Inmobiliaria",
  description:
    "Desde 2011, JCM Constructora Inmobiliaria desarrolla modernos edificios multifamiliares en Trujillo, Perú, con un enfoque en innovación, calidad y acabados de primera.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Main>{children}</Main>

        <Toaster />
      </body>
    </html>
  );
}
