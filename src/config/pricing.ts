/**
 * Pricing plans shown in the Pricing section. Edit here to change them.
 * Only confirmed features are listed.
 */
export interface PricingPlan {
  id: "classic" | "premium";
  name: string;
  price: number;
  popular?: boolean;
  features: string[];
}

export const pricing = {
  currency: "₹",
  locale: "en-IN",
  advance: 200,
  deliveryTime: "24 hours",
  plans: [
    {
      id: "classic",
      name: "Classic",
      price: 999,
      features: [
        "Personalised invitation website",
        "Background music",
        "Live countdown",
        "One-tap Google Maps",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: 1499,
      popular: true,
      features: ["Everything in Classic, plus:", "RSVP", "Photo gallery", "Add to calendar"],
    },
  ] satisfies PricingPlan[],
} as const;

/*
 * TODO(owner): these were on the old site but are not confirmed. Add back to a plan only if guaranteed.
 *   - "Host & venue coordinator quick-call button"
 *   - "Event itinerary schedule & dress code guide"
 *   - "2 rounds of customizations & revisions"
 *   - "Pre-wedding photo & video gallery (up to 20 photos)"
 *   - "Free lifetime hosting & personal link"
 */

/** Lowest plan price, so "From ₹…" can never drift from the plans. */
export const startingPrice = Math.min(...pricing.plans.map((p) => p.price));

export function formatPrice(amount: number): string {
  return `${pricing.currency}${amount.toLocaleString(pricing.locale)}`;
}
