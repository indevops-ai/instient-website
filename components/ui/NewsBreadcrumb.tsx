"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface Subpage {
  name: string;
  href: string;
}

interface NewsItem {
    Title: string;
    slug: string;
}

async function fetchNews(): Promise<Subpage[]> {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  const response = await fetch("https://api.instient.ai/api/news-instients?populate=*", {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Failed to fetch news:", response.status);
    return [];
  }

  const data = await response.json();

  return (
    data?.data?.map((news: NewsItem) => ({
      name: news.Title,
      href: `/news/${news.slug}`,
    })) || []
  );
}

export default function NewsBreadcrumb() {
  const [news, setNews] = useState<Subpage[]>([]);

  useEffect(() => {
    async function loadNews() {
      const newsData = await fetchNews();
      setNews(newsData);
    }
    loadNews();
  }, []);

  return (
    <div className="relative group cursor-pointer">
      <ChevronDown className="w-4 h-4 ml-1" />
      <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
        {news.map((newsItem) => (
          <Link
            key={newsItem.href}
            href={newsItem.href}
            className="block px-4 py-2 text-sm text-black hover:bg-gray-200"
          >
            {newsItem.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
