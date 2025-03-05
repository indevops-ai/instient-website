import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import Image from "next/image";

async function fetchEthicsAndValuesPageData() {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  const response = await fetch(
    `https://api.instient.ai/api/ethicsandvaluespage?populate=*`,
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
            src={`https://api.instient.ai${url}`}
            alt="Ethics and Values Image"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center -z-10"
          />
        )}

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
