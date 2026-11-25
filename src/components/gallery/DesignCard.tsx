import Image from "next/image";
import type { DesignItem } from "@/types/invitation";
import { categoryLabel } from "@/lib/categories";
import { NameCard } from "./NameCard";

/** Thumbnail + name + category. The whole card opens the preview (a plain ?design= link without JS). */
export function DesignCard({
  item, onOpen, priority = false,
}: { item: DesignItem; onOpen?: (item: DesignItem, el: HTMLElement) => void; priority?: boolean }) {
  const [w, h] = item.posterSize ?? [480, 1039];
  // Real count: this couple plus every other couple's invitation made from the same design.
  const couples = 1 + (item.more?.length ?? 0);
  return (
    <a
      href={`?design=${item.id}`}
      onClick={(e) => {
        if (!onOpen || e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        onOpen(item, e.currentTarget);
      }}
      className="group block rounded-2xl"
    >
      <div className="relative aspect-[3/5] overflow-hidden rounded-2xl border border-line bg-maroon-tint">
        {item.poster ? (
          <Image
            src={item.poster}
            alt=""
            width={w}
            height={h}
            sizes="(min-width: 1024px) 260px, (min-width: 768px) 33vw, 50vw"
            priority={priority}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <NameCard item={item} />
        )}
        {item.signature && (
          <span className="absolute left-2 top-2 rounded-full bg-maroon px-2.5 py-1 text-[11px] font-medium tracking-wide text-white shadow">
            Signature
          </span>
        )}
      </div>
      <p className="mt-3 font-serif text-[17px] leading-snug text-maroon">{item.name}</p>
      <p className="mt-0.5 text-[13px] text-ink-soft">
        {categoryLabel[item.category]}
        {couples >= 3 && (
          <span className="text-maroon">
            {" "}· Chosen by {couples} couples
          </span>
        )}
        <span className="sr-only"> · open preview</span>
      </p>
    </a>
  );
}
