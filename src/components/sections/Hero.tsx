import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { hero } from "@/config/content";
import { generalEnquiryLink } from "@/lib/whatsapp";
import { designCount } from "@/lib/invitations";
import { buttonClass } from "@/components/ui/Button";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { RichTitle } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-page grid items-center gap-8 pb-16 pt-7 md:grid-cols-[1.1fr_1fr] md:gap-12 md:pb-[120px] md:pt-20">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title" className="mt-3 text-[40px] leading-[44px] text-balance md:mt-5 md:text-[64px] md:leading-[70px]">
            <RichTitle t={hero.title} />
          </h1>
          <p className="mt-4 max-w-[34rem] text-ink-soft md:mt-6 md:text-[17px] md:leading-7">{hero.sub}</p>
          <p className="mt-4 text-sm text-ink md:mt-6">
            {hero.reassurance.map((r, i) => (
              <span key={r}>
                {i > 0 && <span aria-hidden="true" className="mx-1.5 text-maroon/40">·</span>}
                <span className="whitespace-nowrap">{r}</span>
              </span>
            ))}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 md:mt-8">
            <WhatsAppLink id="hero-cta" href={generalEnquiryLink()} location="hero" className={`${buttonClass("whatsapp")} w-full sm:w-auto`}>
              <WhatsAppIcon className="size-5" /> {hero.cta}
            </WhatsAppLink>
            <a href="#designs" className="inline-flex min-h-11 items-center gap-1.5 text-sm text-maroon underline decoration-maroon/30 underline-offset-4 hover:decoration-maroon">
              {hero.secondary} ({designCount}) <ArrowDown className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <PhoneFrame className="mx-auto w-[220px] md:w-[300px]" aspect="aspect-[480/850]">
          <Image
            src="/videos/hero-loop-poster.jpg"
            alt="A Nikah invitation with a wax seal, about to open"
            fill
            preload
            fetchPriority="high"
            loading="eager"
            sizes="(min-width: 768px) 300px, 220px"
            className="object-cover"
          />
          <HeroVideo src="/videos/hero-loop.mp4" />
        </PhoneFrame>
      </div>
    </section>
  );
}
