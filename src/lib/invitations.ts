import raw from "@/data/invitations.generated.json";
import type { CategoryKey, DesignItem, FilterKey, Invitation } from "@/types/invitation";

const all = raw as Invitation[];

export const categoryLabel: Record<CategoryKey, string> = {
  Nikah: "Nikah",
  Hindu: "Hindu Wedding",
  Christian: "Christian Wedding",
  Engagement: "Engagement",
  Reception: "Reception",
  Housewarming: "Housewarming",
  Wedding: "Wedding", // TODO(owner): recategorise these; they only appear under "All".
};

/** Gallery filter chips, in display order. "More" groups the smaller event types. */
export const filterTabs: { key: FilterKey; label: string }[] = [
  { key: "All", label: "All" },
  { key: "Nikah", label: "Nikah" },
  { key: "Hindu", label: "Hindu" },
  { key: "Christian", label: "Christian" },
  { key: "More", label: "Engagement & more" },
];

const MORE: CategoryKey[] = ["Engagement", "Reception", "Housewarming"];

export function matchesFilter(category: CategoryKey, filter: FilterKey): boolean {
  if (filter === "All") return true;
  if (filter === "More") return MORE.includes(category);
  return category === filter;
}

/** Couple name as stored in the data. */
export function displayName(i: Pick<Invitation, "bride" | "groom">): string {
  return i.bride && i.groom ? `${i.bride} & ${i.groom}` : i.bride || i.groom;
}

const visible = all.filter((i) => !i.hidden);

/** Keeps the first design of each theme, so the same template never appears twice. */
function onePerTheme(list: Invitation[]): Invitation[] {
  const seen = new Set<string>();
  return list.filter((i) => {
    if (!i.theme) return true;
    if (seen.has(i.theme)) return false;
    seen.add(i.theme);
    return true;
  });
}

/** Slim, client-safe list: featured first (in order), then designs with a screenshot; one per theme. */
export const designItems: DesignItem[] = onePerTheme(
  visible
    .map((i, idx) => ({ i, idx }))
    .sort(
      (a, b) =>
        (a.i.featured ?? 99) - (b.i.featured ?? 99) ||
        Number(!!b.i.poster) - Number(!!a.i.poster) ||
        a.idx - b.idx,
    )
    .map(({ i }) => i),
)
  .map((i) => ({
    id: i.id,
    // TODO(owner): add a `title` per design (e.g. "Wax Seal") if couples haven't consented to their names being shown.
    name: i.title ?? displayName(i),
    category: i.category,
    url: i.url,
    poster: i.poster,
    posterSize: i.posterSize,
  }));

export const designCount = designItems.length;

export const filterCounts: Record<FilterKey, number> = Object.fromEntries(
  filterTabs.map((t) => [t.key, designItems.filter((d) => matchesFilter(d.category, t.key)).length]),
) as Record<FilterKey, number>;

export const PAGE_SIZE = 12;
export const initialDesigns = designItems.slice(0, PAGE_SIZE);

/** Real screenshots used in the hero / OG image. */
export const heroPosterId = "sanoop-fidha";
