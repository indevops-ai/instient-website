import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "life at Instient",
  description: "Stay updated with the latest life at instient from Instient.",
};


async function fetchLifeAtInstientPageData() {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN;

  const response = await fetch(
    `${apiUrl}/api/lifeatinstient?populate=*`,
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

export default async function LifeAtInstientPage() {
  const lifeAtInstientData = await fetchLifeAtInstientPageData();

  if (!lifeAtInstientData || !lifeAtInstientData.Title || !lifeAtInstientData.Description) {
    return <p className="text-center mt-20">Some required fields are missing or the page does not exist.</p>;
  }

  const {
    Title,
    header,
    Description,
    content1,
    content1_answer,
    content2,
    content2_answer,
    Image: { url } = {},
  } = lifeAtInstientData;

  return (
    <main>
      <div className="w-full h-[425px] sm:h-[450px] p-6 font-ubuntu relative">
        {url && (
          <Image
            src={`${url}`}
            alt="Career Image"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center -z-10"
          />
        )}

        
        <div className="my-64 sm:my-64">
          <Card className="lg:w-[600px] sm:w-[650px] bg-gradient-to-b from-[#3c83c1] to-[#459ae5] text-white font-ubuntu opacity-90">
            <CardHeader>
              <CardTitle className="text-base font-light">{header}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl py-6 sm:pt-7 mb-12 sm:mb-12 font-ubuntu font-medium">{Title}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-44 sm:mt-24 w-[90%] sm:w-[60%]">
        <p className="text-2xl px-6 font-ubuntu">{Description}</p>
      </div>

      <Section contentTitle={content1} contentAnswer={content1_answer} />
      <Section contentTitle={content2} contentAnswer={content2_answer} />

      <Footer />
    </main>
  );
}

interface TextChild {
  text: string;
}

interface TextBlock {
  type: "paragraph" | "list";
  format?: "unordered" | "ordered";
  children?: TextChild[];
}

interface SectionProps {
  contentTitle: string;
  contentAnswer?: TextBlock[];
}

function Section({ contentTitle, contentAnswer }: SectionProps) {
  return (
    <div className="sm:px-6 px-3 py-4 mt-10 sm:mt-10 sm:mb-10 mb-10">
      <h2 className="text-3xl font-medium font-ubuntu sm:text-left px-6">{contentTitle}</h2>
      <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-10 sm:mt-2 w-[90%] sm:w-[60%]">
        {contentAnswer?.map((block: TextBlock, index: number) => {
          if (block.type === "paragraph") {
            return (
              <p key={index} className="text-xl px-3 sm:p-0 font-ubuntu mb-6">
                {block.children?.map((child: TextChild) => child.text).join("")}
              </p>
            );
          }
          if (block.type === "list" && block.children) {
            return (
              <ul key={index} className="list-disc pl-6 mb-6">
                {block.children.map((listItem: TextChild, i: number) => (
                  <li key={i}>{listItem.text}</li>
                ))}
              </ul>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
