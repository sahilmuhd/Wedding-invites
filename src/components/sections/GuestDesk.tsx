import Image from "next/image";
import { ArrowDown, Check } from "lucide-react";
import { guestDesk } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhoneFrame } from "@/components/ui/PhoneFrame";

/** Signature plan showcase: the real guest-desk dashboard, shown with sample data. */
export function GuestDesk() {
  return (
    <section id="guest-desk" aria-labelledby="guest-desk-title" className="section overflow-hidden">
      <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <div data-reveal>
          <SectionHeading id="guest-desk-title" eyebrow={guestDesk.eyebrow} title={guestDesk.title} text={guestDesk.text} />
          <ul className="mt-6 space-y-3">
            {guestDesk.points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <Check className="mt-1 size-4 shrink-0 text-maroon" aria-hidden="true" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <a
            href="#signature"
            className="mt-7 inline-flex min-h-11 items-center gap-1.5 text-maroon underline decoration-maroon/30 underline-offset-4 hover:decoration-maroon"
          >
            {guestDesk.link} <ArrowDown className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div data-reveal>
          <ul
            aria-label="Guest desk screens"
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-2 lg:gap-6 lg:overflow-visible"
          >
            {guestDesk.screens.map((s, i) => (
              <li key={s.src} className={`w-[62vw] max-w-[15rem] shrink-0 snap-center lg:w-auto lg:max-w-none ${i % 2 ? "lg:translate-y-10" : ""}`}>
                <PhoneFrame aspect="aspect-[390/844]">
                  <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1024px) 240px, 62vw" className="object-cover object-top" />
                </PhoneFrame>
                <p className="mt-3 text-center text-sm text-ink-soft">{s.caption}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-center text-xs text-ink-soft lg:mt-14">{guestDesk.note}</p>
        </div>
      </div>
    </section>
  );
}
