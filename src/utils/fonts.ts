import { Fira_Mono, Geist, Geist_Mono, Parisienne } from "next/font/google";

export const parisienne = Parisienne({
  weight: "400",
  subsets: ["latin"],
});

export const firaMono = Fira_Mono({
  weight: "400",
  subsets: ["latin"],
});

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
