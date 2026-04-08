"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { AlertTriangle, Paperclip, Minus, Plus, CheckCircle2 } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SkeuCard } from "@/components/ui/SkeuCard";
import { CTAButton } from "@/components/ui/CTAButton";
import { cn } from "@/lib/utils";

const countryOptions = [
  "India",
  "United Arab Emirates",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Italy",
  "Netherlands",
  "Spain",
  "Switzerland",
  "Singapore",
  "Thailand",
  "Malaysia",
  "Japan",
  "New Zealand",
  "South Africa",
  "Turkey",
  "Vietnam",
  "Indonesia",
  "Saudi Arabia",
] as const;

const visaTypes = [
  "Tourist",
  "Business",
  "Student",
  "Work Permit",
  "Transit",
  "Immigration",
] as const;

const hearAbout = ["Google", "WhatsApp", "Instagram", "Friend Referral", "Other"] as const;

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  passportNationality: string;
  destinationCountry: string;
  travelDate?: string;
  visaType: (typeof visaTypes)[number];
  travellers: number;
  heardFrom: (typeof hearAbout)[number];
  message?: string;
  consent: boolean;
  documents?: FileList;
};

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [filesCount, setFilesCount] = React.useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      travellers: 1,
      visaType: "Tourist",
      heardFrom: "Google",
      passportNationality: "India",
      destinationCountry: "United Arab Emirates",
      consent: false,
    },
  });

  const travellers = watch("travellers");

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SectionWrapper
        id="contact"
        title="Start Your Visa Application"
        subtitle="Fill in your details and a VisaHouse expert will reach out within 24 hours."
        aiSummary="ContactForm — Collects visa enquiry details via validated form and shows success confirmation after submission."
      >
        <SkeuCard as="article" className="max-w-3xl">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/10 bg-[rgba(253,248,240,0.85)] shadow-sku-raised">
              <CheckCircle2 className="h-5 w-5 text-accent-forest" aria-hidden />
            </span>
            <div>
              <h3 className="font-display text-xl text-accent-navy">
                🎉 Thank you! Your application has been received.
              </h3>
              <p className="mt-2 font-body text-sm leading-6 text-text-secondary">
                Our visa expert will contact you within 24 hours on your phone/email.
              </p>
              <div className="mt-6">
                <CTAButton
                  href="#home"
                  variant="secondary"
                  ariaLabel="Back to top"
                >
                  Back to Top <span aria-hidden>↑</span>
                </CTAButton>
              </div>
            </div>
          </div>
        </SkeuCard>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      id="contact"
      title="Start Your Visa Application"
      subtitle="Fill in your details and a VisaHouse expert will reach out within 24 hours."
      aiSummary="ContactForm — Visa enquiry form with name, email, phone, nationality, destination, travel date, visa type, travellers, referral source, message, optional document upload, and consent."
      className="bg-warm-white"
    >
      <div className="grid gap-8 lg:grid-cols-12">
        <SkeuCard as="article" className="lg:col-span-7">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Field label="Full Name" required error={errors.fullName?.message}>
              <input
                aria-label="Full name"
                className={inputClass(errors.fullName)}
                {...register("fullName", { required: "Full Name is required." })}
                placeholder="Your full name"
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Email Address" required error={errors.email?.message}>
                <input
                  aria-label="Email address"
                  className={inputClass(errors.email)}
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

              <Field label="Phone Number" required error={errors.phone?.message}>
                <div className="flex">
                  <span className="inline-flex items-center rounded-l-md border border-black/10 bg-[rgba(253,248,240,0.88)] px-3 font-body text-sm text-text-secondary shadow-sku-pressed">
                    +91
                  </span>
                  <input
                    aria-label="Phone number"
                    className={cn(
                      inputClass(errors.phone),
                      "rounded-l-none border-l-0"
                    )}
                    type="tel"
                    {...register("phone", {
                      required: "Phone number is required.",
                      minLength: { value: 10, message: "Enter a 10-digit number." },
                    })}
                    placeholder="6260440241"
                  />
                </div>
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Passport Nationality" required error={errors.passportNationality?.message}>
                <select
                  aria-label="Passport nationality"
                  className={inputClass(errors.passportNationality)}
                  {...register("passportNationality", {
                    required: "Passport nationality is required.",
                  })}
                >
                  {countryOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Destination Country" required error={errors.destinationCountry?.message}>
                <select
                  aria-label="Destination country"
                  className={inputClass(errors.destinationCountry)}
                  {...register("destinationCountry", {
                    required: "Destination country is required.",
                  })}
                >
                  {countryOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Preferred Travel Date" error={errors.travelDate?.message}>
              <input
                aria-label="Preferred travel date"
                className={inputClass(errors.travelDate)}
                type="date"
                {...register("travelDate")}
              />
            </Field>

            <Field label="Visa Type" required error={errors.visaType?.message}>
              <div className="grid gap-3 sm:grid-cols-3">
                {visaTypes.map((v) => (
                  <label
                    key={v}
                    className="flex cursor-pointer items-center gap-2 rounded-md border border-black/10 bg-[rgba(253,248,240,0.85)] px-3 py-2 shadow-sku-pressed"
                  >
                    <input
                      aria-label={`Visa type ${v}`}
                      type="radio"
                      value={v}
                      {...register("visaType", { required: "Select a visa type." })}
                    />
                    <span className="font-body text-sm text-text-secondary">{v}</span>
                  </label>
                ))}
              </div>
            </Field>

            <Field label="Number of Travellers" required error={errors.travellers?.message}>
              <div className="flex items-center justify-between gap-3 rounded-md border border-black/10 bg-[rgba(253,248,240,0.85)] px-3 py-2 shadow-sku-pressed">
                <button
                  type="button"
                  aria-label="Decrease travellers"
                  onClick={() =>
                    setValue("travellers", Math.max(1, (travellers ?? 1) - 1), {
                      shouldValidate: true,
                    })
                  }
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/10 bg-[rgba(253,248,240,0.9)] shadow-sku-raised hover:shadow-sku-pressed hover:translate-y-px transition-all"
                >
                  <Minus className="h-4 w-4" aria-hidden />
                </button>

                <div className="font-accent text-2xl text-accent-gold" aria-label="Travellers count">
                  {travellers ?? 1}
                </div>

                <button
                  type="button"
                  aria-label="Increase travellers"
                  onClick={() =>
                    setValue("travellers", Math.min(20, (travellers ?? 1) + 1), {
                      shouldValidate: true,
                    })
                  }
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/10 bg-[rgba(253,248,240,0.9)] shadow-sku-raised hover:shadow-sku-pressed hover:translate-y-px transition-all"
                >
                  <Plus className="h-4 w-4" aria-hidden />
                </button>
              </div>
              <input
                type="hidden"
                {...register("travellers", {
                  required: "Travellers count is required.",
                  min: { value: 1, message: "Minimum 1 traveller." },
                  max: { value: 20, message: "Maximum 20 travellers." },
                  valueAsNumber: true,
                })}
              />
            </Field>

            <Field label="How did you hear about us?" required error={errors.heardFrom?.message}>
              <select
                aria-label="How did you hear about us"
                className={inputClass(errors.heardFrom)}
                {...register("heardFrom", { required: "Please select an option." })}
              >
                {hearAbout.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Message / Special Requirements" error={errors.message?.message}>
              <textarea
                aria-label="Message"
                className={cn(inputClass(errors.message), "min-h-[110px]")}
                {...register("message")}
                placeholder="Tell us your travel purpose, dates, and any special notes."
              />
            </Field>

            <div>
              <div className="flex items-center justify-between">
                <div className="font-display text-sm text-accent-navy">
                  Attach Documents (Optional) <span aria-hidden>📎</span>
                </div>
                {filesCount > 0 ? (
                  <span className="inline-flex items-center rounded-full border border-black/10 bg-[rgba(253,248,240,0.85)] px-3 py-1 text-xs font-body font-semibold text-text-secondary shadow-sku-raised">
                    {filesCount} file{filesCount === 1 ? "" : "s"} attached
                  </span>
                ) : null}
              </div>

              <label
                className="mt-3 flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-black/20 bg-[rgba(253,248,240,0.78)] px-5 py-5 shadow-sku-pressed hover:bg-[rgba(253,248,240,0.86)] transition-colors"
                aria-label="Attach documents"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/10 bg-[rgba(253,248,240,0.9)] shadow-sku-raised">
                    <Paperclip className="h-5 w-5 text-accent-burgundy" aria-hidden />
                  </span>
                  <div>
                    <div className="font-body text-sm font-semibold text-text-secondary">
                      Upload PDF, JPG, or PNG
                    </div>
                    <div className="font-body text-xs text-text-muted">
                      Passport copy, bank statements, photos, etc.
                    </div>
                  </div>
                </div>

                <span className="font-body text-xs font-semibold text-accent-navy">
                  Browse files
                </span>

                <input
                  aria-label="Documents"
                  type="file"
                  className="sr-only"
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  {...register("documents")}
                  onChange={(e) => {
                    const count = e.target.files?.length ?? 0;
                    setFilesCount(count);
                  }}
                />
              </label>
            </div>

            <div>
              <label className="flex items-start gap-3" aria-label="Consent to be contacted">
                <input
                  type="checkbox"
                  aria-label="Consent checkbox"
                  className="mt-1 h-4 w-4"
                  {...register("consent", {
                    required:
                      "Consent is required to submit your visa enquiry.",
                  })}
                />
                <span className="font-body text-sm text-text-secondary">
                  I agree to be contacted by VisaHouse regarding my visa enquiry.
                </span>
              </label>
              {errors.consent?.message ? (
                <ErrorText message={errors.consent.message} />
              ) : null}
            </div>

            <div>
              <CTAButton
                ariaLabel="Submit visa application"
                type="submit"
                disabled={isSubmitting}
                className="w-full justify-center"
              >
                {isSubmitting ? "Submitting..." : "Submit Application →"}
              </CTAButton>
            </div>
          </form>
        </SkeuCard>

        <aside className="lg:col-span-5" aria-label="Contact support information">
          <SkeuCard className="h-fit">
            <h3 className="font-display text-xl text-accent-navy">
              What happens next?
            </h3>
            <ol className="mt-4 space-y-3 font-body text-sm text-text-secondary">
              <li>
                <span className="font-semibold text-accent-navy">1)</span> We review
                your details and confirm the right visa category.
              </li>
              <li>
                <span className="font-semibold text-accent-navy">2)</span> You receive
                a country-specific document checklist on WhatsApp/email.
              </li>
              <li>
                <span className="font-semibold text-accent-navy">3)</span> We begin
                filing and keep you updated until visa delivery.
              </li>
            </ol>

            <div className="mt-6 rounded-xl border border-black/10 bg-[rgba(253,248,240,0.86)] p-5 shadow-sku-pressed">
              <div className="font-display text-base text-accent-navy">
                24-Hour Response Guarantee
              </div>
              <p className="mt-2 font-body text-sm leading-6 text-text-secondary">
                Every enquiry gets a response from a real visa expert within 24 hours —
                no bots, no confusion.
              </p>
            </div>
          </SkeuCard>
        </aside>
      </div>
    </SectionWrapper>
  );
}

export default ContactForm;

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="font-display text-sm text-accent-navy">
          {label}{" "}
          {required ? <span className="text-accent-burgundy">*</span> : null}
        </label>
      </div>
      <div className="mt-2">{children}</div>
      {error ? <ErrorText message={error} /> : null}
    </div>
  );
}

function ErrorText({ message }: { message: string }) {
  return (
    <p className="mt-2 flex items-start gap-2 font-body text-sm text-[#B42318]">
      <AlertTriangle className="mt-0.5 h-4 w-4" aria-hidden />
      <span>{message}</span>
    </p>
  );
}

function inputClass(error: unknown) {
  return cn(
    "sku-input wood-grain w-full px-4 py-3 font-body text-sm text-text-secondary outline-none focus:ring-2 focus:ring-accent-gold/50",
    error ? "border-[#B42318] ring-1 ring-[#B42318]/40" : "border-black/10"
  );
}

