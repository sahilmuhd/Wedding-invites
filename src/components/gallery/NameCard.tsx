import type { Invitation } from "@/types/invitation";
import { categoryLabel, initials } from "@/lib/invitations";

/**
 * Typographic placeholder for invitations that have no real screenshot yet.
 * Intentionally shows only the couple's names and category — nothing invented.
 */
export function NameCard({ invitation }: { invitation: Invitation }) {
  const { bride, groom, category } = invitation;
  return (
    <div className="flex h-full w-full flex-col items-center justify-between bg-[linear-gradient(180deg,var(--color-blush),var(--color-beige))] px-5 py-9 text-center">
      <span className="text-[0.62rem] uppercase tracking-[0.3em] text-gold-deep">{categoryLabel[category]}</span>
      <div>
        <span aria-hidden="true" className="font-serif text-6xl italic text-gold">{initials(invitation)}</span>
        <span className="gold-rule mx-auto my-4" />
        {bride && groom ? (
          <p className="font-serif text-[1.55rem] leading-tight text-charcoal">
            {bride}
            <span className="block text-base italic text-gold-deep">&amp;</span>
            {groom}
          </p>
        ) : (
          <p className="font-serif text-xl leading-tight text-charcoal">{bride || groom}</p>
        )}
      </div>
      <span className="text-[0.62rem] uppercase tracking-[0.3em] text-ink-soft">Invitation</span>
    </div>
  );
}
