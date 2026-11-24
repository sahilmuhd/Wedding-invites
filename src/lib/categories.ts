/**
 * Category labels and gallery filters. Kept separate from lib/invitations (which loads all
 * design data) so browser components can use these without shipping the whole dataset.
 */
import type { CategoryKey, FilterKey } from "@/types/invitation";

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

export const PAGE_SIZE = 12;
