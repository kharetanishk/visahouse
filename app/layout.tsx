import type { Metadata } from "next";
import { Suspense } from "react";
import { Playfair_Display, Lato, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { siteMetadata, siteConfig } from "@/lib/seo/metadata";
import { faqs } from "@/lib/data/faqs";
import { TransitionProvider } from "@/lib/context/TransitionContext";
import { TwemojiBodyParser } from "@/components/TwemojiBodyParser";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Lato({
  variable: "--font-body",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

const accent = Cormorant_Garamond({
  variable: "--font-accent",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = siteMetadata;

function jsonLdStringify(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function buildStructuredData() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1/3, Sunny Mendoza House Kanjur Marg",
      addressLocality: "Mumbai",
      addressRegion: "MH",
      postalCode: "400042",
      addressCountry: "IN",
    },
    // geo: {
    //   "@type": "GeoCoordinates",
    //   latitude: 19.1663,
    //   longitude: 72.8526,
    // },
    openingHours: [siteConfig.hours],
    sameAs: [],
  };

  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "VisaHouse Visa Consultancy",
    url: siteConfig.url,
    areaServed: "IN",
    serviceType: "Visa consultancy and visa application assistance",
    telephone: siteConfig.phone,
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
    ],
  };

  const aggregateRating = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue: 4.9,
    reviewCount: 1240,
    bestRating: 5,
    worstRating: 1,
    itemReviewed: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };

  return [
    localBusiness,
    professionalService,
    faqSchema,
    breadcrumbList,
    aggregateRating,
  ];
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = buildStructuredData();

  return (
    <html
      lang="en-IN"
      className={`${display.variable} ${body.variable} ${accent.variable} h-full antialiased`}
    >
      <head>
        {structuredData.map((obj, idx) => (
          <script
            key={idx}
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: jsonLdStringify(obj) }}
          />
        ))}
      </head>
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}>
          <TwemojiBodyParser />
        </Suspense>
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
