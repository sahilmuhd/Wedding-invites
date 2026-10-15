/**
 * Single source of truth for branding and business contact details.
 * Change the values here and the whole site updates.
 */
export const brand = {
  name: "Serein Atelier",
  tagline: "Your Story. Beautifully Invited.",
  heroHeadline: "Invite them with a story, not a card.",
  description:
    "Personalised digital wedding invitation websites with music, countdown, maps and RSVP. Nikah, Hindu, Christian, engagement, reception and housewarming designs.",
  /** Display format of the business phone number. */
  phoneDisplay: "+91 75609 43996",
  /** Digits only, with country code, used for wa.me links. */
  whatsappNumber: "917560943996",
  /**
   * Public site URL, e.g. https://example.com — supplied via NEXT_PUBLIC_SITE_URL.
   * Left empty until the real domain is known (no canonical/sitemap URLs are invented).
   */
  siteUrl: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    // Provided by the host at build time when deployed there; empty locally. Never hard-coded.
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "")
  ).replace(/\/$/, ""),
} as const;

export const navLinks = [
  { href: "#featured", label: "Featured" },
  { href: "#gallery", label: "Gallery" },
  { href: "#why-us", label: "Why us" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
] as const;
