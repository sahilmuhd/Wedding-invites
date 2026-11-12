export type CategoryKey =
  | "Nikah"
  | "Hindu"
  | "Christian"
  | "Engagement"
  | "Reception"
  | "Housewarming"
  | "Wedding";

/** Gallery chip filter. "More" = Engagement, Reception and Housewarming. */
export type FilterKey = "All" | "Nikah" | "Hindu" | "Christian" | "More";

/** How the category was determined (see scripts/build-data.mjs). */
export type CategorySource =
  | "url"
  | "content+list"
  | "content"
  | "original"
  | "name-guess"
  | "owner" // confirmed by the owner
  | "unknown";

export interface Invitation {
  id: string;
  /** Optional design name shown instead of the couple's names. */
  title?: string;
  bride: string;
  groom: string;
  category: CategoryKey;
  categorySource: CategorySource;
  /** Original invitation website. null when none is known. */
  url: string | null;
  price: number;
  /** Real screenshot of the invitation, if one exists. */
  poster: string | null;
  posterSize?: [number, number];
  featured?: number;
  /** Design template (D01…), from scripts/add-themes.mjs. Only one design per theme is shown. */
  theme?: string;
  hidden?: boolean;
  duplicateOf?: string;
}

/** What the browser receives for each design: no build-only fields. */
export interface DesignItem {
  id: string;
  name: string;
  category: CategoryKey;
  url: string | null;
  poster: string | null;
  posterSize?: [number, number];
}
