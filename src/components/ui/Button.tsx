import type { AnchorHTMLAttributes } from "react";

export type ButtonVariant = "whatsapp" | "outline" | "light";

const styles: Record<ButtonVariant, string> = {
  // Main action. WhatsApp is signalled by its icon and label, not by green.
  whatsapp: "bg-maroon text-white hover:bg-maroon-deep active:bg-maroon-deep border border-maroon",
  outline: "border border-maroon/30 text-maroon hover:border-maroon hover:bg-maroon-tint",
  // White on maroon, for the closing section.
  light: "bg-white text-maroon hover:bg-maroon-tint border border-white",
};

export function buttonClass(variant: ButtonVariant = "whatsapp", size: "sm" | "md" = "md") {
  return `inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-colors duration-200 ${
    size === "sm" ? "px-4 text-sm" : "min-h-12 px-7 text-base"
  } ${styles[variant]}`;
}

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md";
}

/** Anchor styled as a button, for in-page links. WhatsApp links use <WhatsAppLink>. */
export function ButtonLink({ variant = "outline", size = "md", className = "", children, ...rest }: Props) {
  return (
    <a className={`${buttonClass(variant, size)} ${className}`} {...rest}>
      {children}
    </a>
  );
}
