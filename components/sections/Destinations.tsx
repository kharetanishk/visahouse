"use client";

import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SkeuCard } from "@/components/ui/SkeuCard";
import { CountryFlag } from "@/components/ui/CountryFlag";
import { destinations } from "@/lib/data/destinations";
import { cn } from "@/lib/utils";
import { useTransitionContext } from "@/lib/context/TransitionContext";

export function Destinations() {
  const { triggerTakeoff } = useTransitionContext();

  const destinationToCountryKey: Record<string, string> = {
    uae: "dubai",
    dubai: "dubai",
    singapore: "singapore",
    thailand: "thailand",
    uk: "united-kingdom",
    usa: "united-states",
    schengen: "france",
    france: "france",
    australia: "australia",
    canada: "canada",
    japan: "japan",
    maldives: "maldives",
    "south-africa": "south-africa",
    bali: "indonesia",
    indonesia: "indonesia",
    malaysia: "malaysia",
    "new-zealand": "new-zealand",
    "south-korea": "south-korea",
    turkey: "turkey",
    "saudi-arabia": "saudi-arabia",
    qatar: "qatar",
    oman: "oman",
    bahrain: "bahrain",
    jordan: "jordan",
    egypt: "egypt",
    kenya: "kenya",
    mauritius: "mauritius",
    seychelles: "seychelles",
    vietnam: "vietnam",
    "sri-lanka": "sri-lanka",
    nepal: "nepal",
    bhutan: "bhutan",
    "hong-kong": "hong-kong",
    taiwan: "taiwan",
    philippines: "philippines",
    cambodia: "cambodia",
    laos: "laos",
    fiji: "fiji",
    germany: "germany",
    italy: "italy",
    spain: "spain",
    switzerland: "switzerland",
    portugal: "portugal",
    greece: "greece",
    austria: "austria",
    netherlands: "netherlands",
    norway: "norway",
    sweden: "sweden",
    iceland: "iceland",
    ireland: "ireland",
    "czech-republic": "czech-republic",
    hungary: "hungary",
    croatia: "croatia",
    brazil: "brazil",
    mexico: "mexico",
    argentina: "argentina",
    peru: "peru",
    colombia: "colombia",
    "costa-rica": "costa-rica",
    panama: "panama",
  };

  return (
    <SectionWrapper
      id="destinations"
      title="Popular Visa Destinations"
      subtitle="Explore our most-requested destinations and start your application today."
      aiSummary="Destinations — Shows popular visa destinations (UAE, Singapore, Thailand, UK, USA, Schengen, Australia, Canada) with visa type badge and processing time."
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
              <CountryFlag
                flag={d.flag}
                size={40}
                alt={`${d.country} flag`}
                className="h-10 w-10"
              />
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

            <div className="mt-4 font-body text-sm text-text-secondary">
              <span className="font-semibold text-accent-navy">Processing:</span>{" "}
              {d.processingTime}
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

