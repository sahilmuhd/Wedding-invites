import { generalEnquiryLink } from "@/lib/whatsapp";
import { brand } from "@/config/brand";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="px-4 pb-24 sm:px-8 sm:pb-32">
      <div className="mx-auto max-w-5xl rounded-[2rem] bg-blush px-6 py-20 text-center sm:px-16">
        <h2 id="cta-title" className="heading text-4xl sm:text-6xl">
          Your Love Story Deserves a <em className="text-gold-deep">Beautiful Beginning.</em>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-ink-soft">Message us on WhatsApp and we’ll take it from there.</p>
        <ButtonLink href={generalEnquiryLink()} className="mt-9">
          <WhatsAppIcon className="size-5" /> Enquire on WhatsApp · {brand.phoneDisplay}
        </ButtonLink>
      </div>
    </section>
  );
}
