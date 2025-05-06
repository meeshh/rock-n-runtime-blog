import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./style.css";
import { geistMono, geistSans } from "@/utils/fonts";

export const metadata: Metadata = {
  title: "Rock n Runtime",
  description: "A blog about tech, music, and everything in between.",
  other: {
    "format-detection": "telephone=no,date=no,address=no,email=no,url=no",
    "reader-mode": "disabled",
    "reader-mode-enabled": "false",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="p-4">
      <body
        className={`${geistSans.variable} ${geistMono.variable} container mx-auto border-background antialiased h-full flex flex-col border-4 rounded-lg`}
      >
        <div className="sticky top-0 z-10 shadow-sm">
          <Navbar />
        </div>
        <div className="h-full bg-background">
          <main className="h-full flex-1 rounded-lg bg-[#000] border-t-brass border-l-brass border-b-brass-dark border-r-brass-dark border-4 amp-grille p-8">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
