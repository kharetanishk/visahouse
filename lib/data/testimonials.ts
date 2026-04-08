export type Testimonial = {
  name: string;
  city: string;
  visaType: string;
  country: string;
  rating: number;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Client Name",
    city: "Mumbai",
    visaType: "Dubai Tourist Visa",
    country: "🇦🇪 UAE",
    rating: 5,
    quote: "[ Testimonial coming soon ]",
  },
  {
    name: "Client Name",
    city: "Delhi",
    visaType: "Singapore Tourist Visa",
    country: "🇸🇬 Singapore",
    rating: 5,
    quote: "[ Testimonial coming soon ]",
  },
  {
    name: "Client Name",
    city: "Pune",
    visaType: "Schengen Tourist Visa",
    country: "🇩🇪 Schengen",
    rating: 5,
    quote: "[ Testimonial coming soon ]",
  },
  {
    name: "Client Name",
    city: "Bengaluru",
    visaType: "UK Visitor Visa",
    country: "🇬🇧 United Kingdom",
    rating: 5,
    quote: "[ Testimonial coming soon ]",
  },
];

