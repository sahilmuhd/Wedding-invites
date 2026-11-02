import { generalEnquiryLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function FloatingWhatsApp() {
  return (
    <a
      href={generalEnquiryLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-4 right-4 z-40 flex h-14 items-center justify-center gap-2.5 rounded-full bg-[#17794a] px-4 text-white shadow-[0_10px_30px_-8px_rgba(23,121,74,0.7)] transition-colors hover:bg-[#0f5f39] sm:bottom-6 sm:right-6 sm:px-6"
    >
      <WhatsAppIcon className="size-7" />
      <span className="hidden text-sm font-medium tracking-wide sm:inline">Chat with us</span>
    </a>
  );
}
