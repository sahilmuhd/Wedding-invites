/**
 * Single source of truth for branding and business contact details.
 * Change the values here and the whole site updates.
 */
export const brand = {
  // Matches the Instagram name and the wordmark in public/brand/wordmark-maroon.svg.
  name: "weddingwebsites",
  tagline: "Your wedding, beautifully invited.",
  description:
    "Personalised wedding invitation websites with your song, a live countdown and one-tap directions. Nikah, Hindu, Christian, engagement, reception and housewarming designs. Ready in 24 hours.",
  /** Display format of the business phone number. */
  phoneDisplay: "+91 75609 43996",
  /** Digits only, with country code, used for wa.me links. */
  whatsappNumber: "917560943996",
  instagramHandle: "@weddingwebsites.in",
  instagramUrl: "https://www.instagram.com/weddingwebsites.in",
  /**
   * Public site URL, used for canonical links, sitemap and Open Graph.
   * Never falls back to the Vercel deployment address (that pointed search engines at the old domain).
   */
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://invite.weddinginvitation.family").replace(/\/$/, ""),
} as const;

export const navLinks = [
  { href: "#designs", label: "Designs" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
] as const;
