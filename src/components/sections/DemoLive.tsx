"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { track } from "@vercel/analytics";

/**
 * A real invitation inside a phone. Shows its cover first; the live site loads only when tapped,
 * so the page stays light and phones don't get a scroll-trapping frame until the visitor asks for it.
 */
export function DemoLive({ name, url, poster, cta }: { name: string; url: string; poster: string; cta: string }) {
  const [live, setLive] = useState(false);
  if (live) {
    return (
      <iframe
        src={`/preview?u=${encodeURIComponent(url)}`}
        title={`${name} — live invitation`}
        allow="autoplay; fullscreen"
        className="absolute inset-0 h-full w-full border-0 bg-white"
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => {
        setLive(true);
        track("preview_open", { design: name, source: "watch-it-open" });
      }}
      className="group absolute inset-0 h-full w-full"
      aria-label={`${cta}: ${name}`}
    >
      <Image src={poster} alt="" fill sizes="(min-width: 768px) 340px, 82vw" className="object-cover object-top" />
      <span className="absolute inset-x-0 top-[13%] flex justify-center">
        <span className="inline-flex min-h-12 items-center gap-2 rounded-full bg-maroon px-6 text-sm font-medium text-white shadow-lg transition-transform group-hover:scale-105">
          <Play className="size-4" fill="currentColor" aria-hidden="true" /> {cta}
        </span>
      </span>
    </button>
  );
}
