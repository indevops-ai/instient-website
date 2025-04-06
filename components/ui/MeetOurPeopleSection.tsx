"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface PeopleItem {
  id: number;
  Name: string;
  Post: string;
  slug: string;
  Image: {
    url: string;
  };
}

export function MeetOurPeopleSection() {
  const [peopleData, setPeopleData] = useState<PeopleItem[]>([]);
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN; // Use API base URL from .env

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${apiToken}`);

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    };

    fetch(`${apiUrl}/api/meetourpeople-instients?populate=*`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setPeopleData(result.data);
      })
      .catch((error) => console.error("Error fetching people data:", error));
  }, [apiToken, apiUrl]);

  return (
    <section className="w-full py-12 md:py-2">
      <div className="container px-4 grid w-full items-center justify-center gap-4 text-center md:px-6 lg:gap-8 xl:gap-10">
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {peopleData.map((person) => (
            <Link key={person.id} href={`meet-our-people/${person.slug}`} passHref>
              <div className="flex flex-col gap-2 cursor-pointer hover:scale-105 transition-transform">
                <div className="relative rounded-lg overflow-hidden aspect-square">
                  <Image
                    src={`${person.Image.url}`}
                    alt={person.Name}
                    width={400}
                    height={400}
                    className="object-cover pointer-events-none"
                    style={{ aspectRatio: "400/400", objectFit: "cover" }}
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{person.Name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{person.Post}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MeetOurPeopleSection;