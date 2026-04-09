"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { VisaSearch } from "@/components/sections/VisaSearch";
import { PassportAside } from "@/components/sections/PassportAside";

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

        {/* Left stamp — ENTRY PERMIT / APPROVED */}
        <div
          className="pointer-events-none absolute left-[-20px] top-[120px] z-0 hidden scale-75 opacity-70 xl:block xl:scale-100 xl:opacity-85"
          aria-hidden
          style={{ mixBlendMode: "multiply", overflow: "visible" }}
        >
          <div className="stamp-sway" style={{ transform: "rotate(-12deg)" }}>
            <EntryPermitStamp />
          </div>
        </div>

        {/* Right stamp — VISA VALIDATED / CLEARED */}
        <div
          className="pointer-events-none absolute right-0 top-[140px] z-0 hidden scale-75 opacity-70 xl:block xl:right-[-10px] xl:scale-100 xl:opacity-85"
          aria-hidden
          style={{ mixBlendMode: "multiply", overflow: "visible" }}
        >
          <div className="stamp-sway stamp-sway-delayed" style={{ transform: "rotate(14deg)" }}>
            <VisaValidatedStamp />
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
                  className="relative z-10 mt-6 font-display text-[40px] leading-[1.05] tracking-tight text-accent-navy sm:text-[56px] lg:text-[64px]"
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

            <PassportAside />
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

function EntryPermitStamp() {
  const c = "#7c1d1d";
  return (
    <svg width="110" height="110" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Concentric circles */}
      <circle cx="70" cy="70" r="66" stroke={c} strokeWidth="2.5" />
      <circle cx="70" cy="70" r="58" stroke={c} strokeWidth="1" strokeDasharray="4 3" />
      <circle cx="70" cy="70" r="52" stroke={c} strokeWidth="0.8" />

      {/* Top arc text: ENTRY PERMIT */}
      <path id="hero-ep-top" d="M 18 70 A 52 52 0 0 1 122 70" fill="none" />
      <text fontFamily="Georgia, serif" fontSize="8.5" fill={c} letterSpacing="3" fontWeight="700">
        <textPath href="#hero-ep-top" startOffset="50%" textAnchor="middle">ENTRY PERMIT</textPath>
      </text>

      {/* Bottom arc text: INDIA • MHA */}
      <path id="hero-ep-bot" d="M 18 70 A 52 52 0 0 0 122 70" fill="none" />
      <text fontFamily="Georgia, serif" fontSize="7" fill={c} letterSpacing="1.5">
        <textPath href="#hero-ep-bot" startOffset="50%" textAnchor="middle">INDIA • MHA</textPath>
      </text>

      {/* Center star */}
      <g transform="translate(70,58)">
        <path d="M0-8 L1.8-2.5 8-2.5 3,1 5,7.5 0,3.5 -5,7.5 -3,1 -8-2.5 -1.8-2.5Z" fill={c} opacity="0.7" />
      </g>

      {/* Middle band lines */}
      <line x1="28" y1="66" x2="112" y2="66" stroke={c} strokeWidth="0.6" />
      <line x1="28" y1="80" x2="112" y2="80" stroke={c} strokeWidth="0.6" />

      {/* APPROVED */}
      <text x="70" y="76.5" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fontWeight="700" fill={c} letterSpacing="4">APPROVED</text>

      {/* City */}
      <text x="70" y="91" textAnchor="middle" fontFamily="monospace" fontSize="7" fill={c} opacity="0.8">New Delhi</text>

      {/* Date */}
      <text x="70" y="103" textAnchor="middle" fontFamily="monospace" fontSize="8" fontWeight="700" fill={c}>14·MAR·2025</text>
    </svg>
  );
}

function VisaValidatedStamp() {
  const c = "#1a4a2a";
  return (
    <svg width="110" height="110" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Concentric circles */}
      <circle cx="70" cy="70" r="66" stroke={c} strokeWidth="2.5" />
      <circle cx="70" cy="70" r="58" stroke={c} strokeWidth="1" strokeDasharray="4 3" />
      <circle cx="70" cy="70" r="52" stroke={c} strokeWidth="0.8" />

      {/* Top arc text: VISA VALIDATED */}
      <path id="hero-vv-top" d="M 18 70 A 52 52 0 0 1 122 70" fill="none" />
      <text fontFamily="Georgia, serif" fontSize="8.5" fill={c} letterSpacing="3" fontWeight="700">
        <textPath href="#hero-vv-top" startOffset="50%" textAnchor="middle">VISA VALIDATED</textPath>
      </text>

      {/* Bottom arc text: REPUBLIC OF INDIA */}
      <path id="hero-vv-bot" d="M 18 70 A 52 52 0 0 0 122 70" fill="none" />
      <text fontFamily="Georgia, serif" fontSize="7" fill={c} letterSpacing="1.5">
        <textPath href="#hero-vv-bot" startOffset="50%" textAnchor="middle">REPUBLIC OF INDIA</textPath>
      </text>

      {/* Compass rose: 4 cardinal diamonds + 4 intercardinal smaller */}
      <g transform="translate(70,58)">
        {/* N */}
        <path d="M0-10 L2.5-3 0 0 -2.5-3Z" fill={c} opacity="0.75" />
        {/* S */}
        <path d="M0 10 L2.5 3 0 0 -2.5 3Z" fill={c} opacity="0.75" />
        {/* E */}
        <path d="M10 0 L3-2.5 0 0 3 2.5Z" fill={c} opacity="0.75" />
        {/* W */}
        <path d="M-10 0 L-3-2.5 0 0 -3 2.5Z" fill={c} opacity="0.75" />
        {/* NE */}
        <path d="M6-6 L3.5-1.5 0 0 1.5-3.5Z" fill={c} opacity="0.45" />
        {/* SE */}
        <path d="M6 6 L3.5 1.5 0 0 1.5 3.5Z" fill={c} opacity="0.45" />
        {/* SW */}
        <path d="M-6 6 L-3.5 1.5 0 0 -1.5 3.5Z" fill={c} opacity="0.45" />
        {/* NW */}
        <path d="M-6-6 L-3.5-1.5 0 0 -1.5-3.5Z" fill={c} opacity="0.45" />
        {/* center dot */}
        <circle cx="0" cy="0" r="1.5" fill={c} opacity="0.6" />
      </g>

      {/* Middle band lines */}
      <line x1="28" y1="66" x2="112" y2="66" stroke={c} strokeWidth="0.6" />
      <line x1="28" y1="80" x2="112" y2="80" stroke={c} strokeWidth="0.6" />

      {/* CLEARED */}
      <text x="70" y="76.5" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fontWeight="700" fill={c} letterSpacing="4">CLEARED</text>

      {/* City */}
      <text x="70" y="91" textAnchor="middle" fontFamily="monospace" fontSize="7" fill={c} opacity="0.8">Mumbai Intl.</text>

      {/* Date */}
      <text x="70" y="103" textAnchor="middle" fontFamily="monospace" fontSize="8" fontWeight="700" fill={c}>22·JUN·2025</text>
    </svg>
  );
}

