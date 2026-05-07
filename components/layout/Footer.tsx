"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { siteConfig, whatsappChatUrl } from "@/lib/seo/metadata";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Destinations", href: "#destinations" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

const visaServices = [
  "Tourist Visa",
  "Business Visa",
  "Student Visa",
  "Transit Visa",
  "PR / Immigration",
] as const;

export function Footer() {
  return (
    <footer className="mt-auto bg-wood-shadow text-[rgba(253,248,240,0.92)]">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-display text-2xl tracking-tight">
              VisaHouse
            </div>
            <p className="mt-2 font-body text-sm text-[rgba(253,248,240,0.78)]">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 font-body text-sm leading-6 text-[rgba(253,248,240,0.74)]">
              India&apos;s most trusted visa consultancy — helping travellers
              reach their destinations with confidence, clarity, and zero
              stress.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Link
                href="#"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Instagram className="h-5 w-5" aria-hidden />
              </Link>
              <Link
                href="#"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Facebook className="h-5 w-5" aria-hidden />
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Linkedin className="h-5 w-5" aria-hidden />
              </Link>
              <Link
                href="#"
                aria-label="YouTube"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Youtube className="h-5 w-5" aria-hidden />
              </Link>
            </div>
          </div>

          <div>
            <div className="font-display text-lg">Quick Links</div>
            <ul className="mt-4 space-y-2 font-body text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-label={l.label}
                    className="text-[rgba(253,248,240,0.78)] hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-display text-lg">Visa Services</div>
            <ul className="mt-4 space-y-2 font-body text-sm">
              {visaServices.map((s) => (
                <li key={s} className="text-[rgba(253,248,240,0.78)]">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-display text-lg">Contact Info</div>
            <address className="mt-4 not-italic font-body text-sm leading-6 text-[rgba(253,248,240,0.78)]">
              <div>{siteConfig.address}</div>
              <div className="mt-3">
                <Link
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  aria-label="Call VisaHouse"
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.phone}
                </Link>
              </div>
              <div>
                <Link
                  href={whatsappChatUrl}
                  aria-label="WhatsApp VisaHouse"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {siteConfig.whatsapp}
                </Link>
              </div>
              <div className="mt-2">
                <Link
                  href={`mailto:${siteConfig.email}`}
                  aria-label="Email VisaHouse"
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.email}
                </Link>
              </div>
              <div className="mt-4">
                Business Hours: Monday – Saturday, 10:00 AM – 7:00 PM
              </div>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="font-body text-xs text-[rgba(253,248,240,0.7)]">
            © 2026 VisaHouse. All rights reserved. |{" "}
            <Link
              href="#"
              aria-label="Privacy Policy"
              className="hover:text-white"
            >
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link
              href="#"
              aria-label="Terms of Service"
              className="hover:text-white"
            >
              Terms of Service
            </Link>{" "}
            |{" "}
            <Link
              href="/sitemap.xml"
              aria-label="Sitemap"
              className="hover:text-white"
            >
              Sitemap
            </Link>
          </div>
          <div className="font-body text-xs text-[rgba(253,248,240,0.7)]">
            Stamps. Visas. Adventures. ✈️
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
