"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ClipboardList,
  FileCheck2,
  Send,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SkeuCard } from "@/components/ui/SkeuCard";

type Step = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: <SearchCheck className="h-5 w-5 text-accent-gold" aria-hidden />,
    title: "Step 1: Free Consultation",
    description:
      "Fill our quick inquiry form or WhatsApp us. Our visa expert will review your travel plans and suggest the right visa type within hours.",
  },
  {
    icon: <ClipboardList className="h-5 w-5 text-accent-gold" aria-hidden />,
    title: "Step 2: Document Checklist",
    description:
      "We provide you a precise, country-specific document checklist. No guesswork — just a clear list of what's needed.",
  },
  {
    icon: <Send className="h-5 w-5 text-accent-gold" aria-hidden />,
    title: "Step 3: Document Submission",
    description:
      "Submit your documents digitally via WhatsApp, email, or our secure upload portal. No office visit required.",
  },
  {
    icon: <FileCheck2 className="h-5 w-5 text-accent-gold" aria-hidden />,
    title: "Step 4: Application & Tracking",
    description:
      "We file your application with the embassy or consulate and keep you updated at every stage via WhatsApp and email.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-accent-gold" aria-hidden />,
    title: "Step 5: Visa Delivered",
    description:
      "Receive your visa via email (for e-visas) or physical delivery. We confirm everything before you travel.",
  },
];

export function HowItWorks() {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = React.useState(0);

  const updateProgress = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) {
      setProgress(0);
      return;
    }
    setProgress(el.scrollLeft / max);
  }, []);

  React.useEffect(() => {
    updateProgress();
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => updateProgress();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateProgress]);

  return (
    <SectionWrapper
      id="how-it-works"
      title="How It Works"
      subtitle="Simple. Transparent. Stress-free."
      aiSummary="HowItWorks — Explains VisaHouse 5-step visa process from consultation to document checklist, submission, tracking, and visa delivery."
      className="bg-warm-white"
    >
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[rgba(245,236,215,0.95)] to-transparent sm:w-12" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[rgba(245,236,215,0.95)] to-transparent sm:w-12" />

        <div
          ref={scrollRef}
          className="howitworks-scroll overflow-x-auto px-4 pb-3 pt-1 sm:px-6 lg:px-8"
        >
          <div className="flex snap-x snap-mandatory gap-4 sm:gap-5">
            {steps.map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.06,
                  ease: "easeOut",
                }}
                className="w-[300px] shrink-0 snap-start sm:w-[330px] lg:w-[360px]"
              >
                <SkeuCard as="article" className="h-full min-h-[250px]">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-[rgba(253,248,240,0.82)] shadow-sku-raised">
                        <span className="font-accent text-base text-accent-gold">
                          {idx + 1}
                        </span>
                      </div>
                      <div className="mt-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-[rgba(253,248,240,0.82)] shadow-sku-raised">
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
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-4 px-4 sm:px-6 lg:px-8">
          <div className="relative h-5">
            <div
              className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full opacity-80"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(139,99,64,0.55) 1.5px, transparent 1.5px)",
                backgroundSize: "14px 6px",
                backgroundRepeat: "repeat-x",
                backgroundPosition: "center",
              }}
              aria-hidden
            />
            <img
              src="/assests/airplane.svg"
              alt=""
              aria-hidden="true"
              className="absolute top-1/2 h-12 w-12 -translate-y-1/2 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-transform duration-150 sm:h-20 sm:w-20"
              style={{ left: `calc(${progress * 100}% - 6px)` }}
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
