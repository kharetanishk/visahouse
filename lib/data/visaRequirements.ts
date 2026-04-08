export type VisaRequirement = {
  visaType: string;
  processingTime: string;
  documents: string[];
  notes: string;
};

export type VisaRequirementsMap = Record<
  string,
  Record<string, VisaRequirement>
>;

export const visaRequirements: VisaRequirementsMap = {
  India: {
    "UAE / Dubai": {
      visaType: "e-Visa",
      processingTime: "3–5 working days",
      documents: [
        "Passport copy (front + back, valid 6+ months)",
        "Passport-size photograph (recent, white background)",
        "Confirmed return flight tickets (if available)",
        "Hotel booking or address details (if available)",
      ],
      notes:
        "UAE visa type and processing time depend on travel dates and visa category. We confirm eligibility and checklist during consultation.",
    },
    "United Kingdom": {
      visaType: "Visa Required",
      processingTime: "15–20 working days",
      documents: [
        "Passport (current + old, if any)",
        "Bank statements (last 6 months)",
        "Employment proof / business documents",
        "Travel itinerary and accommodation details",
        "Cover letter explaining purpose of visit",
      ],
      notes:
        "Biometrics appointment is required. Apply early to account for appointment slots and additional verification.",
    },
    "United States": {
      visaType: "Visa Required",
      processingTime: "30–60 working days",
      documents: [
        "Passport (valid 6+ months)",
        "DS-160 confirmation",
        "Appointment confirmation",
        "Financial documents (bank statements, ITR)",
        "Employment/education proof",
      ],
      notes:
        "US visa requires interview and biometrics. Timeline depends heavily on appointment availability.",
    },
    "Schengen (Europe)": {
      visaType: "Visa Required",
      processingTime: "10–15 working days",
      documents: [
        "Passport (valid 3+ months beyond return date)",
        "Travel insurance (Schengen compliant)",
        "Flight itinerary",
        "Hotel bookings",
        "Bank statements (last 3–6 months)",
        "Leave letter / NOC from employer",
      ],
      notes:
        "We help choose the correct consulate based on itinerary and ensure insurance + documentation match Schengen requirements.",
    },
    Singapore: {
      visaType: "e-Visa",
      processingTime: "5–7 working days",
      documents: [
        "Passport copy (valid 6+ months)",
        "Recent photograph",
        "Cover letter (as required)",
        "Travel itinerary",
      ],
      notes:
        "Additional documents may be needed depending on occupation and travel history.",
    },
    Thailand: {
      visaType: "Visa on Arrival",
      processingTime: "2–3 working days",
      documents: [
        "Passport (valid 6+ months)",
        "Return/onward ticket",
        "Hotel booking / address proof",
        "Funds proof as per latest rules",
      ],
      notes:
        "Visa policies can change seasonally. We verify the latest entry rules before you fly.",
    },
    Australia: {
      visaType: "e-Visa",
      processingTime: "15–20 working days",
      documents: [
        "Passport copy",
        "Financials (bank statements, ITR)",
        "Employment proof / business documents",
        "Travel itinerary",
        "Invitation letter (if applicable)",
      ],
      notes:
        "Australia may request additional information. We prepare your application to reduce back-and-forth.",
    },
    Canada: {
      visaType: "Visa Required",
      processingTime: "20–30 working days",
      documents: [
        "Passport copy",
        "Bank statements (last 6 months)",
        "ITR (last 2–3 years)",
        "Employment proof",
        "Travel itinerary and purpose letter",
      ],
      notes:
        "Biometrics are typically required. Processing can vary significantly by season and IRCC workload.",
    },
    Japan: {
      visaType: "Visa Required",
      processingTime: "7–12 working days",
      documents: [
        "Passport copy",
        "Photograph",
        "Bank statements",
        "Day-wise itinerary",
        "Hotel bookings",
      ],
      notes:
        "We ensure your itinerary and hotel bookings match the embassy format expectations.",
    },
    Malaysia: {
      visaType: "e-Visa",
      processingTime: "3–7 working days",
      documents: [
        "Passport copy (valid 6+ months)",
        "Photograph",
        "Flight itinerary",
        "Accommodation details",
      ],
      notes:
        "Eligibility differs by visa category and travel purpose. We confirm the right route for your trip.",
    },
  },
};

