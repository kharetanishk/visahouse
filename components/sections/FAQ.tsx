"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SkeuCard } from "@/components/ui/SkeuCard";
import { faqs } from "@/lib/data/faqs";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <SectionWrapper
      id="faq"
      title="Frequently Asked Questions"
      subtitle="Everything you need to know before starting your visa application."
      aiSummary="FAQ — Answers common questions about visa processing times, documents, rejection handling, online process, fees, express options, countries covered, and data safety."
      className="bg-warm-white"
    >
      <div className="grid gap-4">
        {faqs.map((f, idx) => {
          const isOpen = openIndex === idx;
          const buttonId = `faq-q-${idx}`;
          const panelId = `faq-a-${idx}`;

          return (
            <SkeuCard
              key={f.question}
              as="article"
              className={cn(
                "p-0",
                isOpen && "shadow-[var(--sku-shadow-pressed)]"
              )}
              hoverLift={false}
            >
              <button
                type="button"
                aria-label={`FAQ: ${f.question}`}
                aria-expanded={isOpen}
                aria-controls={panelId}
                id={buttonId}
                onClick={() => setOpenIndex((v) => (v === idx ? null : idx))}
                className={cn(
                  "flex w-full items-center justify-between gap-4 rounded-[var(--radius-lg)] px-6 py-5 text-left transition-colors",
                  isOpen
                    ? "bg-[rgba(253,248,240,0.86)]"
                    : "bg-transparent hover:bg-[rgba(253,248,240,0.75)]"
                )}
              >
                <h3 className="font-display text-base sm:text-lg text-accent-navy">
                  {f.question}
                </h3>
                <span
                  className={cn(
                    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-[rgba(253,248,240,0.85)] shadow-sku-raised transition-transform",
                    isOpen && "rotate-180"
                  )}
                  aria-hidden
                >
                  <ChevronDown className="h-5 w-5 text-accent-gold" />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-1">
                      <div className="rounded-xl border border-black/10 bg-[rgba(253,248,240,0.86)] p-5 shadow-sku-pressed">
                        <p className="font-body text-sm leading-6 text-text-secondary">
                          {f.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </SkeuCard>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

