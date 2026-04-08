"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { DocumentItem } from "@/lib/data/visaDocuments";
import { getIcon } from "@/lib/utils/iconMap";
import { cn } from "@/lib/utils";

type DocumentCardProps = {
  document: DocumentItem;
  onOpenReference?: (doc: DocumentItem) => void;
  muted?: boolean;
};

export function DocumentCard({ document, onOpenReference, muted }: DocumentCardProps) {
  const hasReference = Boolean(document.referenceImage);
  const clickable = hasReference && typeof onOpenReference === "function";

  const badge = (() => {
    if (document.status === "mandatory") {
      return (
        <span className="inline-flex items-center rounded-full bg-[var(--accent-gold)] px-3 py-1 text-xs font-body font-bold text-white shadow-sku-raised">
          ✓ Mandatory
        </span>
      );
    }
    if (document.status === "conditional") {
      return (
        <span className="inline-flex items-center rounded-full border border-[rgba(217,119,6,0.55)] bg-transparent px-3 py-1 text-xs font-body font-bold text-[#D97706] shadow-sku-raised">
          ⚡ Conditional
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full border border-black/20 bg-[rgba(253,248,240,0.65)] px-3 py-1 text-xs font-body font-bold text-text-secondary shadow-sku-raised">
        Optional
      </span>
    );
  })();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn(
        "relative sku-surface wood-grain p-5 transition-all duration-200 ease-out",
        muted && "opacity-90",
        clickable ? "cursor-pointer" : "cursor-default",
        clickable &&
          "hover:-translate-y-[3px] hover:shadow-[0_16px_34px_rgba(92,61,30,0.20)] hover:border-[rgba(201,151,58,0.40)]"
      )}
      onClick={() => {
        if (!clickable) return;
        onOpenReference?.(document);
      }}
      aria-label={`${document.title} document card`}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={cn(
            "flex h-[52px] w-[52px] items-center justify-center rounded-full border border-black/10 shadow-sku-raised",
            document.iconBg
          )}
          aria-hidden
        >
          {getIcon(document.icon, 24, cn(document.iconColor))}
        </div>
        <div className="flex flex-col items-end gap-2">
          {badge}
          {document.conditionalNote ? (
            <span className="text-xs font-body text-text-muted">{document.conditionalNote}</span>
          ) : null}
        </div>
      </div>

      <h3 className="mt-4 font-display text-base sm:text-lg text-accent-navy">
        {document.title}
      </h3>
      <p className="mt-2 font-body text-sm leading-6 text-text-secondary">
        {document.description}
      </p>

      {hasReference ? (
        <button
          type="button"
          aria-label={`View sample document for ${document.title}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-body font-semibold text-accent-burgundy hover:underline underline-offset-4"
          onClick={(e) => {
            e.stopPropagation();
            onOpenReference?.(document);
          }}
        >
          View sample document <span aria-hidden>→</span>
          <ExternalLink className="h-4 w-4" aria-hidden />
        </button>
      ) : null}
    </motion.article>
  );
}

