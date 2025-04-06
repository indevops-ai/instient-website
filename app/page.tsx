"use client";

// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import { useEffect, useState } from "react";
// import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
// import Link from "next/link";
import HomeSlider from "@/components/ui/HomeSlider";
//import Image from "next/image";

interface HomeData {
  Card_Header: string;
  Card_Title: string;
  Card_Content: string;
  Card_Button: string;
  Card_link: string;
  Content_Header: string;
  Content_Title: string;
  Content_Text: string;
  Content_Button: string;
  Page_Button: string;
  Image: {
    url: string;
  };
  Content_Image: {
    url: string;
  };
}

export default function Home() {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const pathname = usePathname();
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  useEffect(() => {
    const fetchHomeData = async () => {
      if (!apiToken || !apiDomain) return;
      try {
        const response = await fetch(`${apiDomain}/api/homepage?populate=*`, {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setHomeData(data.data);
      } catch (error) {
        console.error("Failed to fetch news data:", error);
      }
    };

    fetchHomeData();
  }, [pathname, apiToken, apiDomain]);

  if (!homeData) {
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
    <>
      <main>
        <div className="w-full h-[425px] sm:h-[670px] p-6 font-ubuntu relative">
            {/* Background Video */}
            <video
              src="/Instient_Video.webm" // Video file from the public folder
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover -z-10"
            ></video>
                
            {/* Dark overlay for text readability */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-10"></div>

            {/* Content (Card remains in original position) */}
            <div className="flex my-64 sm:my-64">
              <Card className="w-full sm:w-[650px] border-0 bg-gradient-to-b from-[#3c83c1] to-[#215E92] text-white shadow-lg opacity-90">
                <CardHeader>
                  <CardTitle className="text-base font-light">
                    {homeData.Card_Header}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl py-3 font-semibold">{homeData.Card_Title}</p>
                  <p className="text-xl font-thin">{homeData.Card_Content}</p>
                </CardContent>
                <CardFooter className="flex justify-end mb-5">
                  {/* <Link href={`/news/${homeData.Card_link}`}>
                    <Button className="bg-transparent rounded-full border-[1.5px] flex items-center p-5 gap-2">
                      {homeData.Card_Button} <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link> */}
                </CardFooter>
              </Card>
            </div>
        </div>

        <div className="py-4 mt-44 sm:mt-10 mb-10">
          <h2 className="px-10 sm:px-10 font-ubuntu sm:text-left text-left text-3xl mt-10 mb-10">
            Latest Insights
          </h2>
          <HomeSlider/>
        </div>

        


        {/* News section */}
        {/* <div className="px-6 py-4 mt-44 sm:mt-10 mb-10">
          <h2 className="px-2 sm:px-10 font-ubuntu text-3xl">
            {homeData.Content_Header}
          </h2>

          <div className="pt-20 pb-10 font-ubuntu relative sm:mt-0">
            <div className="flex flex-col sm:flex-row justify-between items-center relative z-10 mt-24 sm:mt-0">
              <Card className="w-[90%] sm:w-[757px] sm:p-4 p-2 shadow-xl rounded-lg bg-white">
                <CardContent>
                  <p className="text-2xl py-3 font-ubuntu font-extralight">
                    {homeData.Content_Title}
                  </p>
                  <p className="text-base font-ubuntu font-thin">
                    {homeData.Content_Text}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end py-6">
                  <Link href="/news/2024-vietnam-investor-exposition">
                  <Button
                    className="relative text-black border-black border-[1.5px] rounded-full flex items-center font-ubuntu gap-2 
                              overflow-hidden transition-all duration-300 ease-out group"
                  >
                    <span className="absolute inset-0 w-0 bg-gray-400 transition-all duration-300 ease-out group-hover:w-full "></span>
                    <span className="relative z-10 flex items-center gap-2 hover:text-white hover:border-gray-300">
                      {homeData.Content_Button} <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>

                  </Link>
                </CardFooter>
              </Card>
            </div>

            <Image
                src={`https://api.instient.ai${homeData.Content_Image.url}`}
                alt="Career Image"
                width={807} // Set a fixed width
                height={300} // Set a fixed height
                className="absolute top-[40%] sm:top-1/2 left-1/2 sm:left-[72%] w-full sm:w-[807px] h-[300px] bg-gray-200 -translate-y-1/2 -translate-x-1/2 z-0 rounded-md"
            />

          </div>

          <div className="sm:px-10">
            <Link href="/news">
            <Button
              className="relative text-black border-black border-[1.5px] rounded-full flex items-center font-ubuntu gap-2 
                        overflow-hidden transition-all duration-300 ease-out group"
            >
              <span className="absolute inset-0 w-0 bg-gray-400 transition-all duration-300 ease-out group-hover:w-full"></span>
              <span className="relative z-10 flex items-center gap-2 group-hover hover:text-white hover:border-gray-300">
                {homeData.Page_Button} <ArrowRight className="w-4 h-4" />
              </span>
            </Button>

            </Link>
          </div>
        </div> */}
      </main>
      <Footer />
    </>
  );
}
