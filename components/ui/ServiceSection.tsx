"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "./card";
import Image from "next/image";

interface ServiceItem {
  id: number;
  Service_Title: string;
  slug: string;
  Service_type: "advisiory" | "technical";
  Image_Card: {
    url: string;
  };
}

export function ServiceSection() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN;

  useEffect(() => {
    if (!apiToken || !apiUrl) return;

    async function fetchServices() {
      try {
        const response = await fetch(
          `${apiUrl}/api/service-instients?populate=*`,
          {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch service data");
        }

        const data = await response.json();
        if (data && data.data) {
          setServices(data.data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }

    fetchServices();
  }, [apiToken, apiUrl]);

  const advisoryServices = services.filter(
    (service) => service.Service_type === "advisiory"
  );
  const technicalServices = services.filter(
    (service) => service.Service_type === "technical"
  );

  return (
    <div className="py-10 sm:px-6 px-3 font-ubuntu relative sm:mt-0">
      {/* Advisory Services Section */}
      <div>
        <h2 className="text-2xl px-3 sm:px-0 font-semibold text-left sm:text-left">
          Advisory Services
        </h2>
        <p className="text-gray-600 text-2xl px-3 sm:px-0 mt-2 mb-24 sm:mb-20 text-left sm:text-left">
          Gain strategic insights and expert consultation to optimize your
          organization’s growth and compliance.
        </p>
        <div className="flex flex-wrap justify-center sm:justify-start gap-28 mt-16 sm:mt-0">
          {advisoryServices.map((service) => (
            <div
              key={service.id}
              className="relative mb-14 sm:mb-14 w-full sm:w-[407px]"
            >
              <Image
                src={`${service.Image_Card.url}`}
                alt="Service Background"
                className="absolute top-[25%] sm:top-1/3 left-1/2 sm:left-[50%] w-full h-[300px] bg-gray-200 -translate-y-1/2 -translate-x-1/2 z-0 rounded-md"
                width={407}
                height={300}
              />
              <Card className="relative py-4 shadow-xl rounded-lg bg-white z-10 mt-28 w-[90%] mx-auto">
                <CardContent>
                  <p className="text-2xl py-3 font-ubuntu font-extralight">
                    {service.Service_Title}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end sm:py-6 pb-6">
                  <Link href={`/services/${service.slug}`}>
                    <Button
                      className="text-black border-black rounded-full flex items-center font-ubuntu gap-2 
                      hover:bg-gray-200 hover:border-gray-300 transition-all duration-300 ease-in-out"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Services Section */}
      <div className="mt-10">
        <h2 className="text-2xl px-3 sm:px-0 font-semibold text-left sm:text-left">
          IT Services
        </h2>
        <p className="text-gray-600 text-2xl px-3 sm:px-0 mt-2 mb-24 text-left sm:text-left">
          Leverage innovative technical expertise to implement robust digital
          solutions and infrastructure.
        </p>
        <div className="flex flex-wrap justify-center sm:justify-start gap-28 mt-16 sm:mt-0">
          {technicalServices.map((service) => (
            <div
              key={service.id}
              className="relative mb-14 sm:mb-14 w-full sm:w-[407px]"
            >
              <Image
                src={`${service.Image_Card.url}`}
                alt="Service Background"
                className="absolute top-[25%] sm:top-1/3 left-1/2 sm:left-[50%] w-full h-[300px] bg-gray-200 -translate-y-1/2 -translate-x-1/2 z-0 rounded-md"
                width={407}
                height={300}
              />
              <Card className="relative py-4 shadow-xl rounded-lg bg-white z-10 mt-28 w-[90%] mx-auto">
                <CardContent>
                  <p className="text-2xl py-3 font-ubuntu font-extralight">
                    {service.Service_Title}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end sm:py-6 pb-6">
                  <Link href={`/services/${service.slug}`}>
                    <Button
                      className="text-black border-black rounded-full flex items-center font-ubuntu gap-2 
                      hover:bg-gray-200 hover:border-gray-300 transition-all duration-300 ease-in-out"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceSection;
