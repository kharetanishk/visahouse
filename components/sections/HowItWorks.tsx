"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SkeuCard } from "@/components/ui/SkeuCard";

type Step = {
  icon: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: "🔎",
    title: "Step 1: Free Consultation",
    description:
      "Fill our quick inquiry form or WhatsApp us. Our visa expert will review your travel plans and suggest the right visa type within hours.",
  },
  {
    icon: "📋",
    title: "Step 2: Document Checklist",
    description:
      "We provide you a precise, country-specific document checklist. No guesswork — just a clear list of what's needed.",
  },
  {
    icon: "📤",
    title: "Step 3: Document Submission",
    description:
      "Submit your documents digitally via WhatsApp, email, or our secure upload portal. No office visit required.",
  },
  {
    icon: "🏛️",
    title: "Step 4: Application & Tracking",
    description:
      "We file your application with the embassy or consulate and keep you updated at every stage via WhatsApp and email.",
  },
  {
    icon: "✅",
    title: "Step 5: Visa Delivered",
    description:
      "Receive your visa via email (for e-visas) or physical delivery. We confirm everything before you travel.",
  },
];

export function HowItWorks() {
  return (
    <SectionWrapper
      id="how-it-works"
      title="How It Works"
      subtitle="Simple. Transparent. Stress-free."
      aiSummary="HowItWorks — Explains VisaHouse 5-step visa process from consultation to document checklist, submission, tracking, and visa delivery."
      className="bg-warm-white"
    >
      <div className="relative">
        <div
          aria-hidden
          className="hidden lg:block absolute left-0 right-0 top-7 border-t border-dashed border-[rgba(139,99,64,0.55)]"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, idx) => (
            <SkeuCard key={s.title} as="article" className="h-full">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-[rgba(253,248,240,0.82)] shadow-sku-raised">
                    <span className="font-accent text-lg text-accent-gold">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="mt-2 text-xl" aria-hidden>
                    {s.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-base text-accent-navy">
                    {s.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-6 text-text-secondary">
                    {s.description}
                  </p>
                </div>
              </div>
            </SkeuCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

