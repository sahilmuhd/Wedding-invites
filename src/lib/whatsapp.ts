import { brand } from "@/config/brand";
import { formatPrice } from "@/config/pricing";

/** Where a WhatsApp tap came from (analytics `location`). */
export type CtaLocation =
  | "header"
  | "hero"
  | "sheet"
  | "pricing-classic"
  | "pricing-premium"
  | "pricing-signature"
  | "closing"
  | "bar"
  | "empty-state";

/** Build a wa.me link with a properly encoded message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const generalEnquiryLink = () =>
  whatsappLink(`Hi ${brand.name}! I'd like a wedding invitation website. Our event date is: `);

export const designEnquiryLink = (design: string, category: string) =>
  whatsappLink(`Hi ${brand.name}! I'd like to book the "${design}" design (${category}). Our event date is: `);

export const planEnquiryLink = (plan: string, price: number | null) =>
  whatsappLink(
    `Hi ${brand.name}! I'd like the ${plan} plan${price === null ? "" : ` (${formatPrice(price)})`}. Our event date is: `,
  );
