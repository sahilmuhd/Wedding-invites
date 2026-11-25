/**
 * Pricing plans shown in the Pricing section. Edit here to change them.
 * Only features the owner has confirmed are listed.
 */
export interface PricingPlan {
  id: "classic" | "premium" | "signature";
  name: string;
  /** null = shown as "On request". */
  price: number | null;
  popular?: boolean;
  /** One line telling a couple who this plan is for. */
  bestFor: string;
  features: string[];
}

export const pricing = {
  currency: "₹",
  locale: "en-IN",
  deliveryTime: "24 hours",
  plans: [
    {
      id: "classic",
      name: "Classic",
      price: 999,
      bestFor: "A beautiful invitation to share.",
      features: [
        "Personalised invitation website",
        "Your song, a live countdown and one-tap Google Maps",
        "Up to 2 photos",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: 1499,
      popular: true,
      bestFor: "Know who's coming.",
      features: [
        "Everything in Classic, plus:",
        "Photo gallery with many photos",
        "RSVP: replies collected in a Google Sheet",
        "Guest wishes box (wishes sent to you on WhatsApp)",
        "Add to calendar",
      ],
    },
    {
      id: "signature",
      name: "Signature",
      price: 2500,
      bestFor: "Manage every guest, right up to the day.",
      features: [
        "Everything in Premium, plus:",
        "Private guest desk with secure login",
        "Live RSVP list and guest counts per event",
        "QR ticket for every guest, scanned at the door",
        "Separate staff login for the check-in desk",
        "Approve guest wishes and show them on your invitation",
        "Download the guest list as a spreadsheet",
      ],
    },
  ] satisfies PricingPlan[],

  /** Side-by-side comparison. Values: true = included, false = not included, string = details. */
  compare: [
    { label: "Personalised invitation website", values: [true, true, true] },
    { label: "Your song, live countdown, Google Maps", values: [true, true, true] },
    { label: "Photos", values: ["Up to 2", "Gallery, many photos", "Gallery, many photos"] },
    { label: "Guests can RSVP", values: [false, true, true] },
    { label: "Where you see RSVPs", values: [false, "Google Sheet", "Your own guest desk, live"] },
    { label: "Guest wishes", values: [false, "Wishes box, sent to you on WhatsApp", "Approve and show on invitation"] },
    { label: "Show wishes on your invitation", values: [false, "Add-on, from ₹200", true] },
    { label: "Add to calendar", values: [false, true, true] },
    { label: "QR ticket for each guest, scanned at the door", values: [false, false, true] },
    { label: "Staff login for the check-in desk", values: [false, false, true] },
    { label: "Download the guest list", values: [false, "From the Google Sheet", true] },
    { label: "Delivery", values: ["24 hours", "24 hours", "24 hours"] },
  ] satisfies { label: string; values: (boolean | string)[] }[],

  addons: [{ name: "Show guests' wishes on your invitation (Premium)", from: 200 }],

  /** A brand-new design made for the couple. */
  custom: {
    from: 1499,
    title: "Want a design that's only yours?",
    text: "We create a brand-new theme for you: your colours, your style, or inspired by any reference you love.",
    cta: "Ask about a custom design",
  },
} as const;

/** Lowest plan price, so "From ₹…" can never drift from the plans. */
export const startingPrice = Math.min(
  ...pricing.plans.map((p) => p.price).filter((p): p is number => p !== null),
);

export function formatPrice(amount: number | null): string {
  return amount === null ? "On request" : `${pricing.currency}${amount.toLocaleString(pricing.locale)}`;
}
