import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import Image from 'next/image'; // Importing Image
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy - Instient",
  description: "Stay updated with the latest cookie policy from Instient.",
};

async function fetchCookiePolicyPageData() {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN;

  const response = await fetch(
    `${apiUrl}/api/cookiepolicypage?populate=*`, 
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

export default async function CookiePolicyPage() {
  const cookiePolicyData = await fetchCookiePolicyPageData();

  // If no data or malformed data, show an error message
  if (!cookiePolicyData || !cookiePolicyData.Title || !cookiePolicyData.header || !cookiePolicyData.Description) {
    return <p className="text-center mt-20">Some required fields are missing or the page does not exist.</p>;
  }

  // Destructure attributes safely
  const { Title, header, Description, content1, content1_answer, content2, content2_answer, conclusion, Image: { url } = {},   } = cookiePolicyData;

  return (
    <main>
      <div className="w-full h-[425px] sm:h-[450px] p-6 font-ubuntu relative ">
        <Image
          src={url ? `${url}` : '/default-image.png'} // Use default image if url is undefined
          alt="Background Image"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover" // Ensuring the image covers the background and stays behind content
        />
        <div className="my-64 sm:my-64">
          <Card className="lg:w-[600px] sm:w-[650px] bg-gradient-to-b from-[#3c83c1] to-[#459ae5] text-white font-ubuntu opacity-90">
            <CardHeader>
              <CardTitle className="text-base font-light">{header}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl py-6 sm:py-0 mb-12 sm:mb-24 font-ubuntu font-medium">{Title}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-44 sm:mt-24 w-[90%] sm:w-[60%]">
        <p className="text-2xl px-6 font-ubuntu">{Description}</p>
      </div>

      <Section contentTitle={content1} contentAnswer={content1_answer} />
      <Section contentTitle={content2} contentAnswer={content2_answer} />

      <div className="sm:px-6 px-3 py-4 mt-10 sm:mt-10 sm:mb-10 mb-10">
        <h2 className="text-3xl font-medium font-ubuntu sm:text-left px-6">Conclusion</h2>
        <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-10 sm:mt-2 w-[90%] sm:w-[60%]">
          <p className="text-xl px-3 sm:p-0 font-ubuntu">{conclusion}</p>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function Section({ contentTitle, contentAnswer }: { contentTitle: string; contentAnswer: string }) {
  return (
    <div className="sm:px-6 px-3 py-4 mt-10 sm:mt-10 sm:mb-10 mb-10">
      <h2 className="text-3xl font-medium font-ubuntu sm:text-left px-6">{contentTitle}</h2>
      <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-10 sm:mt-2 w-[90%] sm:w-[60%]">
        <p className="text-xl px-3 sm:p-0 font-ubuntu">{contentAnswer}</p>
      </div>
    </div>
  );
}
