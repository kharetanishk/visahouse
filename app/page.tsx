import { HomeClientPage } from "@/components/HomeClientPage";
import { siteMetadata } from "@/lib/seo/metadata";

export const metadata = siteMetadata;

export default function Home() {
  return <HomeClientPage />;
}
