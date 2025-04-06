"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface AboutData {
  Title: string;
  Description1: string;
  Description2: string;
  Content1_Card_Title: string;
  Content1_Card_Description: string;
  Content2_Card1_Number: string;
  Content2_Card1_Text: string;
  Content2_Card2_Number: string;
  Content2_Card2_Text: string;
  Content2_Card3_Number: string;
  Content2_Card3_Text: string;
  Content3_Card1: string;
  Content3_Card2: string;
  Content3_Card3: string;
  Image: {
    url: string;
  };
  Content_Image: {
    url: string;
  };
  Card1_Image: {
    url: string;
  };
  Card2_Image: {
    url: string;
  };
  Card3_Image: {
    url: string;
  };
}

export default function About() {

  const [aboutData, setAboutData] = useState<AboutData | null>(null);
    const pathname = usePathname();
    const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
    const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN; // Use API base URL from .env
  
    useEffect(() => {
      const fetchAboutData = async () => {
        if (!apiToken) return;
        try {
          const response = await fetch(`${apiUrl}/api/aboutpage?populate=*`, {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setAboutData(data.data);
        } catch (error) {
          console.error("Failed to fetch news data:", error);
        }
      };
  
      fetchAboutData();
    }, [pathname, apiToken, apiUrl]);
  
    if (!aboutData) {
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
          src={`${aboutData.Image.url}`} // Dynamically set the full image URL from the API
          alt="About Us Image"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center -z-10"
        />

<svg
          className="absolute top-1/3 left-0 w-[68%] sm:w-[98%] h-auto -z-10 opacity-60"
          viewBox="0 0 800 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 50 C150 100, 300 0, 450 50 S 700 150, 800 100"
            stroke="#3c83c1"
            strokeWidth="2"
            fill="transparent"
          />
          <polygon
            points="780,95 800,100 780,105"
            fill="#3c83c1"
          />
        </svg>

        {/* Content */}
        <div className="my-64 sm:my-64 relative z-10">
          <Card className="lg:w-[600px] sm:w-[650px] bg-gradient-to-b from-[#3c83c1] to-[#459ae5] text-white font-ubuntu opacity-90">
            <CardContent>
              <p className="text-4xl py-24 sm:py-20 font-ubuntu font-medium">{aboutData.Title}</p>
            </CardContent>
          </Card>
        </div>
      </div>

    <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-32 sm:mt-24 sm:w-[60%]">
      <p className="text-2xl px-6 mb-5 font-ubuntu">{aboutData.Description1}</p>
      <p className="text-2xl px-6 font-ubuntu">{aboutData.Description2}</p>
    </div>

    <div className="px-6 py-4 mt-8 sm:mt-10 mb-5">
          <div className="py-10 sm:py-20 font-ubuntu relative sm:mt-0">
            <div className="flex flex-col sm:flex-row justify-between items-center relative z-10 mt-24 sm:mt-0">
              <Card className="w-[90%] sm:w-[757px] p-4 shadow-xl rounded-lg bg-white">
                <CardContent>
                  <p className="text-2xl py-3 font-ubuntu font-extralight">{aboutData.Content1_Card_Title}</p>
                  <p className="text-base font-ubuntu font-thin">{aboutData.Content1_Card_Description}</p>
                </CardContent>
                <CardFooter className="flex justify-end py-6">
                </CardFooter>
              </Card>
            </div>

            <Image
              src={`${aboutData.Content_Image.url}`}
              alt="Career Image"
              width={807} // Set a fixed width
              height={300} // Set a fixed height
              className="absolute top-[40%] sm:top-1/2 left-1/2 sm:left-[72%] w-full sm:w-[807px] h-[300px] bg-gray-200 -translate-y-1/2 -translate-x-1/2 z-0 rounded-md"
            />
          </div>
    </div>

    {/*<div className="flex sm:flex-nowrap flex-wrap justify-start px-2 py-2 sm:gap-52 sm:py-6">
      <div className="flex flex-col px-6 py-4 w-1/2 sm:w-auto">
        <h1 className="text-6xl font-bold font-ubuntu">{aboutData.Content2_Card1_Number}</h1>
        <hr className="w-8 border-t-2 border-blue-400 my-1" />
        <div className="flex items-center gap-1 text-sm font-medium ">
          <p className="font-ubuntu text-2xl">{aboutData.Content2_Card1_Text}</p>
        </div>
      </div>

      <div className="flex flex-col px-6 py-4 w-1/2 sm:w-auto">
        <h1 className="text-6xl font-bold font-ubuntu">{aboutData.Content2_Card2_Number}</h1>
        <hr className="w-8 border-t-2 border-blue-400 my-1" />
        <div className="flex items-center gap-1 text-sm font-medium ">
          <p className="font-ubuntu text-2xl">{aboutData.Content2_Card2_Text}</p>
        </div>
      </div>

      <div className="flex flex-col px-6 py-4 w-1/2 sm:w-auto">
        <h1 className="text-6xl font-bold font-ubuntu">{aboutData.Content2_Card3_Number}</h1>
        <hr className="w-8 border-t-2 border-blue-400 my-1" />
        <div className="flex items-center gap-1 text-sm font-medium ">
          <p className="font-ubuntu text-2xl">{aboutData.Content2_Card3_Text}</p>
        </div>
      </div>
    </div>*/}

    <div className="sm:px-6 px-3 py-4  sm:mt-10 sm:mb-16 mb-10">
      <div className="py-10 font-ubuntu relative sm:mt-0">
        <div className="flex flex-col sm:flex-row justify-between sm:justify-start items-center relative z-10 mt-24 sm:mt-0 gap-32">
          <div className="relative mt-0 sm:mt-20 w-[90%] sm:w-[407px]">
              <Image
                src={`${aboutData.Card1_Image.url}`} // Assuming item has BackgroundImage property
                alt="Career Background"
                className="absolute top-[25%] sm:top-1/3 left-1/2 sm:left-[50%] w-full h-[300px] bg-gray-200 -translate-y-1/2 -translate-x-1/2 z-0 rounded-md"
                width={407} // Adjust based on your design
                height={300} // Adjust based on your design
              />
            <Card className="relative py-4 shadow-xl rounded-lg bg-white z-10 mt-28 w-[90%] mx-auto">
              <CardContent>
                <p className="text-2xl py-3 font-ubuntu font-extralight">{aboutData.Content3_Card1}</p>
              </CardContent>
              <CardFooter className="flex justify-end py-6">
                <Link href="/aboutus/management-and-governance">
                <Button className="text-black border-black rounded-full flex items-center font-ubuntu gap-2 
                  hover:bg-gray-200  hover:border-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105">
                  <ArrowRight className="w-4 h-4" />
                </Button>

                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="relative w-[90%] sm:w-[407px]">
             <Image
                src={`${aboutData.Card2_Image.url}`} // Assuming item has BackgroundImage property
                alt="Career Background"
                className="absolute top-[25%] sm:top-1/3 left-1/2 sm:left-[50%] w-full h-[300px] bg-gray-200 -translate-y-1/2 -translate-x-1/2 z-0 rounded-md"
                width={407} // Adjust based on your design
                height={300} // Adjust based on your design
              />
            <Card className="relative py-4 shadow-xl rounded-lg bg-white z-10 mt-28 w-[90%] mx-auto">
              <CardContent>
                <p className="text-2xl py-3 font-ubuntu font-extralight">{aboutData.Content3_Card2}</p>
              </CardContent>
              <CardFooter className="flex justify-end py-6">
                <Link href="/aboutus/who-we-are">
                  <Button className="text-black border-black rounded-full flex items-center font-ubuntu gap-2 
                  hover:bg-gray-200  hover:border-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105">
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="relative mt-0 sm:mt-20 w-[90%] sm:w-[407px]">
              <Image
                src={`${aboutData.Card3_Image.url}`} // Assuming item has BackgroundImage property
                alt="Career Background"
                className="absolute top-[25%] sm:top-1/3 left-1/2 sm:left-[50%] w-full h-[300px] bg-gray-200 -translate-y-1/2 -translate-x-1/2 z-0 rounded-md"
                width={407} // Adjust based on your design
                height={300} // Adjust based on your design
              />
            <Card className="relative py-4 shadow-xl rounded-lg bg-white z-10 mt-28 w-[90%] mx-auto">
              <CardContent>
                <p className="text-2xl py-3 font-ubuntu font-extralight">{aboutData.Content3_Card3}</p>
              </CardContent>
              <CardFooter className="flex justify-end py-6">
                <Link href="/aboutus/technology-partners">
                <Button className="text-black border-black rounded-full flex items-center font-ubuntu gap-2 
                  hover:bg-gray-200  hover:border-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105">
                  <ArrowRight className="w-4 h-4" />
                </Button>

                </Link>
              </CardFooter>
            </Card>
          </div>
          
        </div>
      </div>
    </div>

    <Footer/>
  </main>
  );
}
