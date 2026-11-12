import type { DesignItem } from "@/types/invitation";
import { categoryLabel } from "@/lib/invitations";
import { LogoMark } from "@/components/ui/Logo";

/** Typographic placeholder for designs without a screenshot. Shows only the name and category. */
export function NameCard({ item }: { item: Pick<DesignItem, "name" | "category"> }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-maroon-tint px-4 text-center text-maroon">
      <LogoMark className="h-7 w-auto opacity-70" />
      <p className="font-serif text-xl leading-tight">{item.name}</p>
      <p className="eyebrow">{categoryLabel[item.category]}</p>
    </div>
  );
}
