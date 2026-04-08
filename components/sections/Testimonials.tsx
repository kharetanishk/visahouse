"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";

export function Testimonials() {
  const prefersReducedMotion = useReducedMotion();
  const rowA = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const rowB = testimonials.slice(Math.ceil(testimonials.length / 2));
  const trackA = [...rowA, ...rowA];
  const trackB = [...(rowB.length ? rowB : rowA), ...(rowB.length ? rowB : rowA)];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#0f0f0f] py-20 lg:py-28"
      aria-label="Client testimonials"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center lg:mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[#909090]">Testimonials</p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl lg:text-5xl">
            What our clients say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-base text-[#aaaaaa] sm:text-lg">
            Real reviews from Indian clients who used VisaHouse services.
          </p>
        </motion.div>

        <div className="space-y-6">
          <div className="overflow-hidden">
            <div
              className={`flex w-max gap-5 sm:gap-6 ${prefersReducedMotion ? "" : "testimonial-marquee-left"}`}
            >
              {trackA.map((t, idx) => (
                <TestimonialCard key={`${t.name}-${t.city}-${idx}`} t={t} />
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className={`flex w-max gap-5 sm:gap-6 ${prefersReducedMotion ? "" : "testimonial-marquee-right"}`}
            >
              {trackB.map((t, idx) => (
                <TestimonialCard key={`${t.name}-${t.city}-b-${idx}`} t={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  const initials = t.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <motion.article
      whileHover={{ backgroundColor: "rgba(39,39,39,0.95)" }}
      transition={{ type: "tween", duration: 0.2 }}
      className="w-[320px] shrink-0 rounded-xl bg-[#272727] px-4 py-3 sm:w-[380px] sm:px-5 sm:py-4"
    >
      <div className="flex gap-3 sm:gap-4">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#3f3f3f] text-xs font-medium text-[#e0e0e0] sm:h-10 sm:w-10 sm:text-sm"
          aria-hidden
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-1.5">
            <span className="text-[13px] font-medium text-white sm:text-sm">{t.name}</span>
            <span className="text-[12px] text-[#909090] sm:text-xs">{t.city}</span>
          </div>
          <p className="mt-1 font-body text-[13px] leading-[1.5] text-[#aaaaaa] sm:text-sm">
            {t.quote}
          </p>
          <div className="mt-2 flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-[#909090]">
              <Heart
                className="h-4 w-4 fill-[#ff0000] text-[#ff0000] sm:h-[18px] sm:w-[18px]"
                aria-hidden
              />
              <span className="text-[12px] font-medium sm:text-xs">{18 + (t.name.length % 14)}</span>
            </span>
            <span className="text-[12px] font-medium text-[#909090] sm:text-xs">{t.visaType}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

