"use client";

import type { AnchorHTMLAttributes } from "react";
import { track } from "@vercel/analytics";
import type { CtaLocation } from "@/lib/whatsapp";

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  location: CtaLocation;
  design?: string;
  plan?: string;
}

/** WhatsApp link that records a `whatsapp_click` event (location + design/plan) before opening WhatsApp. */
export function WhatsAppLink({ href, location, design, plan, onClick, children, ...rest }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        track("whatsapp_click", { location, ...(design ? { design } : {}), ...(plan ? { plan } : {}) });
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
