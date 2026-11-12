"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { brand, navLinks } from "@/config/brand";
import { generalEnquiryLink } from "@/lib/whatsapp";
import { LogoMark } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/90 backdrop-blur-md">
      <div className="container-page flex h-14 items-center justify-between gap-3">
        <a href="#top" onClick={close} className="flex min-h-11 items-center gap-2.5 text-maroon">
          <LogoMark className="h-[22px] w-auto" animate />
          <span className="font-serif text-lg italic leading-none">{brand.name}</span>
        </a>

        <div className="flex items-center gap-1 md:gap-6">
          <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-ink-soft transition-colors hover:text-maroon">
                {l.label}
              </a>
            ))}
            <a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-ink-soft transition-colors hover:text-maroon">
              Instagram
            </a>
          </nav>
          <a href="#designs" className="inline-flex min-h-11 items-center px-2 text-sm text-ink md:hidden">
            Designs
          </a>
          <WhatsAppLink
            href={generalEnquiryLink()}
            location="header"
            aria-label="Chat with us on WhatsApp"
            className="grid size-11 place-items-center rounded-full border border-maroon/30 text-maroon transition-colors hover:border-maroon hover:bg-maroon-tint"
          >
            <WhatsAppIcon className="size-[18px]" />
          </WhatsAppLink>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-maroon md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 top-14 z-50 h-[calc(100dvh-3.5rem)] bg-white px-5 pt-2 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col divide-y divide-line">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={close} className="py-5 font-serif text-2xl text-maroon">
                {l.label}
              </a>
            ))}
            <a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer" onClick={close} className="py-5 font-serif text-2xl text-maroon">
              Instagram <span className="font-sans text-base text-ink-soft">{brand.instagramHandle}</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
