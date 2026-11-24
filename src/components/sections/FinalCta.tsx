import { closing } from "@/config/content";
import { brand } from "@/config/brand";
import { generalEnquiryLink, uaeEnquiryLink } from "@/lib/whatsapp";
import { buttonClass } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export function FinalCta() {
  return (
    <section id="closing" aria-labelledby="closing-title" className="section bg-maroon text-white">
      <div className="container-page flex flex-col items-center text-center" data-reveal>
        <LogoMark className="h-10 w-auto text-white" />
        <h2 id="closing-title" className="h2 mt-6 text-white">{closing.title}</h2>
        <p className="mt-4 max-w-md text-white/85">{closing.text}</p>
        <WhatsAppLink href={generalEnquiryLink()} location="closing" className={`${buttonClass("light")} mt-8`}>
          <WhatsAppIcon className="size-5" /> {closing.cta}
        </WhatsAppLink>
        <p className="mt-4 flex flex-col items-center gap-0.5 text-sm tracking-wide text-white/85 sm:flex-row sm:gap-0">
          <span>India {brand.phoneDisplay}</span>
          <span aria-hidden="true" className="mx-2 hidden text-white/40 sm:inline">·</span>
          <WhatsAppLink href={uaeEnquiryLink()} location="closing-uae" className="inline-flex min-h-11 items-center underline decoration-white/40 underline-offset-4 hover:decoration-white sm:min-h-0">
            UAE {brand.uaePhoneDisplay}
          </WhatsAppLink>
        </p>
      </div>
    </section>
  );
}
