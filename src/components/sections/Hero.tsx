import { ArrowDown } from "lucide-react";
import { brand } from "@/config/brand";
import { generalEnquiryLink } from "@/lib/whatsapp";
import { heroInvitations } from "@/lib/invitations";
import { ButtonLink } from "@/components/ui/Button";
import { InvitationPreview } from "@/components/gallery/InvitationPreview";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function Hero() {
  const [left, center, right] = heroInvitations;
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-14 pt-12 sm:px-8 sm:pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-28 lg:pt-20">
        <div>
          <p className="eyebrow">{brand.tagline}</p>
          <h1 className="heading mt-6 text-[2.9rem] sm:text-6xl lg:text-[4.6rem]">
            Invite them with <em className="text-gold-deep">a story,</em> not a card.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            Personalised digital wedding invitation websites — with music, a live countdown, maps and RSVP —
            shared with a single link and delivered in 48 hours.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#gallery" className="sm:min-w-48">
              Explore Designs <ArrowDown className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={generalEnquiryLink()} variant="outline" className="sm:min-w-48">
              <WhatsAppIcon className="size-4" /> Create Your Invitation
            </ButtonLink>
          </div>
          <p className="mt-8 text-sm text-ink-soft">
            <b className="font-medium text-charcoal">48-hour</b> delivery <span className="mx-2 text-gold">•</span>
            <b className="font-medium text-charcoal">Free</b> hosting <span className="mx-2 text-gold">•</span> RSVP included
          </p>
        </div>

        {/* Real invitation screenshots, desktop only to keep the mobile first screen focused on the CTA */}
        <div aria-hidden="true" className="relative hidden h-[34rem] lg:block">
          <div className="absolute inset-x-6 bottom-0 top-10 rounded-[3rem] bg-blush" />
          <InvitationPreview invitation={left} priority sizes="240px" className="absolute left-0 top-20 w-48 -rotate-6" />
          <InvitationPreview invitation={right} priority sizes="240px" className="absolute right-0 top-20 w-48 rotate-6" />
          <InvitationPreview invitation={center} priority sizes="280px" className="absolute left-1/2 top-0 w-56 -translate-x-1/2" />
        </div>
      </div>
    </section>
  );
}
