/**
 *
 * ═══════════════════════════════════════════════════════
 * HOW TO ADD A NEW COUNTRY (No coding knowledge needed):
 * ═══════════════════════════════════════════════════════
 *
 *
 * Copy the entire "dubai: { ... }" block (from "dubai: {" to the closing "},")
 *
 *
 * Paste it below the last country entry, before the closing "}" of visaDocumentData
 *
 *
 * Change "dubai" (the key) to the new country slug e.g. "singapore"
 *
 *
 * Update countryKey, countryName, flag, visaType, processingTime, validity, serviceFee
 *
 *
 * Update searchAliases with alternate names users might type
 *
 *
 * Update mandatoryDocuments — add/remove/edit document items
 *
 *
 * Update conditionalGroups if there are conditional documents
 *
 *
 * Update importantNotes with country-specific warnings
 *
 *
 * Save the file — the website updates automatically
 *
 *
 * For reference images:
 *
 *
 * Add image files to /public/references/
 *
 *
 * Update referenceImage.wrongExamples and correctExample paths to match
 *
 *
 * STATUS values: "mandatory" | "conditional" | "optional"
 * CATEGORY values: "identity" | "travel" | "accommodation" | "financial" | "photograph" | "employment" | "insurance" | "other"
 * ICON values: BookOpen, BookMarked, Camera, CreditCard, Plane, Building2, FileText, Home, IdCard, Shield, Banknote, GraduationCap, Briefcase, HeartPulse, Globe
 *
 */

// ============================================================
// VISA DOCUMENT DATA — VisaHouse
// To add/edit a country: copy an existing entry, change the
// countryKey, and update documents[]. No component changes needed.
// ============================================================

export type DocumentCategory =
  | "identity" // Passport, PAN, Aadhaar
  | "travel" // Tickets, itinerary
  | "accommodation" // Hotel, host invitation
  | "financial" // Bank statements, ITR
  | "photograph" // Passport photo
  | "employment" // Salary slip, NOC, business proof
  | "insurance" // Travel insurance
  | "other"; // Misc

export type DocumentStatus = "mandatory" | "conditional" | "optional";

export interface DocumentItem {
  id: string; // Unique ID e.g. "passport-front"
  title: string; // e.g. "Passport Front Page"
  description: string; // One-line instruction
  category: DocumentCategory;
  status: DocumentStatus; // mandatory | conditional | optional
  icon: string; // Lucide icon name e.g. "BookOpen"
  iconColor: string; // Tailwind color class e.g. "text-blue-600"
  iconBg: string; // Tailwind bg class e.g. "bg-blue-50"
  conditionalNote?: string; // e.g. "Required if staying with family"
  referenceImage?: {
    // Optional: for modal pop-up
    wrongExamples: string[]; // Array of image paths in /public/references/
    correctExample: string; // Path to correct sample image
    rules: string[]; // Bullet list of rules e.g. "No flash", "Color scan only"
  };
  detailPoints?: string[]; // Extra bullet points shown in modal
}

export interface ConditionalGroup {
  groupTitle: string; // e.g. "If staying with family/friends"
  groupIcon: string;
  documents: DocumentItem[];
}

export interface ImportantNote {
  type: "warning" | "info" | "error";
  title: string;
  points: string[];
}

export interface CountryVisaData {
  countryKey: string; // URL slug e.g. "dubai"
  countryName: string; // Display name e.g. "Dubai (UAE)"
  flag: string; // Emoji e.g. "🇦🇪"
  visaType: string; // e.g. "Tourist Visa on Arrival / eVisa"
  processingTime: string; // e.g. "3–5 working days"
  validity: string; // e.g. "30 days / 60 days"
  serviceFee: string; // e.g. "From ₹2,999"
  searchAliases: string[]; // Alt search terms e.g. ["UAE", "Emirates", "Abu Dhabi"]
  mandatoryDocuments: DocumentItem[];
  conditionalGroups: ConditionalGroup[];
  importantNotes: ImportantNote[];
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIVERSAL DOCUMENTS — always first in every country's mandatoryDocuments
// ─────────────────────────────────────────────────────────────────────────────
const UNIVERSAL_3: DocumentItem[] = [
  {
    id: "passport-front",
    title: "Passport Front Page",
    description: "Scanned colour copy of your passport bio-data page",
    category: "identity",
    status: "mandatory",
    icon: "BookOpen",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    referenceImage: {
      wrongExamples: ["/references/passport-front-wrong-flash.jpg"],
      correctExample: "/references/passport-front-correct.jpg",
      rules: [
        "Full colour scan — not black and white",
        "No camera flash, glare, or shadows",
        "Flat and straight — no bending or angles",
        "Passport must be valid for at least 6 months from return date",
        "Minimum two blank pages required",
      ],
    },
  },
  {
    id: "passport-back",
    title: "Passport Back Page",
    description: "Scanned colour copy of the last page of your passport",
    category: "identity",
    status: "mandatory",
    icon: "BookMarked",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
    referenceImage: {
      wrongExamples: ["/references/passport-back-wrong.jpg"],
      correctExample: "/references/passport-back-correct.jpg",
      rules: [
        "Include observation/endorsement page if any annotations are present",
        "Full colour scan — clear and legible",
      ],
    },
  },
  {
    id: "photograph",
    title: "Passport-Size Photograph",
    description: "Recent photograph on plain white background, front-facing",
    category: "photograph",
    status: "mandatory",
    icon: "Camera",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
    detailPoints: [
      "Plain white or off-white background only",
      "Face must be clearly visible, front-facing, neutral expression",
      "No sunglasses or heavy-rimmed glasses",
      "Taken within the last 3–6 months",
    ],
    referenceImage: {
      wrongExamples: ["/references/photo-wrong-shadow.jpg"],
      correctExample: "/references/photo-correct.jpg",
      rules: [
        "Plain white background only",
        "No shadows on face or background",
        "Front-facing, neutral expression",
        "No sunglasses or head covering (except religious)",
      ],
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SCHENGEN SHARED DOCS — appended after UNIVERSAL_3 for all Schengen countries
// ─────────────────────────────────────────────────────────────────────────────
const SCHENGEN_DOCS: DocumentItem[] = [
  {
    id: "schengen-form",
    title: "Completed Schengen Visa Application Form",
    description: "Fully completed and signed Schengen visa application form",
    category: "other",
    status: "mandatory",
    icon: "ScanLine",
    iconColor: "text-teal-600",
    iconBg: "bg-teal-50",
  },
  {
    id: "flight-ticket",
    title: "Return / Onward Flight Ticket",
    description: "Confirmed return or onward flight booking with active PNR",
    category: "travel",
    status: "mandatory",
    icon: "Plane",
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50",
  },
  {
    id: "hotel-booking",
    title: "Hotel Booking / Accommodation Proof",
    description: "Confirmed hotel reservation covering the entire stay",
    category: "accommodation",
    status: "mandatory",
    icon: "Building2",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
  {
    id: "travel-insurance",
    title: "Travel Health Insurance (Min EUR 30,000)",
    description: "Insurance with minimum EUR 30,000 coverage across all Schengen states",
    category: "insurance",
    status: "mandatory",
    icon: "Shield",
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
    detailPoints: [
      "Minimum coverage: EUR 30,000",
      "Must be valid across all Schengen member states",
      "Must cover the entire duration of stay",
    ],
  },
  {
    id: "bank-statement",
    title: "Bank Statement (Last 3–6 Months)",
    description: "Certified bank statement for the last 3–6 months",
    category: "financial",
    status: "mandatory",
    icon: "Banknote",
    iconColor: "text-green-600",
    iconBg: "bg-green-50",
  },
  {
    id: "employment-proof",
    title: "Proof of Employment / NOC / Leave Letter",
    description: "Salary slips, employment letter or NOC from employer",
    category: "employment",
    status: "mandatory",
    icon: "Briefcase",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
  },
  {
    id: "itr",
    title: "Income Tax Returns (Last 2–3 Years)",
    description: "Income tax return filings for the last 2–3 years",
    category: "financial",
    status: "mandatory",
    icon: "FileBadge",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
  },
  {
    id: "cover-letter",
    title: "Cover Letter",
    description: "Cover letter stating purpose, itinerary, and intent to return",
    category: "other",
    status: "mandatory",
    icon: "FileText",
    iconColor: "text-slate-600",
    iconBg: "bg-slate-50",
  },
  {
    id: "travel-itinerary",
    title: "Travel Itinerary",
    description: "Day-by-day travel plan including places to visit",
    category: "travel",
    status: "mandatory",
    icon: "MapPin",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50",
  },
];

const SCHENGEN_NOTES: ImportantNote[] = [
  {
    type: "warning",
    title: "Schengen Visa Requirements",
    points: [
      "Passport must be valid for at least 3 months beyond your intended departure date",
      "Passport must have been issued within the last 10 years",
      "Minimum two blank pages required for visa stamp",
    ],
  },
  {
    type: "info",
    title: "Travel Insurance is Mandatory",
    points: [
      "EUR 30,000 minimum coverage required — this is not optional",
      "Insurance must be valid in ALL Schengen member states",
      "Purchase insurance before submitting your visa application",
    ],
  },
];

export const visaDocumentData: Record<string, CountryVisaData> = {
  dubai: {
    countryKey: "dubai",
    countryName: "Dubai (UAE)",
    flag: "🇦🇪",
    visaType: "Tourist eVisa / Visa on Arrival",
    processingTime: "3–5 working days",
    validity: "30 days (extendable to 60 days)",
    serviceFee: "From ₹2,999",
    searchAliases: ["UAE", "United Arab Emirates", "Emirates", "Abu Dhabi", "Sharjah"],

    mandatoryDocuments: [
      {
        id: "passport-front",
        title: "Passport Front Page",
        description: "Scanned colour copy of your passport bio-data page",
        category: "identity",
        status: "mandatory",
        icon: "BookOpen",
        iconColor: "text-blue-600",
        iconBg: "bg-blue-50",
        referenceImage: {
          wrongExamples: [
            "/references/passport-front-wrong-flash.jpg",
            "/references/passport-front-wrong-blurry.jpg",
            "/references/passport-front-wrong-angled.jpg",
          ],
          correctExample: "/references/passport-front-correct.jpg",
          rules: [
            "Should NOT have camera flash or glare",
            "No fingers visible in the scan",
            "Flat, straight scan — no bending or angle",
            "Full colour scan — not black and white",
            "Passport must be valid for at least 6 months from return date",
            "Minimum two blank pages required",
          ],
        },
      },
      {
        id: "passport-back",
        title: "Passport Back Page",
        description: "Scanned colour copy of the last page of your passport",
        category: "identity",
        status: "mandatory",
        icon: "BookMarked",
        iconColor: "text-blue-500",
        iconBg: "bg-blue-50",
        referenceImage: {
          wrongExamples: ["/references/passport-back-wrong.jpg"],
          correctExample: "/references/passport-back-correct.jpg",
          rules: [
            "Include observation/endorsement page if any annotations are present",
            "Full colour scan — clear and legible",
            "Include external cover page as well",
          ],
        },
      },
      {
        id: "passport-cover",
        title: "Passport External Cover",
        description: "Scanned colour copy of the external cover of your passport",
        category: "identity",
        status: "mandatory",
        icon: "Book",
        iconColor: "text-indigo-600",
        iconBg: "bg-indigo-50",
      },
      {
        id: "photograph",
        title: "Passport-Size Photograph",
        description: "Recent photograph on plain white background, front-facing",
        category: "photograph",
        status: "mandatory",
        icon: "Camera",
        iconColor: "text-purple-600",
        iconBg: "bg-purple-50",
        referenceImage: {
          wrongExamples: [
            "/references/photo-wrong-shadow.jpg",
            "/references/photo-wrong-coloured-bg.jpg",
            "/references/photo-wrong-glasses.jpg",
          ],
          correctExample: "/references/photo-correct.jpg",
          rules: [
            "Plain white or off-white background only",
            "Face must be clearly visible, front-facing, neutral expression",
            "No sunglasses or heavy-rimmed glasses",
            "No head covering (except for religious reasons)",
            "Taken within the last 6 months",
            "Size: 35mm x 45mm (standard passport size)",
          ],
        },
      },
      {
        id: "pan-card",
        title: "PAN Card",
        description: "Scanned colour copy of your PAN card (front side)",
        category: "identity",
        status: "mandatory",
        icon: "CreditCard",
        iconColor: "text-orange-600",
        iconBg: "bg-orange-50",
      },
      {
        id: "air-ticket",
        title: "Confirmed Return Air Ticket",
        description:
          "Original onward & return ticket with live PNR — names and dates highlighted",
        category: "travel",
        status: "mandatory",
        icon: "Plane",
        iconColor: "text-sky-600",
        iconBg: "bg-sky-50",
        detailPoints: [
          "PNR must be active/live at time of submission",
          "Passenger names must exactly match passport",
          "Travel dates must be clearly highlighted",
          "Do NOT cancel tickets after visa approval — leads to rejection/ban",
        ],
      },
      {
        id: "hotel-voucher",
        title: "Hotel Booking Voucher",
        description: "Original confirmed hotel voucher — names and dates highlighted",
        category: "accommodation",
        status: "mandatory",
        icon: "Building2",
        iconColor: "text-emerald-600",
        iconBg: "bg-emerald-50",
        detailPoints: [
          "Must show check-in and check-out dates",
          "Guest name must match passport",
          "Must be from a registered/verifiable hotel",
          "Do NOT use dummy or unconfirmed bookings",
        ],
      },
    ],

    conditionalGroups: [
      {
        groupTitle: "If Staying with Family or Friends in UAE",
        groupIcon: "Users",
        documents: [
          {
            id: "host-passport",
            title: "Host's Passport Copy",
            description: "First and last page of the UAE-resident host's passport",
            category: "identity",
            status: "conditional",
            conditionalNote: "Required if staying with family/friends",
            icon: "BookOpen",
            iconColor: "text-teal-600",
            iconBg: "bg-teal-50",
          },
          {
            id: "host-emirates-id",
            title: "Emirates ID of Host",
            description: "Front and back of the host's UAE Emirates ID card",
            category: "identity",
            status: "conditional",
            conditionalNote: "Required if staying with family/friends",
            icon: "IdCard",
            iconColor: "text-teal-500",
            iconBg: "bg-teal-50",
          },
          {
            id: "invitation-letter",
            title: "Invitation Letter",
            description: "Signed invitation letter from your host in UAE",
            category: "other",
            status: "conditional",
            conditionalNote: "Required if staying with family/friends",
            icon: "FileText",
            iconColor: "text-amber-600",
            iconBg: "bg-amber-50",
          },
          {
            id: "tenancy-agreement",
            title: "Tenancy / Lease Agreement",
            description: "Lease deed or title document of host's UAE residence",
            category: "accommodation",
            status: "conditional",
            conditionalNote: "Required if staying with family/friends",
            icon: "Home",
            iconColor: "text-amber-500",
            iconBg: "bg-amber-50",
          },
        ],
      },
    ],

    importantNotes: [
      {
        type: "error",
        title: "Actions That Cause Visa Rejection & Penalties",
        points: [
          "Submitting fake or fabricated proof of stay in UAE",
          "Using dummy, invalid, or counterfeit flight ticket copies",
          "Submitting dummy hotel vouchers not backed by real bookings",
          "Cancelling air tickets or hotel bookings after visa is approved",
          "Any misrepresentation of personal information in the application",
        ],
      },
      {
        type: "warning",
        title: "Validity & Entry Rules",
        points: [
          "Visa validity begins from the date of issue — not from date of travel",
          "Single-entry visa cannot be used for re-entry once you exit UAE",
          "Overstaying your visa leads to fines and entry bans",
          "Passport must be valid for at least 6 months from return date to India",
        ],
      },
      {
        type: "info",
        title: "Tips for Faster Processing",
        points: [
          "Apply at least 7–10 days before travel date for standard processing",
          "All document scans should be in colour, minimum 300 DPI",
          "File format: PDF or JPG/JPEG — no Word or Excel files",
          "Name on ticket and hotel must exactly match passport spelling",
        ],
      },
    ],
  },

  // ── Middle East ─────────────────────────────────────────────
  "saudi-arabia": {
    countryKey: "saudi-arabia",
    countryName: "Saudi Arabia",
    flag: "🇸🇦",
    visaType: "Tourist eVisa",
    processingTime: "3–5 working days",
    validity: "90 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["KSA", "Riyadh", "Jeddah", "Mecca"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "evisa-form", title: "Completed Online eVisa Application Form", description: "Fully filled Saudi Arabia eVisa application", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking with active PNR", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance for the duration of stay", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Certified bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "proof-of-funds", title: "Proof of Sufficient Funds", description: "Evidence of adequate financial means for the trip", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-lime-600", iconBg: "bg-lime-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "warning", title: "Passport & Entry Requirements", points: ["Passport must be valid for at least 6 months from travel date", "Israeli passport stamps may cause entry issues — check with consulate", "Dress modestly and respect local customs during your visit"] },
      { type: "info", title: "eVisa Processing", points: ["Apply online via the official Saudi Arabia eVisa portal", "Approval usually within 24–72 hours", "Print or save the eVisa to present at immigration"] },
    ],
  },

  qatar: {
    countryKey: "qatar",
    countryName: "Qatar",
    flag: "🇶🇦",
    visaType: "Tourist eVisa",
    processingTime: "3–5 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Doha"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "evisa-form", title: "Completed eVisa Application Form", description: "Fully filled Qatar Hayya / eVisa application", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Certified bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance for the stay", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
      { id: "proof-of-funds", title: "Proof of Sufficient Funds", description: "Evidence of adequate financial means", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-lime-600", iconBg: "bg-lime-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "eVisa & Visa on Arrival", points: ["Indian passport holders can apply for eVisa or obtain visa on arrival at Hamad International Airport", "Transit visa available for layovers over 5 hours"] },
      { type: "warning", title: "Entry Requirements", points: ["Passport must be valid for at least 6 months from travel date", "Minimum one blank page required for entry stamp"] },
    ],
  },

  kuwait: {
    countryKey: "kuwait",
    countryName: "Kuwait",
    flag: "🇰🇼",
    visaType: "Visa Required",
    processingTime: "5–7 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Kuwait City"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "visa-form", title: "Completed Visa Application Form", description: "Fully filled Kuwait visa application form", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Certified bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate from employer", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance for the stay", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from the date of travel", "Minimum two blank pages required"] },
      { type: "info", title: "Application Processing", points: ["Apply through the Kuwait embassy or authorised visa agent", "Sponsorship letter required if visiting family or friends in Kuwait"] },
    ],
  },

  oman: {
    countryKey: "oman",
    countryName: "Oman",
    flag: "🇴🇲",
    visaType: "Tourist eVisa",
    processingTime: "3–5 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Muscat"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "evisa-form", title: "Completed eVisa Application Form", description: "Fully filled Oman eVisa application via official portal", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Certified bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance for the stay", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
      { id: "proof-of-funds", title: "Proof of Sufficient Funds", description: "Evidence of adequate financial means for the trip", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-lime-600", iconBg: "bg-lime-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "eVisa Application", points: ["Apply online at evisa.rop.gov.om", "eVisa is single or multiple entry — specify when applying", "Processing usually 24–48 hours"] },
      { type: "warning", title: "Passport Requirements", points: ["Passport must be valid for at least 6 months from entry date", "Minimum two blank pages required"] },
    ],
  },

  bahrain: {
    countryKey: "bahrain",
    countryName: "Bahrain",
    flag: "🇧🇭",
    visaType: "Tourist eVisa",
    processingTime: "3–5 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Manama"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "evisa-form", title: "Completed eVisa Application Form", description: "Fully filled Bahrain eVisa application via official portal", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance for the stay", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Visa on Arrival Available", points: ["Indian passport holders can obtain visa on arrival at Bahrain International Airport", "eVisa is also available online at evisa.gov.bh"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from date of travel"] },
    ],
  },

  jordan: {
    countryKey: "jordan",
    countryName: "Jordan",
    flag: "🇯🇴",
    visaType: "Visa on Arrival / eVisa",
    processingTime: "3–5 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Amman", "Petra"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "evisa-form", title: "eVisa Application Form", description: "Apply via Jordan's official eVisa portal or obtain on arrival", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance for the stay", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Jordan Pass", points: ["Consider purchasing the Jordan Pass — it includes visa fee and entry to 40+ attractions including Petra", "Available at jordanpass.jo"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from travel date", "Israeli stamps do not prohibit entry to Jordan"] },
    ],
  },

  israel: {
    countryKey: "israel",
    countryName: "Israel",
    flag: "🇮🇱",
    visaType: "Visa on Arrival",
    processingTime: "On arrival",
    validity: "90 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Tel Aviv", "Jerusalem"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance for the stay", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Visa on Arrival", points: ["Indian passport holders typically receive visa on arrival at Ben Gurion Airport", "Pre-register via eTA portal if available for faster processing"] },
      { type: "warning", title: "Border Security", points: ["Extensive security checks at Israeli airports — arrive at least 4 hours before departure", "Carry proof of accommodation and itinerary — you may be questioned at immigration"] },
    ],
  },

  lebanon: {
    countryKey: "lebanon",
    countryName: "Lebanon",
    flag: "🇱🇧",
    visaType: "Visa Required",
    processingTime: "5–10 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Beirut"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "visa-form", title: "Completed Visa Application Form", description: "Fully filled Lebanon visa application form", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance for the stay", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "warning", title: "Travel Advisory", points: ["Check current travel advisories before planning travel to Lebanon", "Carry sufficient USD cash as ATM availability may be limited"] },
      { type: "info", title: "Visa Application", points: ["Apply at the Lebanese embassy/consulate in your city", "Invite letter from a Lebanon-based contact strengthens the application"] },
    ],
  },

  iraq: {
    countryKey: "iraq",
    countryName: "Iraq",
    flag: "🇮🇶",
    visaType: "Visa Required",
    processingTime: "7–14 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Baghdad", "Karbala"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "visa-form", title: "Completed Visa Application Form", description: "Fully filled Iraq visa application form", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance for the stay", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "warning", title: "Travel Advisory", points: ["Check current government travel advisories before planning travel to Iraq", "Religious site visitors (Karbala, Najaf) may use specific pilgrimage visa pathways"] },
      { type: "info", title: "Visa Application", points: ["Apply at the Iraqi embassy/consulate in your city", "Invitation or sponsorship letter from an Iraqi citizen or company strengthens the application"] },
    ],
  },

  iran: {
    countryKey: "iran",
    countryName: "Iran",
    flag: "🇮🇷",
    visaType: "Visa on Arrival / eVisa",
    processingTime: "5–10 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Tehran"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "evisa-form", title: "eVisa / Visa on Arrival Application", description: "Apply online or obtain visa on arrival at major Iranian airports", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance — buy Iran-specific policy as Western cards may not work", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "warning", title: "Important Note", points: ["US/UK/Canadian passport holders are not eligible for visa on arrival — does not apply to Indian citizens", "Carry cash (USD/EUR) as international cards do not work in Iran"] },
      { type: "info", title: "Visa on Arrival", points: ["Available at Tehran Imam Khomeini Airport, Mashhad, and Isfahan airports", "Pre-obtain a reference number from the Ministry of Foreign Affairs for faster processing"] },
    ],
  },

  egypt: {
    countryKey: "egypt",
    countryName: "Egypt",
    flag: "🇪🇬",
    visaType: "eVisa / Visa on Arrival",
    processingTime: "3–5 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Cairo", "Luxor", "Hurghada"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "evisa-form", title: "Completed eVisa Application Form", description: "Apply via official Egypt eVisa portal or obtain on arrival", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance for the stay", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "eVisa Available", points: ["Apply online at visa2egypt.gov.eg", "Visa on arrival also available at Cairo International and other major airports"] },
      { type: "warning", title: "Passport Requirements", points: ["Passport must be valid for at least 6 months from travel date", "Minimum one blank page required for visa stamp"] },
    ],
  },

  // ── South Asia & Southeast Asia ──────────────────────────────
  "united-kingdom": {
    countryKey: "united-kingdom",
    countryName: "United Kingdom",
    flag: "🇬🇧",
    visaType: "Visa Required",
    processingTime: "15–20 working days",
    validity: "6 months",
    serviceFee: "Contact for pricing",
    searchAliases: ["UK", "England", "London", "Britain"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "vaf-form", title: "Completed Online Visa Application Form (VAF)", description: "UK visa application submitted via UKVI online portal", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "bank-statement", title: "Bank Statement (Last 6 Months)", description: "Bank statement for the last 6 months showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment / Salary Slips / NOC", description: "Salary slips, employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "itr", title: "Income Tax Returns (Last 2–3 Years)", description: "Income tax return filings for the last 2–3 years", category: "financial", status: "mandatory", icon: "FileBadge", iconColor: "text-orange-600", iconBg: "bg-orange-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation or accommodation proof", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "travel-itinerary", title: "Travel Itinerary", description: "Detailed day-by-day travel plan", category: "travel", status: "mandatory", icon: "MapPin", iconColor: "text-rose-600", iconBg: "bg-rose-50" },
      { id: "cover-letter", title: "Cover Letter", description: "Cover letter stating purpose of visit and intent to return", category: "other", status: "mandatory", icon: "FileText", iconColor: "text-slate-600", iconBg: "bg-slate-50" },
    ],
    conditionalGroups: [
      {
        groupTitle: "If Applicable",
        groupIcon: "FileText",
        documents: [
          { id: "property-docs", title: "Property / Asset Documents", description: "Property deeds, investment or asset proof", category: "financial", status: "conditional", conditionalNote: "Strengthens application significantly", icon: "Home", iconColor: "text-yellow-600", iconBg: "bg-yellow-50" },
          { id: "prev-visa", title: "Previous UK / International Visa Copies", description: "Copies of any previously held UK or other international visas", category: "identity", status: "conditional", conditionalNote: "Include if you hold prior visas", icon: "BookOpen", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
        ],
      },
    ],
    importantNotes: [
      { type: "warning", title: "Passport & Financial Requirements", points: ["Passport must be valid for the full duration of your stay", "Bank balance should clearly demonstrate ability to fund the trip without working"] },
      { type: "info", title: "Application Tips", points: ["Apply at least 3–4 weeks before travel", "Biometric appointment at VFS Global required", "Strong financial ties to India (property, family, employment) improve approval odds"] },
    ],
  },

  "united-states": {
    countryKey: "united-states",
    countryName: "United States",
    flag: "🇺🇸",
    visaType: "Visa Required",
    processingTime: "30–60+ working days",
    validity: "10 years (B1/B2)",
    serviceFee: "Contact for pricing",
    searchAliases: ["USA", "America", "US", "New York"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "ds160-form", title: "DS-160 Nonimmigrant Visa Application Form", description: "Completed DS-160 form submitted online at ceac.state.gov", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "mrv-fee", title: "Visa Application Fee Payment Receipt (MRV Fee)", description: "Proof of MRV fee payment for the B1/B2 visa", category: "financial", status: "mandatory", icon: "CreditCard", iconColor: "text-orange-500", iconBg: "bg-orange-50" },
      { id: "interview-appointment", title: "Interview Appointment Confirmation Letter", description: "Confirmation of your interview appointment at the US Consulate", category: "other", status: "mandatory", icon: "FileText", iconColor: "text-slate-600", iconBg: "bg-slate-50" },
      { id: "bank-statement", title: "Bank Statement (Last 6 Months)", description: "Bank statement for the last 6 months showing strong financial standing", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "itr", title: "Income Tax Returns (Last 2–3 Years)", description: "Income tax return filings demonstrating stable income", category: "financial", status: "mandatory", icon: "FileBadge", iconColor: "text-orange-600", iconBg: "bg-orange-50" },
      { id: "employment-proof", title: "Proof of Employment / Business Ownership", description: "Salary slips, employment letter, NOC or business ownership documents", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation or accommodation proof", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "cover-letter", title: "Cover Letter", description: "Cover letter stating purpose of visit and ties to India", category: "other", status: "mandatory", icon: "FileText", iconColor: "text-slate-600", iconBg: "bg-slate-50" },
      { id: "travel-itinerary", title: "Travel Itinerary", description: "Detailed day-by-day travel plan in the US", category: "travel", status: "mandatory", icon: "MapPin", iconColor: "text-rose-600", iconBg: "bg-rose-50" },
    ],
    conditionalGroups: [
      {
        groupTitle: "If Applicable",
        groupIcon: "Home",
        documents: [
          { id: "property-docs", title: "Property / Asset Documents", description: "Property deeds or other asset ownership proof", category: "financial", status: "conditional", conditionalNote: "Demonstrates strong ties to India", icon: "Home", iconColor: "text-yellow-600", iconBg: "bg-yellow-50" },
        ],
      },
    ],
    importantNotes: [
      { type: "error", title: "US Visa Interview", points: ["Interview at US Consulate is mandatory for most first-time applicants", "Be prepared to answer questions about your trip, finances, and ties to India", "Misrepresentation of any facts will lead to permanent visa ban"] },
      { type: "warning", title: "Processing Time", points: ["Interview wait times can be 6–18+ months at peak periods — apply well in advance", "Passport must be valid for at least 6 months beyond intended stay"] },
    ],
  },

  canada: {
    countryKey: "canada",
    countryName: "Canada",
    flag: "🇨🇦",
    visaType: "Visa Required",
    processingTime: "20–30 working days",
    validity: "10 years",
    serviceFee: "Contact for pricing",
    searchAliases: ["Toronto", "Vancouver", "Montreal"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "imm5257-form", title: "Completed Visa Application Form (IMM 5257)", description: "Completed IMM 5257 form submitted online via IRCC portal", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "bank-statement", title: "Bank Statement (Last 6 Months)", description: "Bank statement for the last 6 months showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment (Salary Slip / Appointment Letter / NOC)", description: "Current salary slips, appointment letter or NOC from employer", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "cover-letter", title: "Cover Letter on Company Letterhead", description: "Employer cover letter on official company letterhead", category: "other", status: "mandatory", icon: "FileText", iconColor: "text-slate-600", iconBg: "bg-slate-50" },
      { id: "itr", title: "Income Tax Returns (Last 2–3 Years)", description: "Income tax return filings for the last 2–3 years", category: "financial", status: "mandatory", icon: "FileBadge", iconColor: "text-orange-600", iconBg: "bg-orange-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation or accommodation proof", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "travel-itinerary", title: "Travel Itinerary", description: "Detailed day-by-day travel plan in Canada", category: "travel", status: "mandatory", icon: "MapPin", iconColor: "text-rose-600", iconBg: "bg-rose-50" },
      { id: "vfs-consent", title: "VFS Consent Form", description: "VFS Global consent form for biometrics submission", category: "other", status: "mandatory", icon: "FileText", iconColor: "text-slate-500", iconBg: "bg-slate-50" },
    ],
    conditionalGroups: [
      {
        groupTitle: "If Applicable",
        groupIcon: "Home",
        documents: [
          { id: "property-docs", title: "Property / Asset Documents", description: "Property deeds or investment certificates showing ties to India", category: "financial", status: "conditional", conditionalNote: "Strengthens application", icon: "Home", iconColor: "text-yellow-600", iconBg: "bg-yellow-50" },
        ],
      },
    ],
    importantNotes: [
      { type: "warning", title: "Biometrics Required", points: ["Biometrics (fingerprints + photo) required at VFS Global office", "Biometrics enrollment letter needed before attending appointment"] },
      { type: "info", title: "Processing Tips", points: ["Apply online via the IRCC portal for faster processing", "Strong financial and family ties to India significantly improve approval chances", "Electronic Travel Authorization (eTA) may be required if you hold certain foreign passports"] },
    ],
  },

  malaysia: {
    countryKey: "malaysia",
    countryName: "Malaysia",
    flag: "🇲🇾",
    visaType: "eVisa / eNTRI",
    processingTime: "3–5 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Kuala Lumpur", "KL", "Langkawi"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "entri-form", title: "Completed eNTRI / eVisa Application Form", description: "eNTRI (Electronic Travel Registration & Information) or eVisa application", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "travel-itinerary", title: "Travel Itinerary", description: "Day-by-day travel plan in Malaysia", category: "travel", status: "mandatory", icon: "MapPin", iconColor: "text-rose-600", iconBg: "bg-rose-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "eNTRI vs eVisa", points: ["eNTRI is available for Indian nationals — apply at entri.my", "eNTRI grants 15-day stay; eVisa grants 30 days — choose based on trip duration"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from date of travel", "Minimum two blank pages required"] },
    ],
  },

  singapore: {
    countryKey: "singapore",
    countryName: "Singapore",
    flag: "🇸🇬",
    visaType: "Visa Required",
    processingTime: "5–7 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["SG"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "visa-form-14a", title: "Completed Visa Application Form 14A", description: "Singapore Form 14A submitted through an authorised agent", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking with active PNR", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate from employer", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "travel-itinerary", title: "Travel Itinerary", description: "Day-by-day travel plan in Singapore", category: "travel", status: "mandatory", icon: "MapPin", iconColor: "text-rose-600", iconBg: "bg-rose-50" },
      { id: "cover-letter", title: "Cover Letter", description: "Cover letter stating purpose of visit and intent to return", category: "other", status: "mandatory", icon: "FileText", iconColor: "text-slate-600", iconBg: "bg-slate-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Application via Authorised Agent", points: ["Singapore visa applications must be submitted through an ICA-authorised local contact or travel agent in Singapore", "Online application available at Mom.gov.sg or through a licensed agent in India"] },
      { type: "warning", title: "Passport & Entry Requirements", points: ["Passport must be valid for at least 6 months from date of travel", "Minimum two blank pages required", "Immigration officer may ask to see sufficient funds on arrival"] },
    ],
  },

  thailand: {
    countryKey: "thailand",
    countryName: "Thailand",
    flag: "🇹🇭",
    visaType: "Visa on Arrival / e-Visa",
    processingTime: "2–5 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Bangkok", "Phuket", "Pattaya"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "visa-form", title: "Completed Visa Application Form", description: "Completed and signed Thailand visa application form", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3–6 Months)", description: "Bank statement for the last 3–6 months", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "travel-itinerary", title: "Travel Itinerary", description: "Day-by-day travel plan in Thailand", category: "travel", status: "mandatory", icon: "MapPin", iconColor: "text-rose-600", iconBg: "bg-rose-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC / Leave Letter", description: "Employment letter, NOC or leave letter from employer", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Visa on Arrival Available", points: ["Indian passport holders can get visa on arrival at Suvarnabhumi and major airports", "Thailand e-Visa available at thaievisa.go.th for advance application"] },
      { type: "warning", title: "Entry Requirements", points: ["Must carry THB 10,000 (or equivalent) in cash per person on arrival", "Passport must be valid for at least 6 months from travel date"] },
    ],
  },

  vietnam: {
    countryKey: "vietnam",
    countryName: "Vietnam",
    flag: "🇻🇳",
    visaType: "Tourist eVisa",
    processingTime: "3–5 working days",
    validity: "90 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Hanoi", "Ho Chi Minh", "Saigon"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "evisa-form", title: "Completed eVisa Application Form", description: "Vietnam eVisa application at evisa.xuatnhapcanh.gov.vn", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "travel-itinerary", title: "Travel Itinerary", description: "Day-by-day travel plan in Vietnam", category: "travel", status: "mandatory", icon: "MapPin", iconColor: "text-rose-600", iconBg: "bg-rose-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "eVisa — Easy to Obtain", points: ["Vietnam eVisa is single or multiple entry — valid up to 90 days", "Apply at least 3 working days in advance", "Print the approved eVisa to show at immigration"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from travel date", "Minimum two blank pages required"] },
    ],
  },

  indonesia: {
    countryKey: "indonesia",
    countryName: "Indonesia",
    flag: "🇮🇩",
    visaType: "Tourist eVisa / Visa on Arrival",
    processingTime: "3–5 working days",
    validity: "30 days (extendable)",
    serviceFee: "Contact for pricing",
    searchAliases: ["Bali", "Jakarta"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "evisa-form", title: "Completed eVisa Application Form", description: "Indonesia eVisa or Visa on Arrival application", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance for the duration of stay", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Visa on Arrival at Bali & Major Airports", points: ["Visa on Arrival available for Indian citizens at Ngurah Rai (Bali), Soetta (Jakarta), and other major airports", "eVisa also available at molina.imigrasi.go.id"] },
      { type: "warning", title: "Entry Requirements", points: ["Passport must be valid for at least 6 months from date of entry", "Minimum two blank pages required"] },
    ],
  },

  philippines: {
    countryKey: "philippines",
    countryName: "Philippines",
    flag: "🇵🇭",
    visaType: "Visa Required",
    processingTime: "5–7 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Manila", "Boracay", "Cebu"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "evisa-form", title: "Completed eVisa / Visa Application Form", description: "Philippines eVisa application or embassy visa application form", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "travel-itinerary", title: "Travel Itinerary", description: "Day-by-day travel plan in the Philippines", category: "travel", status: "mandatory", icon: "MapPin", iconColor: "text-rose-600", iconBg: "bg-rose-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Application Process", points: ["Apply through the Philippines embassy or consulate", "eVisa available via evisa.gov.ph for eligible applicants"] },
      { type: "warning", title: "Passport & Funds", points: ["Passport must be valid for at least 6 months from travel date", "Minimum two blank pages required", "May be asked to show USD 50 per day of stay at immigration"] },
    ],
  },

  cambodia: {
    countryKey: "cambodia",
    countryName: "Cambodia",
    flag: "🇰🇭",
    visaType: "Tourist eVisa",
    processingTime: "3–5 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Phnom Penh", "Siem Reap"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "evisa-form", title: "Completed eVisa Application Form", description: "Cambodia eVisa application at evisa.gov.kh", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "proof-of-funds", title: "Proof of Sufficient Funds", description: "Evidence of adequate funds for the trip", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-lime-600", iconBg: "bg-lime-50" },
      { id: "travel-itinerary", title: "Travel Itinerary", description: "Day-by-day travel plan in Cambodia", category: "travel", status: "mandatory", icon: "MapPin", iconColor: "text-rose-600", iconBg: "bg-rose-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "eVisa & Visa on Arrival", points: ["eVisa available at evisa.gov.kh — apply 3 days in advance", "Visa on arrival also available at Phnom Penh and Siem Reap airports"] },
      { type: "warning", title: "Passport Requirements", points: ["Passport must be valid for at least 6 months from travel date", "Minimum two blank pages required"] },
    ],
  },

  laos: {
    countryKey: "laos",
    countryName: "Laos",
    flag: "🇱🇦",
    visaType: "Visa on Arrival / eVisa",
    processingTime: "3–5 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Vientiane", "Luang Prabang"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "visa-form", title: "Visa Application Form (Visa on Arrival or eVisa)", description: "Visa on arrival form or online eVisa application", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "visa-fee", title: "Visa Fee Payment (Cash)", description: "Visa fee payable in USD at port of entry", category: "financial", status: "mandatory", icon: "CreditCard", iconColor: "text-orange-500", iconBg: "bg-orange-50" },
      { id: "proof-of-funds", title: "Proof of Sufficient Funds", description: "Evidence of adequate funds for the trip", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-lime-600", iconBg: "bg-lime-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Visa on Arrival", points: ["Visa on arrival available at Wattay International Airport (Vientiane) and Luang Prabang airport", "Carry USD cash for the visa fee"] },
      { type: "warning", title: "Passport Requirements", points: ["Passport must be valid for at least 6 months from travel date", "Minimum two blank pages required for visa stamp"] },
    ],
  },

  myanmar: {
    countryKey: "myanmar",
    countryName: "Myanmar",
    flag: "🇲🇲",
    visaType: "Tourist eVisa",
    processingTime: "5–7 working days",
    validity: "28 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Yangon", "Mandalay", "Burma"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "evisa-form", title: "Completed eVisa Application Form", description: "Myanmar eVisa application at evisa.moip.gov.mm", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance for the stay", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "warning", title: "Travel Advisory", points: ["Check current government travel advisory for Myanmar before travelling", "Certain regions may have restricted access — verify permitted entry points"] },
      { type: "info", title: "eVisa Process", points: ["Apply at least 3 working days in advance", "Print approved eVisa to show at immigration"] },
    ],
  },

  nepal: {
    countryKey: "nepal",
    countryName: "Nepal",
    flag: "🇳🇵",
    visaType: "Visa on Arrival",
    processingTime: "On arrival",
    validity: "15 / 30 / 90 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Kathmandu", "Pokhara"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "arrival-form", title: "Arrival / Visa-on-Arrival Form", description: "Visa application form available at the port of entry", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "visa-fee", title: "Visa Fee Payment (Cash in USD)", description: "Visa fee payable in USD cash at port of entry", category: "financial", status: "mandatory", icon: "CreditCard", iconColor: "text-orange-500", iconBg: "bg-orange-50" },
      { id: "proof-of-funds", title: "Proof of Sufficient Funds", description: "Evidence of adequate funds for the trip", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-lime-600", iconBg: "bg-lime-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Easy Visa on Arrival", points: ["Indians can obtain visa on arrival at Tribhuvan International Airport (Kathmandu)", "Online visa pre-registration also available at nepalimmigration.gov.np"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from travel date"] },
    ],
  },

  "sri-lanka": {
    countryKey: "sri-lanka",
    countryName: "Sri Lanka",
    flag: "🇱🇰",
    visaType: "Tourist ETA",
    processingTime: "1–3 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Colombo", "Ceylon"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "eta-form", title: "Completed ETA Application", description: "Electronic Travel Authorization (ETA) at eta.gov.lk", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "proof-of-funds", title: "Proof of Sufficient Funds", description: "Evidence of adequate funds for the trip", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-lime-600", iconBg: "bg-lime-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "ETA — Online Application", points: ["Apply at eta.gov.lk at least 2 days before travel", "Visa on arrival also available at Bandaranaike International Airport"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from travel date"] },
    ],
  },

  maldives: {
    countryKey: "maldives",
    countryName: "Maldives",
    flag: "🇲🇻",
    visaType: "Visa on Arrival (Free)",
    processingTime: "On arrival",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Male"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "arrival-card", title: "Arrival Card", description: "Arrival card provided on the flight or at port of entry", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel / Resort Booking", description: "Confirmed hotel or resort reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "proof-of-funds", title: "Proof of Sufficient Funds (USD 100/day)", description: "Evidence of at least USD 100 per day or equivalent", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-lime-600", iconBg: "bg-lime-50" },
      { id: "travel-insurance", title: "Travel Health Insurance (Recommended)", description: "Travel health insurance is strongly recommended", category: "insurance", status: "optional", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Visa Free for 30 Days", points: ["Indian passport holders receive free visa on arrival valid for 30 days", "No advance application required"] },
      { type: "warning", title: "Passport & Funds", points: ["Passport must be valid for at least 1 month beyond intended stay", "Minimum USD 100 per day or a confirmed resort booking required"] },
    ],
  },

  bhutan: {
    countryKey: "bhutan",
    countryName: "Bhutan",
    flag: "🇧🇹",
    visaType: "Visa Required",
    processingTime: "5–7 working days",
    validity: "Duration of tour",
    serviceFee: "Contact for pricing",
    searchAliases: ["Thimphu", "Paro"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "online-visa", title: "Online Visa Application via Tourism Council of Bhutan", description: "Application submitted at www.tourism.gov.bt through a licensed tour operator", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking through Licensed Bhutanese Tour Operator", description: "Confirmed hotel reservation arranged by a licensed Bhutanese operator", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "sdf-payment", title: "Sustainable Development Fee (SDF) Payment Proof", description: "Proof of SDF payment — USD 100 per person per night", category: "financial", status: "mandatory", icon: "CreditCard", iconColor: "text-orange-500", iconBg: "bg-orange-50" },
      { id: "visa-clearance", title: "Bhutan Tourism Visa Clearance Letter", description: "Visa clearance letter issued by the Tourism Council of Bhutan", category: "other", status: "mandatory", icon: "FileText", iconColor: "text-slate-600", iconBg: "bg-slate-50" },
      { id: "travel-itinerary", title: "Travel Itinerary (by Licensed Tour Operator)", description: "Day-by-day itinerary prepared by your licensed Bhutanese tour operator", category: "travel", status: "mandatory", icon: "MapPin", iconColor: "text-rose-600", iconBg: "bg-rose-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "warning", title: "Mandatory Tour Requirement", points: ["Independent travel is not permitted — all tourists must book through a licensed Bhutanese tour operator", "The SDF of USD 100/night is mandatory and includes sustainable tourism levy"] },
      { type: "info", title: "Visa Process", points: ["Visa clearance letter issued by Tourism Council before arrival", "Present the clearance letter at Paro Airport to receive visa stamp on arrival"] },
    ],
  },

  bangladesh: {
    countryKey: "bangladesh",
    countryName: "Bangladesh",
    flag: "🇧🇩",
    visaType: "Visa Required",
    processingTime: "5–7 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Dhaka"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "visa-form", title: "Completed Visa Application Form", description: "Bangladesh visa application form", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance for the stay", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Application Process", points: ["Apply at the Bangladesh High Commission in New Delhi or Consulate in your city", "Online eVisa also available for certain categories"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from travel date"] },
    ],
  },

  // ── East Asia ────────────────────────────────────────────────
  japan: {
    countryKey: "japan",
    countryName: "Japan",
    flag: "🇯🇵",
    visaType: "Visa Required",
    processingTime: "5–7 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Tokyo", "Osaka", "Kyoto"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "visa-form", title: "Completed Visa Application Form", description: "Japan visa application form submitted at VFS Global or Embassy", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3–6 Months)", description: "Bank statement for the last 3–6 months", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment (Salary Slips / Employment Letter / NOC)", description: "Recent salary slips, employment letter or NOC", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "itr", title: "Income Tax Returns (Last 2–3 Years)", description: "Income tax return filings for the last 2–3 years", category: "financial", status: "mandatory", icon: "FileBadge", iconColor: "text-orange-600", iconBg: "bg-orange-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Day-by-Day Accommodation", description: "Confirmed hotel reservations covering the full stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "travel-itinerary", title: "Travel Itinerary", description: "Detailed day-by-day travel plan in Japan", category: "travel", status: "mandatory", icon: "MapPin", iconColor: "text-rose-600", iconBg: "bg-rose-50" },
      { id: "cover-letter", title: "Cover Letter", description: "Cover letter stating purpose of visit and intent to return", category: "other", status: "mandatory", icon: "FileText", iconColor: "text-slate-600", iconBg: "bg-slate-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "warning", title: "Strong Financial Proof Required", points: ["Japan consulate scrutinises bank statements and ITR carefully", "Average balance of ₹2–3 lakh per person is recommended", "Passport must be valid for at least 6 months from return date"] },
      { type: "info", title: "Application Tips", points: ["Apply at VFS Global Japan in your city", "Day-by-day itinerary with hotel names significantly strengthens the application", "Apply at least 10–14 days before travel"] },
    ],
  },

  "south-korea": {
    countryKey: "south-korea",
    countryName: "South Korea",
    flag: "🇰🇷",
    visaType: "Visa Required",
    processingTime: "5–7 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Korea", "Seoul"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "visa-form", title: "Completed Visa Application Form", description: "South Korea visa application form", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment (Salary Slips / Employment Letter / NOC)", description: "Recent salary slips, employment letter or NOC", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "itr", title: "Income Tax Returns (Last Year)", description: "Most recent income tax return filing", category: "financial", status: "mandatory", icon: "FileBadge", iconColor: "text-orange-600", iconBg: "bg-orange-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "travel-itinerary", title: "Travel Itinerary", description: "Day-by-day travel plan in South Korea", category: "travel", status: "mandatory", icon: "MapPin", iconColor: "text-rose-600", iconBg: "bg-rose-50" },
      { id: "cover-letter", title: "Cover Letter", description: "Cover letter stating purpose of visit", category: "other", status: "mandatory", icon: "FileText", iconColor: "text-slate-600", iconBg: "bg-slate-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Application Process", points: ["Apply at the Korean Consulate or through VFS Global", "K-ETA (Korea Electronic Travel Authorization) required from certain nationalities — verify current policy for Indian citizens"] },
      { type: "warning", title: "Passport & Financial Proof", points: ["Passport must be valid for at least 6 months from travel date", "Minimum one blank page required", "Strong bank balance and stable employment improve approval significantly"] },
    ],
  },

  "hong-kong": {
    countryKey: "hong-kong",
    countryName: "Hong Kong",
    flag: "🇭🇰",
    visaType: "Visa Required",
    processingTime: "5–10 working days",
    validity: "14 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["HK"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "id1009a-form", title: "Completed Visitor Visa Application Form (ID 1009A)", description: "Hong Kong Immigration Form ID 1009A", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "cover-letter", title: "Cover Letter", description: "Cover letter stating purpose of visit", category: "other", status: "mandatory", icon: "FileText", iconColor: "text-slate-600", iconBg: "bg-slate-50" },
      { id: "travel-itinerary", title: "Travel Itinerary", description: "Day-by-day travel plan in Hong Kong", category: "travel", status: "mandatory", icon: "MapPin", iconColor: "text-rose-600", iconBg: "bg-rose-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Application Process", points: ["Apply at the Hong Kong Immigration Department or through an authorised agent", "Processing time is typically 5–10 working days"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 1 month beyond intended stay", "Carry all original documents for inspection on arrival"] },
    ],
  },

  taiwan: {
    countryKey: "taiwan",
    countryName: "Taiwan",
    flag: "🇹🇼",
    visaType: "Visa Required",
    processingTime: "5–7 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Taipei"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "visa-form", title: "Completed Visa Application Form", description: "Taiwan visa application form or ROC Travel Authorization Certificate", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "travel-itinerary", title: "Travel Itinerary", description: "Day-by-day travel plan in Taiwan", category: "travel", status: "mandatory", icon: "MapPin", iconColor: "text-rose-600", iconBg: "bg-rose-50" },
    ],
    conditionalGroups: [
      {
        groupTitle: "If Applying for Travel Authorization Certificate",
        groupIcon: "BookOpen",
        documents: [
          { id: "third-country-visa", title: "Valid Visa of US / UK / Schengen / Japan / Australia / Canada / South Korea", description: "A valid visa from one of the qualifying countries enables the Travel Authorization Certificate pathway", category: "identity", status: "conditional", conditionalNote: "Required for ROC Travel Authorization Certificate route", icon: "BookOpen", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
        ],
      },
    ],
    importantNotes: [
      { type: "info", title: "Travel Authorization Certificate", points: ["Indians holding a valid visa from US, UK, Schengen, Japan, Australia, Canada or South Korea may be eligible for a Travel Authorization Certificate (easier process)", "Regular visa available from the Taipei Economic and Cultural Center (TECC) in India"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from travel date"] },
    ],
  },

  // ── Caucasus & Central Asia ──────────────────────────────────
  azerbaijan: {
    countryKey: "azerbaijan",
    countryName: "Azerbaijan",
    flag: "🇦🇿",
    visaType: "Tourist eVisa (ASAN Visa)",
    processingTime: "3–5 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Baku"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "asan-evisa", title: "Completed ASAN eVisa Application Form", description: "Azerbaijan ASAN eVisa application at evisa.gov.az", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance for the stay", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "ASAN eVisa", points: ["Apply at evisa.gov.az — typically approved within 3 working days", "Single-entry eVisa allows 30-day stay"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 3 months beyond intended stay"] },
    ],
  },

  georgia: {
    countryKey: "georgia",
    countryName: "Georgia",
    flag: "🇬🇪",
    visaType: "Visa-Free (1 Year)",
    processingTime: "No processing required",
    validity: "365 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Tbilisi", "Batumi"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Visa-Free for Indian Citizens", points: ["Indian passport holders can stay in Georgia for up to 1 year without a visa", "Carry hotel booking and sufficient funds proof as immigration may ask"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for the entire duration of stay"] },
    ],
  },

  armenia: {
    countryKey: "armenia",
    countryName: "Armenia",
    flag: "🇦🇲",
    visaType: "eVisa / Visa on Arrival",
    processingTime: "3–5 working days",
    validity: "21 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Yerevan"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "evisa-form", title: "eVisa Application Form", description: "Armenia eVisa at evisa.mfa.am or obtain on arrival", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "eVisa Available", points: ["Apply at evisa.mfa.am or get visa on arrival at Zvartnots International Airport", "Processing typically 3 working days online"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from travel date"] },
    ],
  },

  kazakhstan: {
    countryKey: "kazakhstan",
    countryName: "Kazakhstan",
    flag: "🇰🇿",
    visaType: "Tourist eVisa",
    processingTime: "5–7 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Almaty", "Astana"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "evisa-form", title: "Completed eVisa Application Form", description: "Kazakhstan eVisa application at viza.e-gov.kz", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance for the stay", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "eVisa Application", points: ["Apply online at viza.e-gov.kz", "eVisa allows single entry for up to 30 days"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from travel date"] },
    ],
  },

  uzbekistan: {
    countryKey: "uzbekistan",
    countryName: "Uzbekistan",
    flag: "🇺🇿",
    visaType: "Tourist eVisa",
    processingTime: "3–5 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Tashkent", "Samarkand"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "evisa-form", title: "Completed eVisa Application Form", description: "Uzbekistan eVisa application at e-visa.uz", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "eVisa Available", points: ["Apply online at e-visa.uz — typically approved within 3 working days", "Visa on arrival also available at Tashkent International Airport"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from travel date"] },
    ],
  },

  // ── Europe — Schengen ────────────────────────────────────────
  france: {
    countryKey: "france",
    countryName: "France",
    flag: "🇫🇷",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Paris", "Schengen"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  switzerland: {
    countryKey: "switzerland",
    countryName: "Switzerland",
    flag: "🇨🇭",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Zurich", "Geneva"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  germany: {
    countryKey: "germany",
    countryName: "Germany",
    flag: "🇩🇪",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Berlin", "Munich"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  italy: {
    countryKey: "italy",
    countryName: "Italy",
    flag: "🇮🇹",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Rome", "Milan", "Venice"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  spain: {
    countryKey: "spain",
    countryName: "Spain",
    flag: "🇪🇸",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Madrid", "Barcelona"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  netherlands: {
    countryKey: "netherlands",
    countryName: "Netherlands",
    flag: "🇳🇱",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Amsterdam", "Holland"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  austria: {
    countryKey: "austria",
    countryName: "Austria",
    flag: "🇦🇹",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Vienna", "Salzburg"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  greece: {
    countryKey: "greece",
    countryName: "Greece",
    flag: "🇬🇷",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Athens", "Santorini"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  belgium: {
    countryKey: "belgium",
    countryName: "Belgium",
    flag: "🇧🇪",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Brussels"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  portugal: {
    countryKey: "portugal",
    countryName: "Portugal",
    flag: "🇵🇹",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Lisbon", "Porto"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  poland: {
    countryKey: "poland",
    countryName: "Poland",
    flag: "🇵🇱",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Warsaw", "Krakow"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  "czech-republic": {
    countryKey: "czech-republic",
    countryName: "Czech Republic",
    flag: "🇨🇿",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Prague", "Czechia"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  hungary: {
    countryKey: "hungary",
    countryName: "Hungary",
    flag: "🇭🇺",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Budapest"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  sweden: {
    countryKey: "sweden",
    countryName: "Sweden",
    flag: "🇸🇪",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Stockholm"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  norway: {
    countryKey: "norway",
    countryName: "Norway",
    flag: "🇳🇴",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Oslo"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  denmark: {
    countryKey: "denmark",
    countryName: "Denmark",
    flag: "🇩🇰",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Copenhagen"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  finland: {
    countryKey: "finland",
    countryName: "Finland",
    flag: "🇫🇮",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Helsinki"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  iceland: {
    countryKey: "iceland",
    countryName: "Iceland",
    flag: "🇮🇸",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Reykjavik"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  croatia: {
    countryKey: "croatia",
    countryName: "Croatia",
    flag: "🇭🇷",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Zagreb", "Dubrovnik"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  romania: {
    countryKey: "romania",
    countryName: "Romania",
    flag: "🇷🇴",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Bucharest"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  bulgaria: {
    countryKey: "bulgaria",
    countryName: "Bulgaria",
    flag: "🇧🇬",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Sofia"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  estonia: {
    countryKey: "estonia",
    countryName: "Estonia",
    flag: "🇪🇪",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Tallinn"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  slovenia: {
    countryKey: "slovenia",
    countryName: "Slovenia",
    flag: "🇸🇮",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Ljubljana"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  slovakia: {
    countryKey: "slovakia",
    countryName: "Slovakia",
    flag: "🇸🇰",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Bratislava"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  malta: {
    countryKey: "malta",
    countryName: "Malta",
    flag: "🇲🇹",
    visaType: "Schengen Visa",
    processingTime: "10–15 working days",
    validity: "Up to 90 days in 180-day period",
    serviceFee: "Contact for pricing",
    searchAliases: ["Valletta"],
    mandatoryDocuments: [...UNIVERSAL_3, ...SCHENGEN_DOCS],
    conditionalGroups: [],
    importantNotes: [...SCHENGEN_NOTES],
  },

  // ── Europe — Non-Schengen ────────────────────────────────────
  ireland: {
    countryKey: "ireland",
    countryName: "Ireland",
    flag: "🇮🇪",
    visaType: "Visa Required",
    processingTime: "15–20 working days",
    validity: "90 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Dublin"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "avats-form", title: "Completed Irish Visa Application Form (AVATS)", description: "Irish visa application submitted via the AVATS online portal", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "bank-statement", title: "Bank Statement (Last 6 Months)", description: "Bank statement for the last 6 months showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment (Salary Slips / Employment Letter / NOC)", description: "Recent salary slips, employment letter or NOC", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "itr", title: "Income Tax Returns (Last 2–3 Years)", description: "Income tax return filings for the last 2–3 years", category: "financial", status: "mandatory", icon: "FileBadge", iconColor: "text-orange-600", iconBg: "bg-orange-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "travel-itinerary", title: "Travel Itinerary", description: "Day-by-day travel plan in Ireland", category: "travel", status: "mandatory", icon: "MapPin", iconColor: "text-rose-600", iconBg: "bg-rose-50" },
      { id: "cover-letter", title: "Cover Letter", description: "Cover letter stating purpose of visit and intent to return", category: "other", status: "mandatory", icon: "FileText", iconColor: "text-slate-600", iconBg: "bg-slate-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance for the stay", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "warning", title: "Ireland is NOT in Schengen", points: ["A Schengen visa does NOT grant entry to Ireland — a separate Irish visa is required", "Apply via the AVATS online system at inis.gov.ie"] },
      { type: "info", title: "Application Tips", points: ["Strong financial ties to India and a clear travel itinerary improve approval significantly", "Apply at least 6–8 weeks before travel"] },
    ],
  },

  turkey: {
    countryKey: "turkey",
    countryName: "Turkey",
    flag: "🇹🇷",
    visaType: "Tourist eVisa",
    processingTime: "1–3 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Istanbul", "Turkiye", "Cappadocia"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "evisa-form", title: "Completed eVisa Application Form", description: "Turkey eVisa application at evisa.gov.tr", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance for the stay", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Easy eVisa", points: ["Turkish eVisa available online at evisa.gov.tr — usually approved instantly", "Single or multiple entry available"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from travel date", "Must have at least 6 months validity remaining on entry"] },
    ],
  },

  russia: {
    countryKey: "russia",
    countryName: "Russia",
    flag: "🇷🇺",
    visaType: "Visa Required",
    processingTime: "10–15 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Moscow", "Saint Petersburg"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "visa-form", title: "Completed Visa Application Form", description: "Russia visa application form", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "invitation-letter", title: "Tourist Voucher / Invitation Letter", description: "Tourist voucher from a Russian travel agency or hotel confirmation", category: "other", status: "mandatory", icon: "FileText", iconColor: "text-slate-600", iconBg: "bg-slate-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance covering Russia", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "warning", title: "Travel Advisory", points: ["Check current government travel advisory before planning travel to Russia", "International payment cards may have limited acceptance — carry sufficient cash"] },
      { type: "info", title: "Visa Application", points: ["Apply at the Russian Embassy or Consulate with a tourist voucher from a Russian agency", "E-Visa may be available for certain entry points — check mid.ru for latest information"] },
    ],
  },

  cyprus: {
    countryKey: "cyprus",
    countryName: "Cyprus",
    flag: "🇨🇾",
    visaType: "Visa Required",
    processingTime: "10–15 working days",
    validity: "90 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Nicosia", "Limassol"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "visa-form", title: "Completed Visa Application Form", description: "Cyprus visa application form", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance for the stay", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "warning", title: "Not Part of Schengen", points: ["Cyprus is in the EU but NOT part of the Schengen Area — a separate Cyprus visa is required", "A valid Schengen visa may allow entry to Cyprus — verify current policy before travel"] },
      { type: "info", title: "Application Process", points: ["Apply at the Cyprus High Commission in India", "eVisa also available at evisa.cy.net"] },
    ],
  },

  serbia: {
    countryKey: "serbia",
    countryName: "Serbia",
    flag: "🇷🇸",
    visaType: "Visa-Free (with conditions)",
    processingTime: "No processing required",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Belgrade"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Visa-Free Entry for Indians", points: ["Indian citizens can enter Serbia visa-free for up to 30 days", "No advance visa application required — present passport and supporting documents at immigration"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from travel date"] },
    ],
  },

  montenegro: {
    countryKey: "montenegro",
    countryName: "Montenegro",
    flag: "🇲🇪",
    visaType: "Visa-Free (with conditions)",
    processingTime: "No processing required",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Kotor", "Podgorica"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Visa-Free Entry", points: ["Indian citizens can enter Montenegro visa-free for up to 30 days", "No advance visa application required"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from travel date"] },
    ],
  },

  albania: {
    countryKey: "albania",
    countryName: "Albania",
    flag: "🇦🇱",
    visaType: "Visa-Free",
    processingTime: "No processing required",
    validity: "90 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Tirana"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Visa-Free Entry", points: ["Indian citizens can enter Albania without a visa for up to 90 days", "Immigration may ask for hotel booking and proof of funds"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from travel date"] },
    ],
  },

  // ── Oceania ──────────────────────────────────────────────────
  australia: {
    countryKey: "australia",
    countryName: "Australia",
    flag: "🇦🇺",
    visaType: "Visitor Visa (Subclass 600)",
    processingTime: "15–20 working days",
    validity: "12 months (max 3 months per stay)",
    serviceFee: "Contact for pricing",
    searchAliases: ["Sydney", "Melbourne", "Brisbane"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "visa600-form", title: "Completed Online Visitor Visa (Subclass 600) Application", description: "Application submitted via ImmiAccount on the Australian Department of Home Affairs website", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "bank-statement", title: "Bank Statement (Last 6 Months)", description: "Bank statement for the last 6 months showing strong financial standing", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment (Salary Slips / Employment Letter / NOC)", description: "Recent salary slips, employment letter or NOC", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "itr", title: "Income Tax Returns (Last 2–3 Years)", description: "Income tax return filings for the last 2–3 years", category: "financial", status: "mandatory", icon: "FileBadge", iconColor: "text-orange-600", iconBg: "bg-orange-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation or accommodation proof", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "travel-itinerary", title: "Travel Itinerary", description: "Day-by-day travel plan in Australia", category: "travel", status: "mandatory", icon: "MapPin", iconColor: "text-rose-600", iconBg: "bg-rose-50" },
      { id: "cover-letter", title: "Cover Letter", description: "Cover letter stating purpose of visit and intent to return", category: "other", status: "mandatory", icon: "FileText", iconColor: "text-slate-600", iconBg: "bg-slate-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance for the entire stay", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "warning", title: "Strong Financial Proof Required", points: ["Australia immigration is strict — demonstrate clear financial capacity and genuine travel intent", "Bank balance should clearly show ability to fund the trip", "Passport must be valid for at least 6 months beyond intended stay"] },
      { type: "info", title: "Application Tips", points: ["Apply online via ImmiAccount — fully digital process", "Strong employment, family ties, and property in India significantly improve approval", "Apply at least 3–4 weeks before travel"] },
    ],
  },

  "new-zealand": {
    countryKey: "new-zealand",
    countryName: "New Zealand",
    flag: "🇳🇿",
    visaType: "Visitor Visa",
    processingTime: "10–20 working days",
    validity: "9 months (max 3 months per visit)",
    serviceFee: "Contact for pricing",
    searchAliases: ["Auckland", "Queenstown"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "nzeta-form", title: "Completed NZeTA Application", description: "New Zealand Electronic Travel Authority at eta.immigration.govt.nz", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3–6 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment (Salary Slips / Employment Letter / NOC)", description: "Recent salary slips, employment letter or NOC", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "travel-itinerary", title: "Travel Itinerary", description: "Day-by-day travel plan in New Zealand", category: "travel", status: "mandatory", icon: "MapPin", iconColor: "text-rose-600", iconBg: "bg-rose-50" },
      { id: "cover-letter", title: "Cover Letter", description: "Cover letter stating purpose of visit", category: "other", status: "mandatory", icon: "FileText", iconColor: "text-slate-600", iconBg: "bg-slate-50" },
      { id: "ivl-payment", title: "International Visitor Conservation and Tourism Levy (IVL)", description: "Proof of IVL payment (NZD 35) paid during NZeTA application", category: "financial", status: "mandatory", icon: "CreditCard", iconColor: "text-orange-500", iconBg: "bg-orange-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "NZeTA Required", points: ["NZeTA (electronic travel authority) is required before travel — apply online", "IVL fee of NZD 35 is payable during NZeTA application"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 3 months beyond intended departure date from New Zealand"] },
    ],
  },

  fiji: {
    countryKey: "fiji",
    countryName: "Fiji",
    flag: "🇫🇯",
    visaType: "Visa on Arrival",
    processingTime: "On arrival",
    validity: "4 months",
    serviceFee: "Contact for pricing",
    searchAliases: ["Nadi", "Suva"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "arrival-form", title: "Completed Visitor Entry Form", description: "Visitor arrival card provided on flight or at port of entry", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "proof-of-funds", title: "Proof of Sufficient Funds (FJD 200/day)", description: "Evidence of at least FJD 200 per day or equivalent", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-lime-600", iconBg: "bg-lime-50" },
      { id: "travel-insurance", title: "Travel Health Insurance (Recommended)", description: "Travel health insurance is strongly recommended", category: "insurance", status: "optional", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Visa on Arrival", points: ["Indian passport holders receive visa on arrival at Nadi International Airport", "No advance visa application required"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from travel date"] },
    ],
  },

  // ── Americas ─────────────────────────────────────────────────
  mexico: {
    countryKey: "mexico",
    countryName: "Mexico",
    flag: "🇲🇽",
    visaType: "Visa Required",
    processingTime: "5–10 working days",
    validity: "180 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Cancun", "Mexico City"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "fmm-card", title: "Forma Migratoria Multiple (FMM) Tourist Card", description: "FMM tourist card completed on arrival or online in advance", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement / Proof of Sufficient Funds", description: "Bank statement or proof of financial means", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Visa Application", points: ["Apply at the Mexican Embassy or consulate in India", "Indians holding a valid US B1/B2 visa may be eligible for visa-free entry — verify current policy"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from travel date"] },
    ],
  },

  brazil: {
    countryKey: "brazil",
    countryName: "Brazil",
    flag: "🇧🇷",
    visaType: "Tourist eVisa",
    processingTime: "3–5 working days",
    validity: "90 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Rio", "Sao Paulo"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "evisa-form", title: "Completed eVisa Application Form", description: "Brazil eVisa application at evisa.itamaraty.gov.br", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance for the stay", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
      { id: "yellow-fever-cert", title: "Yellow Fever Vaccination Certificate", description: "Certificate required if travelling from or transiting through yellow fever endemic areas", category: "other", status: "conditional", conditionalNote: "If travelling from endemic areas", icon: "HeartPulse", iconColor: "text-red-600", iconBg: "bg-red-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "warning", title: "Yellow Fever Certificate", points: ["Yellow Fever Vaccination Certificate required if arriving from or transiting through yellow fever endemic areas", "Certificate must be presented at immigration on arrival"] },
      { type: "info", title: "eVisa Process", points: ["Apply online at least 72 hours before travel", "eVisa allows multiple entries within 90 days"] },
    ],
  },

  argentina: {
    countryKey: "argentina",
    countryName: "Argentina",
    flag: "🇦🇷",
    visaType: "Visa Required",
    processingTime: "5–10 working days",
    validity: "90 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Buenos Aires"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "visa-form", title: "Completed Visa Application Form", description: "Argentina visa application form from the embassy", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Visa Exemption for US Visa Holders", points: ["Indians holding a valid US B1/B2 visa may be eligible for visa-free entry to Argentina — verify current policy", "Regular visa available from the Argentine Embassy in New Delhi"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from travel date"] },
    ],
  },

  peru: {
    countryKey: "peru",
    countryName: "Peru",
    flag: "🇵🇪",
    visaType: "Visa Required",
    processingTime: "5–10 working days",
    validity: "90 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Lima", "Machu Picchu"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "arrival-card", title: "Completed Arrival Card", description: "Arrival card provided on flight or at port of entry", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement / Proof of Sufficient Funds", description: "Bank statement or proof of financial means", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Visa Application", points: ["Apply at the Peruvian Embassy or consulate in India", "Some Indians may qualify for visa-free entry — check current policy with the embassy"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from travel date"] },
    ],
  },

  chile: {
    countryKey: "chile",
    countryName: "Chile",
    flag: "🇨🇱",
    visaType: "Visa Required",
    processingTime: "5–10 working days",
    validity: "90 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Santiago"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "tourist-card", title: "Completed PDI Tourist Card", description: "Tourist card completed on arrival at Chilean immigration", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement / Proof of Sufficient Funds", description: "Bank statement or proof of financial means", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Visa Application", points: ["Apply at the Chilean Embassy in New Delhi", "Some categories of Indian travelers may qualify for visa on arrival — verify with the embassy"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from travel date"] },
    ],
  },

  colombia: {
    countryKey: "colombia",
    countryName: "Colombia",
    flag: "🇨🇴",
    visaType: "Visa Required",
    processingTime: "5–10 working days",
    validity: "90 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Bogota", "Medellin"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "entry-form", title: "Completed Migración Colombia Entry Form", description: "Entry form completed online or on arrival at immigration", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement / Proof of Sufficient Funds", description: "Bank statement or proof of financial means", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "yellow-fever-cert", title: "Yellow Fever Vaccination Certificate (Recommended)", description: "Recommended if travelling to tropical regions of Colombia", category: "other", status: "optional", icon: "HeartPulse", iconColor: "text-red-600", iconBg: "bg-red-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "warning", title: "Yellow Fever Vaccination", points: ["Yellow Fever Vaccination Certificate recommended if visiting Amazon or tropical regions", "May be required if you are transiting through yellow fever endemic areas"] },
      { type: "info", title: "Visa Application", points: ["Apply at the Colombian Embassy or consulate in India", "eVisa available at cancilleria.gov.co"] },
    ],
  },

  panama: {
    countryKey: "panama",
    countryName: "Panama",
    flag: "🇵🇦",
    visaType: "Visa Required",
    processingTime: "5–10 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Panama City"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "visa-form", title: "Completed Visa Application Form", description: "Panama visa application form from the embassy", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement / Proof of Sufficient Funds (USD 500 minimum)", description: "Proof of at least USD 500 in funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
    ],
    conditionalGroups: [
      {
        groupTitle: "For Easier Visa Processing",
        groupIcon: "BookOpen",
        documents: [
          { id: "third-country-visa", title: "Valid Multiple-Entry Visa from USA / Canada / UK / Australia / South Korea", description: "A valid multiple-entry visa from qualifying countries may facilitate entry", category: "identity", status: "conditional", conditionalNote: "Facilitates visa processing significantly", icon: "BookOpen", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
        ],
      },
    ],
    importantNotes: [
      { type: "info", title: "Visa Application", points: ["Apply at the Embassy of Panama in India", "Indians holding a valid US B1/B2 or Schengen visa may qualify for simplified processing"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 3 months beyond intended stay"] },
    ],
  },

  "costa-rica": {
    countryKey: "costa-rica",
    countryName: "Costa Rica",
    flag: "🇨🇷",
    visaType: "Visa Required / Visa Waiver",
    processingTime: "5–10 working days",
    validity: "90 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["San Jose"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "proof-of-funds", title: "Proof of Sufficient Funds (USD 100/day)", description: "Proof of at least USD 100 per day or equivalent", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-lime-600", iconBg: "bg-lime-50" },
      { id: "travel-insurance", title: "Travel Health Insurance (Recommended)", description: "Travel health insurance is recommended", category: "insurance", status: "optional", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
    ],
    conditionalGroups: [
      {
        groupTitle: "For Visa Waiver Pathway",
        groupIcon: "BookOpen",
        documents: [
          { id: "qualifying-visa", title: "Valid US / Schengen / UK Visa", description: "Valid US, Schengen or UK visa enables visa-free entry via visa waiver", category: "identity", status: "conditional", conditionalNote: "Required for visa waiver entry", icon: "BookOpen", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
        ],
      },
    ],
    importantNotes: [
      { type: "info", title: "Visa Waiver for Qualifying Visa Holders", points: ["Indians holding a valid US, Schengen or UK visa can enter Costa Rica without a separate visa", "No advance application needed if using visa waiver pathway"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from travel date"] },
    ],
  },

  cuba: {
    countryKey: "cuba",
    countryName: "Cuba",
    flag: "🇨🇺",
    visaType: "Tourist Card Required",
    processingTime: "3–5 working days",
    validity: "30 days (extendable)",
    serviceFee: "Contact for pricing",
    searchAliases: ["Havana"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "tourist-card", title: "Cuba Tourist Card (Tarjeta del Turista)", description: "Tourist card obtained from Cuban embassy or airline before departure", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel or casa particular booking", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "travel-insurance", title: "Travel Health Insurance (Mandatory)", description: "Travel health insurance is mandatory for entry to Cuba", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
      { id: "proof-of-funds", title: "Proof of Sufficient Funds", description: "Evidence of adequate financial means for the trip", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-lime-600", iconBg: "bg-lime-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "warning", title: "Travel Health Insurance is Mandatory", points: ["Cuba requires proof of travel health insurance on entry", "Insurance can be purchased from Cuban airlines or separately — ensure it is Cuba-specific"] },
      { type: "info", title: "Tourist Card", points: ["Tourist card (pink card for most nationalities) available from the Cuban embassy or at airport before boarding", "Carry USD/EUR cash — international cards may not work in Cuba"] },
    ],
  },

  "dominican-republic": {
    countryKey: "dominican-republic",
    countryName: "Dominican Republic",
    flag: "🇩🇴",
    visaType: "Tourist Card on Arrival",
    processingTime: "On arrival",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Punta Cana", "Santo Domingo"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "tourist-card", title: "Tourist Card / eTicket", description: "Tourist card included in most airline fares or purchased on arrival; eTicket at eticket.gov.do", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement / Proof of Sufficient Funds", description: "Bank statement or proof of financial means", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "tourist-fee", title: "Tourist Card Fee Payment", description: "Tourist card fee (if not included in airline ticket)", category: "financial", status: "conditional", conditionalNote: "If not included in airline ticket", icon: "CreditCard", iconColor: "text-orange-500", iconBg: "bg-orange-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Easy Entry", points: ["Tourist card is typically included in airline ticket prices", "eTicket (digital form) can be completed at eticket.gov.do before arrival"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from travel date"] },
    ],
  },

  // ── Africa ───────────────────────────────────────────────────
  mauritius: {
    countryKey: "mauritius",
    countryName: "Mauritius",
    flag: "🇲🇺",
    visaType: "Visa-Free (90 days)",
    processingTime: "No processing required",
    validity: "90 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Port Louis"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "proof-of-funds", title: "Proof of Sufficient Funds", description: "Evidence of adequate financial means for the trip", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-lime-600", iconBg: "bg-lime-50" },
      { id: "travel-insurance", title: "Travel Health Insurance (Recommended)", description: "Travel health insurance is strongly recommended", category: "insurance", status: "optional", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Visa-Free for Indian Citizens", points: ["Indian citizens can visit Mauritius for up to 90 days without a visa", "Carry hotel booking and proof of funds for immigration inspection"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from travel date"] },
    ],
  },

  seychelles: {
    countryKey: "seychelles",
    countryName: "Seychelles",
    flag: "🇸🇨",
    visaType: "Visitor's Permit on Arrival (Free)",
    processingTime: "On arrival",
    validity: "30 days (extendable)",
    serviceFee: "Contact for pricing",
    searchAliases: ["Mahe", "Victoria"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "proof-of-funds", title: "Proof of Sufficient Funds", description: "Evidence of adequate financial means (approx. USD 150/day)", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-lime-600", iconBg: "bg-lime-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Free Visitor's Permit on Arrival", points: ["Indian passport holders receive a free visitor's permit on arrival", "No advance application needed"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for the full duration of your stay"] },
    ],
  },

  "south-africa": {
    countryKey: "south-africa",
    countryName: "South Africa",
    flag: "🇿🇦",
    visaType: "Visa Required",
    processingTime: "10–15 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Cape Town", "Johannesburg"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "visa-form", title: "Completed Visa Application Form", description: "South Africa visa application form (BI-84)", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "itr", title: "Income Tax Returns (Last 2–3 Years)", description: "Income tax return filings", category: "financial", status: "mandatory", icon: "FileBadge", iconColor: "text-orange-600", iconBg: "bg-orange-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "travel-itinerary", title: "Travel Itinerary", description: "Day-by-day travel plan in South Africa", category: "travel", status: "mandatory", icon: "MapPin", iconColor: "text-rose-600", iconBg: "bg-rose-50" },
      { id: "cover-letter", title: "Cover Letter", description: "Cover letter stating purpose of visit", category: "other", status: "mandatory", icon: "FileText", iconColor: "text-slate-600", iconBg: "bg-slate-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance for the stay", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
    ],
    conditionalGroups: [
      {
        groupTitle: "If Travelling via Yellow Fever Zone",
        groupIcon: "HeartPulse",
        documents: [
          { id: "yellow-fever-cert", title: "Yellow Fever Vaccination Certificate", description: "Required if arriving from or transiting through yellow fever endemic countries", category: "other", status: "conditional", conditionalNote: "If arriving from endemic areas", icon: "HeartPulse", iconColor: "text-red-600", iconBg: "bg-red-50" },
        ],
      },
    ],
    importantNotes: [
      { type: "warning", title: "Children Travelling", points: ["Children require an unabridged birth certificate and parental consent affidavit — applies to all nationalities travelling with minors"] },
      { type: "info", title: "Application Process", points: ["Apply at the South African High Commission or VFS Global in your city", "Biometrics may be required — check with the consulate"] },
    ],
  },

  kenya: {
    countryKey: "kenya",
    countryName: "Kenya",
    flag: "🇰🇪",
    visaType: "East Africa Tourist Visa / eVisa",
    processingTime: "3–5 working days",
    validity: "90 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Nairobi", "Mombasa"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "evisa-form", title: "Completed eVisa Application Form", description: "Kenya eVisa at evisa.go.ke", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "yellow-fever-cert", title: "Yellow Fever Vaccination Certificate", description: "Certificate required if arriving from or transiting through yellow fever endemic areas", category: "other", status: "mandatory", icon: "HeartPulse", iconColor: "text-red-600", iconBg: "bg-red-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "warning", title: "Yellow Fever Vaccination", points: ["Yellow Fever Vaccination Certificate required if arriving from or transiting through yellow fever endemic areas", "Certificate must be presented at immigration on arrival"] },
      { type: "info", title: "East Africa Tourist Visa", points: ["Consider the East Africa Tourist Visa (USD 100) which covers Kenya, Uganda, and Rwanda on a single visa"] },
    ],
  },

  tanzania: {
    countryKey: "tanzania",
    countryName: "Tanzania",
    flag: "🇹🇿",
    visaType: "Tourist eVisa",
    processingTime: "3–5 working days",
    validity: "90 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Zanzibar", "Dar es Salaam"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "evisa-form", title: "Completed eVisa Application Form", description: "Tanzania eVisa at eservices.immigration.go.tz", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "yellow-fever-cert", title: "Yellow Fever Vaccination Certificate", description: "Certificate required if arriving from or transiting through yellow fever endemic areas", category: "other", status: "mandatory", icon: "HeartPulse", iconColor: "text-red-600", iconBg: "bg-red-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "warning", title: "Yellow Fever Vaccination", points: ["Yellow Fever Vaccination Certificate required if arriving from or transiting through yellow fever endemic areas", "Certificate must be presented at immigration on arrival"] },
      { type: "info", title: "eVisa Process", points: ["Apply online at least 5 working days in advance", "Visa on arrival also available at Julius Nyerere International Airport"] },
    ],
  },

  morocco: {
    countryKey: "morocco",
    countryName: "Morocco",
    flag: "🇲🇦",
    visaType: "Visa Required",
    processingTime: "5–10 working days",
    validity: "90 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Marrakech", "Casablanca"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "visa-form", title: "Completed Visa Application Form", description: "Morocco visa application form from the embassy", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "travel-insurance", title: "Travel Health Insurance", description: "Valid travel health insurance for the stay", category: "insurance", status: "mandatory", icon: "Shield", iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "info", title: "Visa Application", points: ["Apply at the Embassy of Morocco in New Delhi", "Processing typically takes 5–7 working days"] },
      { type: "warning", title: "Passport Validity", points: ["Passport must be valid for at least 6 months from travel date"] },
    ],
  },

  ethiopia: {
    countryKey: "ethiopia",
    countryName: "Ethiopia",
    flag: "🇪🇹",
    visaType: "Tourist eVisa",
    processingTime: "3–5 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Addis Ababa"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "evisa-form", title: "Completed eVisa Application Form", description: "Ethiopia eVisa at evisa.et", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "yellow-fever-cert", title: "Yellow Fever Vaccination Certificate", description: "Required if arriving from or transiting through yellow fever endemic areas", category: "other", status: "mandatory", icon: "HeartPulse", iconColor: "text-red-600", iconBg: "bg-red-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "warning", title: "Yellow Fever Vaccination", points: ["Yellow Fever Vaccination Certificate required if arriving from endemic areas", "Certificate must be presented at immigration on arrival"] },
      { type: "info", title: "eVisa Process", points: ["Apply at evisa.et at least 3 working days in advance", "Visa on arrival also available at Addis Ababa Bole International Airport"] },
    ],
  },

  nigeria: {
    countryKey: "nigeria",
    countryName: "Nigeria",
    flag: "🇳🇬",
    visaType: "Visa Required",
    processingTime: "7–14 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Lagos", "Abuja"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "visa-form", title: "Completed Visa Application Form", description: "Nigeria visa application form from the embassy", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "yellow-fever-cert", title: "Yellow Fever Vaccination Certificate", description: "Mandatory for entry to Nigeria", category: "other", status: "mandatory", icon: "HeartPulse", iconColor: "text-red-600", iconBg: "bg-red-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "warning", title: "Yellow Fever Vaccination Required", points: ["Yellow Fever Vaccination Certificate is MANDATORY for entry to Nigeria", "You will be denied entry without a valid certificate"] },
      { type: "info", title: "Application Process", points: ["Apply at the Nigerian High Commission in New Delhi or consulate in your city", "Invitation letter from a Nigeria-based contact strengthens the application"] },
    ],
  },

  ghana: {
    countryKey: "ghana",
    countryName: "Ghana",
    flag: "🇬🇭",
    visaType: "Visa Required",
    processingTime: "7–14 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Accra"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "visa-form", title: "Completed Visa Application Form", description: "Ghana visa application form from the embassy", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "employment-proof", title: "Proof of Employment / NOC", description: "Employment letter or No Objection Certificate", category: "employment", status: "mandatory", icon: "Briefcase", iconColor: "text-amber-600", iconBg: "bg-amber-50" },
      { id: "yellow-fever-cert", title: "Yellow Fever Vaccination Certificate", description: "Mandatory for entry to Ghana", category: "other", status: "mandatory", icon: "HeartPulse", iconColor: "text-red-600", iconBg: "bg-red-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "warning", title: "Yellow Fever Vaccination Required", points: ["Yellow Fever Vaccination Certificate is MANDATORY for entry to Ghana", "You will be denied entry without a valid certificate"] },
      { type: "info", title: "Application Process", points: ["Apply at the Ghana High Commission in New Delhi", "eVisa also available at oisghana.com"] },
    ],
  },

  uganda: {
    countryKey: "uganda",
    countryName: "Uganda",
    flag: "🇺🇬",
    visaType: "East Africa Tourist Visa / eVisa",
    processingTime: "3–5 working days",
    validity: "90 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Kampala"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "evisa-form", title: "Completed eVisa Application Form", description: "Uganda eVisa at visas.immigration.go.ug", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "yellow-fever-cert", title: "Yellow Fever Vaccination Certificate", description: "Mandatory for entry to Uganda", category: "other", status: "mandatory", icon: "HeartPulse", iconColor: "text-red-600", iconBg: "bg-red-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "warning", title: "Yellow Fever Vaccination Required", points: ["Yellow Fever Vaccination Certificate is MANDATORY for entry to Uganda"] },
      { type: "info", title: "East Africa Tourist Visa", points: ["Consider the East Africa Tourist Visa (USD 100) covering Uganda, Kenya and Rwanda on a single visa"] },
    ],
  },

  rwanda: {
    countryKey: "rwanda",
    countryName: "Rwanda",
    flag: "🇷🇼",
    visaType: "Tourist eVisa",
    processingTime: "3–5 working days",
    validity: "30 days",
    serviceFee: "Contact for pricing",
    searchAliases: ["Kigali"],
    mandatoryDocuments: [
      ...UNIVERSAL_3,
      { id: "evisa-form", title: "Completed eVisa Application Form", description: "Rwanda eVisa at irembo.gov.rw", category: "other", status: "mandatory", icon: "ScanLine", iconColor: "text-teal-600", iconBg: "bg-teal-50" },
      { id: "flight-ticket", title: "Return / Onward Flight Ticket", description: "Confirmed return or onward flight booking", category: "travel", status: "mandatory", icon: "Plane", iconColor: "text-sky-600", iconBg: "bg-sky-50" },
      { id: "hotel-booking", title: "Hotel Booking / Accommodation Proof", description: "Confirmed hotel reservation for duration of stay", category: "accommodation", status: "mandatory", icon: "Building2", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { id: "bank-statement", title: "Bank Statement (Last 3 Months)", description: "Bank statement showing sufficient funds", category: "financial", status: "mandatory", icon: "Banknote", iconColor: "text-green-600", iconBg: "bg-green-50" },
      { id: "yellow-fever-cert", title: "Yellow Fever Vaccination Certificate", description: "Required if arriving from or transiting through yellow fever endemic areas", category: "other", status: "mandatory", icon: "HeartPulse", iconColor: "text-red-600", iconBg: "bg-red-50" },
    ],
    conditionalGroups: [],
    importantNotes: [
      { type: "warning", title: "Yellow Fever Vaccination", points: ["Yellow Fever Vaccination Certificate required if arriving from endemic areas"] },
      { type: "info", title: "eVisa & Visa on Arrival", points: ["eVisa available at irembo.gov.rw", "Visa on arrival also available at Kigali International Airport for Indian passport holders"] },
    ],
  },
};

// Helper: get all countries as a flat search list
export const getAllCountriesForSearch = () => {
  return Object.values(visaDocumentData).map((c) => ({
    key: c.countryKey,
    name: c.countryName,
    flag: c.flag,
    visaType: c.visaType,
    aliases: c.searchAliases,
  }));
};

