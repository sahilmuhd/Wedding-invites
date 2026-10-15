"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { CategoryKey, Invitation } from "@/types/invitation";
import { categoryTabs, displayName } from "@/lib/invitations";
import { InvitationCard } from "./InvitationCard";

const PAGE_SIZE = 12;

export function Gallery({ items }: { items: Invitation[] }) {
  const [category, setCategory] = useState<CategoryKey | "All">("All");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: items.length };
    for (const i of items) c[i.category] = (c[i.category] ?? 0) + 1;
    return c;
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/\s+/g, " ");
    return items.filter(
      (i) =>
        (category === "All" || i.category === category) &&
        (!q || `${displayName(i)} ${i.bride} ${i.groom}`.toLowerCase().includes(q)),
    );
  }, [items, category, query]);

  const shown = filtered.slice(0, visible);

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {categoryTabs.map((t) => (
            <button
              key={t.key}
              type="button"
              aria-pressed={category === t.key}
              onClick={() => { setCategory(t.key); setVisible(PAGE_SIZE); }}
              className={`min-h-11 shrink-0 rounded-full border px-4 text-sm transition-colors ${
                category === t.key
                  ? "border-charcoal bg-charcoal text-ivory"
                  : "border-charcoal/20 text-charcoal hover:border-charcoal"
              }`}
            >
              {t.label}
              <span className="ml-1.5 text-xs">{counts[t.key] ?? 0}</span>
            </button>
          ))}
        </div>
        <label className="relative block lg:w-72">
          <span className="sr-only">Search invitations by name</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-soft" aria-hidden="true" />
          <input
            id="gallery-search"
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setVisible(PAGE_SIZE); }}
            placeholder="Search by name…"
            className="min-h-11 w-full rounded-full border border-charcoal/20 bg-white/60 pl-11 pr-4 text-base placeholder:text-ink-soft/80"
          />
        </label>
      </div>

      <p className="mt-6 text-sm text-ink-soft" role="status" aria-live="polite">
        Showing {shown.length} of {filtered.length} invitation{filtered.length === 1 ? "" : "s"}
      </p>

      {shown.length ? (
        <ul className="mt-4 grid grid-cols-1 gap-6 min-[560px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((i) => (
            <li key={i.id}>
              <InvitationCard invitation={i} priority={false} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-12 rounded-3xl bg-blush px-6 py-14 text-center text-ink-soft">
          No invitations match. Try another category or name.
        </p>
      )}

      {visible < filtered.length && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="min-h-12 rounded-full border border-charcoal px-9 font-medium transition-colors hover:bg-charcoal hover:text-ivory"
          >
            Load more ({filtered.length - visible} left)
          </button>
        </div>
      )}
    </div>
  );
}
