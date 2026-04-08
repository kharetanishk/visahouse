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

  // ═══════════════════════════════════════════════════════════
  // ADD MORE COUNTRIES BELOW — copy the dubai block above
  // and change countryKey, countryName, documents etc.
  // ═══════════════════════════════════════════════════════════
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

