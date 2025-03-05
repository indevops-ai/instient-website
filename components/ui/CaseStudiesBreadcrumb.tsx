"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface Subpage {
  name: string;
  href: string;
}

interface CaseStudy {
    Title: string;
    slug: string;
}

async function fetchCaseStudies(): Promise<Subpage[]> {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  const response = await fetch("https://dev-api.instient.ai/api/casestudies?populate=*", {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Failed to fetch case studies:", response.status);
    return [];
  }

  const data = await response.json();

  return (
    data?.data?.map((caseStudy: CaseStudy) => ({
      name: caseStudy.Title,
      href: `/casestudies/${caseStudy.slug}`,
    })) || []
  );
}

export default function CaseStudiesBreadcrumb() {
  const [caseStudies, setCaseStudies] = useState<Subpage[]>([]);

  useEffect(() => {
    async function loadCaseStudies() {
      const caseStudyData = await fetchCaseStudies();
      setCaseStudies(caseStudyData);
    }
    loadCaseStudies();
  }, []);

  return (
    <div className="relative group cursor-pointer">
      <ChevronDown className="w-4 h-4 ml-1" />
      <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
        {caseStudies.map((caseStudy) => (
          <Link
            key={caseStudy.href}
            href={caseStudy.href}
            className="block px-4 py-2 text-sm text-black hover:bg-gray-200"
          >
            {caseStudy.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
