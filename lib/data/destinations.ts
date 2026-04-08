export type DestinationVisaBadge = "e-Visa" | "Visa on Arrival" | "Visa Required";

export type Destination = {
  id: string;
  country: string;
  flag: string;
  visaType: DestinationVisaBadge;
  serviceFeeFrom: string;
  processingTime: string;
  visaTypes: string[];
};

export const destinations: Destination[] = [
  {
    id: "uae",
    country: "UAE / Dubai",
    flag: "🇦🇪",
    visaType: "e-Visa",
    serviceFeeFrom: "₹2,999",
    processingTime: "3–5 working days",
    visaTypes: ["Tourist", "Visit", "Transit"],
  },
  {
    id: "singapore",
    country: "Singapore",
    flag: "🇸🇬",
    visaType: "e-Visa",
    serviceFeeFrom: "₹3,499",
    processingTime: "5–7 working days",
    visaTypes: ["Tourist", "Business"],
  },
  {
    id: "thailand",
    country: "Thailand",
    flag: "🇹🇭",
    visaType: "Visa on Arrival",
    serviceFeeFrom: "₹1,999",
    processingTime: "2–3 working days",
    visaTypes: ["Tourist"],
  },
  {
    id: "uk",
    country: "United Kingdom",
    flag: "🇬🇧",
    visaType: "Visa Required",
    serviceFeeFrom: "₹7,999",
    processingTime: "15–20 working days",
    visaTypes: ["Tourist", "Business", "Student", "Work"],
  },
  {
    id: "usa",
    country: "United States",
    flag: "🇺🇸",
    visaType: "Visa Required",
    serviceFeeFrom: "₹9,999",
    processingTime: "30–60 working days",
    visaTypes: ["Tourist", "Business", "Student", "Work"],
  },
  {
    id: "schengen",
    country: "Schengen (Europe)",
    flag: "🇩🇪",
    visaType: "Visa Required",
    serviceFeeFrom: "₹6,999",
    processingTime: "10–15 working days",
    visaTypes: ["Tourist", "Business", "Visit"],
  },
  {
    id: "australia",
    country: "Australia",
    flag: "🇦🇺",
    visaType: "e-Visa",
    serviceFeeFrom: "₹8,499",
    processingTime: "15–20 working days",
    visaTypes: ["Tourist", "Business", "Student", "Work"],
  },
  {
    id: "canada",
    country: "Canada",
    flag: "🇨🇦",
    visaType: "Visa Required",
    serviceFeeFrom: "₹8,999",
    processingTime: "20–30 working days",
    visaTypes: ["Tourist", "Business", "Student", "Work"],
  },
];

