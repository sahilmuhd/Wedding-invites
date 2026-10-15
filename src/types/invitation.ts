export type CategoryKey =
  | "Nikah"
  | "Hindu"
  | "Christian"
  | "Engagement"
  | "Reception"
  | "Housewarming"
  | "Wedding";

/** How the category was determined (see scripts/build-data.mjs). */
export type CategorySource =
  | "url"
  | "content+list"
  | "content"
  | "original"
  | "name-guess"
  | "unknown";

export interface Invitation {
  id: string;
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
  hidden?: boolean;
  duplicateOf?: string;
}
