"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, AlertTriangle, Bell, Info, Clock, CalendarDays, Banknote } from "lucide-react";
import type { CountryVisaData, DocumentItem, ImportantNote } from "@/lib/data/visaDocuments";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { DocumentCard } from "@/components/ui/DocumentCard";
import { ReferenceModal } from "@/components/ui/ReferenceModal";
import { ContactSidebar } from "@/components/ui/ContactSidebar";
import { CTAButton } from "@/components/ui/CTAButton";
import { getIcon } from "@/lib/utils/iconMap";
import { cn } from "@/lib/utils";
import { whatsappChatUrl } from "@/lib/seo/metadata";

type VisaChecklistProps = {
  country: CountryVisaData;
};

const UNIVERSAL_IDS = ["passport-front", "passport-back", "photograph"] as const;

function toTwemojiFlagSrc(flag: string) {
  const codePoints = Array.from(flag)
    .map((ch) => ch.codePointAt(0)?.toString(16))
    .filter(Boolean)
    .join("-");
  return codePoints
    ? `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codePoints}.svg`
    : null;
}

export function VisaChecklist({ country }: VisaChecklistProps) {
  const [openGroups, setOpenGroups] = React.useState<Record<number, boolean>>({});
  const [modalDoc, setModalDoc] = React.useState<DocumentItem | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const updated = React.useMemo(() => new Date().toLocaleDateString("en-IN"), []);

  const allMandatory = country.mandatoryDocuments ?? [];
  const universal = UNIVERSAL_IDS.map((id) => allMandatory.find((d) => d.id === id)).filter(
    Boolean
  ) as DocumentItem[];

  const seen = new Set<string>(universal.map((d) => d.id));
  const restMandatory = allMandatory.filter((d) => !seen.has(d.id));

  const requiredCount = universal.length + restMandatory.length;
  const flagSrc = toTwemojiFlagSrc(country.flag);

  const openReference = (doc: DocumentItem) => {
    if (!doc.referenceImage) return;
    setModalDoc(doc);
    setModalOpen(true);
  };

  const cardContainer = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.05 },
    },
  };

  return (
    <>
      <SectionWrapper
        id="visa-checklist"
        hideHeader
        aiSummary={`VisaChecklist — Document checklist for ${country.countryName}: required documents, conditional documents, important warnings, and an apply sidebar form.`}
        className="bg-warm-white"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_384px]">
          <div className="min-w-0">
            <header aria-label="Country visa header" className="mb-8">
              <Link
                href="/#visa-search"
                aria-label="Search more countries"
                className="mb-2 inline-flex items-center gap-1 font-body text-xs font-semibold text-text-muted hover:text-accent-burgundy transition-colors"
              >
                <span aria-hidden>&larr;</span>
                <span>Search more</span>
              </Link>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    {flagSrc ? (
                      <img
                        src={flagSrc}
                        alt={`${country.countryName} flag`}
                        className="h-11 w-11 object-contain"
                      />
                    ) : (
                      <span className="text-[48px]" aria-hidden>
                        {country.flag}
                      </span>
                    )}
                    <h2 className="font-display text-3xl sm:text-4xl text-accent-navy">
                      {country.countryName}
                    </h2>
                  </div>
                  <div className="mt-3 font-body text-sm text-text-secondary">
                    Visa type: <span className="font-semibold">{country.visaType}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <CTAButton href="#contact" ariaLabel="Apply for this visa">
                    Apply for This Visa <span aria-hidden>→</span>
                  </CTAButton>
                  <div className="font-body text-xs text-text-muted">
                    Requirements last updated: {updated}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Pill icon={<Clock className="h-4 w-4" aria-hidden />} label="Processing">
                  {country.processingTime}
                </Pill>
                <Pill icon={<CalendarDays className="h-4 w-4" aria-hidden />} label="Validity">
                  {country.validity}
                </Pill>
                <Pill icon={<Banknote className="h-4 w-4" aria-hidden />} label="From">
                  {country.serviceFee}
                </Pill>
              </div>
            </header>

            <section aria-label="Required documents">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-xl text-accent-navy">
                    Required Documents
                  </h3>
                  <span className="inline-flex items-center rounded-full border border-black/10 bg-[rgba(253,248,240,0.85)] px-3 py-1 text-xs font-body font-semibold text-text-secondary shadow-sku-raised">
                    {requiredCount} documents
                  </span>
                </div>
              </div>

              <motion.div
                variants={cardContainer}
                initial="hidden"
                animate="show"
                className="grid gap-4 sm:grid-cols-2"
              >
                {[...universal, ...restMandatory].map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    document={doc}
                    onOpenReference={openReference}
                  />
                ))}
              </motion.div>
            </section>

            {country.conditionalGroups?.length ? (
              <section aria-label="Conditional document groups" className="mt-10">
                <h3 className="font-display text-xl text-accent-navy">Conditional Documents</h3>
                <p className="mt-2 font-body text-sm text-text-secondary">
                  These documents are required only in specific situations. Tap a group to expand.
                </p>

                <div className="mt-4 grid gap-4">
                  {country.conditionalGroups.map((g, idx) => {
                    const isOpen = openGroups[idx] ?? idx === 0;
                    return (
                      <div key={g.groupTitle} className="sku-surface wood-grain p-0 overflow-hidden">
                        <button
                          type="button"
                          aria-label={`Toggle group ${g.groupTitle}`}
                          className="flex w-full items-center justify-between gap-3 px-6 py-5 text-left hover:bg-[rgba(253,248,240,0.70)] transition-colors"
                          onClick={() =>
                            setOpenGroups((prev) => ({ ...prev, [idx]: !isOpen }))
                          }
                        >
                          <div className="flex items-center gap-3">
                            <span
                              aria-hidden
                              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-[rgba(253,248,240,0.85)] shadow-sku-raised"
                            >
                              {getIcon(g.groupIcon, 20, "text-accent-gold")}
                            </span>
                            <div>
                              <div className="font-display text-base text-accent-navy">
                                {g.groupTitle}
                              </div>
                              <div className="font-body text-xs text-text-muted">
                                Tap to expand
                              </div>
                            </div>
                          </div>
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 text-accent-gold transition-transform",
                              isOpen && "rotate-180"
                            )}
                            aria-hidden
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen ? (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6">
                                <div className="grid gap-4 sm:grid-cols-2">
                                  {g.documents.map((doc) => (
                                    <DocumentCard
                                      key={doc.id}
                                      document={doc}
                                      onOpenReference={openReference}
                                      muted
                                    />
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : null}

            {country.importantNotes?.length ? (
              <section aria-label="Important notes" className="mt-10">
                <h3 className="font-display text-xl text-accent-navy">Important Notes</h3>
                <div className="mt-4 grid gap-4">
                  {country.importantNotes.map((n) => (
                    <ImportantNoteCard key={n.title} note={n} />
                  ))}
                </div>
              </section>
            ) : null}

            <div className="mt-10 lg:hidden">
              <CTAButton href="#contact" ariaLabel="Contact VisaHouse for this visa" className="w-full justify-center">
                Get Free Consultation <span aria-hidden>→</span>
              </CTAButton>
              <div className="mt-2 text-center font-body text-xs text-text-muted">
                Prefer WhatsApp?{" "}
                <Link
                  href={`${whatsappChatUrl}?text=${encodeURIComponent(
                    `Hi, I need help with ${country.countryName} visa`
                  )}`}
                  aria-label="Chat on WhatsApp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent-burgundy hover:underline underline-offset-4"
                >
                  Chat now
                </Link>
              </div>
            </div>
          </div>

          <ContactSidebar countryName={country.countryName} defaultDestination={country.countryName} />
        </div>
      </SectionWrapper>

      <ReferenceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        document={modalDoc}
        countryName={country.countryName}
        applyHref="#contact"
      />
    </>
  );
}

export default VisaChecklist;

function Pill({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[rgba(253,248,240,0.85)] px-4 py-2 text-xs font-body font-semibold text-text-secondary shadow-sku-raised">
      <span className="text-accent-gold" aria-hidden>
        {icon}
      </span>
      <span className="text-text-muted">{label}:</span>
      <span className="text-text-secondary">{children}</span>
    </span>
  );
}

function ImportantNoteCard({ note }: { note: ImportantNote }) {
  const meta = noteMeta(note.type);
  return (
    <div
      className={cn(
        "sku-surface wood-grain p-6",
        meta.bg,
        "border-l-4",
        meta.border
      )}
      aria-label={`${note.type} note`}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/10 shadow-sku-raised",
            meta.iconBg
          )}
          aria-hidden
        >
          {meta.icon}
        </span>
        <div>
          <h3 className="font-display text-lg text-accent-navy">{note.title}</h3>
          <ul className="mt-2 list-disc pl-5 font-body text-sm leading-6 text-text-secondary">
            {note.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function noteMeta(type: ImportantNote["type"]) {
  if (type === "error") {
    return {
      bg: "bg-[rgba(220,38,38,0.10)]",
      border: "border-[#DC2626]",
      iconBg: "bg-[rgba(220,38,38,0.10)]",
      icon: <AlertTriangle className="h-5 w-5 text-[#DC2626]" aria-hidden />,
    };
  }
  if (type === "warning") {
    return {
      bg: "bg-[rgba(217,119,6,0.10)]",
      border: "border-[#D97706]",
      iconBg: "bg-[rgba(217,119,6,0.10)]",
      icon: <Bell className="h-5 w-5 text-[#D97706]" aria-hidden />,
    };
  }
  return {
    bg: "bg-[rgba(37,99,235,0.10)]",
    border: "border-[#2563EB]",
    iconBg: "bg-[rgba(37,99,235,0.10)]",
    icon: <Info className="h-5 w-5 text-[#2563EB]" aria-hidden />,
  };
}

