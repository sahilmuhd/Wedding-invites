"use client";

import { useEffect, useState } from "react";

/**
 * Muted wax-seal loop laid over the poster image (the poster is the LCP element and renders first).
 * Starts only after the page has loaded; skipped for reduced motion or data saver.
 */
export function HeroVideo({ src }: { src: string }) {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (
      !window.matchMedia("(min-width: 768px)").matches || // desktop only
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      conn?.saveData
    )
      return;
    const start = () => setTimeout(() => setPlay(true), 300);
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  if (!play) return null;
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      src={src}
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
