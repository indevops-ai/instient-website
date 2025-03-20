"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface BlogItem {
  id: string;
  header: string;
  Title: string;
  publish_date: string;
  slug: string;
}

export function BlogSection() {
  const [blogData, setBlogData] = useState<BlogItem[]>([]);
  const [visibleBlogs, setVisibleBlogs] = useState(3);
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN; // Use API base URL from .env

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

    fetch(`${apiUrl}/api/blogs`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setBlogData(result.data);
      })
      .catch((error) => console.error("Error fetching blog data:", error));
  }, [apiToken, apiUrl]);

  const handleShowMore = () => {
    setVisibleBlogs(blogData.length);
  };

  return (
    <div>
      <section className="px-4 py-4">
        <div className="space-y-6">
          {blogData.slice(0, visibleBlogs).map((blogItem) => (
            <div
              key={blogItem.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-t border-gray-300 font-ubuntu"
            >
              <div>
                <p className="text-sm mb-2">{blogItem.header}</p>
                <h3 className="text-xl font-semibold mb-3">{blogItem.Title}</h3>
                <p className="text-sm mb-2">{blogItem.publish_date}</p>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-auto">
                <Link href={`/blogs/${blogItem.slug}`}>
                  <Button
                    size="sm"
                    className="rounded-full border-black border-2 text-black font-ubuntu bg-white 
                              hover:bg-gray-200 hover:border-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
          {visibleBlogs < blogData.length && (
            <div className="text-center mt-6">
              <Button
                onClick={handleShowMore}
                className="rounded-full border-black border-2 text-black font-ubuntu bg-white 
                          hover:bg-gray-200 hover:border-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Show More Blogs
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default BlogSection;
