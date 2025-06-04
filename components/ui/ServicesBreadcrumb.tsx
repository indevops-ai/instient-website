"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Subpage {
  name: string;
  href: string;
  type: string;
}

interface ServiceItem {
  Service_Title: string;
  slug: string;
  Service_type: string; // either "technical" or "advisory"
}

async function fetchServices(): Promise<Subpage[]> {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN;

  const response = await fetch(`${apiUrl}/api/service-instients?populate=*`, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Failed to fetch services:", response.status);
    return [];
  }

  const data = await response.json();

  return (
    data?.data?.map((service: ServiceItem) => ({
      name: service.Service_Title,
      href: `/services/${service.slug}`,
      type: service.Service_type?.toLowerCase(), // normalize
    })) || []
  );
}

export default function ServicesBreadcrumb() {
  const [services, setServices] = useState<Subpage[]>([]);

  useEffect(() => {
    async function loadServices() {
      const serviceData = await fetchServices();
      setServices(serviceData);
    }
    loadServices();
  }, []);

  const advisoryServices = services.filter((s) => s.type === "advisiory");
  const technicalServices = services.filter((s) => s.type === "technical");

  return (
    <div className="relative group cursor-pointer">
      <div className="flex items-center">
        <ChevronDown className="w-4 h-4 ml-1" />
      </div>
      <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="group/advisory relative px-4 py-2 hover:bg-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-black">Advisory Services</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
          <div className="absolute left-full top-0 mt-0 w-48 bg-white shadow-lg rounded-md py-2 z-50 opacity-0 group-hover/advisory:opacity-100 transition-opacity duration-200">
            {advisoryServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="block px-4 py-2 text-sm text-black hover:bg-gray-200"
              >
                {service.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="group/technical relative px-4 py-2 hover:bg-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-black">IT Services</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
          <div className="absolute left-full top-0 mt-0 w-48 bg-white shadow-lg rounded-md py-2 z-50 opacity-0 group-hover/technical:opacity-100 transition-opacity duration-200">
            {technicalServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="block px-4 py-2 text-sm text-black hover:bg-gray-200"
              >
                {service.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
