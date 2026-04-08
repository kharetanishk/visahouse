"use client";

import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SkeuCard } from "@/components/ui/SkeuCard";
import { services } from "@/lib/data/services";

export function Services() {
  return (
    <SectionWrapper
      id="services"
      title="Visa Services We Handle"
      subtitle="Whatever your reason to travel, we have the expertise to get you there."
      aiSummary="Services — Lists visa services offered by VisaHouse including Tourist, Business, Student, Work Permit, Transit, and PR/Immigration."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <SkeuCard key={s.title} as="article" className="flex h-full flex-col">
            <div className="text-[40px]" aria-hidden>
              {s.icon}
            </div>
            <h3 className="mt-4 font-display text-xl text-accent-navy">
              {s.title}
            </h3>
            <p className="mt-3 font-body text-sm leading-6 text-text-secondary">
              {s.description}
            </p>
            <div className="mt-6">
              <Link
                href="#contact"
                aria-label={`Know more about ${s.title}`}
                className="font-body text-sm font-semibold text-accent-burgundy hover:underline underline-offset-4"
              >
                Know More <span aria-hidden>→</span>
              </Link>
            </div>
          </SkeuCard>
        ))}
      </div>
    </SectionWrapper>
  );
}

