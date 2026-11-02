import { ExternalLink } from "lucide-react";
import type { Invitation } from "@/types/invitation";
import { categoryLabel, displayName } from "@/lib/invitations";
import { designEnquiryLink } from "@/lib/whatsapp";
import { formatPrice } from "@/config/pricing";
import { InvitationPreview } from "./InvitationPreview";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function InvitationCard({ invitation, priority = false }: { invitation: Invitation; priority?: boolean }) {
  const name = displayName(invitation);
  const preview = (
    <div className="rounded-2xl bg-blush px-6 pb-0 pt-7">
      <InvitationPreview
        invitation={invitation}
        priority={priority}
        className="mx-auto w-[min(56vw,12rem)] translate-y-0 transition-transform duration-300 group-hover:-translate-y-1"
      />
    </div>
  );
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-beige bg-white p-3 transition-shadow duration-300 hover:shadow-[0_16px_40px_-20px_rgba(17,24,39,0.3)]">
      <div className="overflow-hidden rounded-2xl">
        {invitation.url ? (
          <a href={invitation.url} target="_blank" rel="noopener noreferrer" className="block">
            {preview}
            <span className="sr-only">Open the {name} invitation in a new tab</span>
          </a>
        ) : (
          preview
        )}
      </div>
      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <h3 className="text-lg leading-snug">{name}</h3>
        <p className="mt-1 flex items-center gap-2 text-sm text-ink-soft">
          <span>{categoryLabel[invitation.category]}</span>
          <span aria-hidden="true" className="text-beige">|</span>
          <span className="font-semibold text-charcoal">{formatPrice(invitation.price)}</span>
        </p>
        <div className="mt-auto flex flex-col-reverse gap-1.5 pt-4">
          {invitation.url && (
            <ButtonLink href={invitation.url} variant="link" size="sm">
              View invitation <ExternalLink className="size-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </ButtonLink>
          )}
          <ButtonLink
            href={designEnquiryLink(name, categoryLabel[invitation.category], invitation.price)}
            variant="whatsapp"
            size="sm"
            data-design={name}
          >
            <WhatsAppIcon className="size-4" /> Customize This Design
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
