"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ContactItem {
  id: number;
  Content_Title: string;
  Content2_Title?: string;
  Content_Desc1: string;
  Content_Desc2?: string;
  Content_Desc3?: string;
  Content_Desc4?: string; // New field for phone number
  Content_Link: string | undefined;
  Content_Button: string;
  Content2_Desc1?: string;
  Content2_Desc2?: string;
  Content2_Desc3?: string;
  Content2_Desc4?: string; // New field for phone number
  Content2_Link?: string | undefined;
  content2_Button?: string;
}

export function ContactSection() {
  const [contactData, setContactData] = useState<ContactItem[]>([]);
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN; // Use API base URL from .env

  useEffect(() => {
    if (!apiToken) return;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${apiToken}`);

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    };
    
    fetch(`${apiUrl}/api/contacts`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setContactData(result.data);
      })
      .catch((error) => console.error("Error fetching contact data:", error));
  }, [apiToken, apiUrl]);

  return (
    <div className="px-6 py-4 mt-10 sm:mt-10">
      <h2 className="text-3xl font-ubuntu px-4 sm:text-left sm:px-6 sm:mb-4 mb-4">Global contact details</h2>
      {contactData.map((contactItem) => (
        <div key={contactItem.id} className="p-6 border-t border-gray-300 font-ubuntu">
          {contactItem.Content_Title === "US" && contactItem.Content2_Title === "India" ? (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1">{contactItem.Content_Title}</h3>
                <p className="text-sm mb-1">{contactItem.Content_Desc1}</p>
                <p className="text-sm mb-1">{contactItem.Content_Desc2}</p>
                {contactItem.Content_Desc3 && <p className="text-sm mb-1">{contactItem.Content_Desc3}</p>}
                {contactItem.Content_Desc4 && <p className="text-sm font-bold mb-1">{contactItem.Content_Desc4}</p>}
                {contactItem.Content_Link && (
                  <Link href={contactItem.Content_Link || "#"}>
                    <Button
                      size="sm"
                      className="rounded-full border-black border-[1.5px] text-black bg-white mt-2 
                                transition-all duration-300 ease-out overflow-hidden relative group"
                    >
                      <span className="absolute inset-0 w-0 bg-gray-400 transition-all duration-300 ease-out group-hover:w-full"></span>
                      <span className="relative z-10 flex hover:text-white items-center gap-2">
                        {contactItem.Content_Button} <ArrowRight className="w-4 h-4" />
                      </span>
                    </Button>
                  </Link>
                )}
              </div>
              <div className="border-l border-gray-300"></div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1">{contactItem.Content2_Title}</h3>
                <p className="text-sm mb-1">{contactItem.Content2_Desc1}</p>
                <p className="text-sm mb-1">{contactItem.Content2_Desc2}</p>
                {contactItem.Content2_Desc3 && <p className="text-sm mb-1">{contactItem.Content2_Desc3}</p>}
                {contactItem.Content2_Desc4 && <p className="text-sm font-bold mb-1">{contactItem.Content2_Desc4}</p>}
                {contactItem.Content2_Link && (
                  <Link href={contactItem.Content2_Link || "#"}>
                    <Button
                      size="sm"
                      className="rounded-full border-black border-[1.5px] text-black bg-white mt-2 
                                transition-all duration-300 ease-out overflow-hidden relative group"
                    >
                      <span className="absolute inset-0 w-0 bg-gray-400 transition-all duration-300 ease-out group-hover:w-full"></span>
                      <span className="relative z-10 flex hover:text-white items-center gap-2">
                        {contactItem.content2_Button} <ArrowRight className="w-4 h-4" />
                      </span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-semibold mb-1">{contactItem.Content_Title}</h3>
              <p className="text-sm mb-1">{contactItem.Content_Desc1}</p>
              <p className="text-sm mb-1">{contactItem.Content_Desc2}</p>
              {contactItem.Content_Desc3 && <p className="text-sm mb-1">{contactItem.Content_Desc3}</p>}
              {contactItem.Content_Desc4 && <p className="text-sm font-bold mb-1">{contactItem.Content_Desc4}</p>}
              {contactItem.Content_Link && (
                <Link href={contactItem.Content_Link}>
                  <Button
                    size="sm"
                    className="rounded-full border-black border-[1.5px] text-black bg-white mt-2 
                               transition-all duration-300 ease-out overflow-hidden relative group"
                  >
                    <span className="absolute inset-0 w-0 bg-gray-400 transition-all duration-300 ease-out group-hover:w-full"></span>
                    <span className="relative z-10 flex hover:text-white items-center gap-2">
                      {contactItem.Content_Button} <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ContactSection;
