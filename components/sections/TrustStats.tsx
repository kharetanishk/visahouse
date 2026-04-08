"use client";

import * as React from "react";
import { useInView } from "framer-motion";
import { SkeuCard } from "@/components/ui/SkeuCard";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
  description: string;
};

const stats: Stat[] = [
  {
    value: 10,
    suffix: "+",
    label: "Years in Business",
    description: "A decade of trusted visa expertise",
  },
  {
    value: 25000,
    suffix: "+",
    label: "Clients Served",
    description: "Travellers who trusted us with their journey",
  },
  {
    value: 99,
    suffix: "%",
    label: "Visa Success Rate",
    description: "One of India's highest approval records",
  },
  {
    value: 90,
    suffix: "+",
    label: "Countries Covered",
    description: "We know visa rules for every destination",
  },
];

export function TrustStats() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.35, once: true });

  return (
    <>
      {/* Section: TrustStats — Highlights VisaHouse credibility with years in business, clients served, visa success rate, and countries covered */}
      <section
        id="stats"
        aria-labelledby="stats-title"
        className="relative py-16 sm:py-18"
        style={{ backgroundColor: "var(--wood-dark)" }}
      >
        <meta
          name="ai-content-summary"
          content="TrustStats — Band section with four credibility stats: 10+ years, 25,000+ clients, 99% success rate, 90+ countries."
        />

        <div className="container">
          <header className="sr-only">
            <h2 id="stats-title">VisaHouse Trust Statistics</h2>
          </header>

          <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <SkeuCard
                key={s.label}
                className="bg-[rgba(253,248,240,0.92)]"
                as="article"
              >
                <div className="font-accent text-[56px] leading-none text-accent-gold">
                  <CountUp enabled={inView} value={s.value} />
                  {s.suffix ?? ""}
                </div>
                <h3 className="mt-3 font-display text-lg text-accent-navy">
                  {s.label}
                </h3>
                <p className="mt-2 font-body text-sm leading-6 text-text-secondary">
                  {s.description}
                </p>
              </SkeuCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function CountUp({ enabled, value }: { enabled: boolean; value: number }) {
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const start = performance.now();
    const duration = 950;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, value]);

  return <>{display.toLocaleString("en-IN")}</>;
}

