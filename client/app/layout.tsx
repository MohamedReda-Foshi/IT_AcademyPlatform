import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import NextAuthProvider from "./providers/NextAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechLearn",
  description: "TechLearn E-learn web: IT Platform Create to helps the beginners learning the notions of programming also adding the text editor to let's them resolving the tasks and practising the news knowledge",
  icons: {
    icon: "/favicon.ico",
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${geistSans.variable} bg-[#1E1E1E] text-white ${geistMono.variable} antialiased` }>
        <NextAuthProvider>
            <Navigation/>
              {children}
            <Footer/>
        </NextAuthProvider>
      </body>
    </html>
  );
}
