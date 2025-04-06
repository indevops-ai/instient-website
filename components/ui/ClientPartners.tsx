'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ClientPartner {
  logo?: { 
    url?: string;
    formats?: { thumbnail?: { url?: string } };
  };
}

// Function to fetch client partners from the API
async function fetchClientPartners(): Promise<ClientPartner[]> {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN;


  const response = await fetch(`${apiUrl}/api/clientpartners?populate=*`, {
    headers: { Authorization: `Bearer ${apiToken}` },
    cache: 'no-store',
  });
  const data = await response.json();
  return data?.data ?? [];
}

export default function ClientPartners() {
  const [clientPartners, setClientPartners] = useState<ClientPartner[]>([]);

  useEffect(() => {
    async function loadClientPartners() {
      const partnersData = await fetchClientPartners();
      setClientPartners(partnersData);
    }
    loadClientPartners();
  }, []);

  if (!clientPartners.length) return null;

  return (
    <section className="container mx-auto py-12">
      <h2 className="text-3xl font-medium font-ubuntu sm:text-left px-12 mb-5">Our Clients</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-6">
        {clientPartners.map((partner, index) => { 
          const imageUrl = partner.logo?.url || partner.logo?.formats?.thumbnail?.url;
          const fullImageUrl = imageUrl ? `${imageUrl}` : '/placeholder.jpg';

          return (
            <div key={index} className="flex justify-center items-center bg-gray-600 shadow-md rounded-lg border border-gray-200 p-4">
              <Image
                src={fullImageUrl}
                alt={`Client Logo ${index + 1}`}
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
