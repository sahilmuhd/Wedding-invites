import Image from "next/image";
import type { Invitation } from "@/types/invitation";
import { displayName } from "@/lib/invitations";
import { NameCard } from "./NameCard";
import { PhoneFrame } from "@/components/ui/PhoneFrame";

/** Phone mockup showing the real screenshot when we have one, else a name card. */
export function InvitationPreview({
  invitation, priority = false, sizes = "(min-width:1024px) 22vw, (min-width:640px) 40vw, 80vw", className = "",
}: { invitation: Invitation; priority?: boolean; sizes?: string; className?: string }) {
  const name = displayName(invitation);
  const [w, h] = invitation.posterSize ?? [480, 960];
  return (
    <PhoneFrame className={className}>
      {invitation.poster ? (
        <Image
          src={invitation.poster}
          alt={`${name} — digital wedding invitation preview`}
          width={w}
          height={h}
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <NameCard invitation={invitation} />
      )}
    </PhoneFrame>
  );
}
