/**
 * Real, approved testimonials only. The "From our couples" section stays hidden while this is empty.
 *
 * Example:
 *   { quote: "…exact words from the couple…", names: "Aisha & Rahul", event: "Nikah", date: "Oct 2026" }
 */
export interface Testimonial {
  quote: string;
  names: string;
  event: string;
  date: string;
}

export const testimonials: Testimonial[] = [];
