import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

interface JobOpening {
  id: number;
  Title: string;
  location: string;
  type: string;
  slug: string;
  Image: {
    url: string;
  };
}

export function JobOpeningSection() {
  const [jobOpeningsData, setJobOpeningsData] = useState<JobOpening[]>([]);
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${apiToken}`);

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    };

    fetch("https://api.instient.ai/api/jobopenings?populate=*", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setJobOpeningsData(result.data);
      })
      .catch((error) => console.error("Error fetching job openings:", error));
  }, [apiToken]);

  if (jobOpeningsData.length === 0) {
    return <p>Loading job openings...</p>;
  }

  return (
    <div className="py-10 font-ubuntu relative sm:mt-0">
      {/* Parent Container */}
      <div className="flex flex-wrap justify-center sm:justify-start gap-28 mt-16 sm:mt-0">
        {jobOpeningsData.map((job) => (
          <div key={job.id} className="relative mb-14 sm:mb-14 w-full sm:w-[407px]">
            {/* Background Underlap */}
                <Image 
                  src={`https://api.instient.ai${job.Image.url}`} // Dynamically set the full image URL from the API
                  alt="Career Image"
                  fill
                  priority
                  sizes="100vw"
                  className="-z-10 object-contain"
                />

            {/* Card Component */}
            <Card className="relative py-4 shadow-xl rounded-lg bg-white z-10 mt-16 w-[90%] mx-auto">
              <CardContent>
                <h2 className="text-2xl font-bold py-3 font-ubuntu">{job.Title}</h2>
                <p className="text-sm font-ubuntu text-gray-600">Location: {job.location}</p>
                <p className="mt-4 text-sm font-ubuntu text-blue-600">Type: {job.type}</p>
              </CardContent>
              <CardFooter className="flex justify-end sm:py-6 pb-6">
                <Link href={`job-openings/${job.slug}`}>
                  <Button variant="default" className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
                    View Job
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobOpeningSection;
