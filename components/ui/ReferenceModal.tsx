"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { DocumentItem } from "@/lib/data/visaDocuments";
import { CTAButton } from "@/components/ui/CTAButton";
import { getIcon } from "@/lib/utils/iconMap";
import { cn } from "@/lib/utils";

type ReferenceModalProps = {
  open: boolean;
  onClose: () => void;
  document: DocumentItem | null;
  countryName: string;
  applyHref?: string;
};

export function ReferenceModal({
  open,
  onClose,
  document: doc,
  countryName,
  applyHref = "#contact",
}: ReferenceModalProps) {
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const panelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));

      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = window.document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (!active || active === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    closeBtnRef.current?.focus();
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const ref = doc?.referenceImage;
  const wrong = ref?.wrongExamples ?? [];
  const correct = ref?.correctExample;
  const rules = [...(doc?.detailPoints ?? []), ...(ref?.rules ?? [])];

  return (
    <AnimatePresence>
      {open && doc ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label="Close modal backdrop"
            className="absolute inset-0 bg-[rgba(28,47,74,0.70)] backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${doc.title} reference modal`}
            className="relative w-full max-w-[800px] max-h-[90vh] overflow-y-auto rounded-[var(--radius-xl)] border-[var(--sku-border-strong)] bg-[var(--card-gradient)] shadow-[0_24px_60px_rgba(92,61,30,0.35)] wood-grain"
            initial={{ opacity: 0, scale: 0.95, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-black/10 px-6 py-4">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 shadow-sku-raised",
                    doc.iconBg
                  )}
                  aria-hidden
                >
                  {getIcon(doc.icon, 20, cn(doc.iconColor))}
                </span>
                <div>
                  <div className="font-display text-lg text-accent-navy">
                    {doc.title}
                  </div>
                  <div className="font-body text-xs text-text-secondary">
                    {countryName} — sample reference
                  </div>
                </div>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                aria-label="Close modal"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/10 bg-[rgba(253,248,240,0.85)] shadow-sku-raised hover:shadow-sku-pressed hover:translate-y-px transition-all"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className={cn("grid gap-4 p-6", wrong.length ? "lg:grid-cols-2" : "")}>
              {wrong.length > 0 && (
                <div className="rounded-xl border border-black/10 bg-[#FFF0F0] p-4 shadow-sku-pressed">
                  <div className="font-display text-sm text-[#B42318]">
                    ✗ Incorrect — Avoid These
                  </div>
                  <div className="mt-3 grid gap-3">
                    {wrong.map((src) => (
                      <ReferenceImage key={src} src={src} badge="✗" badgeStyle="bg-[#DC2626]" />
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-black/10 bg-[#F0FFF5] p-4 shadow-sku-pressed">
                <div className="font-display text-sm text-[#15803D]">✓ Correct Format</div>
                <div className="mt-3">
                  {correct ? (
                    <ReferenceImage src={correct} badge="✓" badgeStyle="bg-[#16A34A]" />
                  ) : (
                    <MissingImage path="/public/references/..." />
                  )}
                </div>
              </div>
            </div>

            <div className="px-6 pb-6">
              <div className="rounded-xl border border-black/10 bg-[rgba(253,248,240,0.86)] p-5 shadow-sku-pressed">
                <div className="font-display text-base text-accent-navy">Rules</div>
                <ol className="mt-3 list-decimal pl-5 font-body text-sm leading-6 text-text-secondary">
                  {rules.length ? (
                    rules.map((r, i) => <li key={`${i}-${r}`}>{r}</li>)
                  ) : (
                    <li>Follow a clear, colour scan and ensure all text is legible.</li>
                  )}
                </ol>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <CTAButton variant="secondary" ariaLabel="Close reference modal" onClick={onClose}>
                  Close
                </CTAButton>
                <CTAButton href={applyHref} ariaLabel={`Apply for ${countryName} visa`}>
                  Apply for {countryName} Visa <span aria-hidden>→</span>
                </CTAButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ReferenceImage({
  src,
  badge,
  badgeStyle,
}: {
  src: string;
  badge: string;
  badgeStyle: string;
}) {
  const [imgError, setImgError] = React.useState(false);

  if (imgError) {
    return <MissingImage path={src} />;
  }

  return (
    <div className="relative rounded-lg border border-black/10 bg-white/60 overflow-hidden">
      <Image
        src={src}
        alt={`Reference example ${src}`}
        width={800}
        height={600}
        sizes="(max-width: 768px) 90vw, 360px"
        className="w-full h-auto object-contain"
        onError={() => setImgError(true)}
      />
      <span
        aria-hidden
        className={cn(
          "absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-body font-extrabold text-white shadow-sku-raised",
          badgeStyle
        )}
      >
        {badge}
      </span>
    </div>
  );
}

function MissingImage({ path }: { path: string }) {
  return (
    <div className="flex h-[140px] items-center justify-center rounded-lg border border-dashed border-black/20 bg-[rgba(245,236,215,0.35)] p-4 text-center shadow-sku-pressed">
      <div>
        <div className="font-body text-xs font-semibold text-text-secondary">
          [ Reference image — add to /public/references/ ]
        </div>
        <div className="mt-1 font-body text-xs text-text-muted">{path}</div>
      </div>
    </div>
  );
}

