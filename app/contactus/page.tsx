'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactSection from "@/components/ui/ContactSection";
import { Footer } from "@/components/ui/footer";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import GetInTouch from "@/components/ui/GetInTouch";

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

  useEffect(() => {
    const fetchContactData = async () => {
      if (!apiToken) return;
      try {
        const response = await fetch("https://dev-api.instient.ai/api/contactpage?populate=*", {
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
        console.error("Failed to fetch news data:", error);
      }
    };

    fetchContactData();
  }, [pathname, apiToken]);

  if (!contactData) {
    return (
      // Loading spinner
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
        {/* Background Image */}
        <Image 
         src={`https://dev-api.instient.ai${contactData.Image.url}`} // Dynamically set the full image URL from the API
         alt="Career Image"
         fill
         priority
         sizes="100vw"
         className="-z-10 object-cover"
        />

        {/* Content */}
        <div className="my-64 sm:my-64">
          <Card className="lg:w-[600px] sm:w-[650px] bg-gradient-to-b from-[#3c83c1] to-[#459ae5] text-white font-ubuntu">
            <CardContent>
              <p className="text-4xl py-24 sm:py-20 font-ubuntu font-medium">
                {contactData.Title}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-32 sm:mt-24  w-[90%] sm:w-[60%]">
        <p className="text-2xl px-6 font-ubuntu sm:hidden">{contactData.Description_mobile}</p>
        <p className="text-2xl px-6 font-ubuntu hidden sm:block">{contactData.Description_web}</p>
      </div>

      <ContactSection/>

      <div className="w-full px-6 py-6 mt-10 sm:mt-10 bg-[#0070ad] text-white font-ubuntu mb-6 relative">
        <p className="text-3xl font-ubuntu font-semibold mb-1">{contactData.Bottom_Title}</p>
        <p className="text-lg font-ubuntu">{contactData.Bottom_Description}</p>
        
        {/* Button positioned for desktop and moved below in mobile */}
        <Button
          size="lg"
          className="absolute top-1/2 right-6 transform -translate-y-1/2 rounded-full text-black font-ubuntu bg-white hidden sm:inline-flex 
                    transition-all duration-300 ease-out overflow-hidden group"
          onClick={() => setModalOpen(true)}
        >
          <span className="absolute inset-0 w-0 bg-gray-400 transition-all duration-300 ease-out group-hover:w-full"></span>
          <span className="relative hover:text-white z-10 flex items-center gap-2">
            {contactData.Bottom_Button} <ArrowRight className="w-4 h-4" />
          </span>
        </Button>

        <Button
          size="lg"
          className="mt-4 rounded-full text-black font-ubuntu bg-white sm:hidden
                    transition-all duration-300 ease-out overflow-hidden relative group"
          onClick={() => setModalOpen(true)}
        >
          <span className="absolute inset-0 w-0  bg-gray-400 transition-all duration-300 ease-out group-hover:w-full "></span>
          <span className="relative hover:text-white z-10 flex items-center gap-2">
            {contactData.Bottom_Button} <ArrowRight className="w-4 h-4" />
          </span>
        </Button>

      </div>

      <GetInTouch isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <Footer/>
    </main>
  );
}
