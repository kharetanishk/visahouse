import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/metadata";
import { visaDocumentData } from "@/lib/data/visaDocuments";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  ];

  for (const key of Object.keys(visaDocumentData)) {
    entries.push({
      url: `${base}/visa/${key}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }

  return entries;
}

