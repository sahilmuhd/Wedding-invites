import { closing } from "@/config/content";
import { brand } from "@/config/brand";
import { generalEnquiryLink } from "@/lib/whatsapp";
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
        <p className="mt-4 text-sm tracking-wide text-white/85">{brand.phoneDisplay}</p>
      </div>
    </section>
  );
}
