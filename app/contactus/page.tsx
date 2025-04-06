'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactSection from "@/components/ui/ContactSection";
import { Footer } from "@/components/ui/footer";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import ZohoFormDialog from "@/components/ui/ZohoFormDialog";

interface ContactData {
  Title: string;
  Description_mobile: string;
  Description_web: string;
  Bottom_Title: string;
  Bottom_Description: string;
  Bottom_Link: string;
  Bottom_Button: string;
  Image: {
    url: string;
  };
}

export default function Contact() {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN; // Use API base URL from .env

  // Disable button in development and preview environments
  const isDisabled = process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";

  useEffect(() => {
    const fetchContactData = async () => {
      if (!apiToken) return;
      try {
        const response = await fetch(`${apiUrl}/api/contactpage?populate=*`, {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setContactData(data.data);
      } catch (error) {
        console.error("Failed to fetch contact data:", error);
      }
    };

    fetchContactData();
  }, [pathname, apiToken, apiUrl]);

  if (!contactData) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  }

  return (
    <main>
      <div className="w-full h-[425px] sm:h-[450px] p-6 font-ubuntu relative">
        <Image 
          src={`${contactData.Image.url}`} 
          alt="Contact Page Banner"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />

        <div className="my-64 sm:my-64">
          <Card className="lg:w-[600px] sm:w-[650px] bg-gradient-to-b from-[#3c83c1] to-[#459ae5] text-white font-ubuntu opacity-90">
            <CardContent>
              <p className="text-4xl py-24 sm:py-20 font-ubuntu font-medium">
                {contactData.Title}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-32 sm:mt-24 w-[90%] sm:w-[60%]">
        <p className="text-2xl px-6 font-ubuntu sm:hidden">{contactData.Description_mobile}</p>
        <p className="text-2xl px-6 font-ubuntu hidden sm:block">{contactData.Description_web}</p>
      </div>

      <ContactSection/>

      <div className="w-full px-6 py-6 mt-10 sm:mt-10 bg-[#0070ad] text-white font-ubuntu mb-6 relative">
        <p className="text-3xl font-ubuntu font-semibold mb-1">{contactData.Bottom_Title}</p>
        <p className="text-lg font-ubuntu">{contactData.Bottom_Description}</p>

        {/* Large Screen Button */}
        <Button
          size="lg"
          disabled={isDisabled}
          className={`absolute top-1/2 right-6 transform -translate-y-1/2 rounded-full font-ubuntu hidden sm:inline-flex 
                      transition-all duration-300 ease-out overflow-hidden group 
                      ${isDisabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-black"}`}
          onClick={!isDisabled ? () => setModalOpen(true) : undefined}
        >
          <span className="absolute inset-0 w-0 bg-gray-400 transition-all duration-300 ease-out group-hover:w-full"></span>
          <span className="relative z-10 flex items-center gap-2">
            {contactData.Bottom_Button} <ArrowRight className="w-4 h-4" />
          </span>
        </Button>

        {/* Small Screen Button */}
        <Button
          size="lg"
          disabled={isDisabled}
          className={`mt-4 rounded-full font-ubuntu sm:hidden transition-all duration-300 ease-out overflow-hidden relative group
                      ${isDisabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-black"}`}
          onClick={!isDisabled ? () => setModalOpen(true) : undefined}
        >
          <span className="absolute inset-0 w-0 bg-gray-400 transition-all duration-300 ease-out group-hover:w-full"></span>
          <span className="relative z-10 flex items-center gap-2">
            {contactData.Bottom_Button} <ArrowRight className="w-4 h-4" />
          </span>
        </Button>
      </div>

      <ZohoFormDialog open={isModalOpen} onClose={() => setModalOpen(false)} />
      <Footer/>
    </main>
  );
}
