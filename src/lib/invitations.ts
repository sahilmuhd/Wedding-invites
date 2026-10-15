import raw from "@/data/invitations.generated.json";
import type { CategoryKey, Invitation } from "@/types/invitation";

const all = raw as Invitation[];

/** Gallery filter tabs, in display order. */
export const categoryTabs: { key: CategoryKey | "All"; label: string }[] = [
  { key: "All", label: "All" },
  { key: "Nikah", label: "Nikah" },
  { key: "Hindu", label: "Hindu Wedding" },
  { key: "Christian", label: "Christian Wedding" },
  { key: "Engagement", label: "Engagement" },
  { key: "Reception", label: "Reception" },
  { key: "Housewarming", label: "Housewarming" },
];

export const categoryLabel: Record<CategoryKey, string> = {
  Nikah: "Nikah",
  Hindu: "Hindu Wedding",
  Christian: "Christian Wedding",
  Engagement: "Engagement",
  Reception: "Reception",
  Housewarming: "Housewarming",
  Wedding: "Wedding",
};

/** Couple name as shown on cards and used in WhatsApp messages. */
export function displayName(i: Pick<Invitation, "bride" | "groom">): string {
  return i.bride && i.groom ? `${i.bride} & ${i.groom}` : i.bride || i.groom;
}

/** Visible invitations; ones with a real screenshot come first so the first page looks its best. */
export const invitations: Invitation[] = all
  .filter((i) => !i.hidden)
  .map((i, idx) => ({ i, idx }))
  .sort((a, b) => Number(!!b.i.poster) - Number(!!a.i.poster) || a.idx - b.idx)
  .map(({ i }) => i);

export const featuredInvitations: Invitation[] = all
  .filter((i) => i.featured)
  .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));

export const heroInvitations: Invitation[] = all.filter((i) => i.poster).slice(0, 3);

export function initials(i: Pick<Invitation, "bride" | "groom">): string {
  const a = (i.bride || i.groom)[0] ?? "";
  const b = i.bride && i.groom ? i.groom[0] : "";
  return (a + b).toUpperCase();
}
