"use client";

import { useEffect, useState } from "react";

/**
 * Muted loop laid over its still image (the still renders first).
 * Starts only after the page has loaded, only when `media` matches the screen,
 * and never for reduced motion or data saver.
 */
export function HeroVideo({ src, media }: { src: string; media: string }) {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (
      !window.matchMedia(media).matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      conn?.saveData
    )
      return;
    const start = () => setTimeout(() => setPlay(true), 300);
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, [media]);

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
