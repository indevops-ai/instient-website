
import { metadata } from "./metadata"; // Import metadata

export { metadata };

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
