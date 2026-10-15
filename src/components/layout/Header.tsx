"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { brand, navLinks } from "@/config/brand";
import { generalEnquiryLink } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function Header() {
  const [open, setOpen] = useState(false);

  // Close on Escape or when resizing up to desktop
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Lock body scroll when mobile menu is open, restore on close
  useEffect(() => {
    if (open) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [open]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("#")) {
        e.preventDefault();
        setOpen(false);
        document.body.style.overflow = "";

        const targetId = href.slice(1);
        requestAnimationFrame(() => {
          if (targetId === "top") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            const el = document.getElementById(targetId);
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }
          window.history.pushState(null, "", href);
        });
      }
    },
    [],
  );

  return (
    <header className="sticky top-0 z-50 border-b border-beige/80 bg-ivory/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, "#top")}
          className="font-serif text-2xl font-medium tracking-tight text-charcoal transition-colors hover:text-gold-deep"
        >
          {brand.name}
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-charcoal"
            >
              {l.label}
            </a>
          ))}
          <ButtonLink href={generalEnquiryLink()} size="sm">
            <WhatsAppIcon className="size-4" /> WhatsApp
          </ButtonLink>
        </nav>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-full text-charcoal transition-colors hover:bg-beige/60 active:bg-beige md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-6 text-charcoal" /> : <Menu className="size-6 text-charcoal" />}
        </button>
      </div>
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-x-0 top-16 z-50 flex h-[calc(100dvh-4rem)] flex-col justify-between overflow-y-auto border-t border-beige/60 bg-ivory/98 px-6 pb-12 pt-4 shadow-2xl backdrop-blur-lg md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col divide-y divide-beige/80">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className="group flex items-center justify-between py-4 font-serif text-2xl text-charcoal transition-colors hover:text-gold-deep active:text-gold-deep"
              >
                <span>{l.label}</span>
                <ArrowRight className="size-5 text-gold transition-transform group-hover:translate-x-1 group-active:translate-x-1" />
              </a>
            ))}
          </nav>
          <div className="mt-8 border-t border-beige/60 pt-6">
            <ButtonLink
              href={generalEnquiryLink()}
              className="w-full justify-center py-3 text-base"
              onClick={() => {
                setOpen(false);
                document.body.style.overflow = "";
              }}
            >
              <WhatsAppIcon className="size-5" /> Chat on WhatsApp
            </ButtonLink>
            <p className="mt-4 text-center text-sm tracking-wide text-ink-soft">{brand.phoneDisplay}</p>
          </div>
        </div>
      )}
    </header>
  );
}
