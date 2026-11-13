import { getImageProps } from "next/image";
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

/** 1×1 transparent GIF: what phones "load" for the hidden poster. */
const BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const { props: poster } = getImageProps({
  src: "/videos/hero-caricature-poster.jpg",
  alt: "",
  width: 540,
  height: 960,
  sizes: "300px",
});

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-page grid items-center gap-8 pb-16 pt-7 md:grid-cols-[1.1fr_1fr] md:gap-12 md:pb-[120px] md:pt-20">
        <div className="min-w-0">
          <p className="eyebrow">{hero.eyebrow}</p>
          <div className="mt-3 flex items-center gap-4 md:mt-5 md:block">
            <h1 id="hero-title" className="min-w-0 flex-1 text-[40px] leading-[44px] text-balance md:text-[64px] md:leading-[70px]">
              <RichTitle t={hero.title} />
            </h1>
            {/* Phones only: the couple in a rounded "stamp" tile beside the headline.
                Rounded square (not a circle) so both standing figures fill the frame without heads being cut. */}
            <div
              aria-hidden="true"
              className="relative size-[116px] shrink-0 overflow-hidden rounded-[30px] border-2 border-maroon bg-white shadow-[0_0_0_4px_#fff,0_0_0_5px_rgba(90,20,36,0.25),0_14px_30px_-14px_rgba(90,20,36,0.5)] md:hidden"
            >
              <picture>
                <source media="(max-width: 767px)" srcSet="/videos/hero-tile.jpg" />
                <img src={BLANK} alt="" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              </picture>
              <HeroVideo src="/videos/hero-duo-tile.mp4" media="(max-width: 767px)" />
            </div>
          </div>
          <p className="mt-4 max-w-[34rem] text-ink-soft md:mt-6 md:text-[17px] md:leading-7">{hero.sub}</p>
          {/* Each phrase stays whole; the line can break between phrases. */}
          <p className="mt-4 flex flex-wrap gap-x-1.5 text-sm text-ink md:mt-6">
            {hero.reassurance.map((r, i) => (
              <span key={r} className="whitespace-nowrap">
                {r}
                {i < hero.reassurance.length - 1 && <span aria-hidden="true" className="ml-1.5 text-maroon/40">·</span>}
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

        {/* Desktop only. On phones the first screen is just the message and the button (nothing is downloaded). */}
        <PhoneFrame className="mx-auto hidden w-[300px] md:block" aspect="aspect-[9/16]">
          <picture>
            <source media="(min-width: 768px)" srcSet={poster.srcSet} sizes={poster.sizes} />
            <img
              src={BLANK}
              alt="Animated bride and groom: a playful caricature and a first dance under fairy lights"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
          <HeroVideo src="/videos/hero-duo.mp4" media="(min-width: 768px)" />
        </PhoneFrame>
      </div>
    </section>
  );
}
