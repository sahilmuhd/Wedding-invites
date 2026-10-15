import { brand } from "@/config/brand";

/** Build a wa.me link with a properly encoded message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const generalEnquiryLink = () =>
  whatsappLink(`Hello ${brand.name}, I'd like to create a wedding invitation. Please share more details.`);

export const designEnquiryLink = (designName: string) =>
  whatsappLink(
    `Hello ${brand.name}, I'm interested in customizing the ${designName} wedding invitation. Please share more details.`,
  );

export const packageEnquiryLink = (packageName: string, price: number) =>
  whatsappLink(
    `Hello ${brand.name}, I would like to book the ${packageName} package (₹${price.toLocaleString("en-IN")}) for our wedding invitation website. Please let me know the details needed!`,
  );

