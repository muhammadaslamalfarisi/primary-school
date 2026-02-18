import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SD Negeri 1 Batu Rakit",
  description: "Website Resmi SD Negeri 1 Batu Rakit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <Navbar />
        {/* Memberikan padding-top agar konten tidak tertabrak Navbar Fixed */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 md:pt-32">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
