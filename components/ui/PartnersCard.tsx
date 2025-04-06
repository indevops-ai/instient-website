'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// Define the interface for the partner object
interface Partner {
  logo?: { 
    url?: string;
    formats?: { thumbnail?: { url?: string } };
  };
  title: string;
  description: string;
}

// Function to fetch partners from the API
async function fetchPartners(): Promise<Partner[]> {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN;

  const response = await fetch(`${apiUrl}/api/globalpartners?populate=*`, {
    headers: { Authorization: `Bearer ${apiToken}` },
    cache: 'no-store',
  });
  const data = await response.json();
  return data?.data ?? [];
}

export default function PartnersCard() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    async function loadPartners() {
      const partnersData = await fetchPartners();
      setPartners(partnersData);
    }
    loadPartners();
  }, []);

  if (!partners.length) return null;

  return (
    <section className="container mx-auto py-12">
      <h2 className="text-3xl font-medium font-ubuntu sm:text-left px-6 mb-5">Our Global Partners</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner, index) => { 
          const imageUrl = partner.logo?.url || partner.logo?.formats?.thumbnail?.url;
          const fullImageUrl = imageUrl ? `${imageUrl}` : '/placeholder.jpg';

          return (
            <div key={index} className="flex items-center mx-6 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
              <div className="w-1/3 flex justify-center items-center p-4">
                {imageUrl ? (
                  <Image
                    src={fullImageUrl}
                    alt={partner.title}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>
              <div className="w-[1px] bg-gray-300 h-full"></div>
              <div className="w-2/3 p-4">
                <h4 className="text-lg font-semibold font-ubuntu text-gray-800">{partner.title}</h4>
                <p className="text-gray-600 font-ubuntu text-sm mt-2">{partner.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
