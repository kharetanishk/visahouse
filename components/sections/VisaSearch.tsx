"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/ui/CTAButton";
import { getAllCountriesForSearch } from "@/lib/data/visaDocuments";
import { useTransitionContext } from "@/lib/context/TransitionContext";
import { useRouter } from "next/navigation";

type SearchItem = {
  key: string;
  name: string;
  flag: string;
  visaType: string;
  aliases: string[];
};

export function VisaSearch() {
  const { triggerTakeoff } = useTransitionContext();
  const router = useRouter();

  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number>(-1);

  const all = React.useMemo(() => getAllCountriesForSearch(), []);
  const q = query.trim().toLowerCase();

  const results = React.useMemo(() => {
    if (!q) return [];
    return all
      .filter((c) => {
        const hay = [c.name, ...c.aliases].map((s) => s.toLowerCase());
        return hay.some((s) => s.includes(q));
      })
      .slice(0, 8);
  }, [all, q]);

  // Prefetch the top result as soon as it appears in the dropdown.
  React.useEffect(() => {
    if (results.length > 0) {
      router.prefetch(`/visa/${results[0].key}`);
    }
  }, [results, router]);

  React.useEffect(() => {
    if (!q) {
      setOpen(false);
      setActiveIndex(-1);
      return;
    }
    setOpen(true);
    setActiveIndex(0);
  }, [q]);

  const select = (item: SearchItem) => {
    setQuery(item.name);
    setOpen(false);
    triggerTakeoff(item.key);
  };

  const onShowDocuments = () => {
    if (!results.length) return;
    const item = activeIndex >= 0 ? results[activeIndex] : results[0];
    select(item);
  };

  return (
    <div id="visa-search" className="relative z-20 w-full">
      {/* Section: VisaSearch — Search bar with autocomplete to jump to country-specific visa document checklist and requirements */}
      <meta
        name="ai-content-summary"
        content="VisaSearch — Country search with autocomplete; selecting a country triggers the takeoff page transition and navigates to /visa/[countryKey]."
      />

      <div className="mx-auto max-w-[700px]">
        <div className="relative isolate">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <div className="relative min-w-0 flex-1">
              <span
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-accent-gold"
              >
                <MapPin className="h-5 w-5" />
              </span>
              <input
                aria-label="Search country for visa documents"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => {
                  if (q.length >= 1) setOpen(true);
                }}
                onKeyDown={(e) => {
                  if (!open && e.key === "ArrowDown") setOpen(true);
                  if (e.key === "Escape") {
                    setOpen(false);
                    return;
                  }
                  if (!results.length) return;
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActiveIndex((v) => Math.min(results.length - 1, v + 1));
                  }
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActiveIndex((v) => Math.max(0, v - 1));
                  }
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onShowDocuments();
                  }
                }}
                placeholder="Search a country to see visa documents... e.g. Dubai, UK, Canada"
                className={cn(
                  "sku-input wood-grain w-full py-4 pl-12 pr-4 font-body text-[16px] text-text-secondary outline-none transition-shadow",
                  "shadow-[inset_0_2px_6px_rgba(92,61,30,0.20)]",
                  "focus:ring-0 focus:shadow-[inset_0_2px_6px_rgba(92,61,30,0.20),0_0_0_3px_rgba(201,151,58,0.25)]",
                )}
              />
            </div>

            <CTAButton
              ariaLabel="Show documents"
              onClick={onShowDocuments}
              className="justify-center"
              type="button"
            >
              Show Documents <span aria-hidden>→</span>
            </CTAButton>
          </div>

          <AnimatePresence>
            {open ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute left-0 right-0 top-[calc(100%+8px)] z-[100] max-h-[min(70vh,420px)] overflow-hidden rounded-[var(--radius-lg)] border border-black/10 bg-[rgba(253,248,240,0.98)] shadow-[0_12px_40px_rgba(28,47,74,0.18),0_4px_12px_rgba(92,61,30,0.12)] ring-1 ring-black/5 backdrop-blur-sm wood-grain"
                role="listbox"
                aria-label="Country suggestions"
              >
                {results.length ? (
                  <ul className="max-h-[320px] overflow-auto py-2">
                    {results.map((r, idx) => (
                      <li key={r.key}>
                        <button
                          type="button"
                          aria-label={`Select ${r.name}`}
                          onClick={() => select(r)}
                          onMouseEnter={() => {
                            setActiveIndex(idx);
                            router.prefetch(`/visa/${r.key}`);
                          }}
                          className={cn(
                            "flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors",
                            idx === activeIndex
                              ? "bg-[rgba(253,248,240,0.85)]"
                              : "hover:bg-[rgba(253,248,240,0.75)]",
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl" aria-hidden>
                              {r.flag}
                            </span>
                            <div>
                              <div className="font-display text-sm text-accent-navy">
                                {r.name}
                              </div>
                              <div className="font-body text-xs text-text-muted">
                                {r.aliases.slice(0, 3).join(" • ")}
                              </div>
                            </div>
                          </div>
                          <span className="inline-flex items-center rounded-full border border-black/10 bg-[rgba(253,248,240,0.82)] px-3 py-1 text-xs font-body font-semibold text-text-secondary shadow-sku-raised">
                            {simplifyVisaType(r.visaType)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-4 sm:px-5 sm:py-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                      <span className="mx-auto inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-[rgba(255,255,255,0.65)] shadow-sku-raised sm:mx-0 sm:mt-0.5">
                        <Search className="h-5 w-5 text-accent-gold" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1 text-center sm:text-left">
                        <p className="font-display text-base font-semibold leading-snug text-accent-navy">
                          No results found
                        </p>
                        <p className="mt-1.5 font-body text-sm leading-relaxed text-text-secondary text-pretty">
                          We don&apos;t list that destination yet — we still help with 90+ countries.
                        </p>
                        <div className="mt-4">
                          <Link
                            href="#contact"
                            aria-label="Contact VisaHouse for this country"
                            className="inline-flex items-center justify-center rounded-lg border border-black/10 bg-[rgba(255,255,255,0.7)] px-4 py-2.5 font-body text-sm font-semibold text-accent-burgundy shadow-sku-raised transition-colors hover:bg-[rgba(255,255,255,0.95)] hover:underline hover:underline-offset-4 sm:inline-flex"
                            onClick={() => setOpen(false)}
                          >
                            Contact us about this country
                            <span aria-hidden className="ml-1">
                              →
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="mt-3 text-center font-body text-xs text-text-muted">
          Tip: type <span className="font-semibold">USA</span>,{" "}
          <span className="font-semibold">Dubai</span>, or{" "}
          <span className="font-semibold">Australia</span>.
        </div>
      </div>
    </div>
  );
}

function simplifyVisaType(visaType: string) {
  const t = visaType.toLowerCase();
  if (t.includes("evisa") || t.includes("e-visa")) return "eVisa";
  if (t.includes("on arrival")) return "On Arrival";
  if (t.includes("required")) return "Visa Required";
  return visaType.length > 18 ? visaType.slice(0, 18) + "…" : visaType;
}
