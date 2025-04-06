'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Define the type for a banner object
interface Banner {
  banner_title?: string;
  banner_description?: string;
  // banner_button_text?: string;
  banner_image?: {
    url: string;
  };
}

// Fetch banners from API
async function fetchBanners(): Promise<Banner[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN;  
  const response = await fetch(`${apiUrl}/api/technologypartnerbanners?populate=*`, {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}` },
    cache: 'no-store',
  });
  const data = await response.json();
  return data?.data ?? [];
}

export default function TechnologyPartnerSlider() {
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
              <div className="md:w-1/2 mx-14 px-10">
                <h2 className="text-4xl font-bold mb-6">{banner.banner_title || 'Technology Event'}</h2>
                <p className="text-lg mb-8">{banner.banner_description || 'Join us for an exclusive event.'}</p>
                {/* <Link href="/">
                  <Button className="relative text-white border-white ml-5 border-[1.5px] rounded-full flex items-center font-ubuntu gap-2 overflow-hidden transition-all duration-300 ease-out group">
                    <span className="absolute inset-0 w-0 bg-gray-400 transition-all duration-300 ease-out group-hover:w-full"></span>
                    <span className="relative z-10 flex items-center gap-2 hover:text-white hover:border-gray-300">
                      {banner.banner_button_text || 'Learn More'} <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </Link> */}
              </div>
              <div className="md:w-1/2 flex justify-end h-[300px] md:h-[400px] mt-4 md:mt-0">
                {banner.banner_image?.url ? (
                  <Image
                    src={`${banner.banner_image.url}`}
                    alt={banner.banner_title || 'Technology Partner Banner'}
                    width={700}
                    height={300}
                    className="shadow-lg object-cover h-full w-full"
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
