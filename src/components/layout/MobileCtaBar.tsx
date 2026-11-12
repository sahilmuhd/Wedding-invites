"use client";

import { useEffect, useState } from "react";
import { formatPrice, startingPrice } from "@/config/pricing";
import { hero } from "@/config/content";
import { generalEnquiryLink } from "@/lib/whatsapp";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

/**
 * Slim booking bar on phones. Shows once the hero button has scrolled away,
 * hides while the closing section is on screen or the preview sheet is open.
 */
export function MobileCtaBar() {
  const [heroGone, setHeroGone] = useState(false);
  const [closingVisible, setClosingVisible] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const heroCta = document.getElementById("hero-cta");
    const closing = document.getElementById("closing");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === heroCta) setHeroGone(!e.isIntersecting && e.boundingClientRect.top < 0);
        if (e.target === closing) setClosingVisible(e.isIntersecting);
      }
    });
    if (heroCta) io.observe(heroCta);
    if (closing) io.observe(closing);

    const mo = new MutationObserver(() => setSheetOpen(document.body.hasAttribute("data-sheet-open")));
    mo.observe(document.body, { attributes: true, attributeFilter: ["data-sheet-open"] });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  const show = heroGone && !closingVisible && !sheetOpen;

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur-md transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex h-16 items-center justify-between gap-3 px-5">
        <p className="text-sm text-ink-soft">
          From <span className="font-serif text-lg text-maroon">{formatPrice(startingPrice)}</span>
        </p>
        <WhatsAppLink href={generalEnquiryLink()} location="bar" className={buttonClass("whatsapp", "sm")}>
          <WhatsAppIcon className="size-4" /> {hero.cta}
        </WhatsAppLink>
      </div>
    </div>
  );
}
