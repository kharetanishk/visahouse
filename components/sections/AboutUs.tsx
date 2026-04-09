"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SkeuCard } from "@/components/ui/SkeuCard";
import { siteConfig } from "@/lib/seo/metadata";

export function AboutUs() {
  return (
    <SectionWrapper
      id="about"
      title="Built From the Ground Up"
      aiSummary="AboutUs — Shares VisaHouse origin story in Mumbai, mission statement, and office address."
      className="bg-warm-white"
    >
      <div className="mx-auto w-full max-w-3xl lg:max-w-4xl">
        <article>
          <p className="font-body text-base leading-7 text-text-secondary">
            VisaHouse was founded in the heart of Mumbai with one simple belief
            — that every traveller deserves a stress-free path to their
            destination. Starting from scratch as a one-desk operation in
            Goregaon, we grew through word of mouth, one satisfied client at a
            time. Today, we are a team of experienced visa specialists serving
            clients across India, with expertise spanning 90+ countries and
            every major visa category.
          </p>

          <p className="mt-5 font-body text-base leading-7 text-text-secondary">
            Our mission is to make international travel accessible, transparent,
            and hassle-free for every Indian traveller — regardless of where
            they&apos;re going.
          </p>

          <div className="mt-7">
            <SkeuCard as="aside" className="p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-black/10 bg-[rgba(253,248,240,0.85)] shadow-sku-raised">
                  <MapPin
                    className="h-5 w-5 text-accent-burgundy"
                    aria-hidden
                  />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-base text-accent-navy">
                    Office Address
                  </h3>
                  <p className="mt-1 font-body text-sm leading-6 text-text-secondary">
                    {siteConfig.address}
                  </p>
                </div>
              </div>
            </SkeuCard>
          </div>

          <div className="mt-6">
            <Link
              href="#contact"
              aria-label="Learn more about VisaHouse"
              className="font-body text-sm font-semibold text-accent-burgundy hover:underline underline-offset-4"
            >
              Learn More About Us
            </Link>
          </div>
        </article>
      </div>
    </SectionWrapper>
  );
}
