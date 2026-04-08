"use client";

import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SkeuCard } from "@/components/ui/SkeuCard";
import { destinations } from "@/lib/data/destinations";
import { cn } from "@/lib/utils";
import { useTransitionContext } from "@/lib/context/TransitionContext";

export function Destinations() {
  const { triggerTakeoff } = useTransitionContext();

  const destinationToCountryKey: Record<string, string> = {
    uae: "dubai",
    dubai: "dubai",
    // Add more mappings as you add countries to visaDocumentData:
    // uk: "uk",
    // usa: "usa",
    // canada: "canada",
    // singapore: "singapore",
    // thailand: "thailand",
    // schengen: "schengen",
    // australia: "australia",
  };

  return (
    <SectionWrapper
      id="destinations"
      title="Popular Visa Destinations"
      subtitle="Explore our most-requested destinations and start your application today."
      aiSummary="Destinations — Shows popular visa destinations (UAE, Singapore, Thailand, UK, USA, Schengen, Australia, Canada) with visa type badge, starting service fee, and processing time."
      className="bg-warm-white"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {destinations.map((d) => (
          <SkeuCard
            key={d.id}
            as="article"
            className="h-full"
            onClick={() => {
              const key = destinationToCountryKey[d.id];
              if (!key) return;
              triggerTakeoff(key);
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="text-[40px]" aria-hidden>
                {d.flag}
              </div>
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-body font-semibold shadow-sku-raised",
                  d.visaType === "e-Visa" &&
                    "border-[rgba(45,90,61,0.35)] bg-[rgba(45,90,61,0.10)] text-accent-forest",
                  d.visaType === "Visa on Arrival" &&
                    "border-[rgba(201,151,58,0.45)] bg-[rgba(201,151,58,0.12)] text-accent-gold",
                  d.visaType === "Visa Required" &&
                    "border-[rgba(123,45,62,0.35)] bg-[rgba(123,45,62,0.10)] text-accent-burgundy"
                )}
              >
                {d.visaType}
              </span>
            </div>

            <h3 className="mt-4 font-display text-lg text-accent-navy">
              {d.country}
            </h3>

            <div className="mt-4 space-y-2 font-body text-sm text-text-secondary">
              <div>
                <span className="font-semibold text-accent-navy">From:</span>{" "}
                {d.serviceFeeFrom}{" "}
                <span className="text-text-muted">(service fee)</span>
              </div>
              <div>
                <span className="font-semibold text-accent-navy">Processing:</span>{" "}
                {d.processingTime}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  aria-label={`View documents for ${d.country}`}
                  className="font-body text-sm font-semibold text-accent-burgundy hover:underline underline-offset-4"
                >
                  View Documents <span aria-hidden>→</span>
                </button>
                <Link
                  href="#contact"
                  aria-label={`Apply now for ${d.country}`}
                  className="font-body text-sm font-semibold text-accent-navy hover:underline underline-offset-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </SkeuCard>
        ))}
      </div>
    </SectionWrapper>
  );
}

