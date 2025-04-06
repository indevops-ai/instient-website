import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Values and Ethics - Instient",
  description: "Learn more about Instient core values, ethical principles, and commitment to excellence.",
}

async function fetchEthicsAndValuesPageData() {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN;

  const response = await fetch(
    `${apiUrl}/api/ethicsandvaluespage?populate=*`,
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

export default async function EthicsAndValuesPage() {
  const ethicsAndValuesData = await fetchEthicsAndValuesPageData();

  const {
    Title,
    Description,
    coreValues,
    ethicalPrinciples,
    commitment,
    Image: { url } = {},
  } = ethicsAndValuesData ?? {};

  return (
    <main>
      <div className="w-full h-[425px] sm:h-[450px] p-6 font-ubuntu relative">
        {url && (
          <Image
            src={`${url}`}
            alt="Ethics and Values Image"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center -z-10"
          />
        )}

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
              <p className="text-4xl py-6 sm:pt-7 mb-12 sm:mb-12 font-ubuntu font-medium">
                {Title}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-44 sm:mt-24 w-[90%] sm:w-[60%]">
        <p className="text-2xl px-6 font-ubuntu">{Description}</p>
      </div>

      <Section contentTitle="Core Values" contentAnswer={coreValues} />
      <Section contentTitle="Ethical Principles" contentAnswer={ethicalPrinciples} />
      <Section contentTitle="Our Commitment" contentAnswer={commitment} />

      <Footer />
    </main>
  );
}

interface TextBlock {
  type: "paragraph" | "list";
  format?: "unordered" | "ordered";
  children?: { text?: string; children?: { text: string }[] }[];
}

interface SectionProps {
  contentTitle: string;
  contentAnswer?: TextBlock[];
}

function renderContent(content: TextBlock[] | undefined) {
  if (!content || !Array.isArray(content)) return null;

  return content.map((block, index) => {
    if (block.type === "paragraph") {
      return (
        <p key={index} className="text-xl mb-4 px-3 sm:p-0 font-ubuntu">
          {block.children
            ?.map((child) =>
              child.children
                ? child.children.map((grandChild) => grandChild.text).join(" ")
                : child.text || ""
            )
            .join(" ")}
        </p>
      );
    }
    if (block.type === "list") {
      return (
        <ul
          key={index}
          className={`text-xl px-3 sm:p-0 font-ubuntu ${
            block.format === "unordered" ? "list-disc mb-6 pl-6" : "list-decimal mb-6 pl-6"
          }`}
        >
          {block.children?.map((listItem, i) => (
            <li key={i}>
              {listItem.children
                ? listItem.children.map((child) => child.text).join(" ")
                : listItem.text || ""}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  });
}

function Section({ contentTitle, contentAnswer }: SectionProps) {
  return (
    <div className="sm:px-6 px-3 py-4 mt-10 sm:mt-10 sm:mb-10 mb-10">
      <h2 className="text-3xl font-medium font-ubuntu sm:text-left px-6">{contentTitle}</h2>
      <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-10 sm:mt-2 w-[90%] sm:w-[60%]">
        {renderContent(contentAnswer)}
      </div>
    </div>
  );
}
