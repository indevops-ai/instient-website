import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import Image from "next/image";
import { Metadata } from "next";



async function fetchBlogData(slug: string) {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN;

  const response = await fetch(
    `${apiUrl}/api/blogs?filters[slug][$eq]=${slug}&populate=*`,
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

export async function generateMetadata({ params }: { params: Promise< { slug: string } >}): Promise<Metadata> {
  const { slug }= await params;
  const blogData = await fetchBlogData(slug);

  return {
    title: blogData ? `${blogData.Title} - Instient` : "Service Not Found - Instient",
    description: blogData?.Description || "The requested service does not exist.",
  };
}

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogData = await fetchBlogData(slug);

  if (!blogData || !blogData.Title || !blogData.Description) {
    return (
      <p className="text-center mt-20">
        Some required fields are missing or the article does not exist.
      </p>
    );
  }

  const {
    Title,
    header,
    Description,
    content1,
    content1_answer,
    content2,
    content2_answer,
    content3,
    content3_points,
    content4,
    content4_points,
    conclusion,
    Image: { url } = {},
  } = blogData;

  return (
    <main>
      <div className="w-full h-[425px] sm:h-[450px] p-6 font-ubuntu relative">
        <Image
          src={url ? `${url}` : "/default-image.png"}
          alt="Background Image"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />

        <div className="my-64 sm:my-64 relative z-10">
          <Card className="lg:w-[800px] sm:w-[650px] bg-gradient-to-b from-[#3c83c1] to-[#459ae5] text-white font-ubuntu opacity-90">
            <CardHeader>
              <CardTitle className="text-base font-light">{header}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl py-4 sm:py-4 mb-10 sm:mb-12 font-ubuntu font-medium">
                {Title}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-64 sm:mt-32 w-[90%] sm:w-[60%]">
        <p className="text-2xl px-6 font-ubuntu">{Description}</p>
      </div>

      <Section contentTitle={content1} contentAnswer={content1_answer} />
      <Section contentTitle={content2} contentAnswer={content2_answer} />

      {/* Sections with Rich Text Blocks */}
      <SectionList contentTitle={content3} contentPoints={content3_points} />
      <SectionList contentTitle={content4} contentPoints={content4_points} />

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

interface TextBlock {
  type: "paragraph" | "list";
  format?: "unordered" | "ordered";
  children?: { text?: string; children?: { text: string }[] }[];
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


interface SectionListProps {
  contentTitle: string;
  contentPoints?: TextBlock[];
}

function SectionList({ contentTitle, contentPoints }: SectionListProps) {
  return (
    <div className="sm:px-6 px-3 py-4 mt-10 sm:mt-10 sm:mb-10 mb-10">
      <h2 className="text-3xl font-medium font-ubuntu sm:text-left px-6">{contentTitle}</h2>
      <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-10 sm:mt-2 w-[90%] sm:w-[60%]">
        {renderContent(contentPoints)}
      </div>
    </div>
  );
}
