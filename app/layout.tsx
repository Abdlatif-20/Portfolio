import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { ThemeProvider } from "@/components/context";
import { Metadata } from "next";
import { ToastContainer } from 'react-toastify';


export const metadata: Metadata = {
  title: "Abdellatyf En-Neiymy",
  description: "Abdellatyf En-Neiymy's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/faveicon.png" />
      </head>
      <body
        className={`w-screen min-h-screen font-iosevka overflow-y-auto no-scrollbar overflow-x-hidden
        `}
        >
        <ThemeProvider>
        <SiteChrome>{children}</SiteChrome>
        <ToastContainer
          autoClose={2000}
          stacked={true}
          style={{ fontSize: "1rem",

            color: "#fff",
            width: "70%",
            maxWidth: "400px",
             fontFamily: "iosevka",
              textAlign: "center",
              borderRadius: "10px",
          }
        }
        />
        </ThemeProvider>
      </body>
    </html>
  );
}
