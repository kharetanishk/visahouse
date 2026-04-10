"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ApplicationForm } from "@/components/ui/ApplicationForm";

export function ContactForm() {
  return (
    <SectionWrapper
      id="contact"
      hideHeader
      className="bg-warm-white"
      aiSummary="Homepage contact section rendering the shared visa application form."
    >
      <ApplicationForm
        title="Start Your Visa Application"
        subtitle="Fill in your details and our expert will reach out within 24 hours"
        compact={false}
      />
    </SectionWrapper>
  );
}

export default ContactForm;

