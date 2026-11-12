"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { Search, X } from "lucide-react";
import type { DesignItem, FilterKey } from "@/types/invitation";
import { PAGE_SIZE, filterTabs, matchesFilter } from "@/lib/invitations";
import { designs as copy } from "@/config/content";
import { generalEnquiryLink } from "@/lib/whatsapp";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { DesignCard } from "./DesignCard";
import { PreviewSheet } from "./PreviewSheet";

const isFilter = (v: string | null): v is FilterKey => filterTabs.some((t) => t.key === v);

/**
 * Receives only the first page from the server. The full slim list (/designs.json)
 * is fetched the first time the visitor filters, searches, taps "Show more" or deep-links a design.
 */
export function Gallery({ initial, counts }: { initial: DesignItem[]; counts: Record<FilterKey, number> }) {
  const [items, setItems] = useState<DesignItem[]>(initial);
  const [full, setFull] = useState(false);
  const loading = useRef<Promise<DesignItem[]> | null>(null);

  const [filter, setFilter] = useState<FilterKey>("All");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [synced, setSynced] = useState(false);

  const [active, setActive] = useState<DesignItem | null>(null);
  const pushed = useRef(false);
  const opener = useRef<HTMLElement | null>(null);

  const ensureAll = useCallback(() => {
    if (full) return Promise.resolve(items);
    loading.current ??= fetch("/designs.json")
      .then((r) => r.json() as Promise<DesignItem[]>)
      .then((all) => {
        setItems(all);
        setFull(true);
        return all;
      })
      .catch(() => {
        loading.current = null;
        return items;
      });
    return loading.current;
  }, [full, items]);

  /* ---- preview sheet ---- */
  const open = useCallback((item: DesignItem, el?: HTMLElement) => {
    opener.current = el ?? null;
    const params = new URLSearchParams(window.location.search);
    params.set("design", item.id);
    window.history.pushState({ design: item.id }, "", `${window.location.pathname}?${params}${window.location.hash}`);
    pushed.current = true;
    setActive(item);
    track("preview_open", { design: item.name });
  }, []);

  const close = useCallback(() => {
    if (pushed.current) {
      window.history.back(); // popstate below clears `active`
    } else {
      const params = new URLSearchParams(window.location.search);
      params.delete("design");
      const qs = params.toString();
      window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
      setActive(null);
    }
  }, []);

  useEffect(() => {
    const onPop = () => {
      const id = new URLSearchParams(window.location.search).get("design");
      if (!id) {
        pushed.current = false;
        setActive(null);
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Return focus to the card that opened the sheet.
  useEffect(() => {
    if (!active && opener.current) {
      opener.current.focus();
      opener.current = null;
    }
  }, [active]);

  /* ---- restore state from the URL (?cat=&q=&design=) after hydration ---- */
  useEffect(() => {
    queueMicrotask(async () => {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("cat");
      const q = params.get("q") ?? "";
      const designId = params.get("design");
      if (isFilter(cat)) setFilter(cat);
      if (q) {
        setQuery(q);
        setSearchOpen(true);
      }
      setSynced(true);
      if ((isFilter(cat) && cat !== "All") || q || designId) {
        const all = await ensureAll();
        const found = designId && all.find((d) => d.id === designId);
        if (found) {
          setActive(found);
          track("preview_open", { design: found.name });
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);

  useEffect(() => {
    if (!synced) return;
    const params = new URLSearchParams(window.location.search);
    if (filter === "All") params.delete("cat");
    else params.set("cat", filter);
    if (query.trim()) params.set("q", query.trim());
    else params.delete("q");
    const qs = params.toString();
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
  }, [filter, query, synced]);

  /* ---- filtering ---- */
  const q = query.trim().toLowerCase().replace(/\s+/g, " ");
  const filtered = useMemo(
    () => items.filter((d) => matchesFilter(d.category, filter) && (!q || d.name.toLowerCase().includes(q))),
    [items, filter, q],
  );
  const total = full ? filtered.length : q ? filtered.length : counts[filter];
  const shown = filtered.slice(0, visible);
  const waiting = !full && shown.length < Math.min(visible, total);

  return (
    <div>
      <div className="flex items-center gap-2">
        <div role="group" aria-label="Filter designs" className="no-scrollbar -ml-5 flex min-w-0 flex-1 gap-2 overflow-x-auto pl-5 sm:ml-0 sm:flex-wrap sm:pl-0">
          {filterTabs.map((t) => (
            <button
              key={t.key}
              type="button"
              aria-pressed={filter === t.key}
              onClick={() => {
                setFilter(t.key);
                setVisible(PAGE_SIZE);
                if (t.key !== "All") void ensureAll();
              }}
              className={`min-h-11 shrink-0 rounded-full border px-4 text-sm transition-colors ${
                filter === t.key ? "border-maroon bg-maroon text-white" : "border-line bg-white text-ink hover:border-maroon/40"
              }`}
            >
              {t.label} <span className={filter === t.key ? "text-white/75" : "text-ink-soft"}>{counts[t.key]}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label={searchOpen ? "Close search" : "Search designs"}
          aria-expanded={searchOpen}
          aria-controls="design-search"
          onClick={() => {
            if (searchOpen) setQuery("");
            setSearchOpen((s) => !s);
          }}
          className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-white text-maroon hover:border-maroon/40"
        >
          {searchOpen ? <X className="size-4" /> : <Search className="size-4" />}
        </button>
      </div>

      {searchOpen && (
        <label className="mt-3 block">
          <span className="sr-only">Search designs by name</span>
          <input
            id="design-search"
            type="search"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE_SIZE);
              void ensureAll();
            }}
            placeholder="Search by name…"
            className="min-h-11 w-full rounded-full border border-line bg-white px-5 text-base placeholder:text-ink-soft"
          />
        </label>
      )}

      <p className="sr-only" role="status" aria-live="polite">
        Showing {shown.length} of {total} designs
      </p>

      {shown.length || waiting ? (
        <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 md:gap-x-6 md:gap-y-10 lg:grid-cols-4">
          {shown.map((d) => (
            <li key={d.id}>
              <DesignCard item={d} onOpen={open} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-2xl bg-maroon-tint px-6 py-12 text-center">
          <p className="font-serif text-2xl text-maroon">{copy.emptyTitle}</p>
          <p className="mt-2 text-ink-soft">{copy.emptyText}</p>
          <WhatsAppLink href={generalEnquiryLink()} location="empty-state" className={`${buttonClass("whatsapp", "sm")} mt-6`}>
            <WhatsAppIcon className="size-4" /> {copy.emptyCta}
          </WhatsAppLink>
        </div>
      )}

      {visible < total && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => {
              setVisible((v) => v + PAGE_SIZE);
              void ensureAll();
            }}
            className={buttonClass("outline")}
          >
            {copy.more} <span className="text-ink-soft">({total - Math.min(visible, total)})</span>
          </button>
        </div>
      )}

      {active && <PreviewSheet key={active.id} item={active} onClose={close} />}
    </div>
  );
}
