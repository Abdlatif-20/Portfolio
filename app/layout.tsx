import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/context";
import { Metadata } from "next";
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: "Abdellatyf En-Neiymy",
  description: "Abdellatyf En-Neiymy's Portfolio",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`w-screen min-h-screen font-iosevka overflow-y-auto no-scrollbar overflow-x-hidden
        `}
        >
        <ThemeProvider>
        <Header />
        <div className="w-full h-[calc(100%-6rem)] flex justify-center items-center lg:mt-10">
        {children}
        </div>
        <Footer />
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
