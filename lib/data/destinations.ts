export type DestinationVisaBadge = "e-Visa" | "Visa on Arrival" | "Visa Required";

export type Destination = {
  id: string;
  country: string;
  flag: string;
  visaType: DestinationVisaBadge;
  processingTime: string;
  visaTypes: string[];
};

export const destinations: Destination[] = [
  {
    id: "uae",
    country: "UAE / Dubai",
    flag: "🇦🇪",
    visaType: "e-Visa",
    processingTime: "3–5 working days",
    visaTypes: ["Tourist", "Visit", "Transit"],
  },
  {
    id: "singapore",
    country: "Singapore",
    flag: "🇸🇬",
    visaType: "e-Visa",
    processingTime: "5–7 working days",
    visaTypes: ["Tourist", "Business"],
  },
  {
    id: "thailand",
    country: "Thailand",
    flag: "🇹🇭",
    visaType: "Visa on Arrival",
    processingTime: "2–3 working days",
    visaTypes: ["Tourist"],
  },
  {
    id: "uk",
    country: "United Kingdom",
    flag: "🇬🇧",
    visaType: "Visa Required",
    processingTime: "15–20 working days",
    visaTypes: ["Tourist", "Business", "Student", "Work"],
  },
  {
    id: "usa",
    country: "United States",
    flag: "🇺🇸",
    visaType: "Visa Required",
    processingTime: "30–60 working days",
    visaTypes: ["Tourist", "Business", "Student", "Work"],
  },
  {
    id: "schengen",
    country: "Schengen (Europe)",
    flag: "🇩🇪",
    visaType: "Visa Required",
    processingTime: "10–15 working days",
    visaTypes: ["Tourist", "Business", "Visit"],
  },
  {
    id: "australia",
    country: "Australia",
    flag: "🇦🇺",
    visaType: "e-Visa",
    processingTime: "15–20 working days",
    visaTypes: ["Tourist", "Business", "Student", "Work"],
  },
  {
    id: "canada",
    country: "Canada",
    flag: "🇨🇦",
    visaType: "Visa Required",
    processingTime: "20–30 working days",
    visaTypes: ["Tourist", "Business", "Student", "Work"],
  },
  {
    id: "japan",
    country: "Japan",
    flag: "🇯🇵",
    visaType: "Visa Required",
    processingTime: "5–7 working days",
    visaTypes: ["Tourist", "Business"],
  },
  {
    id: "maldives",
    country: "Maldives",
    flag: "🇲🇻",
    visaType: "Visa on Arrival",
    processingTime: "On arrival",
    visaTypes: ["Tourist"],
  },
  {
    id: "south-africa",
    country: "South Africa",
    flag: "🇿🇦",
    visaType: "Visa Required",
    processingTime: "10–15 working days",
    visaTypes: ["Tourist", "Business"],
  },
  {
    id: "bali",
    country: "Bali / Indonesia",
    flag: "🇮🇩",
    visaType: "Visa on Arrival",
    processingTime: "On arrival / 3–5 working days",
    visaTypes: ["Tourist"],
  },
];

