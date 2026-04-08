"use client";

import { Star } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SkeuCard } from "@/components/ui/SkeuCard";
import { CTAButton } from "@/components/ui/CTAButton";
import { testimonials } from "@/lib/data/testimonials";

export function Testimonials() {
  // TODO: Replace placeholder testimonials with real client reviews
  return (
    <SectionWrapper
      id="testimonials"
      title="What Our Clients Say"
      subtitle="Over 25,000 travellers trust VisaHouse. Here are a few of their stories."
      aiSummary="Testimonials — Displays client review cards with 5-star ratings and placeholder testimonials, plus a button linking to Google reviews."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t, idx) => (
          <SkeuCard key={`${t.city}-${idx}`} as="article" className="h-full">
            <div className="flex items-center gap-1" aria-label="5 star rating">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-[var(--accent-gold)] text-[var(--accent-gold)]"
                  aria-hidden
                />
              ))}
            </div>
            <p className="mt-4 font-accent text-base italic leading-7 text-text-secondary">
              {t.quote}
            </p>
            <div className="mt-5 font-body text-sm font-semibold text-accent-navy">
              {t.name}, {t.city}
            </div>
            <div className="mt-1 font-body text-sm text-text-secondary">
              {t.country} {t.visaType}
            </div>
          </SkeuCard>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <CTAButton
          href="#"
          variant="secondary"
          ariaLabel="View all reviews on Google"
        >
          View All Reviews on Google <span aria-hidden>→</span>
        </CTAButton>
      </div>
    </SectionWrapper>
  );
}

