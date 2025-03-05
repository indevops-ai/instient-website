"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CaseStudy {
    id: string;
    header: string;
    Title: string;
    publish_date: string;
    slug: string;
  }

export function CaseStudySection() {
  const [caseStudyData, setCaseStudyData] = useState<CaseStudy[]>([]);
  const [visibleCaseStudies, setVisibleCaseStudies] = useState(3);
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  useEffect(() => {
    if (!apiToken) return;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${apiToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    };

    fetch("https://api.instient.ai/api/casestudies", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCaseStudyData(result.data);
      })
      .catch((error) => console.error("Error fetching case study data:", error));
  }, [apiToken]);

  const handleShowMore = () => {
    setVisibleCaseStudies(caseStudyData.length);
  };

  return (
    <div>
      <section className="px-4 py-4">
        <div className="space-y-6">
          {caseStudyData.slice(0, visibleCaseStudies).map((caseStudyItem) => (
            <div
              key={caseStudyItem.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-t border-gray-300 font-ubuntu"
            >
              <div>
                <p className="text-sm mb-2">{caseStudyItem.header}</p>
                <h3 className="text-xl font-semibold mb-3">{caseStudyItem.Title}</h3>
                <p className="text-sm mb-2">{caseStudyItem.publish_date}</p>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-auto">
                <Link href={`/casestudies/${caseStudyItem.slug}`}>
                <Button className="text-black border-black border-[1/5px] rounded-full flex items-center font-ubuntu gap-2 mt-2 relative overflow-hidden group 
                  transition-all duration-300 ease-out">
                  <span className="absolute inset-0 w-0 bg-gray-400 transition-all duration-300 ease-out group-hover:w-full"></span>
                  <span className="relative z-10 flex items-center gap-2 hover:text-white hover:border-gray-300">
                    Read More <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>


                </Link>
              </div>
            </div>
          ))}
          {visibleCaseStudies < caseStudyData.length && (
            <div className="text-center mt-6">
              <Button
                onClick={handleShowMore}
                className="rounded-full border-black border-[1.5px] text-black font-ubuntu bg-white"
              >
                Show More Case Studies
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default CaseStudySection;
