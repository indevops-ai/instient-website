import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Head from "next/head";  // Import Head for setting title and favicon
import { Toaster } from "@/components/ui/toaster";
import ClientLayout from "@/components/ui/client-layout";
import ZohoChat from "@/components/ui/ZohoChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Instient", // Set the title to "Instient"
  description: "Instient - Your platform for something amazing!", // Optional, customize description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Set the title to "Instient" */}
        <title>Instient</title>
      </Head>
      
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Navbar remains at the top */}
        <Toaster/>
        <Navbar />
        
        {/* Sticky Breadcrumb that replaces Navbar on scroll */}
        <div className="sticky top-0 left-0 right-0 z-50">
          <Breadcrumb />
        </div>
        
        {/* Main content should touch the Navbar */}
        
        <main className="relative mt-0"><ClientLayout>{children}</ClientLayout></main>
        <ZohoChat />
      </body>
    </html>
  );
}
