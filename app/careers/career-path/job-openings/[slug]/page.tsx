"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import Image from 'next/image';
import { useEffect, useState } from "react"; 
import { ArrowRight } from "lucide-react";

async function fetchJobData(slug: string) {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  const response = await fetch(
    `https://api.instient.ai/api/jobopenings?filters[slug][$eq]=${slug}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
      cache: "no-store",
    }
  );

  const data = await response.json();
  return data?.data?.[0] ?? null;
}

interface JobData {
  Title: string;
  location: string;
  type: string;
  role?: string;
  responsibilty?: string;
  skills?: string;
  Qulaification?: string;
  Image_Thumbnail?: {
    url: string;
  };
}

export default function JobOpeningSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string | null>(null);
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getSlug() {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    }
    
    getSlug();
  }, [params]);

  useEffect(() => {
    async function getData() {
      if (!slug) return;
      const fetchedData = await fetchJobData(slug);
      setJobData(fetchedData);
      setIsLoading(false);
    }

    getData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    )
  }

  if (!jobData || !jobData.Title) {
    return <p className="text-center mt-20">This job opening does not exist or is missing required fields.</p>;
  }

  const {
    Title,
    location,
    type,
    role = null,
    responsibilty = null,
    skills = null,
    Qulaification = null,
    Image_Thumbnail: { url } = {},
  } = jobData;
  
  return (
    <main>
      <div className="w-full h-[425px] sm:h-[450px] p-6 font-ubuntu relative">
        <Image
          src={url ? `https://api.instient.ai${url}` : '/default-image.png'}
          alt="Background Image"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
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

        <div className="my-64 sm:my-64 relative z-10">
          <Card className="lg:w-[600px] sm:w-[650px] bg-gradient-to-b from-[#3c83c1] to-[#459ae5] text-white font-ubuntu opacity-90">
            <CardHeader>
              <CardTitle className="text-base font-light">
                {location} | {type}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl py-6 sm:pt-7 mb-12 sm:mb-12 font-ubuntu font-medium">
                {Title}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container sm:p-6 py-4 px-3 font-ubuntu mt-32 sm:mt-24 w-[100%] sm:w-[60%]">
      </div>

      <JobSection title="About the Role" content={role ?? null} isRole />
      <JobSection title="Key Responsibilities" content={responsibilty ?? null} />
      <JobSection title="Required Skills" content={skills ?? null} />
      <JobSection title="Preferred Qualifications" content={Qulaification ?? null} />
      
      <div className="px-6 text-center sm:text-left sm:px-12 mt-12 mb-10">
        <button
              className="bg-white border-black text-black rounded-full border-[1.5px] flex items-center p-4 gap-1 transition-all duration-300 ease-out overflow-hidden relative group"
              onClick={() => window.open("https://forms.gle/qLaXRHh4x6imMCb49", "_blank")}
          >
              <span className="absolute inset-0 w-0 bg-gray-400 transition-all duration-300 ease-out group-hover:w-full"></span>
              <span className="relative z-10 flex  hover:text-white hover:border-white items-center gap-2">
                Apply Now <ArrowRight className="w-4 h-4" />
              </span>
          </button>
      </div>


      <Footer />
    </main>
  );
}

function JobSection({ title, content, isRole }: { title: string; content: string | null; isRole?: boolean }) {
  if (!content) return null;

  const formattedContent = isRole
    ? <p className="text-lg font-ubuntu">{content}</p>
    : content.split(/•\s*/).filter(Boolean).map((line, index) => (
        <p key={index} className="mb-2 text-lg font-ubuntu flex items-start">
          <span className="mr-2">•</span>
          {line}
        </p>
      ));

  return (
    <div className="sm:px-6 px-3 py-4 mt-4 sm:mt-4 sm:mb-4">
      <h2 className="text-3xl font-medium font-ubuntu sm:text-left px-6">{title}</h2>
      <div className="container sm:p-6 py-6 px-6 font-ubuntu  sm:mt-2 w-[100%] sm:w-[60%] text-justify">
        {formattedContent}
      </div>
    </div>
  );
}
