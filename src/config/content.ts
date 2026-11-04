import { Palette, Zap, CheckCheck, MapPin, Music2, Images, Timer, Smartphone, type LucideIcon } from "lucide-react";

export const features: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Palette, title: "Personalised design", text: "Made around your colours, photos and culture." },
  { icon: Zap, title: "24-hour delivery", text: "Share your details today, get your link within 24 hours." },
  { icon: CheckCheck, title: "RSVP included", text: "Guests confirm attendance right on the page." },
  { icon: MapPin, title: "Location maps", text: "One-tap Google Maps directions for every venue." },
  { icon: Music2, title: "Music", text: "Your favourite song plays as they open it." },
  { icon: Images, title: "Photo gallery", text: "Pre-wedding photos and video in a smooth gallery." },
  { icon: Timer, title: "Countdown", text: "A live countdown to the big day." },
  { icon: Smartphone, title: "Mobile-friendly", text: "Designed for the phone it will be opened on." },
];

export const steps = [
  { title: "Choose a design", text: "Browse the gallery and open any invitation to see it live." },
  { title: "Share your details", text: "Send names, date, venue and photos on WhatsApp, and pay a ₹200 advance to reserve your slot." },
  { title: "Receive your invitation link", text: "Get your personal link within 24 hours. Approve the preview, pay the balance, and share it with one tap." },
] as const;

export const faqs = [
  {
    q: "How long does it take to receive my invitation?",
    a: "Delivery is within 24 hours of receiving your details and the ₹200 advance.",
  },
  {
    q: "How do I order?",
    a: "Pick a design from the gallery and tap “Customize This Design”. It opens WhatsApp with the design name filled in, and you can share your details there.",
  },
  {
    q: "How does payment work?",
    a: "You pay a ₹200 advance by UPI to reserve your slot. It is adjusted in your total. The balance is paid after you approve the preview, and your invitation is finalised once it is received.",
  },
  {
    q: "What does my invitation include?",
    a: "A personalised invitation website with RSVP, Google Maps directions, music, a photo gallery, a live countdown and a mobile-friendly layout. Features are chosen to suit your event.",
  },
  {
    q: "Can the design match our culture and colours?",
    a: "Yes. Every invitation is made around your colours, photos and traditions. We have Nikah, Hindu, Christian, engagement, reception and housewarming designs.",
  },
  {
    q: "Is hosting included?",
    a: "Yes, hosting is free.",
  },
  {
    q: "How do guests open the invitation?",
    a: "You receive one link to share on WhatsApp or anywhere else. It opens on any phone, with nothing to install.",
  },
] as const;
