import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import Image from 'next/image'; // Importing Image
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Management and Governance - Instient",
  description: "Learn more about Instient management and governance model.",
};


async function fetchManagementAndGovernancePageData() {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN;

  const response = await fetch(
    `${apiUrl}/api/managementandgovernancepage?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
      cache: "no-store",
    }
  );

  const data = await response.json();

  // Return the page data or null if no data found
  return data?.data ?? null;
}

export default async function ManagementAndGovernancePage() {
  const managementAndGovernanceData = await fetchManagementAndGovernancePageData();

  // If no data or malformed data, show an error message
  if (
    !managementAndGovernanceData ||
    !managementAndGovernanceData.Title 
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
    governanceModel,
    managementModel,
    Image: { url } = {},
    Banner_Image1: { url: bannerImageUrl1 } = {},
    Banner_Image2: { url: bannerImageUrl2 } = {},
  } = managementAndGovernanceData;

  return (
    <main>
      <div className="w-full h-[425px] sm:h-[450px]  p-6 font-ubuntu relative">
          <Image
              src={`${url}`} // Dynamically set the full image URL from the API
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
            strokeWidth="1"
            fill="transparent"
          />
          <polygon
            points="780,95 800,100 780,105"
            fill="#3c83c1"
          />
        </svg>



        
        <div className="my-64 sm:my-64 ">
          <Card className="lg:w-[600px] sm:w-[650px] bg-gradient-to-b from-[#3c83c1] to-[#459ae5] text-white font-ubuntu  opacity-90">
            <CardHeader>
              <CardTitle className="text-base font-light"></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl py-6 sm:pt-7 mb-12 sm:mb-12 font-ubuntu font-medium">
                {Title}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

            <section className="bg-gray-600 text-white mb-10 mt-32 sm:mt-20">
              <div className="container font-ubuntu mx-auto flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 px-6 mt-5">
                  <h2 className="text-4xl px-6 font-bold  mb-8">Management</h2>
                  <p className="text-lg px-6 text-white mb-20">{managementModel}</p>
                </div>
                <div className="md:w-1/2 flex justify-end">
                  {bannerImageUrl1 && <Image src={`${bannerImageUrl1}`} alt="Guiding Values" width={700} height={400} className="shadow-lg" />}
                </div>
              </div>
            </section>

            <section className="bg-gray-600 text-white mb-10 mt-32 sm:mt-20">
              <div className="container font-ubuntu mx-auto flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 flex justify-start">
                  {bannerImageUrl2 && <Image src={`${bannerImageUrl2}`} alt="Guiding Values" width={700} height={400} className="shadow-lg" />}
              </div>
              <div className="md:w-1/2 px-6 mt-5 items-center">
                  <h2 className="text-4xl px-6 font-bold  mb-8 mt-5">Governance</h2>
                  <p className="text-lg px-6 text-white mb-10">{governanceModel}</p>
              </div>
                
              </div>
            </section>


      <Footer />
    </main>
  );
}
