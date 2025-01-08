import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
      <body
        className={`w-full min-h-screen font-iosevka overflow-auto no-scrollbar
        `}
        >
        <ThemeProvider>
        <Header />
        <div className="w-full h-[calc(100%-6rem)] flex justify-center items-center">
        {children}
        </div>
        <Footer />
        <ToastContainer
          autoClose={2000}
          stacked={true}
          style={{ fontSize: "1rem",
             fontFamily: "iosevka",
             width: "80%",
              textAlign: "center",
              margin: "auto",
              borderRadius: "10px",
          }
        }
        />
        </ThemeProvider>
      </body>
    </html>
  );
}
