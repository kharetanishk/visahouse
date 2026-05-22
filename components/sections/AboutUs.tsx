"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SkeuCard } from "@/components/ui/SkeuCard";
import {
  B2B_VISA_HEADLINE,
  STARTING_PRICE_LABEL,
} from "@/lib/constants/pricing";
import { siteConfig } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

export function AboutUs() {
  return (
    <SectionWrapper
      id="about"
      title="Built From the Ground Up"
      aiSummary="AboutUs — Shares VisaHouse origin story in Mumbai, B2B visa solutions from ₹499, mission statement, and office address."
      className="bg-warm-white"
    >
      <div className="mx-auto w-full max-w-3xl lg:max-w-4xl">
        <SkeuCard
          as="aside"
          className={cn(
            "mb-8 border-2 border-accent-gold/50 p-6 sm:p-8",
            "bg-gradient-to-br from-[rgba(253,248,240,0.98)] via-[rgba(255,248,230,0.95)] to-[rgba(253,248,240,0.98)]",
            "shadow-[0_12px_40px_rgba(201,151,58,0.22),inset_0_1px_0_rgba(255,255,255,0.6)]"
          )}
        >
          <p className="font-display text-xl font-semibold leading-snug text-accent-navy sm:text-2xl">
            {B2B_VISA_HEADLINE}
          </p>
          <motion.p
            className="mt-4 font-display text-2xl font-bold text-accent-burgundy sm:text-3xl"
            animate={{
              scale: [1, 1.03, 1],
              textShadow: [
                "0 0 0 rgba(201,151,58,0)",
                "0 0 20px rgba(201,151,58,0.35)",
                "0 0 0 rgba(201,151,58,0)",
              ],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            {STARTING_PRICE_LABEL}
          </motion.p>
        </SkeuCard>

        <article>
          <p className="font-body text-base leading-7 text-text-secondary">
            VisaHouse was founded in the heart of Mumbai with one simple belief
            — that every traveller deserves a stress-free path to their
            destination. Starting from scratch as a one-desk operation in
            Mumbai, we grew through word of mouth, one satisfied client at a
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
