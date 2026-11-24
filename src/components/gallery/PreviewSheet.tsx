"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink, X } from "lucide-react";
import type { DesignItem } from "@/types/invitation";
import { track } from "@vercel/analytics";
import { categoryLabel } from "@/lib/categories";
import { designEnquiryLink } from "@/lib/whatsapp";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

const LOAD_TIMEOUT_MS = 8000;

/**
 * Full-screen preview of a live invitation, inside the site.
 * Native <dialog> gives focus trapping, Escape and an inert background.
 */
export function PreviewSheet({ item, onClose }: { item: DesignItem; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const dragStart = useRef<number | null>(null);
  const [drag, setDrag] = useState(0);
  const category = categoryLabel[item.category];

  // The design itself first, then every other couple's invitation created from it.
  const versions = [{ name: item.name, url: item.url }, ...(item.more ?? [])];
  const [view, setView] = useState(0);
  const current = versions[view];
  const isOriginal = view === 0;

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    dlg.showModal();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.setAttribute("data-sheet-open", "");
    return () => {
      document.body.style.overflow = prev;
      document.body.removeAttribute("data-sheet-open");
      if (dlg.open) dlg.close();
    };
  }, []);

  // (Re)start the "taking too long" timer whenever a different version is opened.
  useEffect(() => {
    const t = setTimeout(() => setTimedOut(true), LOAD_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [view]);

  // Make it obvious the row of couples scrolls sideways: right-edge fade + "Swipe →" + one gentle nudge.
  const rowRef = useRef<HTMLDivElement>(null);
  const [moreRight, setMoreRight] = useState(false);
  const [moreBelow, setMoreBelow] = useState(false); // desktop: names wrap into a scrollable box
  const updateEdge = () => {
    const r = rowRef.current;
    if (!r) return;
    setMoreRight(r.scrollLeft + r.clientWidth < r.scrollWidth - 8);
    setMoreBelow(r.scrollTop + r.clientHeight < r.scrollHeight - 8);
  };
  useEffect(() => {
    const r = rowRef.current;
    if (!r) return;
    updateEdge();
    if (r.scrollWidth <= r.clientWidth + 8 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const out = setTimeout(() => r.scrollTo({ left: 72, behavior: "smooth" }), 700);
    const back = setTimeout(() => r.scrollTo({ left: 0, behavior: "smooth" }), 1500);
    return () => {
      clearTimeout(out);
      clearTimeout(back);
    };
  }, []);

  const choose = (i: number) => {
    if (i === view) return;
    setLoaded(false);
    setTimedOut(false);
    setView(i);
    track("preview_version", { design: item.name, version: versions[i].name });
  };

  const showFallback = !current.url || (timedOut && !loaded);

  return (
    <dialog
      ref={ref}
      aria-labelledby="sheet-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      className="sheet-enter fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-white p-0 text-ink backdrop:bg-ink/50 md:bg-maroon-tint"
      style={drag ? { transform: `translateY(${drag}px)` } : undefined}
    >
      <div className="flex h-full flex-col">
        {/* Top bar: swipe down here to close */}
        <div
          className="flex h-14 shrink-0 touch-none items-center justify-between gap-3 border-b border-line bg-white px-4"
          onTouchStart={(e) => (dragStart.current = e.touches[0].clientY)}
          onTouchMove={(e) => {
            if (dragStart.current !== null) setDrag(Math.max(0, e.touches[0].clientY - dragStart.current));
          }}
          onTouchEnd={() => {
            if (drag > 80) onClose();
            dragStart.current = null;
            setDrag(0);
          }}
        >
          <div className="min-w-0">
            <p id="sheet-title" className="truncate font-serif text-lg leading-tight text-maroon">{current.name}</p>
            <p className="truncate text-xs text-ink-soft">{isOriginal ? category : `Created from ${item.name}`}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="grid size-11 shrink-0 place-items-center rounded-full text-maroon hover:bg-maroon-tint"
            autoFocus
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Invitation: full-bleed on phones, phone-framed on desktop */}
        <div className="relative min-h-0 flex-1 md:flex md:items-center md:justify-center md:py-6">
          <div className="relative h-full w-full overflow-hidden bg-white md:h-full md:max-h-[844px] md:w-auto md:aspect-[390/844] md:rounded-[2rem] md:border-[6px] md:border-ink md:shadow-2xl">
            {current.url && !showFallback && (
              <iframe
                key={current.url}
                src={current.url}
                title={`${current.name} — live invitation preview`}
                loading="lazy"
                allow="autoplay; fullscreen"
                onLoad={() => setLoaded(true)}
                className="absolute inset-0 h-full w-full border-0"
              />
            )}
            {!loaded && !showFallback && (
              <div className="absolute inset-0 grid place-items-center text-sm text-ink-soft" role="status">
                Opening invitation…
              </div>
            )}
            {showFallback && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 overflow-y-auto p-6">
                {isOriginal && item.poster && (
                  <Image
                    src={item.poster}
                    alt={`${item.name} invitation`}
                    width={item.posterSize?.[0] ?? 480}
                    height={item.posterSize?.[1] ?? 1039}
                    sizes="280px"
                    className="max-h-[60vh] w-auto rounded-xl border border-line object-contain"
                  />
                )}
                {current.url && (
                  <a href={current.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 text-sm text-maroon underline underline-offset-4">
                    Open full screen <ExternalLink className="size-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Book bar, with the other couples' invitations created from this design */}
        <div className="flex shrink-0 flex-col items-center border-t border-line bg-white pt-3" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
          {versions.length > 1 && (
            <div className="mb-3 w-full max-w-3xl">
              <div className="flex items-baseline justify-between gap-3 px-4">
                <p className="text-xs text-ink-soft">
                  <span className="font-medium text-maroon">Same design for {versions.length} couples</span> — tap a name to view
                </p>
                {moreRight && (
                  <span aria-hidden="true" className="shrink-0 text-xs font-medium text-maroon md:hidden">
                    Swipe →
                  </span>
                )}
                {moreBelow && (
                  <span aria-hidden="true" className="hidden shrink-0 text-xs font-medium text-maroon md:inline">
                    Scroll for more ↓
                  </span>
                )}
              </div>
              <div className="relative">
              <div
                ref={rowRef}
                onScroll={updateEdge}
                role="group"
                aria-label="Invitations created from this design"
                className="no-scrollbar mt-2 flex gap-2 overflow-x-auto px-4 md:max-h-[6.5rem] md:flex-wrap md:overflow-y-auto md:overflow-x-visible"
              >
                {versions.map((v, i) => (
                  <button
                    key={v.url ?? v.name}
                    type="button"
                    aria-pressed={i === view}
                    onClick={() => choose(i)}
                    className={`min-h-11 shrink-0 whitespace-nowrap rounded-full border px-4 text-sm transition-colors ${
                      i === view ? "border-maroon bg-maroon text-white" : "border-line bg-white text-ink hover:border-maroon/40"
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
              {/* Fade on the right edge while more names are off-screen (phones). */}
              {moreRight && (
                <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-linear-to-l from-white to-transparent md:hidden" />
              )}
              {moreBelow && (
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-8 bg-linear-to-t from-white to-transparent md:block" />
              )}
              </div>
            </div>
          )}
          <div className="flex w-full justify-center px-4">
          <WhatsAppLink
            href={designEnquiryLink(item.name, category)}
            location="sheet"
            design={item.name}
            className={`${buttonClass("whatsapp")} w-full max-w-md`}
          >
            <WhatsAppIcon className="size-5" /> Book this design on WhatsApp
          </WhatsAppLink>
          </div>
        </div>
      </div>
    </dialog>
  );
}
