"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import {BlogSection} from "@/components/ui/BlogSection"
import { usePathname } from 'next/navigation';
import Image from "next/image";

interface BlogData {
  Title: string;
  Description: string;
  Content_Header: string;
  Image: {
    url: string;
  };
}

export default function Blog() {
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const pathname = usePathname();
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN; // Use API base URL from .env
  

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!apiToken) return;
      try {
        const response = await fetch(`${apiUrl}/api/blogpage?populate=*`, {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          }
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBlogData(data.data);
      } catch (error) {
        console.error("Failed to fetch blog data:", error);
      }
    };

    fetchBlogData();
  }, [pathname, apiToken, apiUrl]);

  if (!blogData) {
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
          src={`${blogData.Image.url}`}
          alt="Blog Image"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />

        <div className="my-64 sm:my-64">
          <Card className="lg:w-[600px] sm:w-[650px] bg-gradient-to-b from-[#3c83c1] to-[#459ae5] text-white font-ubuntu opacity-90">
            <CardContent>
              <p className="text-4xl py-24 sm:py-20 font-ubuntu font-medium">
                {blogData.Title}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-32 sm:mt-24 sm:w-[60%]">
        <p className="text-2xl px-6 font-ubuntu">
          {blogData.Description}
        </p>
      </div>

      <div className="sm:px-6 px-3 py-4 mt-10 sm:mt-10 sm:mb-16 mb-10">
        <h2 className="text-3xl font-ubuntu sm:text-left px-6">
          {blogData.Content_Header}
        </h2>
        <BlogSection />
      </div>

      <Footer />
    </main>
  );
}
