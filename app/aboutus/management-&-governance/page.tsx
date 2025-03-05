import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import Image from 'next/image'; // Importing Image

async function fetchManagementAndGovernancePageData() {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  const response = await fetch(
    `https://api.instient.ai/api/managementandgovernancepage?populate=*`,
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
  } = managementAndGovernanceData;

  return (
    <main>
      <div className="w-full h-[425px] sm:h-[450px]  p-6 font-ubuntu relative">
          <Image
              src={`https://api.instient.ai${url}`} // Dynamically set the full image URL from the API
              alt="Career Image"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center -z-10"
          />
        
        <div className="my-64 sm:my-64 ">
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

      <Section contentTitle="Management" contentAnswer={managementModel}customMarginTop="mt-32 sm:mt-20"  />
      <Section contentTitle="Governance" contentAnswer={governanceModel} customMarginTop="sm:mt-10" />

      <Footer />
    </main>
  );
}

function Section({
  contentTitle,
  contentAnswer,
  customMarginTop,
}: {
  contentTitle: string;
  contentAnswer: string;
  customMarginTop?: string;
}) {
  return (
    <div className={`sm:px-6 px-3 py-4 ${customMarginTop} sm:mb-10 mb-10`}>
      <h2 className="text-3xl font-medium font-ubuntu sm:text-left px-6">
        {contentTitle}
      </h2>
      <div className="container sm:p-6 py-6 px-3 font-ubuntu sm:mt-2 w-[90%] sm:w-[60%]">
        <p className="text-xl px-3 sm:p-0 font-ubuntu">{contentAnswer}</p>
      </div>
    </div>
  );
}
