"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import { JobOpeningSection } from "@/components/ui/jobopeningsection";
import { useEffect, useState } from "react";
import Image from 'next/image'; // Importing Image

interface JobPageData {
  Title: string;
  Description: string;
  Content_Title: string;
  Image: {
    url: string;
  };
}

export default function JobOpeningsPage() {
  const [jobData, setJobData] = useState<JobPageData | null>(null);
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  useEffect(() => {
    const fetchJobData = async () => {
      if (!apiToken) return;
      try {
        const response = await fetch("https://api.instient.ai/api/jobopeningpage?populate=*", {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Job Data Response:", data); // Debugging
        setJobData(data.data);
      } catch (error) {
        console.error("Failed to fetch job data:", error);
      }
    };
  
    fetchJobData();
  }, [apiToken]);
  

  if (!jobData) {
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
            src={`https://api.instient.ai${jobData.Image.url}`} // Dynamically set the full image URL from the API
            alt="Career Image"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center -z-10"
          />
        <div className="my-64 sm:my-64">
          <Card className="lg:w-[600px] sm:w-[650px] bg-gradient-to-b from-[#3c83c1] to-[#459ae5] text-white font-ubuntu">
            <CardHeader>
              <CardTitle className="text-base font-light"></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl py-6 sm:py-0 mb-12 sm:mb-24 font-ubuntu font-medium">{jobData.Title}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-44 sm:mt-24 w-[90%] sm:w-[60%]">
        <p className="text-2xl px-6 font-ubuntu">{jobData.Description}</p>
      </div>

      <div className="sm:px-6 px-3 py-4 mt-10 sm:mt-10 sm:mb-16 mb-10 ">
        <h2 className="text-3xl font-ubuntu sm:text-left px-6 sm:mb-16">{jobData.Content_Title}</h2>

        <JobOpeningSection /> {/* This will display the job openings */}

      </div>

      <Footer />
    </main>
  );
}
