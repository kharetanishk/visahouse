"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/ui/CTAButton";
import { getAllCountriesForSearch } from "@/lib/data/visaDocuments";
import { useTransitionContext } from "@/lib/context/TransitionContext";

type SearchItem = {
  key: string;
  name: string;
  flag: string;
  visaType: string;
  aliases: string[];
};

export function VisaSearch() {
  const { triggerTakeoff } = useTransitionContext();

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
    <div id="visa-search" className="w-full">
      {/* Section: VisaSearch — Search bar with autocomplete to jump to country-specific visa document checklist and requirements */}
      <meta
        name="ai-content-summary"
        content="VisaSearch — Country search with autocomplete; selecting a country triggers the takeoff page transition and navigates to /visa/[countryKey]."
      />

      <div className="mx-auto max-w-[700px]">
        <div className="relative">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute left-0 right-0 top-[calc(100%+10px)] z-30 overflow-hidden rounded-[var(--radius-lg)] border-[var(--sku-border)] bg-[var(--card-gradient)] shadow-sku-card wood-grain"
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
                          onMouseEnter={() => setActiveIndex(idx)}
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
                  <div className="px-5 py-5">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/10 bg-[rgba(253,248,240,0.85)] shadow-sku-raised">
                        <Search
                          className="h-5 w-5 text-accent-gold"
                          aria-hidden
                        />
                      </span>
                      <div>
                        <div className="font-display text-sm text-accent-navy">
                          No results found
                        </div>
                        <div className="mt-1 font-body text-sm text-text-secondary">
                          Contact us — we handle visas for 90+ countries.
                        </div>
                        <div className="mt-3">
                          <Link
                            href="#contact"
                            aria-label="Contact VisaHouse for this country"
                            className="font-body text-sm font-semibold text-accent-burgundy hover:underline underline-offset-4"
                            onClick={() => setOpen(false)}
                          >
                            Contact us for this country{" "}
                            <span aria-hidden>→</span>
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
