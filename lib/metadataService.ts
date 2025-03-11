import { Metadata } from 'next';

const baseUrl = "https://www.instient.ai";

export function generatePageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
  };
}
