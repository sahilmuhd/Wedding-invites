/**
 * All homepage copy. Only facts the owner has confirmed belong here:
 * features = music, countdown, maps, RSVP*, photo gallery*, add-to-calendar* (*Premium).
 */
import { CalendarPlus, CheckCheck, Images, MapPin, Music2, Timer, type LucideIcon } from "lucide-react";

export const hero = {
  eyebrow: "Wedding invitation websites",
  /** Rendered as: {before}<em>{em}</em>{after} */
  title: { before: "Your wedding, ", em: "beautifully", after: " invited." },
  sub: "A personalised invitation website for your Nikah, wedding or engagement, with your song, a live countdown and one-tap directions. Ready in 24 hours.",
  reassurance: ["From ₹999", "Book with ₹200", "Pay the rest after you approve"],
  cta: "Start on WhatsApp",
  secondary: "See all designs",
} as const;

export const demo = {
  title: { before: "Watch it ", em: "open", after: "." },
  text: "Recorded on a real phone. Tap for sound.",
  videos: [
    {
      src: "/videos/demo-nikah-1.mp4",
      poster: "/videos/demo-nikah-1-poster.jpg",
      title: "Wax-seal opening",
      text: "A sealed envelope unfolds into the invitation.",
    },
    {
      src: "/videos/demo-nikah-2.mp4",
      poster: "/videos/demo-nikah-2-poster.jpg",
      title: "Arched doors",
      text: "Doors open onto the couple, with music.",
    },
  ],
} as const;

export const designs = {
  title: { before: "{count} designs for ", em: "your", after: " celebration." },
  text: "Tap any design to see it exactly as your guests will. We personalise every one with your names, photos, colours and song.",
  emptyTitle: "Can’t find the one?",
  emptyText: "Tell us what you have in mind.",
  emptyCta: "Ask on WhatsApp",
  more: "Show more",
} as const;

export const features: { icon: LucideIcon; text: string; premium?: boolean }[] = [
  { icon: Music2, text: "Your song plays as they open it" },
  { icon: Timer, text: "A live countdown to the day" },
  { icon: MapPin, text: "One-tap Google Maps directions" },
  { icon: CheckCheck, text: "RSVP", premium: true },
  { icon: Images, text: "Photo gallery", premium: true },
  { icon: CalendarPlus, text: "Add to calendar", premium: true },
];
export const featuresTitle = { before: "Everything your guests need, in ", em: "one link", after: "." } as const;

export const stepsTitle = { before: "Booked in ", em: "three", after: " messages." } as const;
export const steps = [
  { title: "Choose a design.", text: "Tap any design to preview it." },
  { title: "Send your details on WhatsApp.", text: "Names, date, venue and photos. Reserve your slot with a ₹200 UPI advance." },
  { title: "Approve and share.", text: "Your preview is ready in 24 hours. Approve it, pay the balance and share your link." },
] as const;

export const pricingCopy = {
  title: { before: "One-time price. ", em: "No surprises.", after: "" },
  terms: ["₹200 UPI advance to book", "Balance after you approve the preview", "Delivered in 24 hours"],
} as const;

export const testimonialsTitle = { before: "From our ", em: "couples", after: "." } as const;

export const faqTitle = { before: "Questions, ", em: "answered", after: "." } as const;
export const faqs: { q: string; a: string }[] = [
  { q: "How fast will I get it?", a: "Within 24 hours of receiving your details and the ₹200 advance." },
  {
    q: "How do I pay?",
    a: "₹200 by UPI to book, adjusted in your total. The balance is paid after you approve the preview.",
  },
  {
    q: "Can it match our colours and traditions?",
    a: "Yes. Every invitation is personalised with your colours, photos and traditions.",
  },
  { q: "Do guests need an app?", a: "No. It’s one link that opens on any phone." },
  {
    q: "What’s the difference between Classic and Premium?",
    a: "Premium adds RSVP, a photo gallery and add-to-calendar.",
  },
  // TODO(owner): confirm the hosting period, then add:
  // { q: "How long does my link stay live?", a: "…" },
];

export const closing = {
  title: "Let’s write your invitation.",
  text: "Send us a message on WhatsApp with your date. We’ll take it from there.",
  cta: "Chat on WhatsApp",
} as const;
