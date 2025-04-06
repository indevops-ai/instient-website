import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import { ArrowRight } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Who we are - Instient",
  description: "Get to know Instient—our mission, values, and the people driving innovation and excellence.",
};

async function fetchWhoWeArePageData() {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN;

  const response = await fetch(`${apiUrl}/api/whowearepage?populate=*`, {
    headers: { Authorization: `Bearer ${apiToken}` },
    cache: "no-store",
  });
  const data = await response.json();
  return data?.data ?? null;
}

export default async function WhoWeArePage() {
  const whoWeAreData = await fetchWhoWeArePageData();

  if (!whoWeAreData || !whoWeAreData.Title || !whoWeAreData.Description) {
    return <p className="text-center mt-20">Some required fields are missing or the page does not exist.</p>;
  }

  const {
    Title, Description, mission, vision,
    Image: { url: mainImageUrl } = {},
    Banner_Title, Banner_Description, Banner_Button,
    Banner_Image: { url: bannerImageUrl } = {},
  } = whoWeAreData;

  return (
    <main>
      <div className="w-full h-[425px] sm:h-[450px] p-6 font-ubuntu relative">
        <Image src={`${mainImageUrl}`} alt="Career Image" fill priority sizes="100vw" className="object-cover object-center -z-10" />
        
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
        
        <div className="my-64 sm:my-64">
          <Card className="lg:w-[600px] sm:w-[650px] bg-gradient-to-b from-[#3c83c1] to-[#459ae5] text-white font-ubuntu  opacity-90">
            <CardHeader>
              <CardTitle className="text-base font-light"></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl py-6 sm:pt-7 mb-12 sm:mb-12 font-ubuntu font-medium">{Title}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      

      <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-24 sm:mt-24 w-[90%] sm:w-[60%]">
        <p className="text-2xl px-6 font-ubuntu">{Description}</p>
      </div>

      <Section contentTitle="Mission" contentAnswer={mission}  />
      <Section contentTitle="Vision" contentAnswer={vision}   />
      

      <section className="bg-gray-600 text-white mb-10">
        <div className="container font-ubuntu mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 px-6 mt-5">
            <h2 className="text-4xl px-6 font-bold  mb-8">{Banner_Title}</h2>
            <p className="text-lg px-6 text-white mb-20">{Banner_Description}</p>
            <Link href="/aboutus/who-we-are/values-and-ethics">
              <Button className="relative text-white border-white ml-5 border-[1.5px] rounded-full flex items-center font-ubuntu gap-2 overflow-hidden transition-all duration-300 ease-out group sm:mb-0 mb-5">
                <span className="absolute inset-0 w-0 bg-gray-400 transition-all duration-300 ease-out group-hover:w-full"></span>
                <span className="relative z-10 flex items-center gap-2 hover:text-white hover:border-gray-300">
                  {Banner_Button} <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-end">
            {bannerImageUrl && <Image src={`${bannerImageUrl}`} alt="Guiding Values" width={700} height={400} className="shadow-lg" />}
          </div>
        </div>
      </section>

      <ExploreInstient />
      <Footer />
    </main>
  );
}

function Section({ contentTitle, contentAnswer }: { contentTitle: string; contentAnswer: string }) {
  return (
    <div className="sm:px-6 px-3 py-4 mt-10 sm:mt-10 sm:mb-10 mb-10">
      <h2 className="text-3xl font-medium font-ubuntu sm:text-left px-6">{contentTitle}</h2>
      <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-12 sm:mt-2 w-[90%] sm:w-[60%]">
        <p className="text-xl px-3 sm:p-0 font-ubuntu">{contentAnswer}</p>
      </div>
    </div>
  );
}

async function fetchExploreInstientData() {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN;
  const response = await fetch(`${apiUrl}/api/whowearepage?populate=*`, {
    headers: { Authorization: `Bearer ${apiToken}` },
    cache: "no-store",
  });
  const data = await response.json();
  return data?.data ?? null;
}

async function ExploreInstient() {
  const exploreData = await fetchExploreInstientData();
  if (!exploreData) return <p className="text-center mt-20">No data available.</p>;

  const cards = [
    { title: exploreData.Card1_Title, slug: "/careers/life-at-instients", imageUrl: exploreData.Card1_Image?.url },
    { title: exploreData.Card2_Title, slug: "/careers/why-join-instients", imageUrl: exploreData.Card2_Image?.url },
    { title: exploreData.Card3_Title, slug: "/careers/meet-our-people", imageUrl: exploreData.Card3_Image?.url },
  ];

  return (
    <section className="py-10 font-ubuntu relative">
      <h2 className="text-3xl font-ubuntu sm:text-left px-12  sm:mb-24">Explore Instient</h2>
      <div className="flex flex-wrap justify-center px-8 sm:justify-start gap-28 mt-24 sm:mt-16">
        {cards.map((card, index) => (
          <div key={index} className="relative mb-14 sm:mb-14 w-full sm:w-[407px]">
            {card.imageUrl && <Image src={`${card.imageUrl}`} alt={card.title} width={407} height={300} className="absolute top-[25%] sm:top-1/3 left-1/2 sm:left-[50%] w-full h-[300px] bg-gray-200 -translate-y-1/2 -translate-x-1/2 z-0 rounded-md" />}
            <Card className="relative py-4 shadow-xl rounded-lg bg-white z-10 mt-28 w-[90%] mx-auto">
              <CardContent><p className="text-2xl py-3 font-ubuntu font-extralight">{card.title}</p></CardContent>
              <CardFooter className="flex justify-end sm:py-6 pb-6">
                <Link href={card.slug}><Button className="text-black border-black rounded-full flex items-center font-ubuntu gap-2 hover:bg-gray-200 hover:border-gray-300 transition-all duration-300 ease-in-out"><ArrowRight className="w-4 h-4" /></Button></Link>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
