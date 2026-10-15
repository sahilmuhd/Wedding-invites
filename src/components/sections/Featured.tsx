import { featuredInvitations } from "@/lib/invitations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InvitationCard } from "@/components/gallery/InvitationCard";

export function Featured() {
  return (
    <section id="featured" aria-labelledby="featured-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          id="featured-title"
          eyebrow="Featured invitations"
          title={<>Six we’re <em className="text-gold-deep">proud</em> of.</>}
          text="Real invitations made for real couples. Open one to see the full experience."
        />
        <ul className="mt-14 grid grid-cols-1 gap-6 min-[560px]:grid-cols-2 lg:grid-cols-3">
          {featuredInvitations.map((i, idx) => (
            <li key={i.id}><InvitationCard invitation={i} priority={idx < 3} /></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
