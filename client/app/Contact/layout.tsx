import { pageMetadata } from "../lib/seo";

export const metadata = pageMetadata(
  "Contact Us",
  "Get in touch with the TechLearn team about our IT courses and learning platform.",
  "/Contact",
);

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
