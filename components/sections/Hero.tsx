"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { VisaSearch } from "@/components/sections/VisaSearch";

export function Hero() {
  return (
    <>
      {/* Section: Hero — Introduces VisaHouse with primary CTAs, trust badges, and key credibility stats for visa consultancy in Mumbai */}
      <section
        id="home"
        aria-labelledby="home-title"
        className="relative min-h-[90vh] overflow-hidden"
        style={{ background: "var(--wood-gradient)" }}
      >
        <meta
          name="ai-content-summary"
          content="Hero — VisaHouse landing introduction with brand tagline, trust badge, embedded country search to reveal visa document checklists, micro trust indicators, and headline stats."
        />

        <div className="absolute inset-0 wood-grain opacity-60" aria-hidden />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          aria-hidden
        >
          <Image
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'%3E%3Cg fill='none' stroke='%231C2F4A' stroke-opacity='0.65'%3E%3Cpath d='M120 220c90-90 220-120 360-100 120 18 208 78 320 96 160 26 292-28 380-106' stroke-dasharray='2 10' stroke-width='2'/%3E%3Cpath d='M90 420c160-140 330-200 520-160 160 34 260 128 410 142 124 12 225-24 290-78' stroke-dasharray='2 10' stroke-width='2'/%3E%3Ccircle cx='210' cy='250' r='2'/%3E%3Ccircle cx='520' cy='180' r='2'/%3E%3Ccircle cx='820' cy='230' r='2'/%3E%3Ccircle cx='980' cy='130' r='2'/%3E%3Ccircle cx='280' cy='440' r='2'/%3E%3Ccircle cx='640' cy='360' r='2'/%3E%3Ccircle cx='1000' cy='380' r='2'/%3E%3C/g%3E%3C/svg%3E"
            alt="Decorative dotted world map outline"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div
          className="pointer-events-none absolute left-6 top-28 hidden lg:block"
          aria-hidden
        >
          <div className="sku-surface wood-grain w-[150px] rotate-[-10deg] p-4 opacity-90">
            <div className="font-accent text-lg text-accent-burgundy">
              APPROVED
            </div>
            <div className="mt-1 text-xs text-text-secondary">
              Passport stamp
            </div>
          </div>
        </div>
        <div
          className="pointer-events-none absolute right-6 top-32 hidden lg:block"
          aria-hidden
        >
          <div className="sku-surface wood-grain w-[160px] rotate-[10deg] p-4 opacity-90">
            <div className="font-accent text-lg text-accent-forest">TRAVEL</div>
            <div className="mt-1 text-xs text-text-secondary">
              Visa validated
            </div>
          </div>
        </div>

        <div className="container relative">
          <div className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:py-24">
            <div className="lg:col-span-7">
              <FadeUp delay={0.0}>
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[rgba(253,248,240,0.82)] px-4 py-2 shadow-sku-raised">
                  <span className="text-sm font-body font-semibold text-text-secondary">
                    🏆 India&apos;s #1 Rated Visa Consultancy
                  </span>
                </div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <motion.h1
                  id="home-title"
                  className="mt-6 font-display text-[40px] leading-[1.05] tracking-tight text-accent-navy sm:text-[56px] lg:text-[64px]"
                >
                  Your Visa. Our Responsibility.
                </motion.h1>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p className="mt-5 max-w-2xl font-body text-base leading-7 text-text-secondary sm:text-lg">
                  From India to the world — we&apos;ve helped 25,000+ travellers
                  reach their destination stress-free. Tourist, business,
                  student or work visa — we handle it all.
                </p>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div className="mt-7">
                  <VisaSearch />
                </div>
              </FadeUp>

              <FadeUp delay={0.4}>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-body text-text-secondary">
                  <TrustInline
                    icon={<CheckCircle2 className="h-4 w-4" aria-hidden />}
                  >
                    10+ Years Experience
                  </TrustInline>
                  <TrustInline
                    icon={<CheckCircle2 className="h-4 w-4" aria-hidden />}
                  >
                    99% Approval Rate
                  </TrustInline>
                  <TrustInline
                    icon={<CheckCircle2 className="h-4 w-4" aria-hidden />}
                  >
                    90+ Countries
                  </TrustInline>
                </div>
              </FadeUp>

              <FadeUp delay={0.5}>
                <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <StatPill label="Clients" value="25,000+" />
                  <StatPill label="Success" value="99%" />
                  <StatPill label="Countries" value="90+" />
                  <StatPill label="Years" value="10+" />
                </div>
              </FadeUp>
            </div>

            <motion.aside
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 }}
              className="lg:col-span-5"
              aria-label="VisaHouse brochure preview"
            >
              <div className="sku-surface wood-grain relative overflow-hidden p-6 sm:p-8">
                <div className="absolute inset-0 opacity-40" aria-hidden />
                <div className="flex items-center justify-between">
                  <div className="font-display text-xl text-accent-navy">
                    VisaHouse
                  </div>
                  <div className="rounded-full border border-black/10 bg-[rgba(253,248,240,0.8)] px-3 py-1 text-xs font-body font-semibold text-text-secondary shadow-sku-raised">
                    Mumbai, India
                  </div>
                </div>
                <div className="mt-6 rounded-xl border border-black/10 bg-[rgba(253,248,240,0.85)] p-4 shadow-sku-pressed">
                  <div className="text-sm font-body font-semibold text-accent-navy">
                    Quick Support
                  </div>
                  <div className="mt-1 text-sm text-text-secondary">
                    WhatsApp us anytime — a real visa expert responds within 24
                    hours.
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <MiniChip title="Tourist" detail="90+ countries" />
                  <MiniChip title="Business" detail="Priority options" />
                  <MiniChip title="Student" detail="Top destinations" />
                  <MiniChip title="Work" detail="Guided process" />
                </div>
                <div className="mt-6">
                  <div className="text-xs font-body text-text-muted">
                    Logo / hero image assets intentionally not included.
                  </div>
                  <div className="mt-2 flex h-28 items-center justify-center rounded-xl border border-dashed border-black/20 bg-[rgba(245,236,215,0.4)] text-sm font-body text-text-secondary shadow-sku-pressed">
                    Brochure Image / Office Visual — Placeholder
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  );
}

function FadeUp({
  delay,
  children,
}: {
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  );
}

function TrustInline({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="text-accent-forest">{icon}</span>
      <span>{children}</span>
    </span>
  );
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-full border border-black/10 bg-[rgba(253,248,240,0.82)] px-4 py-3 shadow-sku-raised">
      <div className={cn("font-accent text-2xl leading-none text-accent-gold")}>
        {value}
      </div>
      <div className="mt-1 text-xs font-body font-semibold text-text-secondary">
        {label}
      </div>
    </div>
  );
}

function MiniChip({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-xl border border-black/10 bg-[rgba(253,248,240,0.82)] p-3 shadow-sku-raised">
      <div className="font-body text-sm font-semibold text-accent-navy">
        {title}
      </div>
      <div className="mt-1 text-xs font-body text-text-secondary">{detail}</div>
    </div>
  );
}
