import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { siteUrl } from "./lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: "TechLearn | Practical IT Courses", template: "%s | TechLearn" },
  description: "Learn practical IT skills through online courses in programming, cloud computing, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} bg-[#1E1E1E] text-white ${geistMono.variable} antialiased` }
        
      >

        
          <Navigation/>
            {children}
          <Footer/>
        
      </body>
    </html>
  );
}
