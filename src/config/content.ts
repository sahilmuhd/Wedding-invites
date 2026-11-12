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
  text: "Real invitations, exactly as guests see them on their phones. Tap for sound.",
  videos: [
    {
      src: "/videos/demo-ajish-sikha.mp4",
      poster: "/videos/demo-ajish-sikha-cover.jpg",
      title: "Ajish & Sikha",
      text: "Velvet curtains part onto their journey, with the day’s schedule.",
    },
    {
      src: "/videos/demo-fidha-hatib.mp4",
      poster: "/videos/demo-fidha-hatib-cover.jpg",
      title: "Fidha & Hatib",
      text: "Curtains open into a candlelit ballroom.",
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

/** Signature plan's guest desk. Screenshots are the real dashboard rendered with sample data. */
export const guestDesk = {
  eyebrow: "Signature plan",
  title: { before: "Know who’s coming. ", em: "Welcome", after: " them at the door." },
  text: "Your own private guest desk: see every RSVP as it arrives, and check guests in with a quick QR scan on the day.",
  points: [
    "Live RSVP list and guest counts for each event",
    "A QR ticket for every guest, scanned at the door",
    "A separate staff login for the check-in desk",
    "Approve guest wishes before they appear",
  ],
  screens: [
    { src: "/guest-desk/overview.webp", caption: "Overview", alt: "Guest desk overview: total RSVPs, expected guests and check-ins per event" },
    { src: "/guest-desk/checkin.webp", caption: "Check-in at the door", alt: "Check-in screen: camera QR scanner and a guest marked as checked in" },
    { src: "/guest-desk/guests.webp", caption: "Guest list", alt: "Guest list with search, filters and CSV export" },
    { src: "/guest-desk/wishes.webp", caption: "Wishes to approve", alt: "Guest wishes waiting for approval" },
  ],
  note: "Shown with sample guests.",
  link: "See the Signature plan",
} as const;

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
    q: "What’s the difference between the plans?",
    a: "Premium adds RSVP, a photo gallery and add-to-calendar. Signature adds a private guest desk: a live RSVP list, QR check-in at the door, a staff login and wish approval.",
  },
  // TODO(owner): confirm the hosting period, then add:
  // { q: "How long does my link stay live?", a: "…" },
];

export const closing = {
  title: "Let’s write your invitation.",
  text: "Send us a message on WhatsApp with your date. We’ll take it from there.",
  cta: "Chat on WhatsApp",
} as const;
