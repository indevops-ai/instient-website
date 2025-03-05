"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface Subpage {
  name: string;
  href: string;
}

interface ServiceItem {
    Service_Title: string;
    slug: string;
}

async function fetchServices(): Promise<Subpage[]> {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  const response = await fetch("https://dev-api.instient.ai/api/service-instients?populate=*", {
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

  return (
    <div className="relative group cursor-pointer">
      <ChevronDown className="w-4 h-4 ml-1" />
      <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
        {services.map((service) => (
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
  );
}
