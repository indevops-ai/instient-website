"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface Subpage {
  name: string;
  href: string;
}

interface BlogItem {
  Title: string;
  slug: string;
}

async function fetchBlogs(): Promise<Subpage[]> {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN;

  const response = await fetch(
    `${apiUrl}/api/blogs?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.error("Failed to fetch blogs:", response.status);
    return [];
  }

  const data = await response.json();

  return (
    data?.data?.map((blog: BlogItem) => ({
      name: blog.Title,
      href: `/blogs/${blog.slug}`,
    })) || []
  );
}

export default function BlogBreadcrumb() {
  const [blogs, setBlogs] = useState<Subpage[]>([]);

  useEffect(() => {
    async function loadBlogs() {
      const blogData = await fetchBlogs();
      setBlogs(blogData);
    }
    loadBlogs();
  }, []);

  return (
    <div className="relative group cursor-pointer">
      <ChevronDown className="w-4 h-4 ml-1" />
      <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
        {blogs.map((blogItem) => (
          <Link
            key={blogItem.href}
            href={blogItem.href}
            className="block px-4 py-2 text-sm text-black hover:bg-gray-200"
          >
            {blogItem.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
