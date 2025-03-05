"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface NewsItem {
  id: string;
  header: string;
  Title: string;
  publish_date: string;
  slug: string;
}


export function NewsSection() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [visibleNews, setVisibleNews] = useState(3);
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  useEffect(() => {
    if (!apiToken) return;
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${apiToken}`
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    };

    fetch("https://api.instient.ai/api/news-instients", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setNewsData(result.data);
      })
      .catch((error) => console.error("Error fetching news data:", error));
  }, [apiToken]);

  const handleShowMore = () => {
    setVisibleNews(newsData.length);
  };

  return (
    <div>
      <section className="px-4 py-4">
        <div className="space-y-6">
          {newsData.slice(0, visibleNews).map((newsItem) => (
            <div
              key={newsItem.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-t border-gray-300 font-ubuntu"
            >
              <div>
                <p className="text-sm mb-2">{newsItem.header}</p>
                <h3 className="text-xl font-semibold mb-3">{newsItem.Title}</h3>
                <p className="text-sm mb-2">{newsItem.publish_date}</p>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-auto">
                <Link href={`/news/${newsItem.slug}`}>
                <Button
                  size="sm"
                  className="rounded-full border-black border-2 text-black font-ubuntu bg-white 
                            hover:bg-gray-200  hover:border-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </Button>

                </Link>
              </div>
            </div>
          ))}
          {visibleNews < newsData.length && (
            <div className="text-center mt-6">
              <Button
                onClick={handleShowMore}
                className="rounded-full border-black border-2 text-black font-ubuntu bg-white 
                          hover:bg-gray-200 hover:border-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Show More news
              </Button>

            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default NewsSection;
