"use client";

import { ApplicationForm } from "@/components/ui/ApplicationForm";

type ContactSidebarProps = {
  countryName: string;
  defaultDestination: string;
};

export function ContactSidebar({ countryName, defaultDestination }: ContactSidebarProps) {
  return (
    <div className="hidden lg:block lg:w-96">
      <div className="sticky top-[100px]">
        <ApplicationForm
          title={`Apply for ${countryName} Visa`}
          subtitle="Our expert calls you within 24 hours 📞"
          defaultDestination={defaultDestination}
          compact
        />
      </div>
    </div>
  );
}

