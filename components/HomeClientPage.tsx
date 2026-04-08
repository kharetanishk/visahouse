"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { VisaChecklist } from "@/components/sections/VisaChecklist";
import { TrustStats } from "@/components/sections/TrustStats";
import { AboutUs } from "@/components/sections/AboutUs";
import { Services } from "@/components/sections/Services";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Destinations } from "@/components/sections/Destinations";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { ContactForm } from "@/components/sections/ContactForm";
import { visaDocumentData } from "@/lib/data/visaDocuments";
import { CTAButton } from "@/components/ui/CTAButton";
import { cn } from "@/lib/utils";

export function HomeClientPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const countryKey = searchParams.get("country");
  const selectedCountry = countryKey ? visaDocumentData[countryKey] : null;

  const [showBackToSearch, setShowBackToSearch] = React.useState(false);
  const [isLg, setIsLg] = React.useState(true);
  const [showMobileSheet, setShowMobileSheet] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const set = () => setIsLg(mql.matches);
    set();
    mql.addEventListener?.("change", set);
    return () => mql.removeEventListener?.("change", set);
  }, []);

  React.useEffect(() => {
    if (!selectedCountry) return;
    const t = window.setTimeout(() => {
      document.getElementById("visa-checklist")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
    return () => window.clearTimeout(t);
  }, [selectedCountry?.countryKey]);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowBackToSearch(Boolean(selectedCountry) && y > 520);
      setShowMobileSheet(Boolean(selectedCountry) && !isLg && y < 380);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [selectedCountry, isLg]);

  const clearCountry = () => {
    const next = new URLSearchParams(Array.from(searchParams.entries()));
    next.delete("country");
    const qs = next.toString();
    router.push(qs ? `/?${qs}` : "/", { scroll: false });
    window.setTimeout(() => {
      document.getElementById("visa-search")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main" aria-label="VisaHouse landing page" className="flex-1">
        <Hero />

        {selectedCountry ? <VisaChecklist country={selectedCountry} /> : null}

        <TrustStats />
        <AboutUs />
        <Services />
        <HowItWorks />
        <WhyChooseUs />
        <Destinations />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />

      {showBackToSearch ? (
        <div className="fixed bottom-5 right-5 z-50">
          <button
            type="button"
            aria-label="Back to search"
            onClick={clearCountry}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[rgba(253,248,240,0.90)] px-4 py-3 font-body text-sm font-bold text-accent-navy shadow-sku-raised hover:shadow-sku-pressed hover:translate-y-px transition-all"
          >
            <ArrowUp className="h-4 w-4 text-accent-gold" aria-hidden />
            Back to Search
          </button>
        </div>
      ) : null}

      {showMobileSheet && selectedCountry ? (
        <div className="fixed inset-x-0 bottom-0 z-50 p-4 lg:hidden">
          <div className="sku-surface wood-grain p-4 shadow-[0_18px_44px_rgba(92,61,30,0.22)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-display text-base text-accent-navy">
                  {selectedCountry.flag} {selectedCountry.countryName} Checklist
                </div>
                <div className="mt-1 font-body text-xs text-text-secondary">
                  Tap to view the full document checklist below.
                </div>
              </div>
              <button
                type="button"
                aria-label="Close checklist preview"
                onClick={() => setShowMobileSheet(false)}
                className={cn(
                  "rounded-full border border-black/10 bg-[rgba(253,248,240,0.85)] px-3 py-1 text-xs font-body font-semibold text-text-secondary shadow-sku-raised"
                )}
              >
                Close
              </button>
            </div>

            <div className="mt-4 flex gap-3">
              <CTAButton
                ariaLabel="View full checklist"
                className="w-full justify-center"
                onClick={() =>
                  document.getElementById("visa-checklist")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View Full Checklist <span aria-hidden>↓</span>
              </CTAButton>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

