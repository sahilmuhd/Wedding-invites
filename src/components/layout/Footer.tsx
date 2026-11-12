import { brand } from "@/config/brand";
import { generalEnquiryLink } from "@/lib/whatsapp";
import { LogoMark } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-page flex flex-col items-center gap-5 py-12 text-center text-sm text-ink-soft md:flex-row md:justify-between md:text-left">
        <p className="flex items-center gap-2.5 text-maroon">
          <LogoMark className="h-5 w-auto" />
          <span className="font-serif text-lg italic">{brand.name}</span>
        </p>
        <ul className="flex flex-col items-center gap-1 md:flex-row md:gap-8">
          <li>
            <a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-maroon">
              Instagram {brand.instagramHandle}
            </a>
          </li>
          <li>
            <a href={generalEnquiryLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-maroon">
              WhatsApp {brand.phoneDisplay}
            </a>
          </li>
        </ul>
        <p>© {new Date().getFullYear()} {brand.name}</p>
      </div>
    </footer>
  );
}
