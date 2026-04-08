"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { SkeuCard } from "@/components/ui/SkeuCard";
import { CTAButton } from "@/components/ui/CTAButton";
import { cn } from "@/lib/utils";

type ContactSidebarProps = {
  countryName: string;
  defaultDestination: string;
};

type SidebarValues = {
  fullName: string;
  phone: string;
  email: string;
  destinationCountry: string;
  visaType: "Tourist" | "Business" | "Student" | "Work";
  travelDate?: string;
  message?: string;
};

const destinations = [
  "Dubai (UAE)",
  "United Kingdom",
  "United States",
  "Schengen (Europe)",
  "Canada",
  "Australia",
  "Singapore",
  "Thailand",
  "Japan",
  "Malaysia",
] as const;

export function ContactSidebar({ countryName, defaultDestination }: ContactSidebarProps) {
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SidebarValues>({
    defaultValues: {
      destinationCountry: defaultDestination,
      visaType: "Tourist",
      message: `Hi, I need help with ${countryName} visa.`,
    },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500));
    setSubmitted(true);
  };

  return (
    <div className="hidden lg:block lg:w-96">
      <div className="sticky top-[100px]">
        <SkeuCard className="shadow-[0_18px_44px_rgba(92,61,30,0.22)]">
          {!submitted ? (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl text-accent-navy">
                    Apply for {countryName} Visa
                  </h3>
                  <p className="mt-1 font-body text-sm text-text-secondary">
                    Our expert calls you within 24 hours <span aria-hidden>📞</span>
                  </p>
                </div>
                <Link
                  href={`https://wa.me/916260440241?text=${encodeURIComponent(
                    `Hi, I need help with ${countryName} visa`
                  )}`}
                  aria-label="Chat on WhatsApp instead"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-black/10 bg-[rgba(253,248,240,0.85)] shadow-sku-raised hover:shadow-sku-pressed hover:translate-y-px transition-all"
                >
                  <MessageCircle className="h-5 w-5 text-accent-forest" aria-hidden />
                </Link>
              </div>

              <div className="mt-4">
                <Link
                  href={`https://wa.me/916260440241?text=${encodeURIComponent(
                    `Hi, I need help with ${countryName} visa`
                  )}`}
                  aria-label="Chat on WhatsApp instead"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm font-semibold text-accent-burgundy hover:underline underline-offset-4"
                >
                  💬 Chat on WhatsApp Instead
                </Link>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <Field label="Full Name" error={errors.fullName?.message}>
                  <input
                    aria-label="Full name"
                    className={inputClass(Boolean(errors.fullName))}
                    {...register("fullName", { required: "Full Name is required." })}
                    placeholder="Your full name"
                  />
                </Field>

                <Field label="Phone Number" error={errors.phone?.message}>
                  <div className="flex">
                    <span className="inline-flex items-center rounded-l-md border border-black/10 bg-[rgba(253,248,240,0.88)] px-3 font-body text-sm text-text-secondary shadow-sku-pressed">
                      +91
                    </span>
                    <input
                      aria-label="Phone number"
                      className={cn(inputClass(Boolean(errors.phone)), "rounded-l-none border-l-0")}
                      type="tel"
                      {...register("phone", {
                        required: "Phone number is required.",
                        minLength: { value: 10, message: "Enter a 10-digit number." },
                      })}
                      placeholder="6260440241"
                    />
                  </div>
                </Field>

                <Field label="Email" error={errors.email?.message}>
                  <input
                    aria-label="Email address"
                    className={inputClass(Boolean(errors.email))}
                    type="email"
                    {...register("email", {
                      required: "Email is required.",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address.",
                      },
                    })}
                    placeholder="you@example.com"
                  />
                </Field>

                <Field label="Destination Country" error={errors.destinationCountry?.message}>
                  <select
                    aria-label="Destination country"
                    className={inputClass(Boolean(errors.destinationCountry))}
                    {...register("destinationCountry", { required: "Destination is required." })}
                  >
                    {destinations.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Visa Type" error={errors.visaType?.message}>
                  <select
                    aria-label="Visa type"
                    className={inputClass(Boolean(errors.visaType))}
                    {...register("visaType", { required: "Visa type is required." })}
                  >
                    <option value="Tourist">Tourist</option>
                    <option value="Business">Business</option>
                    <option value="Student">Student</option>
                    <option value="Work">Work</option>
                  </select>
                </Field>

                <Field label="Travel Date" error={errors.travelDate?.message}>
                  <input
                    aria-label="Travel date"
                    className={inputClass(Boolean(errors.travelDate))}
                    type="date"
                    {...register("travelDate")}
                  />
                </Field>

                <Field label="Message" error={errors.message?.message}>
                  <textarea
                    aria-label="Message"
                    className={cn(inputClass(Boolean(errors.message)), "min-h-[90px]")}
                    rows={3}
                    {...register("message")}
                    placeholder="Tell us your dates and purpose."
                  />
                </Field>

                <CTAButton
                  ariaLabel="Get free consultation"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full justify-center"
                >
                  {isSubmitting ? "Sending..." : "Get Free Consultation →"}
                </CTAButton>
              </form>
            </>
          ) : (
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/10 bg-[rgba(253,248,240,0.85)] shadow-sku-raised">
                <CheckCircle2 className="h-5 w-5 text-accent-forest" aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-xl text-accent-navy">✅ Received!</h3>
                <p className="mt-2 font-body text-sm leading-6 text-text-secondary">
                  We&apos;ll call you within 24 hours.
                </p>
              </div>
            </div>
          )}
        </SkeuCard>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="font-display text-sm text-accent-navy">{label}</label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p className="mt-2 font-body text-sm text-[#B42318]">{error}</p>
      ) : null}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "sku-input wood-grain w-full px-4 py-3 font-body text-sm text-text-secondary outline-none focus:ring-2 focus:ring-accent-gold/50",
    hasError ? "border-[#B42318] ring-1 ring-[#B42318]/40" : "border-black/10"
  );
}

