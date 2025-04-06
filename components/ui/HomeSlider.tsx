'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Define the type for a banner object
interface Banner {
  banner_title?: string;
  banner_description?: string;
  banner_button_text?: string;
  slug?: string;
  banner_image?: {
    url: string;
  };
}

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

// Fetch banners from API
async function fetchBanners(): Promise<Banner[]> {
  if (!apiDomain || !apiToken) {
    console.error("API domain or token is missing.");
    return [];
  }
  
  const response = await fetch(`${apiDomain}/api/homebanners?populate=*`, {
    headers: { Authorization: `Bearer ${apiToken}` },
    cache: 'no-store',
  });
  
  if (!response.ok) {
    console.error("Failed to fetch banners.");
    return [];
  }
  
  const data = await response.json();
  return data?.data ?? [];
}

export default function HomeSlider() {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    async function loadBanners() {
      const bannerData = await fetchBanners();
      setBanners(bannerData);
    }
    loadBanners();
  }, []);

  if (!banners.length) return null;

  return (
    <section className="relative w-full overflow-hidden bg-gray-600 text-white">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="w-full h-[600px] md:h-[400px]"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index} className="flex">
            <div className="container mx-auto flex flex-col md:flex-row items-center md:h-[400px]">
              <div className="md:w-1/2 mx-4 sm:mx-14 px-8 sm:px-10 my-5 sm:my-0">
                <h2 className="text-4xl font-bold mb-6 mt-4 sm:mt-0">
                  {banner.banner_title || "Welcome to Our Platform"}
                </h2>
                <p className="text-lg mb-8">
                  {banner.banner_description || "Discover amazing features and services."}
                </p>
                <Link href={`/${banner.slug}`}>
                  <Button className="relative text-white border-white border-[1.5px] rounded-full flex items-center font-ubuntu gap-2 overflow-hidden transition-all duration-300 ease-out group">
                    <span className="absolute inset-0 w-0 bg-gray-400 transition-all duration-300 ease-out group-hover:w-full"></span>
                    <span className="relative z-10 flex items-center gap-2 hover:text-white hover:border-gray-300">
                      {banner.banner_button_text || "Explore Now"} <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </Link>
              </div>
              <div className="md:w-1/2 flex justify-end min-h-[300px] md:h-[400px] w-full">
                {banner.banner_image?.url ? (
                  <Image
                    src={`${banner.banner_image.url}`}
                    alt={banner.banner_title || "Home Banner"}
                    width={700}
                    height={400}
                    className="shadow-lg object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-[700px] h-[300px] bg-gray-800 flex items-center justify-center text-white">
                    No Image Available
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev absolute mx-5 top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white w-10 h-10 flex items-center justify-center cursor-pointer shadow-lg z-10 before:absolute before:w-16 before:h-16 before:bg-gray-800 before:rounded-full before:z-[-1]"></div>
      <div className="swiper-button-next absolute mx-5 top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white w-10 h-10 flex items-center justify-center cursor-pointer shadow-lg z-10 before:absolute before:w-16 before:h-16 before:bg-gray-800 before:rounded-full before:z-[-1]"></div>
    </section>
  );
}