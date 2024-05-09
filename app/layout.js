import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Menubar/header";
import MenuBar from "@/components/Menubar/menuBar";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      ></meta>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col h-screen">
            <Header />
            <div className="dark h-full py-36 overflow-y-scroll">
              {children}
            </div>
            <MenuBar />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
