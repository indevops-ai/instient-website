"use client";

import { Footer } from "@/components/ui/footer";
import Image from "next/image";
import { useEffect, useState } from "react";

interface MemberData {
  attributes: {
    Name: string;
    Post: string;
    About: string;
    Education_College1: string;
    Education_Degree1: string;
    Education_College2: string;
    Education_Degree2: string;
    Image: {
      url: string;
    };
  };
}

async function fetchMemberData(slug: string): Promise<MemberData | null> {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN;

  const response = await fetch(
    `${apiUrl}/api/meetourpeople-instients?filters[slug][$eq]=${slug}&populate=*`,
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

export default function MeetOurPeopleSlugPage({ params }: { params: Promise< { slug: string } >}) {
  const [slug, setSlug] = useState<string | null>(null);
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      async function resolveParams() {
        const resolvedParams = await params; // Await the promise to get actual params object
        setSlug(resolvedParams.slug);
      }
    
      resolveParams();
    }, [params]);

  useEffect(() => {
    async function getData() {
      if (!slug) return;
      const fetchedData = await fetchMemberData(slug);
      setMemberData(fetchedData);
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
    );
  }

  if (!memberData) {
    return <p className="text-center mt-20">Member not found or incomplete data.</p>;
  }

  const {
    Name,
    Post,
    About=[],
    Education_College1,
    Education_Degree1,
    Education_College2,
    Education_Degree2,
    Image: { url } = {},
  } = memberData.attributes || memberData;

  return (
    <main>
      {/* Profile Section */}
      <div className="relative w-full h-[675px] sm:h-[450px] flex flex-col lg:flex-row gap-4 items-center justify-center p-6 sm:p-8">
        <div className="relative w-60 h-96 sm:w-80 sm:h-96 mt-5 rounded sm:mt-44 bg-white shadow-2xl overflow-hidden lg:-translate-y-8 lg:-translate-x-8 z-10 sm:rounded-lg">
          <Image
            src={url ? `${url}` : "/default-image.png"}
            alt={`${Name}'s Image`}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        

        {/* Profile Details */}
        <div className="text-white text-center sm:text-left mt-5 sm:mt-12 max-w-lg lg:ml-16 z-20 px-4 sm:px-0">
          <h1 className="text-3xl sm:text-4xl font-bold">{Name}</h1>
          <h2 className="text-xl sm:text-2xl font-semibold mt-2">{Post}</h2>
        </div>

        {/* Decorative Blue Background */}
        <div className="absolute inset-0 bg-[#0042ad] -z-10 h-[700px] sm:h-[450px]" />
      </div>

      {/* Information Sections */}
      <div className="container mx-auto px-4 sm:px-8 md:px-20 py-12 text-black">
          <ContentSection
            title="About"
            content={Array.isArray(About) ? About : []} // Ensure it's always an array
          />




        {/* Education Section */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Education</h2>
          <EducationItem degree={Education_Degree1} college={Education_College1} />
          <EducationItem degree={Education_Degree2} college={Education_College2} />
        </div>
      </div>

      <Footer />
    </main>
  );
}

interface ContentBlock {
  type: "paragraph";
  children: { text: string }[];
}

interface ContentSectionProps {
  title: string;
  content: ContentBlock[];
}

function ContentSection({ title, content }: ContentSectionProps) {
  if (!content || !Array.isArray(content) || content.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">{title}</h2>
      {content.map((block, index) => {
        if (block.type === "paragraph" && block.children) {
          return (
            <p key={index} className="text-base sm:text-lg font-ubuntu mb-6 leading-relaxed">
              {block.children.map((child) => child.text).join(" ")}
            </p>
          );
        }
        return null;
      })}
      <div className="my-6 border-t-2 border-blue-300"></div>
    </div>
  );
}



function EducationItem({ degree, college }: { degree: string | null; college: string | null }) {
  if (!degree || !college) return null;
  return (
    <div className="mb-4">
      <p className="text-base sm:text-lg font-semibold">{college}</p>
      <p className="text-base sm:text-lg">{degree}</p>
    </div>
  );
}


