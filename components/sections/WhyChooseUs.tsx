"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SkeuCard } from "@/components/ui/SkeuCard";

const items = [
  {
    icon: "🎯",
    title: "99% Approval Rate",
    description:
      "Our structured process and document verification ensures industry-leading success rates.",
  },
  {
    icon: "📱",
    title: "100% Online Process",
    description: "Submit documents digitally. No travel to our office ever required.",
  },
  {
    icon: "🕐",
    title: "24-Hour Response Guarantee",
    description:
      "Every enquiry gets a response from a real visa expert within 24 hours.",
  },
  {
    icon: "🌐",
    title: "90+ Countries Expertise",
    description:
      "From Schengen to Southeast Asia, we know every country's latest visa rules.",
  },
  {
    icon: "💬",
    title: "Hindi & English Support",
    description: "We serve clients in both languages — no barriers, no confusion.",
  },
  {
    icon: "🔒",
    title: "Zero Hidden Fees",
    description:
      "Our pricing is fully transparent. You know what you pay before we start.",
  },
] as const;

export function WhyChooseUs() {
  return (
    <SectionWrapper
      id="why-us"
      title="Why VisaHouse?"
      subtitle="We don't just file applications — we own your outcome."
      aiSummary="WhyChooseUs — Explains VisaHouse differentiators like 99% approval rate, online process, 24-hour response, multi-country expertise, bilingual support, and transparent fees."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <SkeuCard key={i.title} as="article" className="h-full">
            <div className="text-[40px]" aria-hidden>
              {i.icon}
            </div>
            <h3 className="mt-4 font-display text-xl text-accent-navy">
              {i.title}
            </h3>
            <p className="mt-3 font-body text-sm leading-6 text-text-secondary">
              {i.description}
            </p>
          </SkeuCard>
        ))}
      </div>
    </SectionWrapper>
  );
}

