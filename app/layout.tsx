import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Toaster } from "@/components/ui/toaster";
import ClientLayout from "@/components/ui/client-layout";
import ZohoChat from "@/components/ui/ZohoChat";
import CanonicalHead from "@/components/ui/CanonicalHead"; // Import CanonicalHead

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Instient",
  description: "Instient - Your platform for something amazing!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head><CanonicalHead/></head>
      
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster />
        <Navbar />
        <div className="sticky top-0 left-0 right-0 z-50">
          <Breadcrumb />
        </div>
        <main className="relative mt-0">
          <ClientLayout>{children}</ClientLayout>
        </main>
        <ZohoChat />
      </body>
    </html>
  );
}
