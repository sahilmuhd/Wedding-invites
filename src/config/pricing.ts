/**
 * Pricing plans shown in the Pricing section. Edit here to change them.
 * Only confirmed features are listed.
 */
export interface PricingPlan {
  id: "classic" | "premium" | "signature";
  name: string;
  /** null = shown as "On request" until the owner sets a price. */
  price: number | null;
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
    {
      id: "signature",
      name: "Signature",
      // TODO(owner): set the Signature price (e.g. 2499). Until then the card shows "On request".
      price: null,
      features: [
        "Everything in Premium, plus:",
        "Private guest desk with secure login",
        "Live RSVP list and guest counts per event",
        "QR ticket for every guest, scanned at the door",
        "Separate staff login for the check-in desk",
        "Approve guest wishes before they appear",
        "Download the guest list as a spreadsheet",
      ],
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
export const startingPrice = Math.min(
  ...pricing.plans.map((p) => p.price).filter((p): p is number => p !== null),
);

export function formatPrice(amount: number | null): string {
  return amount === null ? "On request" : `${pricing.currency}${amount.toLocaleString(pricing.locale)}`;
}
