import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why join Instient",
  description: "Discover the benefits of being part of Instient. Explore growth opportunities, innovation, and a dynamic work culture.",
};


async function fetchWhyJoinPageData() {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN;

  const response = await fetch(
    `${apiUrl}/api/whyjoininstient?populate=*`,
    {
      headers: { Authorization: `Bearer ${apiToken}` },
      cache: "no-store",
    }
  );
  const data = await response.json();
  return data?.data ?? null;
}

export default async function WhyJoinInstientPage() {
  const whyJoinData = await fetchWhyJoinPageData();
  if (!whyJoinData) {
    return (
      <p className="text-center mt-20">
        Some required fields are missing or the page does not exist.
      </p>
    );
  }

  const {
    Title,
    content1,
    content1_answer,
    content2,
    content2_answer,
    Banner_Title1,
    Banner_Description1,
    Banner_Title2,
    Banner_Description2,
    Image: { url } = {},
    Banner_Image1: { url: bannerImage1Url } = {},
    Banner_Image2: { url: bannerImage2Url } = {},
  } = whyJoinData;

  return (
    <main>
      <div className="w-full h-[425px] sm:h-[450px] p-6 font-ubuntu relative">
        <Image
          src={`${url}`}
          alt="Career Image"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center -z-10"
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

        <div className="my-64 sm:my-64">
          <Card className="lg:w-[600px] sm:w-[650px] bg-gradient-to-b from-[#3c83c1] to-[#459ae5] text-white font-ubuntu opacity-90">
            <CardHeader>
            </CardHeader>
            <CardContent>
              <p className="text-4xl py-6 sm:pt-7 mb-12 sm:mb-12 font-ubuntu font-medium">
                {Title}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-10 sm:mt-10 ">
      </div>

      <Section contentTitle={content1} contentAnswer={content1_answer} />
      <BannerSection
        title={Banner_Title1}
        description={Banner_Description1}
        imageUrl={bannerImage1Url}
      />
      <Section contentTitle={content2} contentAnswer={content2_answer} />
      <BannerSection
        title={Banner_Title2}
        description={Banner_Description2}
        imageUrl={bannerImage2Url}
      />

      <Footer />
    </main>
  );
}

interface SectionProps {
  contentTitle: string;
  contentAnswer: string;
}

function Section({ contentTitle, contentAnswer }: SectionProps) {
  return (
    <div className="sm:px-6 px-3 py-4 mt-10 sm:mt-10 sm:mb-10 mb-10">
      <h2 className="text-3xl font-medium font-ubuntu sm:text-left px-6">
        {contentTitle}
      </h2>
      <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-10 sm:mt-2 w-[90%] sm:w-[60%]">
        <p className="text-xl px-3 sm:p-0 font-ubuntu">{contentAnswer}</p>
      </div>
    </div>
  );
}

interface BannerSectionProps {
  title: string;
  description: string;
  imageUrl: string;
}

function BannerSection({ title, description, imageUrl }: BannerSectionProps) {
  return (
    <div className="relative w-full min-h-[500px] sm:h-[400px] flex items-center justify-start mb-16 sm:mb-10 px-4 sm:pl-10">
      <Image
        src={`${imageUrl}`}
        alt={title}
        fill
        className="object-cover object-center -z-10"
      />
      <Card className="relative z-10 bg-white p-4 sm:p-6 w-full max-w-[90%] sm:max-w-[60%] shadow-xl">
        <CardHeader>
          <CardTitle className="text-4xl font-bold mb-4 text-left">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-left">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
}

