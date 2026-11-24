import raw from "@/data/invitations.generated.json";
import variantsRaw from "@/data/variants.json";
import type { DesignItem, FilterKey, Invitation } from "@/types/invitation";
import { PAGE_SIZE, filterTabs, matchesFilter } from "./categories";

// Server-side only (pages, routes): this module loads all design data.
export { categoryLabel, filterTabs, matchesFilter, PAGE_SIZE } from "./categories";

const all = raw as Invitation[];

/** Couple name as stored in the data. */
export function displayName(i: Pick<Invitation, "bride" | "groom">): string {
  return i.bride && i.groom ? `${i.bride} & ${i.groom}` : i.bride || i.groom;
}

const visible = all.filter((i) => !i.hidden);

const sorted = visible
  .map((i, idx) => ({ i, idx }))
  .sort(
    (a, b) =>
      (a.i.featured ?? 99) - (b.i.featured ?? 99) ||
      Number(!!b.i.poster) - Number(!!a.i.poster) ||
      a.idx - b.idx,
  )
  .map(({ i }) => i);

/**
 * One card per theme (template). Every other invitation made with the same template is kept
 * as a "more" entry on that card, shown inside its preview ("Also made for …").
 * Extras come from (1) gallery entries that share the theme and (2) src/data/variants.json
 * (live projects matched to a template; `theme` is the template id or "id:<design id>").
 */
const extras = new Map<string, { name: string; url: string }[]>();
const addExtra = (repId: string, entry: { name: string; url: string }) => {
  const list = extras.get(repId) ?? [];
  list.push(entry);
  extras.set(repId, list);
};
const reps: Invitation[] = [];
const repOf = new Map<string, string>(); // theme -> id of the design shown as its card
for (const i of sorted) {
  const rep = i.theme && repOf.get(i.theme);
  if (rep) {
    if (i.url) addExtra(rep, { name: i.title ?? displayName(i), url: i.url });
    continue;
  }
  if (i.theme) repOf.set(i.theme, i.id);
  reps.push(i);
}
const repIds = new Set(reps.map((r) => r.id));
for (const v of variantsRaw as { name: string; url: string; theme: string }[]) {
  const repId = v.theme.startsWith("id:") ? v.theme.slice(3) : repOf.get(v.theme);
  if (repId && repIds.has(repId)) addExtra(repId, { name: v.name, url: v.url });
}

/** Slim, client-safe list: featured first (in order), then designs with a screenshot; one per theme. */
export const designItems: DesignItem[] = reps.map((i) => ({
  id: i.id,
  // TODO(owner): add a `title` per design (e.g. "Wax Seal") if couples haven't consented to their names being shown.
  name: i.title ?? displayName(i),
  category: i.category,
  url: i.url,
  // Watermarked copies are published under /designs/ (see scripts/watermark.mjs).
  poster: i.poster && i.poster.replace(/^\/invitations\//, "/designs/"),
  posterSize: i.posterSize,
  ...(extras.get(i.id)?.length ? { more: extras.get(i.id) } : {}),
}));

/** Total invitations shown across designs (cards + "also made for"). */
export const invitationCount = designItems.reduce((n, d) => n + 1 + (d.more?.length ?? 0), 0);

export const designCount = designItems.length;

export const filterCounts: Record<FilterKey, number> = Object.fromEntries(
  filterTabs.map((t) => [t.key, designItems.filter((d) => matchesFilter(d.category, t.key)).length]),
) as Record<FilterKey, number>;

export const initialDesigns = designItems.slice(0, PAGE_SIZE);

/** Real screenshots used in the hero / OG image. */
export const heroPosterId = "sanoop-fidha";
