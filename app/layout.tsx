import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // Import Next.js Script component
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
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <html lang="en">
      <head>
        <CanonicalHead />

        {isProduction && (
          <>
            {/* Ahrefs Web Analytics */}
            <Script
              src="https://analytics.ahrefs.com/analytics.js"
              data-key="bskdl7vlyMSiUUGbt5MDhA"
              strategy="beforeInteractive"
            />

            {/* Google Tag Manager - Script */}
            <Script id="google-tag-manager" strategy="afterInteractive">
              {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-KJXR6X7W');
              `}
            </Script>

            <Script
              src="https://cdn-in.pagesense.io/js/instient/41ddc2910415478f9d120fc3c38b77a8.js"
              strategy="afterInteractive"
            />
          </>
        )}
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Google Tag Manager (noscript) - Load only in production */}
        {isProduction && (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-KJXR6X7W"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        )}

        <Toaster />
        <Navbar />
        <div className="sticky top-0 left-0 right-0 z-50">
          <Breadcrumb />
        </div>
        <main className="relative mt-0">
          <ClientLayout>{children}</ClientLayout>
        </main>
        
       {/* Zoho Chat - Only in Production */}
       {isProduction && <ZohoChat />}
      </body>
    </html>
  );
}
