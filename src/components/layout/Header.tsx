"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { brand, navLinks } from "@/config/brand";
import { generalEnquiryLink } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-beige/80 bg-ivory/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        <a href="#top" className="font-serif text-2xl font-medium tracking-tight">
          {brand.name}
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-ink-soft transition-colors hover:text-charcoal">{l.label}</a>
          ))}
          <ButtonLink href={generalEnquiryLink()} size="sm">
            <WhatsAppIcon className="size-4" /> WhatsApp
          </ButtonLink>
        </nav>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-full md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-ivory px-6 pb-10 pt-6 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-beige py-4 font-serif text-3xl"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <ButtonLink href={generalEnquiryLink()} className="mt-8 w-full">
            <WhatsAppIcon className="size-5" /> Chat on WhatsApp
          </ButtonLink>
          <p className="mt-4 text-center text-sm text-ink-soft">{brand.phoneDisplay}</p>
        </div>
      )}
    </header>
  );
}
