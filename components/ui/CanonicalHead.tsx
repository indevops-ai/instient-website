"use client";

import { usePathname } from "next/navigation";

export default function CanonicalHead() {
  const pathname = usePathname();

  // Check if running on localhost or production
  const baseUrl = "https://www.instient.ai"; // Change to your actual domain

  const canonicalUrl = `${baseUrl}${pathname}`;

  return (
    
      <link rel="canonical" href={canonicalUrl} />

  );
}
