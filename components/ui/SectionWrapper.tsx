"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionWrapperProps = {
  id: string;
  title?: string;
  subtitle?: string;
  aiSummary: string;
  className?: string;
  hideHeader?: boolean;
  children: React.ReactNode;
};

export function SectionWrapper({
  id,
  title,
  subtitle,
  aiSummary,
  className,
  hideHeader = false,
  children,
}: SectionWrapperProps) {
  const headingId = `${id}-title`;

  return (
    <>
      {/* Section: {aiSummary} */}
      <section
        id={id}
        aria-labelledby={headingId}
        className={cn("relative py-16 sm:py-20", className)}
      >
        <meta name="ai-content-summary" content={aiSummary} />
        <div className="container">
          {!hideHeader ? (
            <motion.header
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-10"
            >
              {title ? (
                <h2
                  id={headingId}
                  className="font-display text-3xl sm:text-4xl text-accent-navy tracking-tight"
                >
                  {title}
                </h2>
              ) : null}
              {subtitle ? (
                <p className="mt-3 max-w-2xl text-base sm:text-lg text-text-secondary font-body">
                  {subtitle}
                </p>
              ) : null}
            </motion.header>
          ) : null}
          {children}
        </div>
      </section>
    </>
  );
}

