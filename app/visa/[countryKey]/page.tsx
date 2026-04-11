import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { visaDocumentData } from "@/lib/data/visaDocuments";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VisaChecklist from "@/components/sections/VisaChecklist";
import ContactForm from "@/components/sections/ContactForm";
import { siteConfig } from "@/lib/seo/metadata";

interface Props {
  params: { countryKey: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const country = visaDocumentData[params.countryKey];
  if (!country) return {};

  const title = `${country.countryName} Visa Documents & Requirements`;
  const description = `Visa document checklist for ${country.countryName}: required documents, processing time, and expert help from VisaHouse — ${country.visaType}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/visa/${params.countryKey}`,
    },
    openGraph: {
      title: `${title} | VisaHouse`,
      description,
      url: `${siteConfig.url}/visa/${params.countryKey}`,
      images: [
        {
          url: "/images/visahousesocial.png",
          width: 1200,
          height: 630,
          alt: `${country.countryName} Visa — VisaHouse`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | VisaHouse`,
      description,
      images: ["/images/visahousesocial.png"],
    },
  };
}

export default function VisaCountryPage({ params }: Props) {
  const { countryKey } = params;
  const country = visaDocumentData[countryKey];
  if (!country) notFound();

  return (
    <main>
      <Header />
      <VisaChecklist country={country} />
      <ContactForm />
      <Footer />
    </main>
  );
}

