"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle, Stamp } from "lucide-react";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/ui/CTAButton";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Destinations", href: "#destinations" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export function Header() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <nav
        aria-label="Primary navigation"
        className={cn(
          "border-b border-black/5 bg-[rgba(245,236,215,0.72)] backdrop-blur-[12px] transition-all",
          scrolled &&
            "bg-[rgba(232,213,176,0.78)] shadow-[0_1px_0_rgba(255,255,255,0.55)_inset,0_10px_30px_rgba(92,61,30,0.10)]"
        )}
      >
        <div className="container">
          <div className="flex h-16 items-center justify-between gap-3">
            <Link
              href="#home"
              aria-label="VisaHouse home"
              className="flex items-center gap-2"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 bg-[rgba(253,248,240,0.8)] shadow-sku-raised">
                <Stamp className="h-5 w-5 text-accent-navy" aria-hidden />
              </span>
              <span className="font-display text-xl tracking-tight text-accent-navy">
                VisaHouse
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              <ul className="flex items-center gap-6">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-label={l.label}
                      className="font-body text-sm text-text-secondary hover:text-accent-navy transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3">
                <Link
                  href="https://wa.me/916260440241"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-black/10 bg-[rgba(253,248,240,0.8)] shadow-sku-raised hover:shadow-sku-pressed hover:translate-y-px transition-all"
                >
                  <MessageCircle className="h-5 w-5 text-accent-forest" aria-hidden />
                </Link>
                <CTAButton href="#contact" ariaLabel="Apply now">
                  Apply Now
                </CTAButton>
              </div>
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <Link
                href="https://wa.me/916260440241"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-black/10 bg-[rgba(253,248,240,0.8)] shadow-sku-raised"
              >
                <MessageCircle className="h-5 w-5 text-accent-forest" aria-hidden />
              </Link>
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-black/10 bg-[rgba(253,248,240,0.8)] shadow-sku-raised hover:shadow-sku-pressed hover:translate-y-px transition-all"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="lg:hidden overflow-hidden border-t border-black/10"
            >
              <div className="container py-4">
                <ul className="flex flex-col gap-3">
                  {navLinks.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        aria-label={l.label}
                        onClick={() => setOpen(false)}
                        className="block rounded-md px-3 py-2 font-body text-sm text-text-secondary hover:bg-[rgba(253,248,240,0.85)] hover:text-accent-navy transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <CTAButton
                    href="#contact"
                    ariaLabel="Apply now"
                    className="w-full justify-center"
                  >
                    Apply Now
                  </CTAButton>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default Header;

