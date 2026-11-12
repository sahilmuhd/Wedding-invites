import Image from "next/image";
import type { DesignItem } from "@/types/invitation";
import { categoryLabel } from "@/lib/invitations";
import { NameCard } from "./NameCard";

/** Thumbnail + name + category. The whole card opens the preview (a plain ?design= link without JS). */
export function DesignCard({
  item, onOpen, priority = false,
}: { item: DesignItem; onOpen?: (item: DesignItem, el: HTMLElement) => void; priority?: boolean }) {
  const [w, h] = item.posterSize ?? [480, 1039];
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
      </div>
      <p className="mt-3 font-serif text-[17px] leading-snug text-maroon">{item.name}</p>
      <p className="mt-0.5 text-[13px] text-ink-soft">
        {categoryLabel[item.category]}
        <span className="sr-only"> · open preview</span>
      </p>
    </a>
  );
}
