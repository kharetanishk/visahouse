import type { Metadata } from "next";

export const siteConfig = {
  name: "VisaHouse",
  url: "https://www.visahouse.in",
  tagline: "Your Visa. Our Responsibility.",
  description:
    "VisaHouse is Mumbai's leading visa consultancy with 10+ years of experience, 99% approval rate, and expertise across 90+ countries. Tourist, Business, Student & Work visas handled end-to-end.",
  phone: "+91 6260440241",
  whatsapp: "+91 6260440241",
  email: "hello@visahouse.in",
  address:
    "MASTER MIND 4, Office No A321, CTS No 1627, Royal Palm, Goregaon East, Mumbai – 400065",
  hours: "Mo-Sa 10:00-19:00",
} as const;

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "VisaHouse — Trusted Visa Consultancy in Mumbai | 25,000+ Visas Processed",
    template: "%s | VisaHouse",
  },
  description: siteConfig.description,
  keywords: [
    "visa consultancy mumbai",
    "visa agent india",
    "tourist visa india",
    "schengen visa agent",
    "uk visa consultant",
    "usa visa agent mumbai",
    "canada visa consultancy",
    "australia visa agent",
    "dubai visa agent",
    "visa application india",
    "passport visa services",
    "travel visa help",
    "best visa agent mumbai",
    "visa processing india",
    "online visa services",
  ],
  authors: [{ name: "VisaHouse", url: siteConfig.url }],
  creator: "VisaHouse",
  publisher: "VisaHouse",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: "VisaHouse",
    title: "VisaHouse — Trusted Visa Consultancy | Mumbai",
    description:
      "India's trusted visa consultancy. 10+ years, 25,000+ clients, 99% success rate. We handle visas for 90+ countries.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VisaHouse Visa Consultancy Mumbai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VisaHouse — Trusted Visa Consultancy",
    description: "Mumbai's leading visa consultancy. 25,000+ visas. 99% success rate.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    google: "PLACEHOLDER_GOOGLE_VERIFICATION",
  },
};

