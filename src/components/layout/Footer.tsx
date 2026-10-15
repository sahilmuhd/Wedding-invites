import { brand, navLinks } from "@/config/brand";
import { generalEnquiryLink } from "@/lib/whatsapp";
import { categoryTabs } from "@/lib/invitations";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-serif text-3xl text-ivory">{brand.name}</p>
          <p className="mt-2 font-serif text-lg italic text-gold">{brand.tagline}</p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{brand.description}</p>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow !text-gold">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href} className="hover:text-ivory">{l.label}</a></li>
            ))}
          </ul>
          <p className="eyebrow mt-8 !text-gold">Designs</p>
          <p className="mt-4 text-sm leading-relaxed">
            {categoryTabs.filter((t) => t.key !== "All").map((t) => t.label).join(" · ")}
          </p>
        </nav>
        <div>
          <p className="eyebrow !text-gold">Contact</p>
          <a href={generalEnquiryLink()} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 text-ivory hover:text-gold">
            <WhatsAppIcon className="size-5" /> {brand.phoneDisplay}
          </a>
          <p className="mt-2 text-sm">WhatsApp us your reference — your link arrives in 48 hours.</p>
        </div>
      </div>
      <div className="border-t border-ivory/10 py-6 text-center text-xs text-ivory/60">
        © {new Date().getFullYear()} {brand.name}. All rights reserved.
      </div>
    </footer>
  );
}
