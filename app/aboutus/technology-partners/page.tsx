import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import Image from 'next/image'; // Importing Image
import TechnologyPartnerSlider from "@/components/ui/TechnologyPartnerSlider";
import PartnersCard from "@/components/ui/PartnersCard";
async function fetchTechnologyPartnerPageData() {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  const response = await fetch(
    `https://dev-api.instient.ai/api/technologypartnnerpage?populate=*`, // Replace with your actual endpoint
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
      cache: "no-store",
    }
  );

  const data = await response.json();

  return data?.data ?? null;
}

export default async function TechnologyPartnerPage() {
  const technologyPartnerData = await fetchTechnologyPartnerPageData();

  // If no data or malformed data, show an error message
  if (
    !technologyPartnerData ||
    !technologyPartnerData.Title ||
    !technologyPartnerData.Description
  ) {
    return (
      <p className="text-center mt-20">
        Some required fields are missing or the page does not exist.
      </p>
    );
  }

  // Destructure attributes safely
  const {
    Title,
    Description,
    Image: { url } = {},
  } = technologyPartnerData;

  return (
    <main>
      <div className="w-full h-[425px] sm:h-[450px]  p-6 font-ubuntu relative">
        <Image
          src={`https://dev-api.instient.ai${url}`} // Dynamically set the full image URL from the API
          alt="Career Image"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center -z-10"
        />
        
        <div className="my-64 sm:my-64">
          <Card className="lg:w-[600px] sm:w-[650px] bg-gradient-to-b from-[#3c83c1] to-[#459ae5] text-white font-ubuntu">
            <CardHeader>
              <CardTitle className="text-base font-light"></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl py-6 sm:py-0 mb-12 sm:mb-24 font-ubuntu font-medium">
                {Title}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-44 sm:mt-24 w-[90%] sm:w-[60%]">
        <p className="text-2xl px-6 font-ubuntu">{Description}</p>
      </div>

      <TechnologyPartnerSlider/>

      <PartnersCard/>
      <Footer />
    </main>
  );
}

