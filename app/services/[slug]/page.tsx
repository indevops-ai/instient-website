import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import Image from 'next/image'; // Importing Image

async function fetchServiceData(slug: string) {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  const response = await fetch(
    `https://api.instient.ai/api/service-instients?filters[slug][$eq]=${slug}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
      cache: "no-store",
    }
  );

  const data = await response.json();
  return data?.data?.[0] ?? null;
}

export default async function ServiceSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const serviceData  = await fetchServiceData(slug);

  if (!serviceData) {
    return <p className="text-center mt-20">Service not found or incomplete data.</p>;
  }

  const {
    Service_Title,
    Service_Description,
    Service_Content1_Title,
    Service_Content2_Title,
    Service_Content2_Description,
    Service_Content3_Title,
    Service_Thumbnail: { url } = {}, // Assuming you have an image field
    ...contentData
  } = serviceData.attributes || serviceData;

  const content1Cards = extractCardData(contentData, "Service_Content1_Card");
  const processDetails = extractCardData(contentData, "Service_Content3_Card");



  

  return (
    <main>
      <div className="w-full h-[425px] sm:h-[450px] p-6 font-ubuntu relative">
        {/* Image Component Replacing Background */}

        
        <Image
          src={url ? `https://api.instient.ai${url}` : '/default-image.png'} // Use default image if url is undefined
          alt="Career Image"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />

        <svg
          className="absolute top-1/3 left-0 w-[68%] sm:w-[98%] h-auto -z-10 opacity-60"
          viewBox="0 0 800 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 50 C150 100, 300 0, 450 50 S 700 150, 800 100"
            stroke="#3c83c1"
            strokeWidth="2"
            fill="transparent"
          />
          <polygon
            points="780,95 800,100 780,105"
            fill="#3c83c1"
          />
        </svg>


        <div className="my-64 sm:my-64 relative z-10">
          <Card className="lg:w-[600px] sm:w-[650px] bg-gradient-to-b from-[#3c83c1] to-[#459ae5] text-white font-ubuntu opacity-90">
            <CardContent>
              <p className="text-4xl py-24 sm:py-20 font-ubuntu font-medium">{Service_Title}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-44 sm:mt-24 w-[90%] sm:w-[60%]">
        <p className="text-2xl px-6 font-ubuntu">{Service_Description}</p>
      </div>

      <WhatMakesUsStandOut title={Service_Content1_Title} cards={content1Cards} />

      <div className="sm:px-6 px-3 py-4 mt-10 sm:mt-10 sm:mb-10 mb-10">
        <h2 className="text-3xl font-medium font-ubuntu sm:text-left px-6">{Service_Content2_Title}</h2>
        <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-10 sm:mt-2 w-[90%] sm:w-[60%]">
          <p className="text-xl px-3 sm:p-0 font-ubuntu">{Service_Content2_Description}</p>
        </div>
      </div>

      <OurProcess title={Service_Content3_Title} processDetails={processDetails} />

      <Footer />
    </main>
  );
}

interface WhatMakesUsStandOutProps {
  title: string;
  cards: Array<{ title: string; content: string; description?: string }>;
}

function WhatMakesUsStandOut({ title, cards }: WhatMakesUsStandOutProps) {
  return (
    <div className="sm:px-6 px-3 py-4 mt-10 sm:mt-10 sm:mb-16 mb-10">
      <h2 className="text-3xl font-medium font-ubuntu sm:text-left px-6">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
        {cards.map((card, index) => (
          <Card key={index} className="py-4 shadow-xl rounded-lg bg-white border-white p-6 w-[95%] sm:w-[100%] mx-auto">
            <h3 className="font-ubuntu text-xl font-semibold mb-2 mt-2">{card.title}</h3>
            <div className="border-b-4 border-blue-500 w-12 mb-4"></div>
            <CardContent className="text-black font-ubuntu text-base p-0">{card.content}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

interface OurProcessProps {
  title: string;
  processDetails: Array<{ title: string; content: string; description: string }>;
}

function OurProcess({ title, processDetails }: OurProcessProps) {
  return (
    <div className="px-6 py-4 mt-10 sm:mt-10 sm:mb-10">
      <h2 className="text-3xl font-ubuntu font-medium px-4 sm:text-left sm:px-6 sm:mb-6 mb-4">{title}</h2>

      <div className="grid grid-cols-1 gap-6">
        {processDetails.map((detail, index) => (
          <div key={index} className="p-6 border-t border-gray-300 font-ubuntu">
            <p className="text-lg font-ubuntu mb-1">{detail.title}</p>
            <h3 className="text-xl font-ubuntu font-medium mb-1">{detail.description}</h3>
            <p className="text-sm font-ubuntu mb-1">{detail.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface CardData {
  title: string;
  content: string;
  description: string;
}

function extractCardData(data: { [key: string]: string | undefined }, keyPrefix: string): CardData[] {
  const cards: CardData[] = [];
  let index = 1;

  while (data[`${keyPrefix}${index}_Title`]) {
    cards.push({
      title: data[`${keyPrefix}${index}_Title`] || "",
      content: data[`${keyPrefix}${index}_Description`] || "",
      description: data[`${keyPrefix}${index}_Content`] || "",
    });
    index++;
  }

  return cards;
}

