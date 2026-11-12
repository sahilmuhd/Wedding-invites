import { useId } from "react";

/**
 * Envelope sealed with a heart — the owner's mark (from icon-maroon.svg), drawn in currentColor.
 * `animate` fades the heart seal in once on first load.
 */
export function LogoMark({ className = "h-6 w-auto", animate = false }: { className?: string; animate?: boolean }) {
  const id = useId().replace(/:/g, "");
  const heart = `heart-${id}`;
  const gap = `gap-${id}`;
  return (
    <svg viewBox="0 0 200 164" className={className} aria-hidden="true" focusable="false">
      <mask id={heart} maskUnits="userSpaceOnUse" x="-20" y="-20" width="240" height="210">
        <rect x="-20" y="-20" width="240" height="210" fill="#fff" />
        <path
          d="M100 108.5 C87 100.5 81.5 94.5 81.5 88.2 C81.5 83 85.4 79 90.4 79 C94.4 79 97.6 81.2 100 85 C102.4 81.2 105.6 79 109.6 79 C114.6 79 118.5 83 118.5 88.2 C118.5 94.5 113 100.5 100 108.5Z"
          transform="translate(100 94) scale(1.12) translate(-100 -94)"
          fill="#000"
        />
      </mask>
      <mask id={gap} maskUnits="userSpaceOnUse" x="-20" y="-20" width="240" height="210">
        <rect x="-20" y="-20" width="240" height="210" fill="#fff" />
        <circle cx="100" cy="94" r="33" fill="#000" />
      </mask>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" mask={`url(#${gap})`}>
        <rect x="14" y="22" width="172" height="124" rx="13" strokeWidth="8.5" />
        <path d="M22 32 L100 93 L178 32" strokeWidth="8.5" />
        <path d="M24 141 L72 101 M176 141 L128 101" strokeWidth="5.27" />
      </g>
      <circle cx="100" cy="94" r="28" fill="currentColor" mask={`url(#${heart})`} className={animate ? "logo-seal" : undefined} />
    </svg>
  );
}
