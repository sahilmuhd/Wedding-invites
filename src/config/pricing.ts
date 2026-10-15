/**
 * Pricing taken from the original site data (legacy/samples.js):
 * DEFAULT_PRICE = 2499, and two showcase designs priced at 2999.
 * Edit here to change what the Pricing section shows. Nothing else is invented.
 * The lower category prices in legacy/samples.deduped.js were auto-generated
 * and are NOT used because they were never verified.
 */
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  badge?: string;
  popular?: boolean;
  tagline: string;
  deliveryTime: string;
  features: string[];
}

export const pricing = {
  currency: "₹",
  locale: "en-IN",
  startingPrice: 999,
  premiumPrice: 1499,
  premiumNote: "Affordable luxury for every couple. No hidden charges.",
  deliveryTime: "48 hours",
  plans: [
    {
      id: "classic",
      name: "Classic / Starter",
      price: 999,
      tagline: "Essential digital invitation for single-event celebrations.",
      deliveryTime: "48 hours",
      features: [
        "Single-event digital invitation website",
        "Personalized colors, photos & event story",
        "Background song of your choice",
        "One-tap Google Maps venue directions",
        "Live wedding countdown timer",
        "Mobile-optimized for easy WhatsApp sharing",
        "Free lifetime hosting & personal link",
      ],
    },
    {
      id: "premium",
      name: "Premium Experience",
      price: 1499,
      popular: true,
      badge: "Best Value",
      tagline: "Our most popular complete package with RSVP & photo gallery.",
      deliveryTime: "48 hours",
      features: [
        "Everything in Classic, plus:",
        "Interactive online RSVP attendance tracking",
        "Pre-wedding photo & video gallery (up to 20 photos)",
        "Add to Google Calendar & Apple Calendar button",
        "Host & venue coordinator quick-call button",
        "Event itinerary schedule & dress code guide",
        "2 rounds of customizations & revisions",
      ],
    },
    {
      id: "grand-suite",
      name: "Multi-Event Grand Suite",
      price: 2499,
      tagline: "For big celebrations with multiple functions & ceremonies.",
      deliveryTime: "24–48 hours",
      features: [
        "Everything in Premium, plus:",
        "Multi-event timeline (Haldi, Mehendi, Sangeet, Wedding, Reception)",
        "Separate venue maps & timings for each function",
        "Personalized digital Save-the-Date image card",
        "Digital guestbook for wishes & blessings",
        "Optional custom domain setup (e.g. couple.com)",
        "Priority 24h express delivery & VIP WhatsApp concierge",
      ],
    },
  ] satisfies PricingPlan[],
  /** Included items for backwards compatibility. */
  included: [
    "Custom design around your colours, photos and culture",
    "Delivery in 48 hours — share your reference today, get your link in 2 days",
    "RSVP — guests confirm attendance right on the page",
    "One-tap Google Maps directions for every venue",
    "Your favourite song plays as guests open it",
    "Pre-wedding photos and video in a smooth gallery",
    "Live countdown to the big day",
    "Designed for the phone it will be opened on",
    "Free hosting",
  ],
} as const;

export function formatPrice(amount: number): string {
  return `${pricing.currency}${amount.toLocaleString(pricing.locale)}`;
}

