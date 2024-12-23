
import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import { useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "Abdellatyf En-Neiymy",
  description: "Abdellatyf En-Neiymy's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [theme, setTheme] = useState("dark");
  // useEffect(() => {
  //   const localTheme = localStorage.getItem("theme");
  //   console.log(localTheme);
  //   if (localTheme) {
  //     setTheme(localTheme);
  //   }
  // }
  // , [theme]);
  return (
    <html lang="en">
      <body
        className={`bg-[#21272F]} w-full min-h-screen font-iosevka`}>
        <div className={`w-full h-22 flex justify-center items-center fixed bg-[#21272F]}`}>
          <Header />
        </div>
        <div className="w-full h-[calc(100%-6rem)] flex justify-center items-center">
        {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
