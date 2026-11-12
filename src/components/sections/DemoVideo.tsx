"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

/** Lazy poster image; the video element (and its bytes) only load once the visitor taps play. */
export function DemoVideo({ src, poster, title }: { src: string; poster: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return <video className="h-full w-full object-cover" src={src} controls autoPlay playsInline aria-label={title} />;
  }
  return (
    <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 h-full w-full" aria-label={`Play video: ${title}`}>
      <Image src={poster} alt="" fill sizes="(min-width: 768px) 320px, 78vw" className="object-cover" />
      <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-maroon shadow-lg transition-transform group-hover:scale-105">
        <Play className="ml-1 size-7" fill="currentColor" aria-hidden="true" />
      </span>
    </button>
  );
}
