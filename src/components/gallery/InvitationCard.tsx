import { ExternalLink } from "lucide-react";
import type { Invitation } from "@/types/invitation";
import { categoryLabel, displayName } from "@/lib/invitations";
import { designEnquiryLink } from "@/lib/whatsapp";
import { formatPrice, pricing } from "@/config/pricing";
import { InvitationPreview } from "./InvitationPreview";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function InvitationCard({ invitation, priority = false }: { invitation: Invitation; priority?: boolean }) {
  const name = displayName(invitation);
  const preview = <InvitationPreview invitation={invitation} priority={priority} className="mx-auto w-[min(62vw,13.5rem)] transition-transform duration-500 group-hover:-translate-y-1.5" />;
  return (
    <article className="group flex flex-col items-center rounded-3xl border border-beige bg-white/50 p-5 pb-6 text-center transition-shadow duration-300 hover:shadow-[0_18px_50px_-24px_rgba(40,36,32,0.35)]">
      {invitation.url ? (
        <a
          href={invitation.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          {preview}
          <span className="sr-only">Open the {name} invitation in a new tab</span>
        </a>
      ) : (
        preview
      )}
      <p className="eyebrow mt-6 !text-[0.66rem]">{categoryLabel[invitation.category]}</p>
      <h3 className="heading mt-1.5 text-[1.65rem]">{name}</h3>
      <p className="mt-2 text-sm text-ink-soft">
        Starting from{" "}
        <span className="font-semibold text-gold-deep">{formatPrice(pricing.startingPrice)}</span>
      </p>
      <div className="mt-5 flex w-full flex-col gap-2.5">
        {invitation.url && (
          <ButtonLink href={invitation.url} variant="outline" size="sm">
            View invitation <ExternalLink className="size-4" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </ButtonLink>
        )}
        <ButtonLink href={designEnquiryLink(name)} size="sm" data-design={name}>
          <WhatsAppIcon className="size-4" /> Customize This Design
        </ButtonLink>
      </div>
    </article>
  );
}
